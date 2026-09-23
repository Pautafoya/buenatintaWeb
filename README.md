# La Buena Tinta — sitio web

## Abrir en local
Los navegadores bloquean algunos archivos si abres `index.html` con doble clic. Usa un servidor local:

- **VS Code:** instala la extensión *Live Server*, clic derecho en `index.html` → *Open with Live Server*.
- **Terminal:** `npx serve .` o `python3 -m http.server` dentro de esta carpeta, y abre http://localhost:3000 (o :8000).

## Estructura
- `index.html` — toda la página (maquetación, estilos en línea y lógica en la clase `Component`).
- `support.js` — runtime que interpreta la página. No editar.
- `assets/` — logos, tentáculo, ondas de fondo y fotos (`assets/img/`).

## Pendientes antes de publicar
- Testimonios reales (en `QUOTES`).
- Enlaces reales de redes sociales (footer).
- Texto legal del aviso de privacidad.
- Conectar el formulario de contacto a un servicio de envío (Formspree, EmailJS, backend propio…). Ahora solo muestra la confirmación.
- Tipografía Coolvetica: se carga desde fonts.cdnfonts.com; si tienen licencia, alojar los archivos localmente.

## Vista previa en GitHub Pages
El sitio es estático, así que se publica directo desde la rama `main` (carpeta raíz).
URL: https://pautafoya.github.io/buenatintaWeb/

- `.nojekyll` evita que GitHub procese los archivos con Jekyll.
- `index.html` lleva `<meta name="robots" content="noindex, nofollow">` para que la vista previa no aparezca en buscadores. **Quitarla al publicar el sitio definitivo.**
