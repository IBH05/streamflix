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
  videoUrl: string;
  topBadge?: string;
  awardBadge?: string;
  progressPercent?: number;
  remainingTime?: string;
}
