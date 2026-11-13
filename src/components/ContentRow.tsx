import { useId } from 'react';
import type { Movie } from '../types/movie';
import { useCarousel } from '../hooks/useCarousel';
import { CarouselControls } from './CarouselControls';
import { MovieCard } from './MovieCard';

interface ContentRowProps { title: string; movies: Movie[]; onMoreInfo: (movie: Movie) => void; favorites: Movie[]; onToggleFavorite: (movie: Movie) => void; id?: string; }

export function ContentRow({ title, movies, onMoreInfo, favorites, onToggleFavorite, id }: ContentRowProps) {
  const rowId = useId();
  const { rowRef, canPrevious, canNext, scroll } = useCarousel(movies.length);
  if (!movies.length) return null;

  return <section id={id} aria-label={title} className="min-w-0">
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="min-w-0 font-outfit text-lg font-bold text-white md:text-xl">{title}</h2>
      <CarouselControls title={title} controls={rowId} canPrevious={canPrevious} canNext={canNext} onScroll={scroll} />
    </div>
    <div id={rowId} ref={rowRef} role="group" aria-label={`Carrusel de ${title}`} tabIndex={0} className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain rounded-xl pb-3 pt-1 focus-visible:outline focus-visible:outline-white md:gap-4">
      {movies.map((movie) => <MovieCard key={movie.id} movie={movie} onMoreInfo={onMoreInfo} isFavorite={favorites.some((favorite) => favorite.id === movie.id)} onToggleFavorite={onToggleFavorite} />)}
    </div>
  </section>;
}
