export interface Movie {
  id: string;
  title: string;
  subtitle?: string;
  type: 'movie' | 'series';
  description: string;
  year: number;
  rating: string;
  durationOrSeasons: string;
  matchRate: number;
  qualityBadges: string[];
  genres: string[];
  cast: string[];
  director: string;
  backdropUrl: string;
  thumbnailUrl: string;
  /** Ruta opcional del tráiler (por ejemplo `/trailers/coco.mp4`). Sin ruta, el título no tiene clip. */
  videoUrl?: string;
  topBadge?: string;
  awardBadge?: string;
  progressPercent?: number;
  remainingTime?: string;
}

export type MovieTypeFilter = 'all' | Movie['type'];

/** Indica si el título tiene un tráiler que se pueda reproducir. */
export function hasTrailer(movie: Movie | null | undefined): movie is Movie & { videoUrl: string } {
  return Boolean(movie?.videoUrl && movie.videoUrl.trim() !== '');
}
