# Fuerza Estudio Creativo: sitio

Sitio de Fuerza (estudio creativo, Buenos Aires: identidad de marca, redes, contenido,
paid media, campañas, eventos). Astro 7 estático → Cloudflare Pages.

Respondé en **español de Argentina**, con voseo. El sitio es solo es-AR.

## Antes de trabajar, leé

- `README.md`: comandos, dónde se edita cada cosa, decisiones de marca y pendientes.
- `docs/brand/Fuerza_Brandbook_2024.pdf`: el manual manda. Para verlo, renderizá páginas con PyMuPDF (no hay poppler).

## Reglas que no se rompen

- **Nada inventado:** ni clientes, ni testimonios, ni cifras, ni años, ni descripciones de proyectos. Lo que no está confirmado queda vacío y el componente no lo muestra. Fuentes válidas: brandbook, https://www.behance.net/fuerza, lo que diga el usuario.
- **Marca:**
  - colores solo desde `src/styles/tokens.css` (valores aplicados en el brandbook; ver README por la diferencia con las etiquetas);
  - tipografías por `--font-sans` / `--font-serif`; los sustitutos (Hanken Grotesk, Fraunces SOFT) son provisorios;
  - logo e íconos: los SVG de `src/assets/brand/` extraídos del PDF; no redibujarlos ni deformarlos.
- **Contraste:** texto chico nunca en fucsia/naranja sobre azul ni azul sobre fucsia/naranja.
- **Inspiración:** se puede tomar estructura y criterios de `C:\Users\benja\sitio` (Agarrate Catalina) y `C:\Users\benja\EuroHard`, pero lo visual sale del brandbook de Fuerza.
- **Publicar o hacer push** necesita aprobación del usuario.

## Comandos

```bash
npm run dev     # http://localhost:4321
npm run check
npm run build
```
