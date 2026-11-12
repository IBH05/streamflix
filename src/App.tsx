import { Heart, SearchX } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CATALOG, HERO_MOVIE } from './data/movies';
import { ContentRow } from './components/ContentRow';
import { HeroBanner } from './components/HeroBanner';
import { MovieCard } from './components/MovieCard';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { Navbar } from './components/Navbar';
import { RankedRow } from './components/RankedRow';
import { VideoPlayer } from './components/VideoPlayer';
import { hasTrailer, type Movie, type MovieTypeFilter } from './types/movie';

const FAVORITES_KEY = 'streamflix_my_list';

const TYPE_LABELS: Record<MovieTypeFilter, string> = {
  all: 'Todos',
  movie: 'Películas',
  series: 'Series',
};

/** Quita acentos y mayúsculas para que «shogun» encuentre «Shōgun». */
const normalize = (text: string) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

/**
 * Lee Mi Lista desde localStorage. Acepta el formato nuevo (lista de ids)
 * y el anterior (lista de objetos Movie) para no perder favoritos guardados.
 */
function loadFavoriteIds(): string[] {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (!saved) return [];
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    const ids = parsed.map((item) =>
      typeof item === 'string' ? item : (item as { id?: unknown } | null)?.id
    );
    return [...new Set(ids.filter((id): id is string => typeof id === 'string'))];
  } catch {
    return [];
  }
}

export function App() {
  const [videoMovie, setVideoMovie] = useState<Movie | null>(null);
  const [detailMovie, setDetailMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<MovieTypeFilter>('all');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(loadFavoriteIds);
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  const allMovies = useMemo(() => [HERO_MOVIE, ...CATALOG.flatMap((section) => section.movies)], []);
  const moviesById = useMemo(() => new Map(allMovies.map((movie) => [movie.id, movie])), [allMovies]);
  const topTen = useMemo(() => allMovies.slice(0, 5), [allMovies]);

  // Los favoritos se guardan por id y se leen siempre del catálogo actual.
  const favorites = useMemo(
    () => favoriteIds.map((id) => moviesById.get(id)).filter((movie): movie is Movie => Boolean(movie)),
    [favoriteIds, moviesById]
  );

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
    } catch {
      // Sin acceso a localStorage (modo privado): Mi Lista funciona solo en esta sesión.
    }
  }, [favoriteIds]);

  // Búsqueda por título combinada con el filtro por tipo.
  const isBrowsing = searchQuery.trim() !== '' || typeFilter !== 'all';
  const filteredMovies = useMemo(() => {
    const query = normalize(searchQuery);
    return allMovies.filter(
      (movie) =>
        (typeFilter === 'all' || movie.type === typeFilter) &&
        normalize(movie.title).includes(query)
    );
  }, [allMovies, searchQuery, typeFilter]);

  // Desplaza a la sección pedida después de volver a la vista de inicio.
  useEffect(() => {
    if (!pendingScroll || isBrowsing) return;
    document.getElementById(pendingScroll)?.scrollIntoView({ behavior: 'smooth' });
    setPendingScroll(null);
  }, [pendingScroll, isBrowsing]);

  const toggleFavorite = (movie: Movie) => {
    setFavoriteIds((current) =>
      current.includes(movie.id) ? current.filter((id) => id !== movie.id) : [...current, movie.id]
    );
  };
  const isFavorite = (movie: Movie | null) => Boolean(movie && favoriteIds.includes(movie.id));

  // Solo abre el reproductor si el título tiene tráiler; si no, muestra su ficha.
  const playTrailer = (movie: Movie) => {
    if (hasTrailer(movie)) {
      setDetailMovie(null);
      setVideoMovie(movie);
    } else {
      setDetailMovie(movie);
    }
  };

  const navigateTo = (sectionId: string) => {
    setSearchQuery('');
    setTypeFilter('all');
    setPendingScroll(sectionId);
  };

  const resultsTitle = searchQuery.trim()
    ? `Resultados para «${searchQuery.trim()}»`
    : TYPE_LABELS[typeFilter];

  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        onNavigate={navigateTo}
        myListCount={favorites.length}
      />
      {hasTrailer(videoMovie) && <VideoPlayer movie={videoMovie} onBack={() => setVideoMovie(null)} />}

      {isBrowsing ? (
        <main className="px-6 pb-20 pt-28 md:px-12">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[.25em] text-brand">
                Explora el catálogo{typeFilter !== 'all' && searchQuery.trim() ? ` · ${TYPE_LABELS[typeFilter]}` : ''}
              </p>
              <h1 className="font-outfit text-3xl font-bold">{resultsTitle}</h1>
            </div>
            <span className="text-sm text-neutral-500">{filteredMovies.length} títulos</span>
          </div>
          {filteredMovies.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onPlay={playTrailer} onMoreInfo={setDetailMovie} isFavorite={isFavorite(movie)} onToggleFavorite={toggleFavorite} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center text-neutral-500">
              <SearchX className="mb-4 h-12 w-12" />
              <p className="font-outfit text-xl text-neutral-300">No encontramos ese título</p>
              <p className="mt-2 text-sm">
                Prueba con otro nombre{typeFilter !== 'all' ? ' o cambia el filtro a «Todos»' : ''}.
              </p>
            </div>
          )}
        </main>
      ) : (
        <>
          <HeroBanner movie={HERO_MOVIE} onPlay={playTrailer} onMoreInfo={setDetailMovie} isFavorite={isFavorite(HERO_MOVIE)} onToggleFavorite={toggleFavorite} />
          <main className="relative z-10 -mt-20 flex flex-col gap-10 px-4 pb-20 md:-mt-28 md:px-12">
            <ContentRow title={CATALOG[0].category} movies={CATALOG[0].movies} id="batman" onPlay={playTrailer} onMoreInfo={setDetailMovie} favorites={favorites} onToggleFavorite={toggleFavorite} />
            <RankedRow title="Top 10 en Películas y Series" movies={topTen} onMoreInfo={setDetailMovie} />
            <ContentRow title={CATALOG[1].category} movies={CATALOG[1].movies} id="peliculas" onPlay={playTrailer} onMoreInfo={setDetailMovie} favorites={favorites} onToggleFavorite={toggleFavorite} />
            <ContentRow title={CATALOG[2].category} movies={CATALOG[2].movies} id="series" onPlay={playTrailer} onMoreInfo={setDetailMovie} favorites={favorites} onToggleFavorite={toggleFavorite} />
            {favorites.length > 0 ? (
              <ContentRow title={`Mi Lista (${favorites.length})`} movies={favorites} id="milista" onPlay={playTrailer} onMoreInfo={setDetailMovie} favorites={favorites} onToggleFavorite={toggleFavorite} />
            ) : (
              <section id="milista" className="py-5 md:py-7">
                <h2 className="mb-3 px-6 font-outfit text-lg font-bold tracking-wide text-white md:px-12 md:text-xl">Mi Lista</h2>
                <div className="mx-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 px-6 py-10 text-center text-neutral-400 md:mx-12">
                  <Heart className="mb-3 h-10 w-10" />
                  <p className="font-outfit text-lg text-neutral-200">Tu lista está vacía</p>
                  <p className="mt-1 text-sm">Usa el botón + en cualquier título para guardarlo aquí.</p>
                </div>
              </section>
            )}
          </main>
        </>
      )}

      <MovieDetailsModal movie={detailMovie} onClose={() => setDetailMovie(null)} onPlay={playTrailer} isFavorite={isFavorite(detailMovie)} onToggleFavorite={toggleFavorite} />
    </div>
  );
}
