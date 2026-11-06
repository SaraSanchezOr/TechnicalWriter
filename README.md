# Web de Sara Sánchez Ortiz

Portfolio, CV y blog. Hecha con HTML, CSS y JavaScript, sin frameworks, y publicada en GitHub Pages.

## Qué hay en cada carpeta

```
index.html            Página principal, en inglés (todas las secciones)
legal-notice.html     Aviso legal en inglés
blog/hello.html       Primer artículo del blog en inglés (sirve de plantilla)
es/                   Versión en español: index.html, aviso-legal.html y blog/hola-mundo.html
css/styles.css        Estilos. Colores y tipografías al principio, en :root
js/main.js            Menú del móvil, pestañas de ejemplos e imágenes de reserva
img/                  Tu foto y las capturas de tus proyectos
favicon.svg           Icono de la pestaña del navegador
```

## Antes de publicar: lo que tienes que completar

Busca `EDITA` en VS Code (Ctrl+Mayús+F o Cmd+Mayús+F) y verás todos los puntos. En resumen:

1. **Tu foto**: guárdala como `img/sara.jpg`, en vertical (unos 800×1000 px).
2. **Tu primer proyecto**: nombre, descripción, tu papel, tecnologías y enlace, en la sección Proyectos de `index.html`. Guarda una captura como `img/proyecto-1.jpg`.
3. **Tu titulación** de la UOC, en la sección Formación.
4. **Tu email**, en la sección Contacto (aparece dos veces en la misma línea).
5. **Las fechas de la trayectoria**: cambia «Antes» y «Mis inicios» por los años reales si quieres.
6. **El artículo del blog**: `blog/hello.html` es un borrador. Reescríbelo a tu manera.

Si falta una imagen, la web muestra un recuadro en su lugar, así que puedes publicar aunque aún no tengas todas.

## Verla en tu ordenador

1. Abre la carpeta en VS Code.
2. Instala la extensión **Live Server** (de Ritwick Dey).
3. Clic derecho en `index.html` y elige **Open with Live Server**. Cada vez que guardes, la página se recarga sola.

## Publicarla en GitHub Pages

1. En GitHub, crea un repositorio público llamado exactamente **`SaraSanchezOr.github.io`**.
2. Sube todos los archivos a la rama `main` (desde VS Code: panel de control de código fuente, *Publish to GitHub*; o con estos comandos en la terminal):

   ```bash
   git init
   git add .
   git commit -m "Primera versión de mi web"
   git branch -M main
   git remote add origin https://github.com/SaraSanchezOr/SaraSanchezOr.github.io.git
   git push -u origin main
   ```

3. En el repositorio, ve a **Settings → Pages**. En *Source* elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda.
4. En uno o dos minutos la web estará en **https://sarasanchezor.github.io**.

Para actualizarla, guarda los cambios y haz `git add .`, `git commit -m "Lo que has cambiado"` y `git push`.

### Dominio propio (opcional)

Si compras un dominio (por ejemplo, `sarasanchezortiz.com`), añádelo en **Settings → Pages → Custom domain** y sigue las instrucciones de GitHub para configurar los DNS. Después, actualiza la URL de las etiquetas `og:url` en `index.html`.

## Escribir un artículo nuevo

1. Duplica `blog/hello.html` y cámbiale el nombre (por ejemplo, `blog/lenguaje-claro.html`). Usa minúsculas y guiones, sin tildes ni espacios.
2. Cambia el `<title>`, la descripción, el `<h1>`, la fecha y el texto.
3. En `index.html`, sección Blog, añade una fila nueva arriba del todo con el enlace al artículo.

## Cambiar colores o tipografías

Todo está al principio de `css/styles.css`, en `:root`. Cada color se escribe como `light-dark(modo claro, modo oscuro)`. La web sigue el modo del sistema de quien la visita, y el botón de la cabecera permite cambiarlo a mano.
