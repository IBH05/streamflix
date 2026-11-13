import { Check, Play, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { EpisodeSelection, Movie } from '../types/movie';
import { DetailsTrailer } from './DetailsTrailer';
import { SeriesEpisodes } from './SeriesEpisodes';

interface MovieDetailsModalProps { movie: Movie | null; onClose: () => void; onPlay: (movie: Movie, episode?: EpisodeSelection) => void; isFavorite: boolean; onToggleFavorite: (movie: Movie) => void; }

export function MovieDetailsModal({ movie, onClose, onPlay, isFavorite, onToggleFavorite }: MovieDetailsModalProps) {
  const [selection, setSelection] = useState<EpisodeSelection>({ season: 1, episode: 1 });
  const seasons = movie?.type === 'series' ? movie.seasons : undefined;
  useEffect(() => { setSelection({ season: movie?.seasons?.[0]?.number ?? 1, episode: 1 }); }, [movie?.id]);
  useEffect(() => {
    if (!movie) return;
    const overflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', onKeyDown); };
  }, [movie, onClose]);
  if (!movie) return null;
  return <div role="dialog" aria-modal="true" aria-label={`Detalles de ${movie.title}`} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 backdrop-blur-md animate-fade-in sm:p-4">
    <button aria-label="Cerrar" onClick={onClose} className="absolute inset-0 cursor-default" />
    <div className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#151515] shadow-2xl animate-scale-in">
      <button aria-label="Cerrar detalles" onClick={onClose} className="absolute right-4 top-4 z-20 rounded-full bg-black/70 p-2 text-white hover:bg-black"><X className="h-5 w-5" /></button>
      <div className="relative aspect-video overflow-hidden"><DetailsTrailer key={movie.id} movie={movie} /></div>
      <div className="px-4 pt-5 sm:px-6 md:px-8">
        <h2 className="mb-4 font-outfit text-2xl font-black md:text-4xl">{movie.title}</h2>
        <div className="flex gap-2">
          <button onClick={() => onPlay(movie, seasons?.length ? selection : undefined)} className="flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-bold text-black"><Play className="h-4 w-4 fill-black" />{seasons?.length ? `Reproducir T${selection.season} · E${selection.episode}` : 'Reproducir'}</button>
          <button aria-label={isFavorite ? 'Quitar de mi lista' : 'Añadir a mi lista'} onClick={() => onToggleFavorite(movie)} className={`rounded-md border px-3 ${isFavorite ? 'border-brand bg-brand/20 text-red-300' : 'border-white/30 text-white'}`}>{isFavorite ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</button>
        </div>
      </div>
      <div className="grid gap-6 p-4 sm:p-6 md:grid-cols-[1.5fr_1fr] md:p-8">
        <div><div className="mb-4 flex flex-wrap items-center gap-3 text-xs"><span className="font-bold text-emerald-400">{movie.matchRate}% Coincidencia</span><span className="text-neutral-400">{movie.year}</span><span className="rounded border border-neutral-600 px-2 py-0.5">{movie.rating}</span><span className="text-neutral-400">{movie.durationOrSeasons}</span></div><p className="text-sm leading-7 text-neutral-300">{movie.description}</p></div>
        <div className="space-y-3 border-l border-white/10 pl-5 text-xs text-neutral-300"><p><span className="text-neutral-500">Reparto: </span>{movie.cast.join(', ')}</p><p><span className="text-neutral-500">Dirección: </span>{movie.director}</p><p><span className="text-neutral-500">Géneros: </span>{movie.genres.join(', ')}</p></div>
      </div>
      {seasons && seasons.length > 0 && <SeriesEpisodes seasons={seasons} selection={selection} onChange={setSelection} />}
    </div>
  </div>;
}
