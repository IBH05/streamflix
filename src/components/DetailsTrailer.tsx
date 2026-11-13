import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import type { Movie } from '../types/movie';
import { trailerForMovie } from '../data/trailers';

export function DetailsTrailer({ movie }: { movie: Movie }) {
  const source = trailerForMovie(movie.id);
  const url = source?.trailerUrl ?? movie.trailerUrl;
  const start = source?.trailerStartSeconds ?? movie.trailerStartSeconds ?? 0;
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let disposed = false;
    const timer = window.setTimeout(async () => {
      try { await video.play(); }
      catch (error) {
        if (disposed || !(error instanceof DOMException) || error.name !== 'NotAllowedError') return;
        video.muted = true;
        setMuted(true);
        try { await video.play(); } catch { /* Keep the poster visible. */ }
      }
      if (disposed) video.pause();
    }, 2000);
    return () => { disposed = true; window.clearTimeout(timer); video.pause(); };
  }, [url]);
  return <>
    <img src={movie.backdropUrl} alt="" className="h-full w-full object-cover" />
    {url && <>
      <video ref={ref} src={`${encodeURI(url)}#t=${start}`} playsInline muted={muted} preload="metadata" aria-hidden="true"
        onLoadedMetadata={(event) => { event.currentTarget.currentTime = start; }}
        onPlaying={() => setPlaying(true)} onEnded={() => setPlaying(false)} onError={() => setPlaying(false)}
        className={`pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${playing ? 'bg-black opacity-100' : 'opacity-0'}`} />
      <button type="button" aria-label={muted ? 'Activar audio del tráiler' : 'Silenciar tráiler'} aria-pressed={muted}
        onClick={() => { const video = ref.current; if (video) { video.muted = !video.muted; setMuted(video.muted); } }}
        className="absolute bottom-4 right-4 z-20 rounded-full border border-white/40 bg-black/60 p-3 text-white hover:bg-black/80">
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </>}
  </>;
}
