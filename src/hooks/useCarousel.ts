import { useEffect, useRef, useState } from 'react';

export function useCarousel(itemCount: number) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const update = () => {
      setCanPrevious(row.scrollLeft > 2);
      setCanNext(row.scrollLeft + row.clientWidth < row.scrollWidth - 2);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(row);
    row.addEventListener('scroll', update, { passive: true });
    return () => { observer.disconnect(); row.removeEventListener('scroll', update); };
  }, [itemCount]);

  const scroll = (direction: number) => {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: direction * row.clientWidth * 0.85, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return { rowRef, canPrevious, canNext, scroll };
}
