import { SearchX } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CATALOG, HERO_MOVIE } from './data/movies';
import { ContentRow } from './components/ContentRow';
import { HeroBanner } from './components/HeroBanner';
import { MovieCard } from './components/MovieCard';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { Navbar } from './components/Navbar';
import { RankedRow } from './components/RankedRow';
import { VideoPlayer } from './components/VideoPlayer';
import type { Movie } from './types/movie';

const defaultList = [HERO_MOVIE, CATALOG[0].movies[0], CATALOG[0].movies[2], CATALOG[1].movies[0]];

export function App() {
  const [videoMovie, setVideoMovie] = useState<Movie | null>(null);
  const [detailMovie, setDetailMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    try {
      const saved = localStorage.getItem('streamflix_my_list');
      return saved ? JSON.parse(saved) as Movie[] : defaultList;
    } catch {
      return defaultList;
    }
  });

  useEffect(() => {
    localStorage.setItem('streamflix_my_list', JSON.stringify(favorites));
  }, [favorites]);

  const allMovies = useMemo(() => [HERO_MOVIE, ...CATALOG.flatMap((section) => section.movies)], []);
  const topTen = useMemo(() => allMovies.slice(0, 5), [allMovies]);
  const filteredMovies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return null;
    return allMovies.filter((movie) => [movie.title, movie.description, ...movie.genres].join(' ').toLowerCase().includes(query));
  }, [allMovies, searchQuery]);

  const toggleFavorite = (movie: Movie) => {
    setFavorites((current) => current.some((item) => item.id === movie.id)
      ? current.filter((item) => item.id !== movie.id)
      : [...current, movie]);
  };
  const isFavorite = (movie: Movie | null) => Boolean(movie && favorites.some((favorite) => favorite.id === movie.id));

  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar onSearch={setSearchQuery} myListCount={favorites.length} />
      {videoMovie && <VideoPlayer movie={videoMovie} onBack={() => setVideoMovie(null)} />}

      {filteredMovies ? (
        <main className="px-6 pb-20 pt-28 md:px-12">
          <div className="mb-8 flex items-end justify-between">
            <div><p className="mb-2 text-xs font-bold uppercase tracking-[.25em] text-brand">Explora el catálogo</p><h1 className="font-outfit text-3xl font-bold">Resultados para «{searchQuery}»</h1></div>
            <span className="text-sm text-neutral-500">{filteredMovies.length} títulos</span>
          </div>
          {filteredMovies.length ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{filteredMovies.map((movie) => <MovieCard key={movie.id} movie={movie} onPlay={setVideoMovie} onMoreInfo={setDetailMovie} isFavorite={isFavorite(movie)} onToggleFavorite={toggleFavorite} />)}</div> : <div className="flex min-h-[300px] flex-col items-center justify-center text-center text-neutral-500"><SearchX className="mb-4 h-12 w-12" /><p className="font-outfit text-xl text-neutral-300">No encontramos ese título</p><p className="mt-2 text-sm">Prueba con otro nombre, género o palabra clave.</p></div>}
        </main>
      ) : (
        <>
          <HeroBanner movie={HERO_MOVIE} onPlay={setVideoMovie} onMoreInfo={setDetailMovie} isFavorite={isFavorite(HERO_MOVIE)} onToggleFavorite={toggleFavorite} />
          <main className="relative z-10 -mt-20 flex flex-col gap-10 px-4 pb-20 md:-mt-28 md:px-12">
            <ContentRow title={CATALOG[0].category} movies={CATALOG[0].movies} id="series" onPlay={setVideoMovie} onMoreInfo={setDetailMovie} favorites={favorites} onToggleFavorite={toggleFavorite} />
            <RankedRow title="Top 10 en Películas y Series" movies={topTen} onMoreInfo={setDetailMovie} />
            <ContentRow title={CATALOG[1].category} movies={CATALOG[1].movies} id="peliculas" onPlay={setVideoMovie} onMoreInfo={setDetailMovie} favorites={favorites} onToggleFavorite={toggleFavorite} />
            <ContentRow title={CATALOG[2].category} movies={CATALOG[2].movies} id="novedades" onPlay={setVideoMovie} onMoreInfo={setDetailMovie} favorites={favorites} onToggleFavorite={toggleFavorite} />
            {favorites.length > 0 && <ContentRow title={`Mi Lista (${favorites.length})`} movies={favorites} id="milista" onPlay={setVideoMovie} onMoreInfo={setDetailMovie} favorites={favorites} onToggleFavorite={toggleFavorite} />}
          </main>
        </>
      )}

      <MovieDetailsModal movie={detailMovie} onClose={() => setDetailMovie(null)} onPlay={(movie) => { setDetailMovie(null); setVideoMovie(movie); }} isFavorite={isFavorite(detailMovie)} onToggleFavorite={toggleFavorite} />
    </div>
  );
}
