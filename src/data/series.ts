import type { SeriesSeason } from '../types/movie';

// Manually verified on 2026-11-13. Only released TV seasons; no films or specials.
// Research links and episode-numbering conventions: docs/series-catalog.md.
const counts: Record<string, number[]> = {
  dahmer: [10],
  'breaking-bad': [7, 13, 13, 13, 16],
  'stranger-things': [8, 9, 8, 9, 8],
  shogun: [10],
  arcane: [9, 9],
  'the-bear': [8, 10, 10, 10, 8],
  // Original broadcast numbering (201 episodes), not Peacock's split edits (203).
  'the-office': [6, 22, 25, 19, 28, 26, 26, 24, 25],
  'jujutsu-kaisen': [24, 23, 12],
  'nuestro-planeta': [8, 4],
};

export function seasonsForSeries(id: string): SeriesSeason[] | undefined {
  return counts[id]?.map((episodeCount, index) => ({ number: index + 1, episodeCount }));
}
