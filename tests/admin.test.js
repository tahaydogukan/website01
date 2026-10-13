import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { generateKeyPair, SignJWT, jwtVerify } from 'jose';
import { requireAdmin, readJson } from '../worker/security.js';
import { handleRequest } from '../worker/index.js';
import { csvCell, validateApplication } from '../worker/validation.js';

const config = { ADMIN_EMAIL: 'admin@example.invalid', ACCESS_TEAM_DOMAIN: 'test.cloudflareaccess.com', ACCESS_AUD: 'test-audience' };
const { publicKey, privateKey } = await generateKeyPair('RS256');
const token = (claims = {}, key = privateKey) => new SignJWT({ email: config.ADMIN_EMAIL, type: 'app', ...claims })
  .setProtectedHeader({ alg: 'RS256' }).setIssuer(`https://${config.ACCESS_TEAM_DOMAIN}`)
  .setAudience(config.ACCESS_AUD).setSubject('admin-id').setIssuedAt().setExpirationTime('1h').sign(key);
const authRequest = (value) => new Request('https://site.invalid/api/admin/session', { headers: { 'Cf-Access-Jwt-Assertion': value } });
const verify = (value, ignored, options) => jwtVerify(value, publicKey, options);

test('administrator requires valid signature and exactly the configured identity', async () => {
  assert.equal((await requireAdmin(authRequest(await token()), config, verify)).email, config.ADMIN_EMAIL);
  await assert.rejects(requireAdmin(authRequest(await token({ email: 'other@example.invalid' })), config, verify), { status: 403 });
  await assert.rejects(requireAdmin(authRequest(await token({ type: 'org' })), config, verify), { status: 403 });
  const other = await generateKeyPair('RS256');
  await assert.rejects(requireAdmin(authRequest(await token({}, other.privateKey)), config, verify), { status: 403 });
  for (const changes of [{ ACCESS_AUD: 'different' }, { ACCESS_TEAM_DOMAIN: 'other.cloudflareaccess.com' }]) {
    await assert.rejects(requireAdmin(authRequest(await token()), { ...config, ...changes }, verify), { status: 403 });
  }
  const expired = await new SignJWT({ email: config.ADMIN_EMAIL, type: 'app' }).setProtectedHeader({ alg: 'RS256' }).setIssuer(`https://${config.ACCESS_TEAM_DOMAIN}`).setAudience(config.ACCESS_AUD).setSubject('id').setIssuedAt().setExpirationTime(1).sign(privateKey);
  await assert.rejects(requireAdmin(authRequest(expired), config, verify), { status: 403 });
});

test('missing configuration and anonymous requests fail before database access', async () => {
  for (const path of ['/yonetim', '/yonetim/settings', '/api/admin/session', '/api/admin/applications', '/api/admin/applications/export']) {
    const request = new Request(`https://site.invalid${path}`);
    assert.equal((await handleRequest(request, {})).status, 503);
    assert.equal((await handleRequest(request, config)).status, 401);
  }
});

function database() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec('PRAGMA foreign_keys = ON');
  sqlite.exec(readFileSync(new URL('../migrations/0001_applications.sql', import.meta.url), 'utf8'));
  return {
    sqlite,
    prepare(sql) {
      let values = [];
      const statement = sqlite.prepare(sql);
      return { bind(...args) { values = args; return this; }, async first() { return statement.get(...values) || null; }, async all() { return { results: statement.all(...values) }; }, async run() { return statement.run(...values); }, execute() { return statement.columns().length ? { results: statement.all(...values) } : statement.run(...values); } };
    },
    async batch(statements) {
      sqlite.exec('BEGIN');
      try { const results = statements.map((statement) => statement.execute()); sqlite.exec('COMMIT'); return results; }
      catch (error) { sqlite.exec('ROLLBACK'); throw error; }
    },
  };
}
const valid = { adi: 'Örnek', soyadi: 'Kişi', babaAdi: 'Baba', anneAdi: 'Anne', dogumYeri: 'Erzurum', dogumTarihi: '1990-01-01', tcKimlik: '12345678901', meslegi: 'Meslek', kanGrubu: 'A Rh+', cepTelefonu: '05550000000', eposta: 'sample@example.invalid', ogrenimDurumu: 'Lisans', mahalle: 'Mahalle', adres: 'Örnek adres', turnstileToken: 'test-token' };
const request = (path, method = 'GET', body, origin = 'https://site.invalid') => new Request(`https://site.invalid${path}`, { method, headers: { Origin: origin, 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}) });
const authorized = async () => ({ email: config.ADMIN_EMAIL });

test('Turnstile, real SQLite persistence, literal search, decisions and audit', async (t) => {
  const DB = database(); t.after(() => DB.sqlite.close());
  const env = { DB, TURNSTILE_SECRET_KEY: 'test-secret', TURNSTILE_SITE_KEY: 'test-site' };
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });
  let check = { success: true, action: 'membership', hostname: 'wrong.invalid' };
  globalThis.fetch = async () => Response.json(check);
  assert.equal((await handleRequest(request('/api/applications', 'POST', valid), env)).status, 400);
  check.hostname = 'site.invalid';
  assert.equal((await handleRequest(request('/api/applications', 'POST', valid, 'https://evil.invalid'), env)).status, 403);
  const submitted = await handleRequest(request('/api/applications', 'POST', valid), env);
  assert.equal(submitted.status, 201);
  assert.match((await submitted.json()).reference, /^PK-/);
  const list = await handleRequest(request('/api/admin/applications?q=%C3%96rnek'), env, authorized);
  assert.equal(list.status, 200);
  assert.equal(list.headers.get('Cache-Control'), 'no-store');
  const data = await list.json(); assert.equal(data.total, 1);
  assert.equal(data.applications[0].payload, undefined);
  for (const q of ['%', '_', "' OR 1=1 --"]) {
    const response = await handleRequest(request(`/api/admin/applications?q=${encodeURIComponent(q)}`), env, authorized);
    assert.equal(response.status, 200); assert.equal((await response.json()).total, 0);
  }
  const path = `/api/admin/applications/${data.applications[0].id}`;
  assert.equal((await handleRequest(request(path, 'PATCH', { status: 'approved', notes: 'Kontrol edildi' }, 'https://evil.invalid'), env, authorized)).status, 403);
  assert.equal((await handleRequest(request(path, 'PATCH', { status: 'approved', notes: 'Kontrol edildi' }), env, authorized)).status, 200);
  const detail = await (await handleRequest(request(path), env, authorized)).json();
  assert.equal(detail.status, 'approved'); assert.equal(detail.notes, 'Kontrol edildi');
  assert.equal(detail.payload.adi, valid.adi);
  assert.equal(DB.sqlite.prepare('SELECT actor FROM application_audit').get().actor, config.ADMIN_EMAIL);
  assert.equal((await handleRequest(request('/api/admin/applications?status=invalid'), env, authorized)).status, 400);
  assert.equal((await handleRequest(request(path, 'PATCH', { status: 'approved', notes: 'a'.repeat(2001) }), env, authorized)).status, 400);
  const csv = await handleRequest(request('/api/admin/applications/export'), env, authorized);
  assert.match(csv.headers.get('Content-Type'), /text\/csv/); assert.match(await csv.text(), /Onaylandı/);
});

test('invalid personal data, oversized payloads and spreadsheet formulas are rejected or escaped', async () => {
  for (const changes of [{ adi: '' }, { dogumTarihi: '2020-01-01' }, { dogumTarihi: '2000-02-30' }, { tcKimlik: '1' }, { adres: 'a'.repeat(1001) }]) assert.throws(() => validateApplication({ ...valid, ...changes }), { status: 400 });
  await assert.rejects(readJson(request('/api/applications', 'POST', { data: 'a'.repeat(13000) })), { status: 413 });
  for (const value of ['=HYPERLINK("evil")', '+1', '-1', '@SUM(A1)', '\t=1']) assert.ok(csvCell(value).startsWith('"\''));
});
