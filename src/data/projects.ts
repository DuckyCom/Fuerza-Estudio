// Proyectos publicados en https://www.behance.net/fuerza (los 17, del más nuevo al más viejo).
//
// Origen de cada dato (relevado de Behance el 2026-11-06):
// - `title`, `date` y `credits` (co-autores que figuran en «Owners») son literales de Behance.
// - `services`: asignados según las áreas y tags que cada proyecto tiene en Behance.
// - `summary`: solo donde Behance trae texto propio (hoy, EVA Dry Gin). El resto queda vacío.
// - Imágenes: `src/data/behance-images.json`, indexadas por el id de Behance. Se sirven desde el
//   CDN de Behance (mir-s3-cdn-cf.behance.net) en 1400 px. Ver README, «Imágenes».
// - `tone` y `mark`: color y recurso de la portada tipográfica, que se usa solo si no hay imagen.

import images from './behance-images.json';

export type Tone = 'azul' | 'rosa' | 'fucsia' | 'naranja' | 'negro';
export type Mark = 'ola' | 'trazo' | 'asterisco' | 'isotipo';

type ProjectInput = {
  slug: string;
  behanceId: string;
  behanceSlug: string;
  title: string;
  /** Año y mes de publicación en Behance (AAAA-MM). */
  date: string;
  services: string[];
  credits?: string[];
  summary?: string;
  tone: Tone;
  mark: Mark;
  featured?: boolean;
};

export type Project = ProjectInput & {
  behance: string;
  cover?: string;
  gallery: string[];
};

const CDN = 'https://mir-s3-cdn-cf.behance.net/project_modules/';
const imgs = images as Record<string, string[]>;

const INPUT: ProjectInput[] = [
  {
    slug: 'pellegrino-pizza',
    behanceId: '211755809',
    behanceSlug: 'Pellegrino-Pizza',
    title: 'Pellegrino Pizza',
    date: '2024-11',
    services: ['branding'],
    tone: 'naranja',
    mark: 'asterisco',
    featured: true,
  },
  {
    slug: 'otoro',
    behanceId: '211755333',
    behanceSlug: 'Otoro-Brandbook',
    title: 'Otoro Brandbook',
    date: '2024-11',
    services: ['branding', 'manuales-de-marca'],
    tone: 'negro',
    mark: 'ola',
    featured: true,
  },
  {
    slug: 'banda-experiencia-river',
    behanceId: '192703097',
    behanceSlug: 'Banda-Experiencia-River',
    title: 'Banda Experiencia River',
    date: '2024-02',
    services: ['branding'],
    credits: ['Rosario Narvaja'],
    tone: 'azul',
    mark: 'trazo',
    featured: true,
  },
  {
    slug: 'maldini-primavera',
    behanceId: '173171133',
    behanceSlug: 'Campana-Maldini-Primavera-Pretemporada',
    title: 'Maldini Primavera — Pretemporada',
    date: '2023-07',
    services: ['campanas'],
    tone: 'fucsia',
    mark: 'ola',
  },
  {
    slug: 'casa-paradiso',
    behanceId: '173176807',
    behanceSlug: 'Casa-Paradiso-Packaging-design',
    title: 'Casa Paradiso',
    date: '2023-07',
    services: ['diseno-grafico'],
    credits: ['Brenda González'],
    summary: 'Diseño de packaging.',
    tone: 'rosa',
    mark: 'isotipo',
    featured: true,
  },
  {
    slug: 'eva-dry-gin',
    behanceId: '171902065',
    behanceSlug: 'EVA-Dry-Gin',
    title: 'EVA Dry Gin',
    date: '2023-05',
    services: ['branding', 'diseno-grafico'],
    credits: ['Rosario Narvaja', 'Brenda González'],
    summary: 'Trabajo de identidad integral y etiqueta.',
    tone: 'azul',
    mark: 'asterisco',
    featured: true,
  },
  {
    slug: 'fuking-cantina',
    behanceId: '167272749',
    behanceSlug: 'Fuking-Cantina',
    title: 'Fuking Cantina',
    date: '2023-03',
    services: ['redes-sociales', 'contenido'],
    credits: ['Rosario Narvaja'],
    tone: 'naranja',
    mark: 'trazo',
  },
  {
    slug: 'logofolio',
    behanceId: '167099455',
    behanceSlug: 'Logofolio',
    title: 'Logofolio',
    date: '2023-03',
    services: ['branding'],
    summary: 'Selección de logotipos diseñados por el estudio.',
    tone: 'negro',
    mark: 'asterisco',
  },
  {
    slug: 'social-media-design',
    behanceId: '166992497',
    behanceSlug: 'Social-Media-Design',
    title: 'Social Media Design',
    date: '2023-03',
    services: ['redes-sociales', 'contenido'],
    credits: ['Rosario Narvaja'],
    summary: 'Selección de piezas para redes sociales.',
    tone: 'fucsia',
    mark: 'trazo',
  },
  {
    slug: 'vurga',
    behanceId: '166173593',
    behanceSlug: 'Vurga-Brand-Identity',
    title: 'Vurga',
    date: '2023-03',
    services: ['branding'],
    credits: ['Rosario Narvaja'],
    summary: 'Identidad de marca.',
    tone: 'azul',
    mark: 'isotipo',
    featured: true,
  },
  {
    slug: 'mauer-bar',
    behanceId: '165359571',
    behanceSlug: 'Mauer-Bar',
    title: 'Mauer Bar',
    date: '2023-03',
    services: ['redes-sociales', 'contenido'],
    credits: ['Rosario Narvaja'],
    tone: 'negro',
    mark: 'ola',
  },
  {
    slug: 'fuerza',
    behanceId: '165153643',
    behanceSlug: 'FUERZA',
    title: 'Fuerza',
    date: '2023-03',
    services: ['branding', 'manuales-de-marca'],
    credits: ['Manuel Blanco', 'Agustina Forchiniti'],
    tone: 'rosa',
    mark: 'ola',
  },
  {
    slug: 'fika-botanicos',
    behanceId: '165053831',
    behanceSlug: 'Fika-Botanicos',
    title: 'Fika Botánicos',
    date: '2023-03',
    services: ['redes-sociales', 'contenido'],
    credits: ['Brenda González'],
    tone: 'rosa',
    mark: 'trazo',
  },
  {
    slug: 'lartisan',
    behanceId: '165050061',
    behanceSlug: 'LARTISAN',
    title: "L'Artisan",
    date: '2023-03',
    services: ['redes-sociales', 'contenido'],
    tone: 'naranja',
    mark: 'isotipo',
  },
  {
    slug: 'flama',
    behanceId: '162412165',
    behanceSlug: 'Flama',
    title: 'Flama',
    date: '2023-01',
    services: ['branding'],
    tone: 'fucsia',
    mark: 'asterisco',
  },
  {
    slug: 'gibbo',
    behanceId: '162404047',
    behanceSlug: 'Gibbo',
    title: 'Gibbo',
    date: '2023-01',
    services: ['branding', 'redes-sociales'],
    tone: 'azul',
    mark: 'ola',
  },
  {
    slug: 'maldini-ba',
    behanceId: '94854399',
    behanceSlug: 'Maldini-BA',
    title: 'Maldini BA',
    date: '2020-04',
    services: ['branding'],
    credits: ['Agustina Forchiniti'],
    tone: 'rosa',
    mark: 'ola',
  },
];

export const PROJECTS: Project[] = INPUT.map((p) => {
  const gallery = (imgs[p.behanceId] ?? []).map((path) => CDN + path);
  return {
    ...p,
    behance: `https://www.behance.net/gallery/${p.behanceId}/${p.behanceSlug}`,
    cover: gallery[0],
    gallery,
  };
});

export const featuredProjects = () => PROJECTS.filter((p) => p.featured);

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
export const formatDate = (ym: string) => {
  const [y, m] = ym.split('-').map(Number);
  return `${MESES[m - 1]} ${y}`;
};
