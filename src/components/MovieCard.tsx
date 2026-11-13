import { Check, Plus } from 'lucide-react';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onMoreInfo: (movie: Movie) => void;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
  layout?: 'carousel' | 'grid';
}

export function MovieCard({ movie, onMoreInfo, isFavorite, onToggleFavorite, layout = 'carousel' }: MovieCardProps) {
  return (
    <article className={`group relative min-w-0 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-surface-card transition duration-300 hover:shadow-2xl ${layout === 'grid' ? 'w-full' : 'w-[78vw] max-w-72 sm:w-72 md:w-80 md:max-w-none'}`}>
      <div className="relative aspect-video overflow-hidden bg-zinc-800">
        <button type="button" aria-label={`Ver detalles de ${movie.title}`} onClick={() => onMoreInfo(movie)} className="absolute inset-0 z-10 rounded-t-2xl focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white" />
        <img src={movie.thumbnailUrl} alt={movie.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
        {movie.awardBadge && <span className="absolute left-2 top-2 rounded bg-amber-400 px-2 py-1 text-[9px] font-black tracking-wide text-black">★ {movie.awardBadge}</span>}
        <div className="absolute bottom-2 left-3 right-3 flex justify-between text-[11px] font-semibold text-gray-300 drop-shadow"><span>{movie.subtitle || movie.durationOrSeasons}</span>{movie.remainingTime && <span>{movie.remainingTime}</span>}</div>
        {movie.progressPercent !== undefined && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"><div className="h-full bg-primary" style={{ width: `${movie.progressPercent}%` }} /></div>}
      </div>
      <div className="flex items-center justify-between gap-2 p-3.5">
        <div className="min-w-0"><h3 className="truncate font-heading text-sm font-bold text-white">{movie.title}</h3><div className="flex items-center gap-2 text-[10px] text-gray-400"><span className="font-bold text-accent">{movie.matchRate}% Coincidencia</span><span>{movie.rating}</span></div></div>
        <button aria-label={isFavorite ? 'Quitar de mi lista' : 'Añadir a mi lista'} onClick={() => onToggleFavorite(movie)} className="shrink-0 rounded-full p-1.5 text-gray-300 transition hover:bg-white/10">{isFavorite ? <Check className="h-4 w-4 text-primary" /> : <Plus className="h-4 w-4" />}</button>
      </div>
    </article>
  );
}
