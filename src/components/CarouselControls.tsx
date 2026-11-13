import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  title: string;
  controls: string;
  canPrevious: boolean;
  canNext: boolean;
  onScroll: (direction: number) => void;
}

export function CarouselControls({ title, controls, canPrevious, canNext, onScroll }: Props) {
  const buttonClass = 'flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/15 disabled:cursor-default disabled:opacity-25';
  return <div className="flex shrink-0 gap-1">
    <button type="button" aria-label={`Anterior en ${title}`} aria-controls={controls} disabled={!canPrevious} onClick={() => onScroll(-1)} className={buttonClass}><ChevronLeft size={19} /></button>
    <button type="button" aria-label={`Siguiente en ${title}`} aria-controls={controls} disabled={!canNext} onClick={() => onScroll(1)} className={buttonClass}><ChevronRight size={19} /></button>
  </div>;
}
