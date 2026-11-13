import { Baby, Check, ChevronDown, LockKeyhole, UserRound, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { hashPin, PIN_KEY, type Profile } from '../data/profiles';

interface Props {
  profile: Profile;
  onChange: (profile: Profile) => boolean;
}

export function ProfileMenu({ profile, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'setup' | 'unlock' | null>(null);
  const [pin, setPin] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const close = () => {
    setOpen(false); setMode(null); setPin(''); setConfirmation(''); setError('');
    trigger.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!busy && !root.current?.contains(event.target as Node)) close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !busy) close();
      if (event.key === 'Tab') {
        const elements = root.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input');
        if (!elements?.length) return;
        const first = elements[0]; const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onPointer); document.removeEventListener('keydown', onKey); };
  }, [open, busy]);

  useEffect(() => { if (mode) input.current?.focus(); }, [mode]);

  const choose = (target: Profile) => {
    if (target === profile) { close(); return; }
    setError('');
    if (target === 'adult') { setMode('unlock'); return; }
    try {
      if (!localStorage.getItem(PIN_KEY)) { setMode('setup'); return; }
      if (!onChange('kids')) { setError('No se pudo guardar el perfil. Habilita el almacenamiento del navegador.'); return; }
      close();
    } catch { setError('Habilita el almacenamiento del navegador para usar Kids.'); }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^\d{4}$/.test(pin)) { setError('Escribe un PIN de 4 dígitos.'); return; }
    if (mode === 'setup' && pin !== confirmation) { setError('Los PIN no coinciden.'); return; }
    setBusy(true); setError('');
    try {
      const hashed = await hashPin(pin);
      if (mode === 'unlock' && localStorage.getItem(PIN_KEY) !== hashed) {
        setError('PIN incorrecto. Inténtalo de nuevo.'); setPin(''); input.current?.focus(); return;
      }
      if (mode === 'setup') localStorage.setItem(PIN_KEY, hashed);
      if (!onChange(mode === 'setup' ? 'kids' : 'adult')) {
        setError('No se pudo guardar el perfil. Habilita el almacenamiento del navegador.'); return;
      }
      close();
    } catch { setError('No se pudo guardar el PIN. Usa localhost o HTTPS y habilita el almacenamiento.'); }
    finally { setBusy(false); }
  };

  return <div ref={root} className="relative">
    <button ref={trigger} type="button" disabled={busy} aria-label={`Perfil ${profile === 'kids' ? 'Kids' : 'Adulto'}`} aria-expanded={open} aria-controls="profile-panel" onClick={() => { if (open) close(); else setOpen(true); }} className="flex items-center gap-1.5 rounded-full p-1 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
      <span className={`flex h-8 w-8 items-center justify-center rounded-full ${profile === 'kids' ? 'bg-teal-500' : 'bg-gradient-to-tr from-primary to-rose-600'}`}>{profile === 'kids' ? <Baby size={20} /> : 'A'}</span>
      <span className="hidden text-xs font-bold sm:block">{profile === 'kids' ? 'Kids' : 'Adulto'}</span><ChevronDown size={14} className="hidden sm:block" />
    </button>
    {open && <div id="profile-panel" role="dialog" aria-label="Perfiles" className="absolute right-0 top-full mt-3 w-[min(320px,calc(100vw-2rem))] rounded-2xl border border-white/15 bg-neutral-950 p-5 text-white shadow-2xl">
      <div className="mb-4 flex items-center justify-between"><h2 className="font-bold">{mode === 'setup' ? 'Protege el perfil Kids' : mode === 'unlock' ? 'Salir de Kids' : '¿Quién está viendo?'}</h2><button type="button" disabled={busy} onClick={close} aria-label="Cerrar perfiles" className="rounded-full p-1 hover:bg-white/10"><X size={18} /></button></div>
      {mode ? <form onSubmit={submit} className="space-y-4">
        <p className="text-sm text-neutral-400">{mode === 'setup' ? 'Crea un PIN de 4 dígitos. Se pedirá para volver al perfil Adulto.' : 'Introduce el PIN parental para acceder al catálogo completo.'}</p>
        <label className="block text-sm">PIN parental<input ref={input} type="password" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} autoComplete="off" required value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, ''))} className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 tracking-[.5em]" /></label>
        {mode === 'setup' && <label className="block text-sm">Confirmar PIN<input type="password" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} autoComplete="off" required value={confirmation} onChange={(event) => setConfirmation(event.target.value.replace(/\D/g, ''))} className="mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 tracking-[.5em]" /></label>}
        <button disabled={busy} className="w-full rounded-full bg-primary py-2.5 text-sm font-bold disabled:opacity-50">{busy ? 'Comprobando…' : mode === 'setup' ? 'Guardar y entrar a Kids' : 'Acceder al perfil Adulto'}</button>
      </form> : <div className="space-y-2">
        {(['adult', 'kids'] as const).map((item) => <button key={item} type="button" onClick={() => choose(item)} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left hover:bg-white/10 ${item === profile ? 'border-white/30 bg-white/5' : 'border-transparent'}`}>
          <span className={`rounded-lg p-2 ${item === 'kids' ? 'bg-teal-500' : 'bg-primary'}`}>{item === 'kids' ? <Baby size={22} /> : <UserRound size={22} />}</span>
          <span className="flex-1"><span className="block text-sm font-bold">{item === 'kids' ? 'Kids' : 'Adulto'}</span><span className="text-xs text-neutral-400">{item === 'kids' ? 'Solo contenido infantil y familiar' : 'Catálogo completo'}</span></span>{item === profile && <Check size={16} />}
        </button>)}
        <p className="flex gap-2 pt-3 text-xs leading-relaxed text-neutral-400"><LockKeyhole size={16} className="shrink-0" />Kids permite G, PG, TV-Y, TV-Y7, TV-G y TV-PG, además de TP, A y AA. Excluye títulos sin clasificar.</p>
      </div>}
      {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}
    </div>}
  </div>;
}
