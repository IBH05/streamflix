'use client';

import type { CSSProperties } from 'react';

const platforms = [
  { name: 'Seadex', domain: 'seadex.moe', url: 'https://seadex.moe/', color: '#00E5F1', icon: '▣' },
  { name: '1337x', domain: '1337x.la', url: 'https://1337x.la/home/', color: '#FF8500', icon: '↓' },
  { name: 'Nyaa', domain: 'nyaa.media', url: 'https://nyaa.media/', color: '#B65CFF', icon: '◈' },
  { name: 'Cuevana 3W', domain: 'cuevana3w.pro', url: 'https://cuevana3w.pro/', color: '#FF173B', icon: '▶' },
  { name: 'Cuevana 3G', domain: 'cuevana3g.pro', url: 'https://cuevana3g.pro/', color: '#65E600', icon: '▶' },
];

export default function PlatformsBanner() {
  return (
    <section aria-labelledby="platforms-title" className="mx-auto w-full min-w-0 max-w-[1600px] py-4 md:py-6">
      <div className="platforms-banner relative overflow-hidden rounded-2xl border border-red-600/50 bg-[#080808] px-4 py-8 sm:px-5 md:px-8 md:py-10 xl:px-12">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-32 h-72 w-72 rounded-full bg-red-600/20 blur-[100px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-red-600/[0.15] blur-[100px]" />

        <div aria-hidden="true" className="pointer-events-none absolute -left-12 top-0 hidden rotate-[-23deg] opacity-40 lg:block">
          <div className="flex h-20 w-96 items-center justify-around border-y-[8px] border-red-600 bg-red-950/20">
            {Array.from({ length: 9 }, (_, index) => <div key={index} className="h-11 w-7 rounded-sm bg-black" />)}
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute right-7 top-5 hidden rotate-[-15deg] opacity-40 lg:block">
          <div className="h-7 w-36 rounded-t border border-white/20 bg-[repeating-linear-gradient(115deg,#eeeeee_0px,#eeeeee_17px,#111111_17px,#111111_34px)]" />
          <div className="h-20 w-36 rounded-b-md border border-white/20 bg-gradient-to-b from-zinc-800 to-black" />
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-[2px] w-1/3 bg-gradient-to-l from-transparent via-red-500 to-transparent shadow-[0_0_16px_#E50914]" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-[2px] w-1/3 bg-gradient-to-l from-red-500 via-red-600 to-transparent shadow-[0_0_16px_#E50914]" />

        <div className="relative z-10 text-center">
          <p className="text-xl font-black tracking-tight text-[#E50914] md:text-2xl">STREAMFLIX</p>
          <h2 id="platforms-title" className="mt-1 text-2xl font-extrabold tracking-tight text-white md:text-3xl">Explora más plataformas</h2>
          <div className="mt-3 flex items-center justify-center gap-4">
            <span aria-hidden="true" className="hidden h-px w-14 shrink-0 bg-lime-500 sm:block" />
            <p className="text-xs text-zinc-400 md:text-sm">Descubre otras comunidades y catálogos</p>
            <span aria-hidden="true" className="hidden h-px w-14 shrink-0 bg-lime-500 sm:block" />
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-7 grid max-w-[1200px] grid-cols-1 gap-3 min-[360px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 xl:gap-4">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${platform.name} en una pestaña nueva`}
              className="platform-card group relative flex min-h-[105px] min-w-0 flex-col items-center justify-center overflow-hidden rounded-xl border bg-[#0C0C0C]/90 px-2 py-4 text-center transition-all duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ '--platform-color': platform.color } as CSSProperties}
            >
              <span aria-hidden="true" className="absolute bottom-0 left-0 h-[2px] w-full" style={{ backgroundColor: platform.color, boxShadow: `0 0 14px ${platform.color}` }} />
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-xl font-bold md:text-2xl" style={{ color: platform.color }} aria-hidden="true">{platform.icon}</span>
                <span className="text-base font-extrabold italic text-white md:text-lg">{platform.name}</span>
              </div>
              <span className="mt-2 break-all text-xs text-zinc-400">{platform.domain}</span>
            </a>
          ))}
        </div>

        <p className="relative z-10 mt-6 text-center text-xs text-zinc-500">Enlaces externos a sitios independientes de STREAMFLIX</p>
      </div>

      <style jsx>{`
        .platforms-banner {
          box-shadow: 0 0 10px rgba(229, 9, 20, 0.25), inset 0 0 22px rgba(229, 9, 20, 0.08);
        }

        .platform-card {
          border-color: color-mix(in srgb, var(--platform-color) 50%, transparent);
          box-shadow: 0 4px 15px color-mix(in srgb, var(--platform-color) 8%, transparent);
        }

        .platform-card:hover,
        .platform-card:focus-visible {
          border-color: var(--platform-color);
          box-shadow: 0 0 12px var(--platform-color), inset 0 0 18px color-mix(in srgb, var(--platform-color) 12%, transparent);
        }

        @media (prefers-reduced-motion: reduce) {
          .platform-card {
            transition: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
