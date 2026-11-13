export interface SeriesSeason {
  number: number;
  episodeCount: number;
}

export interface EpisodeSelection {
  season: number;
  episode: number;
}

export interface Movie {
  id: string;
  title: string;
  subtitle?: string;
  type: 'movie' | 'series';
  description: string;
  year: number;
  rating: string;
  durationOrSeasons: string;
  seasons?: SeriesSeason[];
  matchRate: number;
  qualityBadges: string[];
  genres: string[];
  cast: string[];
  director: string;
  backdropUrl: string;
  thumbnailUrl: string;
  trailerUrl?: string;
  trailerStartSeconds?: number;
  /** Framing used only by the homepage hero trailer. Zoom 1 means no extra crop. */
  heroTrailerFraming?: {
    zoom: number;
    position: string;
    mobile?: { zoom: number; position: string };
  };
  awardBadge?: string;
  progressPercent?: number;
  remainingTime?: string;
}
