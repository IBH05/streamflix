import { CATALOG, HERO_MOVIE } from './movies';

const titles = [HERO_MOVIE, ...CATALOG.flatMap((section) => section.movies)];
const rankedIds = [
  'star-wars-episodio-3',
  'dahmer',
  'spider-man-un-nuevo-dia',
  'batman-inicia',
  'batman-el-caballero-de-la-noche',
  'batman-el-caballero-de-la-noche-asciende',
  'breaking-bad',
  'stranger-things',
  'arcane',
  'mad-max-furia-en-el-camino',
];

export const TOP_TEN = rankedIds.map((id) => {
  const movie = titles.find((item) => item.id === id);
  if (!movie) throw new Error(`Missing ranked title: ${id}`);
  return movie;
});
