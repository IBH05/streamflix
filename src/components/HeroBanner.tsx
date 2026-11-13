import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import styles from './HeroBanner.module.css';
import { Check, Flame, Info, Play, Plus, Volume2, VolumeX } from 'lucide-react';
import type { Movie } from '../types/movie';

interface HeroBannerProps {
  movie: Movie;
  rank: number;
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
  paused?: boolean;
  muted: boolean;
  onMutedChange: (muted: boolean) => void;
}

export function HeroBanner({
  movie,
  rank,
  onPlay,
  onMoreInfo,
  isFavorite,
  onToggleFavorite,
  paused = false,
  muted,
  onMutedChange,
}: HeroBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showFavoriteConfirmation, setShowFavoriteConfirmation] = useState(false);
  const favoriteConfirmationVisible = showFavoriteConfirmation && isFavorite;

  useEffect(() => {
    if (!showFavoriteConfirmation) return;
    const timer = window.setTimeout(() => setShowFavoriteConfirmation(false), 2200);
    return () => window.clearTimeout(timer);
  }, [showFavoriteConfirmation]);

  const toggleFavorite = () => {
    setShowFavoriteConfirmation(!isFavorite);
    onToggleFavorite(movie);
  };
  const setMuted = onMutedChange;
  const framing = movie.heroTrailerFraming;
  const trailerStyle = {
    '--hero-zoom': Math.max(1, framing?.zoom ?? 1),
    '--hero-position': framing?.position ?? '50% 50%',
    '--hero-zoom-mobile': Math.max(1, framing?.mobile?.zoom ?? framing?.zoom ?? 1),
    '--hero-position-mobile': framing?.mobile?.position ?? framing?.position ?? '50% 50%',
  } as CSSProperties;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !movie.trailerUrl) return;
    let cancelled = false;
    setPlaying(false);
    if (paused) {
      video.pause();
      return;
    }
    const timer = window.setTimeout(async () => {
      if (cancelled) return;
      try {
        await video.play();
      } catch (error) {
        if (cancelled || !(error instanceof DOMException) || error.name !== 'NotAllowedError') return;
        video.muted = true;
        setMuted(true);
        try { await video.play(); } catch { /* Keep the poster if playback is unavailable. */ }
      }
      if (cancelled) video.pause();
    }, 2000);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      video.pause();
    };
  }, [movie.trailerUrl, paused]);

  const toggleAudio = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (video.paused) void video.play().catch(() => {});
  };
  const [prefix, suffix = ''] = movie.title.split(':');
  const suffixWords = suffix.trim().split(' ');

  return (
    <section
      id="inicio"
      className="relative flex min-h-[700px] items-end overflow-hidden pb-36 pt-44 sm:min-h-[760px] md:min-h-[720px] md:pb-40 lg:min-h-[85svh]"
    >
      <div
        className="absolute inset-x-0 bottom-0 top-16 bg-cover bg-top"
        style={{
          backgroundImage: `url('${movie.backdropUrl}')`,
        }}
      />

      {movie.trailerUrl && <div className="pointer-events-none absolute inset-x-0 bottom-0 top-16 overflow-hidden" style={trailerStyle}><video
        key={movie.trailerUrl}
        ref={videoRef}
        src={`${encodeURI(movie.trailerUrl)}#t=${movie.trailerStartSeconds ?? 0}`}
        muted={muted}
        playsInline
        preload="metadata"
        aria-hidden="true"
        onLoadedMetadata={(event) => { event.currentTarget.currentTime = movie.trailerStartSeconds ?? 0; }}
        onPlaying={() => setPlaying(true)}
        onEnded={() => setPlaying(false)}
        onError={() => setPlaying(false)}
        className={`${styles.trailer} h-full w-full transition-opacity duration-1000 ${playing ? 'opacity-100' : 'opacity-0'}`}
      /></div>}

      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t transition-opacity duration-1000 ${playing ? 'from-surface via-transparent to-transparent' : 'from-surface via-surface/60 to-transparent'}`} />

      <div className={`pointer-events-none absolute inset-0 w-full bg-gradient-to-r transition-opacity duration-1000 md:w-3/4 ${playing ? 'from-surface/80 via-surface/30 to-transparent' : 'from-surface via-surface/75 to-transparent'}`} />

      {movie.trailerUrl && <button
        type="button"
        onClick={toggleAudio}
        aria-label={muted ? 'Activar audio del tráiler' : 'Silenciar tráiler'}
        aria-pressed={muted}
        title={muted ? 'Activar audio del tráiler' : 'Silenciar tráiler'}
        className="absolute right-4 top-24 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:right-12"
      >{muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}</button>}

      <div className="relative z-10 flex max-w-4xl flex-col gap-4 px-4 md:px-12">
        {rank > 0 && <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-lg">
            <Flame size={14} aria-hidden="true" />
            Top 10 hoy
          </span>

          <span className="text-sm font-semibold text-gray-200">
            #{rank} en Tendencias de Películas y Series
          </span>
        </div>}

        <h1 className="break-words font-heading text-3xl font-black uppercase leading-tight tracking-tight text-white drop-shadow-xl sm:text-5xl lg:text-7xl">
          {prefix}{suffix ? ':' : ''}
          {suffix && <br />}

          <span className="text-primary">
            {suffixWords[0]}
          </span>

          {suffixWords.slice(1).length
            ? ` ${suffixWords.slice(1).join(' ')}`
            : ''}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-300 md:text-sm">
          <span className="font-bold text-accent">
            {movie.matchRate}% de Coincidencia
          </span>

          <span className="rounded-md bg-white/10 px-2 py-0.5 text-white">
            {movie.year}
          </span>

          <span className="rounded-md bg-white/10 px-2 py-0.5 text-white">
            {movie.rating}
          </span>

          <span>{movie.durationOrSeasons}</span>

          {movie.qualityBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[11px] text-white"
            >
              {badge}
            </span>
          ))}
        </div>

        <p className="line-clamp-3 max-w-2xl text-sm font-medium leading-relaxed text-gray-200/90 drop-shadow sm:text-base">
          {movie.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => onPlay(movie)}
            className="flex min-h-12 items-center gap-2 rounded-full bg-white px-5 py-3 font-heading text-sm font-extrabold text-black shadow-[0_8px_25px_rgba(255,255,255,0.25)] transition hover:bg-gray-200 sm:px-8 sm:text-base"
          >
            <Play size={22} className="shrink-0 fill-current" aria-hidden="true" />
            Reproducir
          </button>

          <button
            onClick={() => onMoreInfo(movie)}
            className="flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-3 font-heading text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/25 sm:px-6 sm:text-base"
          >
            <Info size={21} className="shrink-0" aria-hidden="true" />
            Más información
          </button>

          <button
            type="button"
            aria-label={isFavorite ? 'Quitar de mi lista' : 'Añadir a mi lista'}
            aria-pressed={isFavorite}
            onClick={toggleFavorite}
            className={`${styles.favoriteButton} ${favoriteConfirmationVisible ? styles.favoriteExpanded : ''} flex h-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white backdrop-blur-md hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
              isFavorite
                ? 'border-primary bg-primary'
                : 'bg-white/15 hover:bg-white/25'
            }`}
          >
            {isFavorite ? <Check size={22} className="shrink-0" aria-hidden="true" /> : <Plus size={22} className="shrink-0" aria-hidden="true" />}
            <span aria-hidden="true" className={styles.favoriteLabel}>Añadido a mi lista</span>
          </button>
          <span role="status" className="sr-only">{favoriteConfirmationVisible ? 'Añadido a mi lista' : ''}</span>
        </div>

      </div>
        <div className="absolute left-4 top-24 z-10 flex max-w-[calc(100%-6rem)] items-center gap-2 text-left text-xs text-gray-400 md:left-12">
          <Volume2 size={17} className="shrink-0" aria-hidden="true" />
          Incluye audio y subtítulos en español
        </div>
    </section>
  );
}
