import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_MOVIE, CATALOG } from '../data/movies';
import { trailer, trailerForMovie } from '../data/trailers';
import { TOP_TEN } from '../data/ranking';
import type { Movie } from '../types/movie';
import { HeroBanner } from './HeroBanner';

const catalog = CATALOG.flatMap((section) => section.movies);
const slides: Movie[] = [
  { ...HERO_MOVIE, ...trailer('starWars') },
  { ...catalog.find((movie) => movie.id === 'dahmer')!, ...trailer('dahmer') },
  { ...catalog.find((movie) => movie.id === 'spider-man-un-nuevo-dia')!, ...trailer('spiderMan') },
];

interface Props {
  paused: boolean;
  movies?: Movie[];
  favorites: Movie[];
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  onToggleFavorite: (movie: Movie) => void;
}

export function HeroCarousel({ paused, favorites, movies = slides, ...actions }: Props) {
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const move = (direction: number) => setIndex((current) => (current + direction + movies.length) % movies.length);
  useEffect(() => {
    if (paused || movies.length < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % movies.length), 34000);
    return () => window.clearTimeout(timer);
  }, [index, paused, movies.length]);
  const selectedMovie = movies[index % movies.length];
  if (!selectedMovie) return null;
  const movie = { ...selectedMovie, ...trailerForMovie(selectedMovie.id) };
  return <div className="relative" role="region" aria-roledescription="carrusel" aria-label="Títulos destacados">
    <HeroBanner key={movie.id} movie={movie} rank={TOP_TEN.findIndex((item) => item.id === movie.id) + 1} paused={paused} muted={muted} onMutedChange={setMuted} isFavorite={favorites.some((item) => item.id === movie.id)} {...actions} />
    <div className="absolute bottom-14 right-4 z-20 flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full border border-white/20 bg-black/40 px-2 py-1 backdrop-blur-md md:bottom-20 md:right-12">
      <button type="button" aria-label="Portada anterior" onClick={() => move(-1)} className="rounded-full p-2 hover:bg-white/20"><ChevronLeft size={20} /></button>
      {movies.map((slide, slideIndex) => <button key={slide.id} type="button" aria-label={`Mostrar ${slide.title}`} aria-current={index === slideIndex ? 'true' : undefined} onClick={() => setIndex(slideIndex)} className={`h-3 rounded-full transition-all ${index === slideIndex ? 'w-8 bg-primary' : 'w-3 bg-white/50 hover:bg-white'}`} />)}
      <button type="button" aria-label="Portada siguiente" onClick={() => move(1)} className="rounded-full p-2 hover:bg-white/20"><ChevronRight size={20} /></button>
    </div>
  </div>;
}
