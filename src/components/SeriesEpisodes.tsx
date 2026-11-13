import { ChevronDown } from 'lucide-react';
import type { EpisodeSelection, SeriesSeason } from '../types/movie';

interface SeriesEpisodesProps {
  seasons: SeriesSeason[];
  selection: EpisodeSelection;
  onChange: (selection: EpisodeSelection) => void;
}

export function SeriesEpisodes({ seasons, selection, onChange }: SeriesEpisodesProps) {
  if (!seasons.length) return null;

  return <section aria-label="Temporadas y episodios" className="mx-4 mb-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:mx-6 md:mx-8">
    <label className="mb-3 block font-outfit text-lg font-bold" htmlFor="episode-selection">Temporadas y episodios</label>
    <div className="relative">
      <select id="episode-selection" aria-label="Seleccionar temporada y episodio" value={`${selection.season}:${selection.episode}`} onChange={(event) => {
        const [season, episode] = event.target.value.split(':').map(Number);
        onChange({ season, episode });
      }} className="min-h-12 w-full min-w-0 appearance-none rounded-lg border border-white/20 bg-[#202020] py-3 pl-4 pr-12 text-base text-white outline-none focus:border-white/60">
        {seasons.map((season) => <optgroup key={season.number} label={`Temporada ${season.number} · ${season.episodeCount} episodios`}>
          {Array.from({ length: season.episodeCount }, (_, index) => <option key={index + 1} value={`${season.number}:${index + 1}`}>Temporada {season.number} · Episodio {index + 1}</option>)}
        </optgroup>)}
      </select>
      <ChevronDown size={20} aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400" />
    </div>
    <p className="mt-3 text-xs leading-5 text-neutral-400">Reproducción simulada con el tráiler de la serie.</p>
  </section>;
}
