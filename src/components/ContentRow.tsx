import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import type { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface ContentRowProps { title: string; movies: Movie[]; onPlay: (movie: Movie) => void; onMoreInfo: (movie: Movie) => void; favorites: Movie[]; onToggleFavorite: (movie: Movie) => void; id?: string; }

export function ContentRow({ title, movies, onPlay, onMoreInfo, favorites, onToggleFavorite, id }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  if (!movies.length) return null;
  const scroll = (amount: number) => rowRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  return <section id={id} className="group/row relative py-5 md:py-7"><div className="mb-3 flex items-end justify-between px-6 md:px-12"><h2 className="font-outfit text-lg font-bold tracking-wide text-white md:text-xl">{title}</h2><span className="mr-6 text-xs font-semibold text-neutral-500 transition group-hover/row:text-neutral-300 md:mr-12">Ver todo</span></div><button aria-label="Anterior" onClick={() => scroll(-500)} className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/80 p-2.5 text-white opacity-0 shadow-xl transition group-hover/row:opacity-100 md:block"><ChevronLeft className="h-6 w-6" /></button><div ref={rowRef} className="scrollbar-hide flex gap-4 overflow-x-auto px-6 pb-2 md:px-12">{movies.map((movie) => <MovieCard key={movie.id} movie={movie} onPlay={onPlay} onMoreInfo={onMoreInfo} isFavorite={favorites.some((favorite) => favorite.id === movie.id)} onToggleFavorite={onToggleFavorite} />)}</div><button aria-label="Siguiente" onClick={() => scroll(500)} className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/80 p-2.5 text-white opacity-0 shadow-xl transition group-hover/row:opacity-100 md:block"><ChevronRight className="h-6 w-6" /></button></section>;
}
