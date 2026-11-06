# Sitio Fuerza Estudio Creativo

Sitio de **Fuerza**, estudio creativo de Buenos Aires (identidad de marca, redes
sociales y contenido). Astro 7, HTML estático, casi sin JavaScript (solo el menú
mobile). Todo el diseño sale del brandbook: [`docs/brand/Fuerza_Brandbook_2024.pdf`](docs/brand/Fuerza_Brandbook_2024.pdf).

Páginas: `/` · `/servicios/` · `/proyectos/` · `/proyectos/<slug>/` (17 fichas) · 404 · `sitemap.xml`

## Arrancar

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # tipos (astro check)
npm run build      # genera dist/, que es lo que se publica
npm run preview    # sirve dist/ para verlo tal cual se publica
```

## Publicar (Cloudflare Pages)

Publicado en **https://fuerza-estudio.pages.dev** (proyecto Pages `fuerza-estudio`,
rama de producción `main`). Es Pages clásico, no un Worker.

```bash
npm run deploy     # build + wrangler pages deploy dist
```

Hace falta tener sesión en wrangler (`npx wrangler login`). Ojo: wrangler 4 intenta
crear los proyectos *nuevos* de Pages como Workers; este ya existe como Pages, así que
`pages deploy` va directo y no hace falta `--force`.

El proyecto está conectado a GitHub (`DuckyCom/Fuerza-Estudio`): cada push a `main`
publica solo. En Cloudflare → fuerza-estudio → Settings → Builds la configuración tiene
que ser: framework **Astro**, build `npm run build`, salida `dist`. La versión de Node
sale de `.node-version` (22).

`public/_headers` agrega headers de seguridad y caché larga para `/_astro/*`.

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
| --- | --- |
| Proyectos (orden, destacados, textos, imágenes) | `src/data/projects.ts` |
| Servicios y sus descripciones | `src/data/services.ts` |
| Dominio, mail, redes, claim, menú | `src/data/site.ts` |
| Colores, gradientes, tipografías, espaciados | `src/styles/tokens.css` |
| Estilos generales y utilidades | `src/styles/global.css` |
| Encabezado / pie | `src/components/Header.astro` / `Footer.astro` |

### Proyectos e imágenes

Los 17 proyectos salen del Behance de Fuerza (relevado el 2026-11-06 con el navegador;
Behance bloquea los pedidos automáticos). De cada uno se tomó: título, fecha, co-autores
(«Equipo»), áreas/tags (para asignar servicios) y las imágenes, en el mismo orden.
Ningún proyecto trae texto en Behance salvo EVA Dry Gin.

Las imágenes se sirven **desde el CDN de Behance** (`mir-s3-cdn-cf.behance.net`, versión
de 1400 px) y las rutas están en `src/data/behance-images.json`, por id de proyecto.
La primera imagen es la portada. Se dejó afuera un GIF de 26 MB de Mauer Bar.

- Para cambiar la portada, reordenar ese proyecto en el JSON.
- Si Fuerza borra o cambia un proyecto en Behance, esas imágenes se rompen. Para no
  depender de Behance, bajar las imágenes a `public/proyectos/<slug>/` y apuntar ahí.
- Sin imágenes, la tarjeta usa una portada tipográfica con la paleta del brandbook
  (`tone` y `mark` en `src/data/projects.ts`).

## Marca

### Recursos vectoriales

`src/assets/brand/` tiene los vectores **sacados directo del PDF** (no redibujados):
logo, logo con ola, isotipo, los tres íconos (ola, trazo, asterisco), los trazos y
dos «swoosh». Se usan con `<Brand name="…" />`, que los inserta inline y toman el
color del texto (`currentColor`).

### Colores

En la pág. 3 del brandbook, las **etiquetas** HEX no coinciden con el color
**aplicado** en las muestras y en todas las piezas:

| Color | Etiqueta impresa | Aplicado en las piezas (el que usa el sitio) |
| --- | --- | --- |
| Azul | `#1e22f0` | `#2c00fa` |
| Rosa | `#ffe2fa` | `#f8d7db` |
| Fucsia | `#e27dc0` | `#f174c3` |
| Naranja | `#f6622a` | `#ff5500` |
| Negro | `#242424` | `#242424` |

El sitio usa los aplicados porque son los que se ven en todo el manual. **Confirmar
con Fuerza**; si valen las etiquetas, se cambia solo en `src/styles/tokens.css`.

Contraste: azul, fucsia y naranja entre sí no llegan a AA. Por eso el texto chico
va siempre en rosa sobre azul/negro, o en azul/negro sobre rosa; el fucsia y el
naranja quedan para fondos con texto grande y para íconos.

### Tipografías

TT Hoves Pro y Cooper Lt BT son pagas (el PDF trae las versiones Trial). Mientras
no haya licencia web se usan sustitutos libres, self-hosteados con Fontsource:

| Brandbook | Sustituto | Ajuste |
| --- | --- | --- |
| TT Hoves Pro | Hanken Grotesk | — |
| Cooper Lt BT | Fraunces | peso 300, eje `SOFT` 100 (terminaciones redondeadas) |

Con la licencia: poner los `woff2` en `public/fonts/`, declarar los `@font-face`
y cambiar `--font-sans` / `--font-serif` en `src/styles/tokens.css`.

## Qué falta antes de publicar

| Qué | Dónde |
| --- | --- |
| **Descripción de cada proyecto** (en Behance no hay texto, salvo EVA) | `src/data/projects.ts` → `summary` |
| **Revisar los servicios asignados** a cada proyecto (salen de los tags de Behance) | `src/data/projects.ts` → `services` |
| **Decidir si las imágenes se quedan en el CDN de Behance o se bajan al repo** | ver «Proyectos e imágenes» |
| **Descripciones de servicios**: son copy propuesto, revisar con el equipo | `src/data/services.ts` |
| **Mail de contacto** (vacío = no se muestra; hoy el contacto es por Instagram) | `src/data/site.ts` → `email` |
| **Dominio** (`fuerzaestudio.com` sale de las tarjetas del brandbook) | `src/data/site.ts` y `public/robots.txt` |
| **Colores**: confirmar cuál HEX vale (ver arriba) | `src/styles/tokens.css` |
| **Imagen para redes** (Open Graph, 1200×630) | falta crearla y sumarla en `src/layouts/Base.astro` |

## Estructura

```
├── astro.config.mjs
├── docs/brand/                 brandbook 2024 (PDF)
├── public/                     favicon, robots, _headers
└── src/
    ├── assets/brand/           SVG de marca extraídos del brandbook
    ├── components/             Brand, Header, Footer, Marquee, CircleText, ProjectCard, ProjectCover
    ├── data/                   site.ts, projects.ts, services.ts  ← contenido
    ├── layouts/Base.astro      <head>, fuentes, header y footer
    ├── pages/                  index, servicios, proyectos/, 404, sitemap.xml
    └── styles/                 tokens.css (marca) y global.css
```
