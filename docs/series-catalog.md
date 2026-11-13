# Temporadas y episodios del catálogo

Consulta manual: 13 de noviembre de 2026. La aplicación no realiza llamadas a APIs.
Los números alimentan `src/data/series.ts` y solo incluyen temporadas estrenadas,
sin películas, recopilaciones, especiales ni temporadas anunciadas.

| Serie | Episodios por temporada (T1 en adelante) | Total | Fuente |
| --- | --- | --- | --- |
| DAHMER: La historia de Jeffrey Dahmer | 10 | 10 | [Netflix](https://www.netflix.com/tudum/dahmer-monster-the-jeffrey-dahmer-story) |
| Breaking Bad | 7, 13, 13, 13, 16 | 62 | [JustWatch](https://www.justwatch.com/us/tv-show/breaking-bad) |
| Stranger Things | 8, 9, 8, 9, 8 | 42 | [JustWatch](https://www.justwatch.com/us/tv-show/stranger-things) |
| Shōgun (2024) | 10 | 10 | [FX](https://www.fxnetworks.com/shows/shogun/viewers-guide), [JustWatch](https://www.justwatch.com/us/tv-show/shogun-2024) |
| Arcane | 9, 9 | 18 | [JustWatch](https://www.justwatch.com/us/tv-show/arcane) |
| The Bear | 8, 10, 10, 10, 8 | 46 | [JustWatch](https://www.justwatch.com/us/tv-show/the-bear), [FX/ABC](https://abc.com/show/2219d346-948e-4ea3-98f0-2aca9d4a4ec7/season/3) |
| The Office (EE. UU., 2005) | 6, 22, 25, 19, 28, 26, 26, 24, 25 | 201 | [Lista de episodios y emisión original](https://en.wikipedia.org/wiki/List_of_The_Office_(American_TV_series)_episodes) |
| Jujutsu Kaisen | 24, 23, 12 | 59 | [JustWatch T3](https://www.justwatch.com/us/tv-show/jujutsu-kaisen/season-3), [anuncio oficial del final de T3, episodio 12](https://jujutsukaisen.jp/news/20260319_04.php) |
| Nuestro planeta | 8, 4 | 12 | [JustWatch](https://www.justwatch.com/us/tv-show/our-planet) |

## Criterios

- DAHMER representa únicamente la historia de Jeffrey Dahmer. Las otras historias
  de la antología Monster no son temporadas adicionales de este título.
- The Office usa el recuento original de 201 episodios. Los catálogos pueden
  combinar o dividir capítulos largos; Peacock, por ejemplo, anuncia 203.
- Shōgun incluye su primera temporada estrenada; las temporadas anunciadas no
  se muestran como episodios disponibles.
- Jujutsu Kaisen incluye hasta la temporada 3 (Culling Game, parte 1). La parte 2
  anunciada no se incluye como temporada estrenada aunque haya fichas preliminares.
- El selector único agrupa los episodios por temporada, sin inventar nombres de capítulos.
  Reproducir una selección abre el tráiler existente con un aviso de simulación.

## Tráiler de Batman

Por petición del usuario, el archivo libre `batmanRises4` se asignó a
`batman-el-caballero-de-la-noche`. El archivo es el tráiler 4 de *El caballero
de la noche asciende*, no el tráiler de la película de 2008. Se conserva su nombre
original para que esta asignación de demostración sea explícita y reemplazable.
