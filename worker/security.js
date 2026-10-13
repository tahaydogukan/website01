import { createRemoteJWKSet, jwtVerify } from 'jose';

const keySets = new Map();

export class HttpError extends Error {
  constructor(status, message, code = 'request_error') {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function requireSameOrigin(request) {
  if (request.headers.get('Origin') !== new URL(request.url).origin) {
    throw new HttpError(403, 'Bu işlem için geçerli bir site oturumu gerekiyor.', 'invalid_origin');
  }
}

export async function requireAdmin(request, env, verify = jwtVerify) {
  const email = String(env.ADMIN_EMAIL || '').trim().toLowerCase();
  const team = String(env.ACCESS_TEAM_DOMAIN || '').trim();
  const audience = String(env.ACCESS_AUD || '').trim();
  if (!email || !audience || !/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(team)) {
    throw new HttpError(503, 'Yönetici girişi henüz etkinleştirilmedi.', 'setup_required');
  }
  const token = request.headers.get('Cf-Access-Jwt-Assertion');
  if (!token) throw new HttpError(401, 'Yönetici girişi yapmanız gerekiyor.', 'login_required');
  let keys = keySets.get(team);
  if (!keys) {
    keys = createRemoteJWKSet(new URL(`https://${team}/cdn-cgi/access/certs`));
    keySets.set(team, keys);
  }
  try {
    const { payload } = await verify(token, keys, {
      issuer: `https://${team}`,
      audience,
      algorithms: ['RS256'],
      requiredClaims: ['exp', 'iat', 'email', 'sub'],
    });
    if (String(payload.email || '').toLowerCase() !== email || payload.type !== 'app') {
      throw new Error('Unauthorized identity');
    }
    return { email, subject: payload.sub };
  } catch {
    throw new HttpError(403, 'Bu hesap yönetim paneline erişemiyor.', 'access_denied');
  }
}

export async function readJson(request, maxBytes = 12000) {
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) {
    throw new HttpError(415, 'İstek biçimi desteklenmiyor.');
  }
  const reader = request.body?.getReader();
  if (!reader) throw new HttpError(400, 'Form bilgileri eksik.');
  let size = 0;
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      throw new HttpError(413, 'Form bilgileri çok uzun.');
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try {
    const body = JSON.parse(new TextDecoder().decode(bytes));
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error();
    return body;
  } catch { throw new HttpError(400, 'Form bilgileri okunamadı.'); }
}

export function privateHeaders() {
  return {
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'same-origin',
    'X-Frame-Options': 'DENY',
  };
}
