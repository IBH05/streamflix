'use client';

import { SearchX } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CATALOG, HERO_MOVIE } from './data/movies';
import { TOP_TEN } from './data/ranking';
import { ContentRow } from './components/ContentRow';
import { HeroCarousel } from './components/HeroCarousel';
import { MovieCard } from './components/MovieCard';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { Navbar } from './components/Navbar';
import { RankedRow } from './components/RankedRow';
import { VideoPlayer } from './components/VideoPlayer';
import type { EpisodeSelection, Movie } from './types/movie';
import { canWatch, PROFILE_KEY, type Profile } from './data/profiles';

const defaultList = [HERO_MOVIE, CATALOG[0].movies[0], CATALOG[0].movies[2], CATALOG[1].movies[0]];

export function App() {
  const [videoMovie, setVideoMovie] = useState<Movie | null>(null);
  const [videoEpisode, setVideoEpisode] = useState<EpisodeSelection | undefined>();
  const [detailMovie, setDetailMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Movie[]>(defaultList);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [profile, setProfile] = useState<Profile>('adult');
  const [kidsFavorites, setKidsFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    try {
      setProfile(localStorage.getItem(PROFILE_KEY) === 'kids' ? 'kids' : 'adult');
      const saved = localStorage.getItem('streamflix_my_list');
      const parsed: unknown = saved ? JSON.parse(saved) : null;
      if (Array.isArray(parsed) && parsed.every((movie) => movie && typeof movie.id === 'string')) {
        setFavorites(parsed.flatMap((item) => allMovies.find((movie) => movie.id === item.id) ?? []));
      }
    } catch {}
    try {
      const saved: unknown = JSON.parse(localStorage.getItem('streamflix_kids_list') || '[]');
      if (Array.isArray(saved)) setKidsFavorites(allMovies.filter((movie) => canWatch(movie, 'kids') && saved.some((item) => item?.id === movie.id)));
    } catch {}
    setFavoritesLoaded(true);
  }, []);

  useEffect(() => {
    if (!favoritesLoaded) return;
    try {
      localStorage.setItem('streamflix_my_list', JSON.stringify(favorites));
    } catch {}
  }, [favorites, favoritesLoaded]);

  useEffect(() => {
    if (!favoritesLoaded) return;
    try { localStorage.setItem('streamflix_kids_list', JSON.stringify(kidsFavorites)); } catch {}
  }, [kidsFavorites, favoritesLoaded]);

  const allMovies = useMemo(() => [HERO_MOVIE, ...CATALOG.flatMap((section) => section.movies)], []);
  const visibleMovies = allMovies.filter((movie) => canWatch(movie, profile));
  // Los datos guardados no pueden cambiar qué títulos permite Kids.
  const activeFavorites = profile === 'kids' ? visibleMovies.filter((movie) => kidsFavorites.some((item) => item.id === movie.id)) : favorites;
  const sections = CATALOG.map((section) => ({ ...section, movies: section.movies.filter((movie) => canWatch(movie, profile)) }));
  const ranking = TOP_TEN.filter((movie) => canWatch(movie, profile));
  const filteredMovies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return null;
    return allMovies.filter((movie) => canWatch(movie, profile) && [movie.title, movie.description, ...movie.genres].join(' ').toLowerCase().includes(query));
  }, [allMovies, searchQuery, profile]);
  const changeProfile = (next: Profile) => {
    try { localStorage.setItem(PROFILE_KEY, next); } catch { return false; }
    setVideoMovie(null); setDetailMovie(null); setSearchQuery(''); setProfile(next);
    window.scrollTo({ top: 0 });
    return true;
  };
  const playMovie = (movie: Movie, episode?: EpisodeSelection) => { if (canWatch(movie, profile)) { setVideoEpisode(episode); setVideoMovie(movie); } };
  const showDetails = (movie: Movie) => { if (canWatch(movie, profile)) setDetailMovie(movie); };
  const toggleFavorite = (movie: Movie) => {
    if (!canWatch(movie, profile)) return;
    const update = profile === 'kids' ? setKidsFavorites : setFavorites;
    update((current) => current.some((item) => item.id === movie.id)
      ? current.filter((item) => item.id !== movie.id)
      : [...current, movie]);
  };
  const isFavorite = (movie: Movie | null) => Boolean(movie && activeFavorites.some((favorite) => favorite.id === movie.id));
  if (!favoritesLoaded) return <div role="status" className="flex min-h-screen items-center justify-center bg-ink text-white">Cargando perfil…</div>;
  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar key={profile} onSearch={setSearchQuery} myListCount={activeFavorites.length} profile={profile} onProfileChange={changeProfile} />
      {videoMovie && canWatch(videoMovie, profile) && <VideoPlayer key={videoMovie.id} movie={videoMovie} episode={videoEpisode} onBack={() => setVideoMovie(null)} />}
      {filteredMovies ? (
        <main className="px-4 pb-20 pt-40 md:px-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0"><p className="mb-2 text-xs font-bold uppercase tracking-[.25em] text-brand">Explora el catálogo</p><h1 className="break-words font-outfit text-2xl font-bold sm:text-3xl">Resultados para «{searchQuery}»</h1></div>
            <span className="shrink-0 text-sm text-neutral-500">{filteredMovies.length} títulos</span>
          </div>
          {filteredMovies.length ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{filteredMovies.map((movie) => <MovieCard key={movie.id} layout="grid" movie={movie} onMoreInfo={showDetails} isFavorite={isFavorite(movie)} onToggleFavorite={toggleFavorite} />)}</div> : <div className="flex min-h-[300px] flex-col items-center justify-center text-center text-neutral-500"><SearchX className="mb-4 h-12 w-12" /><p className="font-outfit text-xl text-neutral-300">No encontramos ese título</p><p className="mt-2 text-sm">Prueba con otro nombre, género o palabra clave.</p></div>}
        </main>
      ) : (
        <>
          <HeroCarousel key={profile} movies={profile === 'kids' ? visibleMovies : undefined} paused={Boolean(videoMovie || detailMovie)} favorites={activeFavorites} onPlay={playMovie} onMoreInfo={showDetails} onToggleFavorite={toggleFavorite} />
          <main className="relative z-10 -mt-8 flex min-w-0 flex-col gap-8 px-4 pb-20 md:-mt-12 md:gap-10 md:px-12">
            {sections[0].movies.length > 0 && <ContentRow title={sections[0].category} movies={sections[0].movies} id="colecciones" onMoreInfo={showDetails} favorites={activeFavorites} onToggleFavorite={toggleFavorite} />}
            {ranking.length > 0 && <RankedRow title="Top 10 en Películas y Series" movies={ranking} onMoreInfo={showDetails} />}
            {sections[1].movies.length > 0 && <ContentRow title={sections[1].category} movies={sections[1].movies} id="peliculas" onMoreInfo={showDetails} favorites={activeFavorites} onToggleFavorite={toggleFavorite} />}
            {sections[2].movies.length > 0 && <ContentRow title={sections[2].category} movies={sections[2].movies} id="series" onMoreInfo={showDetails} favorites={activeFavorites} onToggleFavorite={toggleFavorite} />}
            {activeFavorites.length > 0 ? <ContentRow title={`Mi Lista (${activeFavorites.length})`} movies={activeFavorites} id="milista" onMoreInfo={showDetails} favorites={activeFavorites} onToggleFavorite={toggleFavorite} /> : <section id="milista" className="rounded-xl border border-white/10 p-6"><h2 className="font-heading text-lg font-bold">Mi Lista</h2><p className="mt-2 text-sm text-neutral-400">Añade tus favoritos para encontrarlos aquí.</p></section>}
          </main>
        </>
      )}
      <MovieDetailsModal movie={detailMovie && canWatch(detailMovie, profile) ? detailMovie : null} onClose={() => setDetailMovie(null)} onPlay={(movie, episode) => { setDetailMovie(null); playMovie(movie, episode); }} isFavorite={isFavorite(detailMovie)} onToggleFavorite={toggleFavorite} />
    </div>
  );
}
