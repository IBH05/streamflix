import { Bell, Search, X } from 'lucide-react';
import { useEffect, useState, type MouseEvent } from 'react';
import type { MovieTypeFilter } from '../types/movie';

interface NavbarProps {
  /** Texto actual de la búsqueda (lo controla App). */
  searchQuery: string;
  /** Se ejecuta al escribir en el buscador. */
  onSearch: (query: string) => void;
  /** Filtro activo: Todos, Películas o Series. */
  typeFilter: MovieTypeFilter;
  /** Se ejecuta al elegir Todos, Películas o Series. */
  onTypeFilterChange: (filter: MovieTypeFilter) => void;
  /** Limpia búsqueda y filtro y desplaza a una sección (inicio, milista...). */
  onNavigate: (sectionId: string) => void;
  myListCount: number;
}

const TYPE_OPTIONS: { value: MovieTypeFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'movie', label: 'Películas' },
  { value: 'series', label: 'Series' },
];

export function Navbar({ searchQuery, onSearch, typeFilter, onTypeFilterChange, onNavigate, myListCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const searchValue = searchQuery;
  const goTo = (sectionId: string) => (event: MouseEvent) => { event.preventDefault(); onNavigate(sectionId); };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 36);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed left-0 right-0 top-0 z-40 border-b border-white/5 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-xl' : 'bg-gradient-to-b from-black/90 via-black/60 to-transparent backdrop-blur-md'}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-10">
        <div className="flex items-center gap-6 md:gap-10">
          <a href="#inicio" onClick={goTo('inicio')} className="flex items-center gap-1.5 font-heading text-2xl font-black tracking-tight text-primary transition-opacity hover:opacity-95 md:text-3xl">STREAMFLIX</a>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-gray-300 md:flex">
            <a href="#inicio" onClick={goTo('inicio')} className="transition-colors hover:text-white">Inicio</a>
            {/* Controles de tipo: Isauro define su diseño final. */}
            <div role="group" aria-label="Filtrar por tipo" className="flex items-center gap-4">
              {TYPE_OPTIONS.map((option) => (
                <button key={option.value} type="button" aria-pressed={typeFilter === option.value} onClick={() => onTypeFilterChange(option.value)} className={`transition-colors hover:text-white ${typeFilter === option.value ? 'text-white' : ''}`}>{option.label}</button>
              ))}
            </div>
            <a href="#milista" onClick={goTo('milista')} className="flex items-center gap-2 transition-colors hover:text-white">Mi Lista{myListCount > 0 && <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-white">{myListCount}</span>}</a>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-2 h-[18px] w-[18px] text-gray-400" />
            <input type="text" value={searchValue} onChange={(event) => onSearch(event.target.value)} placeholder="Buscar películas o series..." className="w-48 rounded-full border border-white/10 bg-white/10 py-1.5 pl-9 pr-3 text-xs text-white placeholder-gray-400 transition-all hover:bg-white/15 focus:border-primary focus:bg-white/20 focus:outline-none lg:w-64" />
            {searchValue && <button aria-label="Limpiar búsqueda" onClick={() => onSearch('')} className="absolute right-2 top-1.5 rounded-full p-0.5 text-gray-400 hover:text-white"><X className="h-3.5 w-3.5" /></button>}
          </div>
          <button aria-label="Notificaciones" className="rounded-full p-2 text-gray-200 transition-colors hover:bg-white/10"><Bell className="h-5 w-5" /></button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-rose-600 text-xs font-bold shadow-md">A</div>
        </div>
      </div>
    </header>
  );
}
