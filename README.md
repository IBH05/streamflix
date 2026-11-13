# StreamFlix

Plataforma de streaming cinematográfica desarrollada con React, TypeScript, Vite y Tailwind CSS.

## Funcionalidades

- Catálogo de películas y series.
- Hero principal y carruseles de contenido.
- Sección Top 10.
- Búsqueda por título (sin distinguir acentos) combinada con el filtro Todos, Películas y Series.
- Modal con detalles de cada película.
- Reproductor de tráileres con controles, volumen y pantalla completa. Solo se abre en los títulos que tienen clip; en los demás se muestra su ficha.
- Mi Lista guardada en `localStorage`, con un mensaje cuando queda vacía.

## Requisitos

- Node.js 18 o superior.
- npm.

## Ejecutar localmente

1. Clona el repositorio:

   ```bash
   git clone https://github.com/IBH05/streamflix.git
   cd streamflix
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre la dirección que indique Vite, normalmente `http://localhost:5173`.

## Crear una versión de producción

```bash
npm run build
```

Los recursos multimedia de demostración utilizan URLs externas, por lo que se necesita conexión a internet para ver todas las imágenes y videos.
