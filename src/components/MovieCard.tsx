import { Check, Info, Play, Plus } from 'lucide-react';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

export function MovieCard({ movie, onPlay, onMoreInfo, isFavorite, onToggleFavorite }: MovieCardProps) {
  return (
    <article className="group relative w-72 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-surface-card transition-all duration-300 hover:scale-105 hover:shadow-2xl md:w-80">
      <div className="relative aspect-video overflow-hidden bg-zinc-800">
        <img src={movie.thumbnailUrl} alt={movie.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
        {movie.awardBadge && <span className="absolute left-2 top-2 rounded bg-amber-400 px-2 py-1 text-[9px] font-black tracking-wide text-black">★ {movie.awardBadge}</span>}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-70 transition group-hover:opacity-100">
          <button aria-label={`Reproducir ${movie.title}`} onClick={() => onPlay(movie)} className="rounded-full bg-primary/90 p-3 text-white shadow-lg transition hover:scale-110"><Play className="h-5 w-5 fill-white" /></button>
          <button aria-label={`Ver información de ${movie.title}`} onClick={() => onMoreInfo(movie)} className="rounded-full border border-white/60 bg-black/60 p-3 text-white"><Info className="h-4 w-4" /></button>
        </div>
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
