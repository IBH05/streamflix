import { useId } from 'react';
import type { Movie } from '../types/movie';
import { useCarousel } from '../hooks/useCarousel';
import { CarouselControls } from './CarouselControls';

interface RankedRowProps {
  title: string;
  movies: Movie[];
  onMoreInfo: (movie: Movie) => void;
}

export function RankedRow({ title, movies, onMoreInfo }: RankedRowProps) {
  const rowId = useId();
  const { rowRef, canPrevious, canNext, scroll } = useCarousel(movies.length);

  return (
    <section aria-label={title} className="flex min-w-0 flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="min-w-0 font-heading text-lg font-bold tracking-tight text-white md:text-2xl">{title}</h2>
        <CarouselControls title={title} controls={rowId} canPrevious={canPrevious} canNext={canNext} onScroll={scroll} />
      </div>

      <div id={rowId} ref={rowRef} role="group" aria-label={`Carrusel de ${title}`} tabIndex={0} className="scrollbar-hide flex snap-x snap-mandatory items-center gap-4 overflow-x-auto overscroll-x-contain rounded-xl pb-4 pt-1 focus-visible:outline focus-visible:outline-white">
        {movies.map((movie, index) => (
          <button key={movie.id} onClick={() => onMoreInfo(movie)} className="group/rank flex shrink-0 snap-start items-center text-left">
            <span className="relative z-10 -mr-7 select-none font-heading text-[110px] font-black leading-none text-transparent transition-all group-hover/rank:text-brand md:text-[130px]" style={{ WebkitTextStroke: '3px #444' }}>{index + 1}</span>
            <div className="relative aspect-[2/3] w-36 overflow-hidden rounded-2xl border border-white/10 bg-surface-card shadow-xl transition-transform duration-300 sm:w-44 md:w-52">
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
