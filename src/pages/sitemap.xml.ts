import type { APIRoute } from 'astro';
import { PROJECTS } from '../data/projects';

// Sitemap generado en el build con todas las páginas públicas.
export const GET: APIRoute = ({ site }) => {
  const paths = ['/', '/proyectos/', '/servicios/', ...PROJECTS.map((p) => `/proyectos/${p.slug}/`)];
  const urls = paths.map((p) => `  <url><loc>${new URL(p, site)}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
