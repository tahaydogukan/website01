import { readFileSync } from 'node:fs';

const config = JSON.parse(readFileSync(new URL('../wrangler.jsonc', import.meta.url), 'utf8'));
const vars = config.vars || {};
const ready = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vars.ADMIN_EMAIL || '')
  && /^[a-z0-9-]+\.cloudflareaccess\.com$/.test(vars.ACCESS_TEAM_DOMAIN || '')
  && Boolean(vars.ACCESS_AUD && vars.TURNSTILE_SITE_KEY)
  && config.d1_databases?.some((db) => db.binding === 'DB' && /^[a-f0-9-]{36}$/i.test(db.database_id) && db.database_id !== '00000000-0000-0000-0000-000000000000')
  && config.routes?.some((route) => route.custom_domain === true && route.pattern.includes('.'))
  && config.workers_dev === false && config.preview_urls === false
  && ['/api/*', '/yonetim', '/yonetim/*'].every((path) => config.assets?.run_worker_first?.includes(path));
if (!ready) {
  console.error('Yayın ayarları eksik. CLOUDFLARE_SETUP.md dosyasındaki hesap, domain ve yönetici girişini tamamlayın.');
  process.exit(1);
}
console.log('Yapılandırma hazır. Access politikası ve Turnstile secret yayından önce Cloudflare üzerinde tamamlanmış olmalıdır.');
