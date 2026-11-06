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
| Formulario de contacto (Google Form, códigos de país) | `src/data/site.ts` → `CONTACT_FORM` / `PHONE_CODES` |
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

### Formulario de contacto

El formulario del pie (`src/components/ContactForm.astro`) manda las respuestas a un
**Google Form**, y el Google Form las vuelca en su hoja de cálculo. No hay servidor propio.

**Lo que tiene que tener el Google Form:**

| # | Pregunta | Tipo | Obligatoria en Google |
| --- | --- | --- | --- |
| 1 | Nombre y apellido | Respuesta corta | No |
| 2 | Empresa o marca | Respuesta corta | No |
| 3 | Email | Respuesta corta | No |
| 4 | Código + teléfono | Respuesta corta | No |
| 5 | Contanos un poco más | Párrafo | No |

- Ninguna obligatoria ni con validación en Google: el sitio ya valida. Si Google exige
  algo que el sitio dejó vacío, la respuesta se pierde sin aviso.
- Sin pedir inicio de sesión, sin recolectar mails, sin «una respuesta por persona»:
  cualquiera de esas opciones hace que Google rechace el envío desde el sitio.
  En cuentas de organización (Google Workspace) revisar que esté desactivado
  «Restringir a usuarios de la organización» (Configuración → Respuestas); el script lo
  intenta y avisa en el registro si el administrador no lo deja.
- Vinculado a una hoja de cálculo (Respuestas → «Vincular con Hojas de cálculo»).
- Opcional: Respuestas → ⋮ → «Recibir notificaciones por correo electrónico».

**Opción rápida (recomendada): `scripts/crear-google-form.gs`.** Crea el form con esa
configuración, la hoja de respuestas, y escribe el bloque `CONTACT_FORM` listo para pegar.

1. Con la cuenta de Google de Fuerza, entrar a https://script.google.com → «Proyecto nuevo».
2. Pegar el archivo entero, guardar, elegir `crearFormContacto` y «Ejecutar»
   (Google pide permisos para Forms y Hojas de cálculo).
3. En «Registro de ejecución» copiar el bloque `CONTACT_FORM` y reemplazarlo en
   `src/data/site.ts`.

**A mano:** crear el form como la tabla de arriba y sacar los ids con ⋮ →
«Obtener enlace prellenado» (completar cada pregunta, «Obtener vínculo»: aparece un
`entry.NNNN=` por pregunta). En `CONTACT_FORM`, `action` es el link del form cambiando
`/viewform…` por `/formResponse`, y cada `entry.NNNN` va en su campo.

El teléfono llega armado en una sola respuesta (`+54 11 2345 6789`). Google no le contesta
al navegador si el envío salió bien (la respuesta es opaca), así que el sitio valida todo
antes de mandar y muestra «¡Gracias!» si no hubo error de red. Probarlo una vez y ver que
la fila aparezca en la hoja. Mientras `action` esté vacío, el form avisa que no está
conectado y deriva a Instagram. Tiene un campo trampa oculto para bots.

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
| **Conectar el formulario al Google Form** (hoy avisa que no está conectado) | `src/data/site.ts` → `CONTACT_FORM`, ver «Formulario de contacto» |
| **Mail de contacto** (vacío = no se muestra) | `src/data/site.ts` → `email` |
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
