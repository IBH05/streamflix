import { Bell, ShieldCheck, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Profile } from '../data/profiles';

export function NotificationsMenu({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return <div ref={root} className="relative" onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
  }}>
    <button ref={trigger} type="button" aria-label="Notificaciones" aria-expanded={open} aria-controls="notifications-panel" onClick={() => setOpen((current) => !current)} className="relative rounded-full p-2 text-gray-200 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
      <Bell className="h-5 w-5" />
      {profile === 'kids' && <span aria-hidden="true" className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-teal-400 ring-2 ring-neutral-950" />}
    </button>
    {open && <section id="notifications-panel" aria-label="Notificaciones" className="fixed right-4 top-16 w-[min(320px,calc(100vw-2rem))] rounded-2xl border border-white/15 bg-neutral-950 p-5 text-white shadow-2xl sm:absolute sm:right-0 sm:top-full sm:mt-3">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Notificaciones</h2>
        <button type="button" aria-label="Cerrar notificaciones" onClick={() => { setOpen(false); trigger.current?.focus(); }} className="rounded-full p-1 text-neutral-400 hover:bg-white/10 hover:text-white"><X size={18} /></button>
      </div>
      {profile === 'kids' ? <div className="flex gap-3 rounded-xl border border-teal-400/20 bg-teal-400/10 p-4">
        <ShieldCheck size={20} className="shrink-0 text-teal-300" />
        <p className="text-sm leading-relaxed text-teal-200">Estás en Kids · Solo contenido infantil y familiar. Salida protegida con PIN.</p>
      </div> : <p className="py-4 text-center text-sm text-neutral-400">No tienes notificaciones por ahora.</p>}
    </section>}
  </div>;
}
