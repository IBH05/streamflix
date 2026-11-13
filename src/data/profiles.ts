import type { Movie } from '../types/movie';

export type Profile = 'adult' | 'kids';

// Unknown and pending ratings are excluded rather than assumed to be suitable.
const kidsRatings = new Set(['G', 'PG', 'TV-Y', 'TV-Y7', 'TV-G', 'TV-PG', 'TP', 'A', 'AA']);
export const canWatch = (movie: Movie, profile: Profile) => profile === 'adult' || kidsRatings.has(movie.rating.trim().toUpperCase());

export const PROFILE_KEY = 'streamflix_profile';
export const PIN_KEY = 'streamflix_parent_pin';

export async function hashPin(pin: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`streamflix-parent:${pin}`));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}
