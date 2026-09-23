# La Buena Tinta — sitio web

Sitio de una sola página hecho con **Vue 3 + Vite**.

## Trabajar en local
Requiere Node 20 o superior.

```bash
npm install      # solo la primera vez
npm run dev      # servidor de desarrollo con recarga en vivo → http://localhost:5173
```

## Estructura
- `src/data/contenido.js` — **todo el texto editable**: servicios, galería, testimonios, FAQ, contacto y redes.
- `src/components/` — una pieza por sección (`HeroSection.vue`, `ServicesSection.vue`, …).
- `src/composables/motion.js` — animaciones de la página (entrada, parallax, formas, revelado al hacer scroll).
- `src/styles.css` — colores de marca (variables `--naranja`, etc.) y estilos compartidos.
- `public/assets/` — logos, ondas, tentáculos y fotos. Se copian tal cual al build.
- `public/contacto.php` — envía por correo lo que llega del formulario.
- `public/.htaccess` — HTTPS, compresión y caché en Hostinger.

## Publicar en Hostinger
1. `npm run build` → genera la carpeta `dist/`.
2. En hPanel → **Administrador de archivos** → `public_html`, sube **el contenido** de `dist/` (no la carpeta en sí), incluido el archivo oculto `.htaccess`.
3. Revisa en `public/contacto.php` que `$DESTINO` y `$REMITENTE` sean correctos. El remitente debe ser una cuenta del mismo dominio (créala en hPanel → Correos si no existe) para que los correos no lleguen a spam.
4. Envía una prueba desde el formulario del sitio publicado.

## Vista previa en GitHub Pages
Cada push a `main` publica automáticamente en https://pautafoya.github.io/buenatintaWeb/ (ver `.github/workflows/pages.yml`).
Esa versión no aparece en buscadores y su formulario es de demostración: muestra la confirmación sin enviar nada, porque GitHub Pages no ejecuta PHP.

## Pendientes antes de publicar
- Testimonios reales (`TESTIMONIOS` en `src/data/contenido.js`).
- Enlaces reales de redes sociales (`REDES`).
- Texto legal del aviso de privacidad (`src/components/PrivacyModal.vue`).
- Tipografía Coolvetica: se carga desde fonts.cdnfonts.com; si tienen licencia, alojar los archivos localmente.
