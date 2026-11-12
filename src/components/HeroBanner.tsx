import type { Movie } from '../types/movie';

interface HeroBannerProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

export function HeroBanner({
  movie,
  onPlay,
  onMoreInfo,
  isFavorite,
  onToggleFavorite,
}: HeroBannerProps) {
  const [prefix, suffix = ''] = movie.title.split(':');
  const suffixWords = suffix.trim().split(' ');

  return (
    <section
      id="inicio"
      className="relative flex h-[85vh] min-h-[580px] items-end overflow-hidden pb-16 md:pb-24"
    >
      <div
        className="absolute inset-x-0 bottom-0 top-16 bg-cover bg-top"
        style={{
          backgroundImage: `url('${movie.backdropUrl}')`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />

      <div className="absolute inset-0 w-full bg-gradient-to-r from-surface via-surface/75 to-transparent md:w-3/4" />

      <div className="relative z-10 flex max-w-4xl flex-col gap-4 px-4 md:px-12">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-lg">
            <span className="material-symbols-outlined text-[14px]">
              local_fire_department
            </span>
            Top 10 hoy
          </span>

          <span className="text-sm font-semibold text-gray-200">
            #1 en Tendencias de Películas
          </span>
        </div>

        <h1 className="font-heading text-4xl font-black uppercase leading-tight tracking-tight text-white drop-shadow-xl sm:text-6xl lg:text-7xl">
          {prefix}:
          <br />

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

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => onPlay(movie)}
            className="flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-heading text-base font-extrabold text-black shadow-[0_8px_25px_rgba(255,255,255,0.25)] transition-all hover:scale-105 hover:bg-gray-200 active:scale-95"
          >
            <span
              className="material-symbols-outlined text-[26px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
            Reproducir
          </button>

          <button
            onClick={() => onMoreInfo(movie)}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-6 py-3.5 font-heading text-base font-bold text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/25 active:scale-95"
          >
            <span className="material-symbols-outlined text-[22px]">
              info
            </span>
            Más información
          </button>

          <button
            aria-label="Añadir a mi lista"
            onClick={() => onToggleFavorite(movie)}
            className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white backdrop-blur-md transition-all hover:scale-105 ${
              isFavorite
                ? 'border-primary bg-primary'
                : 'bg-white/15 hover:bg-white/25'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isFavorite ? 'check' : 'add'}
            </span>
          </button>
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
          <span className="material-symbols-outlined text-[17px]">
            volume_up
          </span>
          Incluye audio y subtítulos en español
        </div>
      </div>
    </section>
  );
}
