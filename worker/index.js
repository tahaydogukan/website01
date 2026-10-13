import { HttpError, privateHeaders, readJson, requireAdmin, requireSameOrigin } from './security.js';
import { csvCell, validateApplication } from './validation.js';

const STATUSES = ['pending', 'approved', 'rejected'];
const statusNames = { pending: 'Bekliyor', approved: 'Onaylandı', rejected: 'Reddedildi' };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...privateHeaders(), 'Content-Type': 'application/json; charset=utf-8' } });

function requireDatabase(env) {
  if (!env.DB) throw new HttpError(503, 'Başvuru sistemi henüz etkinleştirilmedi.', 'setup_required');
}

function listFilter(url) {
  const status = url.searchParams.get('status') || 'all';
  const query = (url.searchParams.get('q') || '').trim().slice(0, 100);
  if (status !== 'all' && !STATUSES.includes(status)) throw new HttpError(400, 'Geçersiz başvuru durumu.');
  const clauses = [];
  const params = [];
  if (status !== 'all') { clauses.push('status = ?'); params.push(status); }
  if (query) {
    clauses.push('(name LIKE ? ESCAPE \'\\\' OR email LIKE ? ESCAPE \'\\\' OR reference LIKE ? ESCAPE \'\\\')');
    const pattern = `%${query.replace(/[\\%_]/g, (match) => `\\${match}`)}%`;
    params.push(pattern, pattern, pattern);
  }
  return { where: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '', params };
}

async function submitApplication(request, env) {
  requireSameOrigin(request);
  requireDatabase(env);
  if (!env.TURNSTILE_SECRET_KEY) throw new HttpError(503, 'Online başvuru sistemi henüz kullanıma açılmadı.', 'setup_required');
  const body = await readJson(request);
  if (body.website) throw new HttpError(400, 'Başvuruyu tekrar deneyin.');
  const data = validateApplication(body);
  if (typeof body.turnstileToken !== 'string' || !body.turnstileToken || body.turnstileToken.length > 2048) throw new HttpError(400, 'Güvenlik doğrulamasını tamamlayın.');
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: body.turnstileToken, remoteip: request.headers.get('CF-Connecting-IP') || undefined }),
  });
  const check = await response.json();
  if (!response.ok || !check.success || check.action !== 'membership' || check.hostname !== new URL(request.url).hostname) throw new HttpError(400, 'Güvenlik doğrulaması geçersiz. Yeniden deneyin.');
  const id = crypto.randomUUID();
  const reference = `PK-${id.slice(0, 8).toUpperCase()}`;
  const now = new Date().toISOString();
  await env.DB.prepare('INSERT INTO applications (id, reference, name, email, phone, payload, status, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(id, reference, `${data.adi} ${data.soyadi}`, data.eposta, data.cepTelefonu, JSON.stringify(data), 'pending', '', now, now).run();
  return json({ reference }, 201);
}

export async function handleRequest(request, env, authenticate = requireAdmin) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, '') || '/';
  try {
    if (path === '/api/applications' && request.method === 'POST') return await submitApplication(request, env);
    if (path === '/api/public-config' && request.method === 'GET') return json({ turnstileSiteKey: env.TURNSTILE_SITE_KEY || '', acceptingApplications: Boolean(env.DB && env.TURNSTILE_SECRET_KEY && env.TURNSTILE_SITE_KEY) });

    if (path === '/yonetim' || path.startsWith('/yonetim/') || path === '/api/admin' || path.startsWith('/api/admin/')) {
      const admin = await authenticate(request, env);
      if (path === '/yonetim' || path.startsWith('/yonetim/')) {
        const response = await env.ASSETS.fetch(request);
        const headers = new Headers(response.headers);
        for (const [name, value] of Object.entries(privateHeaders())) headers.set(name, value);
        return new Response(response.body, { status: response.status, headers });
      }
      if (path === '/api/admin/session' && request.method === 'GET') return json({ email: admin.email });
      requireDatabase(env);

      if (path === '/api/admin/applications' && request.method === 'GET') {
        const { where, params } = listFilter(url);
        const page = Math.max(1, Math.min(100000, Number.parseInt(url.searchParams.get('page') || '1', 10) || 1));
        const results = await env.DB.batch([
          env.DB.prepare(`SELECT id, reference, name, email, phone, status, created_at, updated_at FROM applications ${where} ORDER BY created_at DESC, id DESC LIMIT 20 OFFSET ?`).bind(...params, (page - 1) * 20),
          env.DB.prepare(`SELECT COUNT(*) AS total FROM applications ${where}`).bind(...params),
          env.DB.prepare('SELECT status, COUNT(*) AS count FROM applications GROUP BY status'),
        ]);
        return json({ applications: results[0].results, total: results[1].results[0].total, counts: Object.fromEntries(results[2].results.map((row) => [row.status, row.count])), page, pageSize: 20 });
      }
      if (path === '/api/admin/applications/export' && request.method === 'GET') {
        const { where, params } = listFilter(url);
        const count = await env.DB.prepare(`SELECT COUNT(*) AS total FROM applications ${where}`).bind(...params).first();
        if (count.total > 10000) throw new HttpError(400, 'Dışa aktarmak için aramayı veya durum filtresini daraltın.');
        const { results } = await env.DB.prepare(`SELECT reference, name, email, phone, status, created_at FROM applications ${where} ORDER BY created_at DESC, id DESC`).bind(...params).all();
        const rows = [['Başvuru No', 'Ad Soyad', 'E-posta', 'Telefon', 'Durum', 'Başvuru Tarihi'], ...results.map((row) => [row.reference, row.name, row.email, row.phone, statusNames[row.status], row.created_at])];
        return new Response(`\uFEFF${rows.map((row) => row.map(csvCell).join(';')).join('\r\n')}`, { headers: { ...privateHeaders(), 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="basvurular.csv"' } });
      }
      const match = path.match(/^\/api\/admin\/applications\/([a-f0-9-]{36})$/);
      if (match && request.method === 'GET') {
        const row = await env.DB.prepare('SELECT * FROM applications WHERE id = ?').bind(match[1]).first();
        if (!row) throw new HttpError(404, 'Başvuru bulunamadı.');
        return json({ ...row, payload: JSON.parse(row.payload) });
      }
      if (match && request.method === 'PATCH') {
        requireSameOrigin(request);
        const body = await readJson(request, 5000);
        if (!STATUSES.includes(body.status) || typeof body.notes !== 'string' || body.notes.length > 2000) throw new HttpError(400, 'Durum ve not bilgilerini kontrol edin.');
        const row = await env.DB.prepare('SELECT status FROM applications WHERE id = ?').bind(match[1]).first();
        if (!row) throw new HttpError(404, 'Başvuru bulunamadı.');
        const now = new Date().toISOString();
        await env.DB.batch([
          env.DB.prepare('UPDATE applications SET status = ?, notes = ?, updated_at = ? WHERE id = ?').bind(body.status, body.notes.trim(), now, match[1]),
          env.DB.prepare('INSERT INTO application_audit (id, application_id, actor, previous_status, next_status, created_at) VALUES (?, ?, ?, ?, ?, ?)').bind(crypto.randomUUID(), match[1], admin.email, row.status, body.status, now),
        ]);
        return json({ success: true });
      }
      throw new HttpError(404, 'İşlem bulunamadı.');
    }
    if (path.startsWith('/api/')) throw new HttpError(404, 'İşlem bulunamadı.');
    return await env.ASSETS.fetch(request);
  } catch (error) {
    if (error instanceof HttpError) return json({ error: error.message, code: error.code }, error.status);
    // Never log application payloads, identity tokens, or database error details.
    return json({ error: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.', code: 'server_error' }, 500);
  }
}

export default { fetch: (request, env) => handleRequest(request, env) };
