# StreamFlix

**Versión 1.0.0** · Catálogo de demostración adaptable a móvil, tablet y escritorio.

Catálogo interactivo de 20 películas y series, desarrollado con Next.js, React,
TypeScript y Tailwind CSS. Primera versión de demostración: la reproducción utiliza
tráilers locales, también al seleccionar episodios.

## Funcionalidades

- Portadas destacadas y carruseles con navegación táctil, teclado y flechas.
- Menú adaptable a móvil y tablet, búsqueda por icono y acceso a la cuenta.
- Búsqueda por título, descripción y género.
- Fichas con sinopsis, reparto y vista previa del tráiler.
- Un selector de episodios agrupados por temporada para las nueve series.
- Reproductor con volumen, progreso y pantalla completa.
- Mi Lista y perfiles Adulto y Kids guardados en el navegador.
- PIN parental para volver al perfil Adulto.

Los recuentos de temporadas y episodios se mantienen manualmente, sin APIs.
Consulta las [fuentes y convenciones del catálogo](docs/series-catalog.md).

## Desarrollo

Requiere Node.js 20.9 o superior y npm.

```bash
git clone https://github.com/IBH05/streamflix.git
cd streamflix
npm ci
npm run dev
```

Abre `http://localhost:3000`.

No necesitas claves de API ni variables de entorno para esta versión.

## Comandos

| Comando | Uso |
| --- | --- |
| `npm run dev` | Desarrollo local con recarga automática |
| `npm run typecheck` | Comprobar tipos de TypeScript |
| `npm run build` | Crear la compilación de producción |
| `npm start` | Ejecutar la compilación de producción |
| `npm run preview` | Alternativa a `npm start` |

## Producción

```bash
npm run typecheck
npm run build
npm start
```

El despliegue requiere un servidor de Node.js o una plataforma compatible con
Next.js. `npm run preview` también inicia la compilación de producción existente.

## Estructura

```text
src/
  app/           Rutas, metadatos y documento HTML
  components/    Interfaz y reproductor
  data/          Catálogo, temporadas, ranking y tráilers
  hooks/         Comportamiento compartido de carruseles
  types/         Tipos de películas y episodios
public/
  imagenes/      Portadas del catálogo
  trailers/      Videos de demostración
docs/            Fuentes del catálogo
```

Las imágenes y los tráilers se sirven desde `public/`; las tipografías se cargan
desde Google Fonts con fuentes del sistema como alternativa. Los iconos se incluyen
en la aplicación.

Los favoritos, el perfil y el hash del PIN se guardan en `localStorage`. El PIN
requiere localhost o HTTPS. El control parental es local y puede eludirse modificando
o borrando el almacenamiento; no sustituye la validación de acceso en un servidor.

Las dependencias, compilaciones, archivos temporales y configuraciones locales
están excluidos mediante `.gitignore`.

## Primera versión

La interfaz se verificó en anchos de 320 a 1440 píxeles, con navegación táctil,
orientación horizontal, selección de episodios y control parental. Las herramientas
temporales de prueba se retiraron de la entrega. Se conservan las comprobaciones
de tipos y la compilación de producción.

Consulta el [historial de cambios](CHANGELOG.md).
