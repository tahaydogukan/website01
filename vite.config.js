import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), {
    name: 'local-api-status',
    configureServer(server) {
      server.middlewares.use('/api', (req, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Cache-Control', 'no-store');
        if (req.url === '/public-config') {
          res.end(JSON.stringify({ acceptingApplications: false, turnstileSiteKey: '' }));
        } else {
          res.statusCode = 503;
          res.end(JSON.stringify({ code: 'setup_required', error: 'Cloudflare bağlantısı henüz kurulmadı.' }));
        }
      });
    },
  }],
})
