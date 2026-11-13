import { Menu, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ProfileMenu } from './ProfileMenu';
import { NotificationsMenu } from './NotificationsMenu';
import type { Profile } from '../data/profiles';

interface NavbarProps {
  onSearch: (query: string) => void;
  myListCount: number;
  profile: Profile;
  onProfileChange: (profile: Profile) => boolean;
}

const links = [
  ['inicio', 'Inicio'], ['colecciones', 'Colecciones'], ['peliculas', 'Películas'],
  ['series', 'Series'], ['milista', 'Mi Lista'],
];

export function Navbar({ onSearch, myListCount, profile, onProfileChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [panel, setPanel] = useState<'menu' | 'search' | null>(null);
  const root = useRef<HTMLElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const searchButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 36);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (panel === 'search') searchInput.current?.focus();
    if (!panel) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setPanel(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setPanel(null);
      (panel === 'search' ? searchButton : menuButton).current?.focus();
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [panel]);

  const navigate = (id: string) => {
    setPanel(null);
    setSearchValue('');
    onSearch('');
    window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return <header ref={root} className={`fixed inset-x-0 top-0 z-40 border-b border-white/10 ${isScrolled || panel ? 'bg-neutral-950/95' : 'bg-black/60'} backdrop-blur-xl`}>
    <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-2 px-4 md:px-8">
      <a href="#inicio" onClick={(event) => { event.preventDefault(); navigate('inicio'); }} className="shrink-0 font-heading text-xl font-black tracking-tight text-primary sm:text-2xl">STREAMFLIX</a>
      <nav aria-label="Navegación principal" className="hidden items-center gap-6 text-sm font-semibold text-neutral-300 xl:flex">
        {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); navigate(id); }} className="rounded py-2 hover:text-white focus-visible:outline focus-visible:outline-white">{label}{id === 'milista' && <span className="ml-1.5 text-xs text-neutral-500">{myListCount}</span>}</a>)}
      </nav>
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <button ref={menuButton} type="button" aria-label={panel === 'menu' ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={panel === 'menu'} aria-controls="navigation-panel" onClick={() => setPanel(panel === 'menu' ? null : 'menu')} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10 xl:hidden">{panel === 'menu' ? <X size={21} /> : <Menu size={21} />}</button>
        <button ref={searchButton} type="button" aria-label="Buscar" aria-expanded={panel === 'search'} aria-controls="search-panel" onClick={() => setPanel(panel === 'search' ? null : 'search')} className={`flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10 ${searchValue ? 'text-red-400' : ''}`}><Search size={21} /></button>
        <div className="hidden xl:block"><NotificationsMenu profile={profile} /></div>
        <div onClickCapture={() => setPanel(null)}><ProfileMenu profile={profile} onChange={onProfileChange} /></div>
      </div>
    </div>
    {panel === 'menu' && <div id="navigation-panel" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 p-4 xl:hidden">
      <nav aria-label="Navegación móvil" className="mx-auto grid max-w-screen-sm gap-1">
        {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); navigate(id); }} className="flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-semibold text-neutral-200 hover:bg-white/10">{label}{id === 'milista' && <span className="rounded-full bg-white/10 px-2 py-1 text-xs">{myListCount}</span>}</a>)}
        <div className="mt-2 flex items-center justify-between border-t border-white/10 px-4 pt-3 text-sm text-neutral-400"><span>Notificaciones</span><NotificationsMenu profile={profile} /></div>
      </nav>
    </div>}
    {panel === 'search' && <form id="search-panel" role="search" onSubmit={(event) => { event.preventDefault(); searchInput.current?.blur(); }} className="mx-auto flex max-w-screen-sm items-center gap-2 px-4 pb-4">
      <div className="relative min-w-0 flex-1">
        <Search size={18} className="pointer-events-none absolute left-4 top-3.5 text-neutral-400" />
        <input ref={searchInput} type="search" aria-label="Buscar películas o series" value={searchValue} onChange={(event) => { setSearchValue(event.target.value); onSearch(event.target.value); }} placeholder="Buscar películas o series…" className="h-12 w-full rounded-full border border-white/15 bg-white/10 pl-11 pr-4 text-base text-white outline-none focus:border-white/60" />
      </div>
      <button type="button" aria-label="Cerrar búsqueda" onClick={() => { setSearchValue(''); onSearch(''); setPanel(null); searchButton.current?.focus(); }} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-white/10"><X size={20} /></button>
    </form>}
  </header>;
}
