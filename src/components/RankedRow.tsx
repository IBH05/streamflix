import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import type { Movie } from '../types/movie';

interface RankedRowProps {
  title: string;
  movies: Movie[];
  onMoreInfo: (movie: Movie) => void;
}

export function RankedRow({ title, movies, onMoreInfo }: RankedRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const scroll = (amount: number) => rowRef.current?.scrollBy({ left: amount, behavior: 'smooth' });

  return (
    <section className="group/rank-row flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <button onClick={() => rowRef.current?.scrollTo({ left: 0, behavior: 'smooth' })} className="flex items-center gap-2 text-left">
          <h2 className="font-heading text-xl font-bold tracking-tight text-white md:text-2xl">{title}</h2>
          <span className="material-symbols-outlined text-gray-400 transition-transform group-hover/rank-row:translate-x-1">chevron_right</span>
        </button>
        <div className="flex items-center gap-1">
          <button aria-label="Anterior" onClick={() => scroll(-450)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"><ChevronLeft className="h-4 w-4" /></button>
          <button aria-label="Siguiente" onClick={() => scroll(450)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div ref={rowRef} className="scrollbar-hide flex items-center gap-5 overflow-x-auto pb-4 pt-1">
        {movies.map((movie, index) => (
          <button key={movie.id} onClick={() => onMoreInfo(movie)} className="group/rank flex shrink-0 items-center text-left">
            <span className="relative z-10 -mr-7 select-none font-heading text-[110px] font-black leading-none text-transparent transition-all group-hover/rank:text-brand md:text-[130px]" style={{ WebkitTextStroke: '3px #444' }}>{index + 1}</span>
            <div className="relative aspect-[2/3] w-44 overflow-hidden rounded-2xl border border-white/10 bg-surface-card shadow-xl transition-transform duration-300 group-hover/rank:scale-105 md:w-52">
              <img src={movie.thumbnailUrl} alt={movie.title} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <span className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 font-heading text-[10px] font-extrabold uppercase text-white">Top 10</span>
              <div className="absolute bottom-3 left-3 right-3"><p className="truncate font-heading text-sm font-bold text-white">{movie.title}</p><span className="text-xs font-semibold text-accent">{movie.matchRate}% Coincidencia</span></div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
