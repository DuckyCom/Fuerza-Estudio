// @ts-check
import { defineConfig } from 'astro/config';
import { SITE } from './src/data/site.ts';

// Sitio 100 % estático: `npm run build` genera `dist/`, que se sube tal cual a
// Cloudflare Pages (o a cualquier hosting de archivos estáticos).
export default defineConfig({
  site: SITE.url,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
