📁 Estructura general de carpetas
streamflix/
├── index.html
├── package.json
├── tailwind.config.js
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── movie.ts
    ├── data/
    │   └── movies.ts
    └── components/
        ├── Navbar.tsx
        ├── HeroBanner.tsx
        ├── ContentRow.tsx
        ├── MovieCard.tsx
        ├── MovieDetailsModal.tsx
        └── VideoPlayer.tsx
1. index.html
(Ubicado en la raíz del proyecto para importar las fuentes redondeadas Google Fonts Outfit y Plus Jakarta Sans)

<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>StreamFlix — Plataforma Cinematográfica</title>
    <!-- Fuentes Outfit y Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#0B0B0B] text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
2. tailwind.config.js
(En la raíz del proyecto)

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: '#E50914',
      }
    },
  },
  plugins: [],
}
3. src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

body {
  margin: 0;
  background-color: #0B0B0B;
  color: #FFFFFF;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow-x: hidden;
}
4. src/types/movie.ts
export interface Movie {
  id: string;
  title: string;
  subtitle?: string;
  type: 'movie' | 'series';
  description: string;
  year: number;
  rating: string; // Ej: "16+", "18+", "TP"
  durationOrSeasons: string; // Ej: "2 h 24 min", "3 Temporadas"
  matchRate: number; // Porcentaje de coincidencia (ej: 98)
  qualityBadges: string[]; // ["4K ULTRA HD", "DOLBY ATMOS"]
  genres: string[];
  cast: string[];
  director: string;
  backdropUrl: string;
  thumbnailUrl: string;
  videoUrl: string; // Enlace MP4 funcional
  topBadge?: string;
  awardBadge?: string;
  progressPercent?: number; // Para la barra de progreso
  remainingTime?: string;
}

export type ActiveModalMovie = Movie | null;
5. src/data/movies.ts
import { Movie } from '../types/movie';

export const HERO_MOVIE: Movie = {
  id: 'cyberpunk-sombra',
  title: 'CYBERPUNK: PROTOCOLO SOMBRA',
  subtitle: 'Misión Cibernética: Madrid',
  type: 'movie',
  description:
    'En un neo-Madrid distópico dominado por mega-corporaciones neuro-sintéticas, un ex-analista descubre un algoritmo clandestino capaz de hackear voluntades colectivas antes del colapso global.',
  year: 2024,
  rating: '16+',
  durationOrSeasons: '2 h 24 min',
  matchRate: 98,
  qualityBadges: ['4K ULTRA HD', 'DOLBY ATMOS'],
  genres: ['Ciencia Ficción', 'Acción trepidante', 'Ciberpunk'],
  cast: ['Alejandro Silva', 'Elena Rostova', 'Kenji Sato', 'Mia Davenport'],
  director: 'Carlos Montero',
  backdropUrl:
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80',
  thumbnailUrl:
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
  videoUrl:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  topBadge: '#1 en Películas en España',
};

export const CATALOG: { category: string; movies: Movie[] }[] = [
  {
    category: 'Continuar viendo para Alex',
    movies: [
      {
        id: 'cv-1',
        title: 'Sintética: Consciencia Cero',
        subtitle: 'T2:E4 "Resonancia"',
        type: 'series',
        description:
          'Una androide de combate escapa de su reprogramación para salvar a un niño en las ruinas submarinas.',
        year: 2023,
        rating: '16+',
        durationOrSeasons: 'T2:E4',
        matchRate: 96,
        qualityBadges: ['4K', 'HDR'],
        genres: ['Sci-Fi', 'Suspense'],
        cast: ['Sarah Chen', 'Lucas Vance'],
        director: 'David Fincher',
        backdropUrl:
          'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
        videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        progressPercent: 65,
        remainingTime: '38 min restantes',
      },
      {
        id: 'cv-2',
        title: 'Crónicas de Shinjuku',
        subtitle: 'T1:E8 "La Falla"',
        type: 'series',
        description:
          'Un detective retirado rastrea crímenes rituales bajo las luces de neón del Tokio nocturno.',
        year: 2024,
        rating: '18+',
        durationOrSeasons: 'T1:E8',
        matchRate: 99,
        qualityBadges: ['DOLBY VISION'],
        genres: ['Neo-noir', 'Drama'],
        cast: ['Ken Watanabe', 'Rinko Kikuchi'],
        director: 'Takashi Miike',
        backdropUrl:
          'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
        videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        progressPercent: 82,
        remainingTime: '12 min restantes',
      },
      {
        id: 'cv-3',
        title: 'Horizonte Evento',
        type: 'movie',
        description:
          'Una misión de rescate en el borde de un agujero negro descubre que el tiempo corre en reversa.',
        year: 2022,
        rating: '13+',
        durationOrSeasons: '2 h 10 min',
        matchRate: 94,
        qualityBadges: ['IMAX', 'ATMOS'],
        genres: ['Espacio', 'Sci-Fi'],
        cast: ['Matthew Vance', 'Jessica Hall'],
        director: 'Christopher Nolan',
        backdropUrl:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        progressPercent: 45,
        remainingTime: '1h 05m restantes',
      },
      {
        id: 'cv-4',
        title: 'Poder Líquido',
        subtitle: 'T3:E2 "Auditoría Negra"',
        type: 'series',
        description:
          'La batalla corporativa más sanguinaria de Wall Street por el control de la última reserva de litio.',
        year: 2024,
        rating: '16+',
        durationOrSeasons: '3 Temporadas',
        matchRate: 91,
        qualityBadges: ['4K UHD'],
        genres: ['Thriller', 'Finanzas'],
        cast: ['Damian Lewis', 'Paul Giamatti'],
        director: 'Brian Koppelman',
        backdropUrl:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        progressPercent: 30,
        remainingTime: '45 min restantes',
      },
    ],
  },
  {
    category: 'Aclamadas por la Crítica y Galardones',
    movies: [
      {
        id: 'ac-1',
        title: 'La Medida del Cosmos',
        type: 'movie',
        description:
          'Un astrónomo del siglo XIX descubre una señal periódica en las estrellas que desafía las leyes físicas.',
        year: 2023,
        rating: 'TP',
        durationOrSeasons: '1 h 58 min',
        matchRate: 99,
        qualityBadges: ['4K UHD', 'HDR10+'],
        genres: ['Drama histórico', 'Poético'],
        cast: ['Jeremy Irons', 'Florence Pugh'],
        director: 'Denis Villeneuve',
        backdropUrl:
          'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=800&q=80',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=800&q=80',
        videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        awardBadge: '6 PREMIOS ÓSCAR',
      },
      {
        id: 'ac-2',
        title: 'Abismo Abisal',
        type: 'movie',
        description:
          'Investigadores en la Fosa de las Marianas descubren una biosfera consciente que despierta.',
        year: 2024,
        rating: '16+',
        durationOrSeasons: '2 h 15 min',
        matchRate: 98,
        qualityBadges: ['DOLBY ATMOS'],
        genres: ['Suspenso', 'Claustrofóbico'],
        cast: ['Sigourney Weaver', 'Cillian Murphy'],
        director: 'James Cameron',
        backdropUrl:
          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        awardBadge: 'PALMA DE ORO',
      },
      {
        id: 'ac-3',
        title: 'Faro de Sombras',
        type: 'movie',
        description:
          'Dos cuidadores de faro en una isla remota de Islandia enfrentan la locura y tormentas eternas.',
        year: 2023,
        rating: '18+',
        durationOrSeasons: '1 h 49 min',
        matchRate: 95,
        qualityBadges: ['4K UHD'],
        genres: ['Terror psicológico', 'Misterio'],
        cast: ['Willem Dafoe', 'Robert Pattinson'],
        director: 'Robert Eggers',
        backdropUrl:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        awardBadge: 'FESTIVAL DE CANNES',
      },
      {
        id: 'ac-4',
        title: 'Nocturno en Si Menor',
        type: 'movie',
        description:
          'La obsesiva odisea de un pianista de jazz ciego que persigue un acorde legendario por París.',
        year: 2024,
        rating: '13+',
        durationOrSeasons: '2 h 02 min',
        matchRate: 97,
        qualityBadges: ['DOLBY ATMOS', 'ULTRA HD'],
        genres: ['Música', 'Drama conmovedor'],
        cast: ['Mahershala Ali', 'Léa Seydoux'],
        director: 'Damien Chazelle',
        backdropUrl:
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
        thumbnailUrl:
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
        videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        awardBadge: 'MEJOR BANDA SONORA',
      },
    ],
  },
];
6. src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Search, Bell, X } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  myListCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, myListCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 px-6 md:px-12 py-4 flex items-center justify-between ${
        isScrolled
          ? 'bg-[#0b0b0b]/95 backdrop-blur-md shadow-2xl'
          : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent'
      }`}
    >
      <div className="flex items-center gap-8">
        {/* Logotipo */}
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-[#E50914] font-black text-2xl tracking-tighter uppercase font-outfit">
            STREAMFLIX
          </span>
        </div>

        {/* Enlaces de navegación */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <a href="#inicio" className="text-white hover:text-white transition-colors">Inicio</a>
          <a href="#series" className="hover:text-white transition-colors">Series</a>
          <a href="#peliculas" className="hover:text-white transition-colors">Películas</a>
          <a href="#novedades" className="hover:text-white transition-colors">Novedades</a>
          <a href="#milista" className="hover:text-white transition-colors flex items-center gap-1.5">
            Mi Lista
            {myListCount > 0 && (
              <span className="bg-[#E50914] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full">
                {myListCount}
              </span>
            )}
          </a>
        </div>
      </div>

      {/* Acciones Derecha */}
      <div className="flex items-center gap-4 text-white">
        {/* Buscador */}
        <div className="relative flex items-center">
          {searchOpen ? (
            <div className="flex items-center bg-black/80 border border-white/20 rounded-full px-3 py-1.5 text-sm">
              <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Buscar películas, géneros..."
                value={searchVal}
                onChange={handleInputChange}
                className="bg-transparent border-none text-white focus:outline-none w-44 md:w-64 placeholder:text-neutral-500 text-xs"
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchVal('');
                  onSearch('');
                }}
              >
                <X className="w-4 h-4 text-neutral-400 hover:text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Search className="w-5 h-5 text-neutral-200" />
            </button>
          )}
        </div>

        {/* Notificaciones */}
        <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
          <Bell className="w-5 h-5 text-neutral-200" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E50914] rounded-full animate-pulse" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 cursor-pointer pl-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E50914] to-red-400 flex items-center justify-center font-bold text-white text-xs shadow-md">
            A
          </div>
        </div>
      </div>
    </nav>
  );
};
7. src/components/HeroBanner.tsx
import React from 'react';
import { Play, Info, Plus, Check } from 'lucide-react';
import { Movie } from '../types/movie';

interface HeroBannerProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  movie,
  onPlay,
  onMoreInfo,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="relative w-full h-[85vh] min-h-[580px] max-h-[860px] flex items-center justify-start overflow-hidden">
      {/* Fondo cinematográfico con capas de degradados */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center filter brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent" />
      </div>

      {/* Contenido destacado */}
      <div className="relative z-10 px-6 md:px-16 max-w-3xl pt-20">
        {movie.topBadge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 text-white font-bold text-xs uppercase tracking-wider mb-4 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            {movie.topBadge}
          </div>
        )}

        <h1 className="text-4xl md:text-6xl font-black text-white font-outfit tracking-tight mb-3 leading-tight drop-shadow-md">
          {movie.title}
        </h1>

        {/* Metadatos */}
        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-medium text-neutral-300 mb-4">
          <span className="text-emerald-400 font-bold">{movie.matchRate}% Coincidencia</span>
          <span className="bg-neutral-800/80 px-2.5 py-0.5 rounded-full text-neutral-200 border border-neutral-700/50">
            {movie.year}
          </span>
          <span className="border border-neutral-500/60 px-2 py-0.5 rounded-full text-[11px] font-bold">
            {movie.rating}
          </span>
          <span>{movie.durationOrSeasons}</span>
          <div className="flex items-center gap-1.5">
            {movie.qualityBadges.map((badge) => (
              <span
                key={badge}
                className="bg-neutral-900/90 text-neutral-300 text-[10px] font-bold px-2 py-0.5 rounded border border-neutral-700"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm md:text-base text-neutral-300 line-clamp-3 mb-8 leading-relaxed drop-shadow">
          {movie.description}
        </p>

        {/* Botones de acción */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onPlay(movie)}
            className="flex items-center gap-2 px-7 py-3 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-sm transition-all transform hover:scale-105 shadow-xl"
          >
            <Play className="w-5 h-5 fill-black" />
            Reproducir
          </button>

          <button
            onClick={() => onMoreInfo(movie)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-800/80 hover:bg-neutral-700/90 text-white font-semibold text-sm backdrop-blur-md border border-neutral-600/50 transition-all hover:scale-105"
          >
            <Info className="w-5 h-5 text-neutral-300" />
            Más información
          </button>

          <button
            onClick={() => onToggleFavorite(movie)}
            className={`p-3 rounded-full border transition-all ${
              isFavorite
                ? 'bg-red-600/30 border-red-500 text-red-400'
                : 'bg-black/40 border-neutral-600/70 text-white hover:bg-neutral-800'
            }`}
          >
            {isFavorite ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
8. src/components/MovieCard.tsx
import React from 'react';
import { Play, Info, Check, Plus } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPlay,
  onMoreInfo,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="group relative flex-shrink-0 w-64 md:w-72 bg-[#141414] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20 hover:shadow-2xl border border-white/5">
      {/* Miniatura 16:9 */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
        <img
          src={movie.thumbnailUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Insignia de premios */}
        {movie.awardBadge && (
          <div className="absolute top-2 left-2 bg-amber-500/90 text-black font-extrabold text-[9px] px-2 py-0.5 rounded-full shadow">
            {movie.awardBadge}
          </div>
        )}

        {/* Botón flotante Play al pasar el ratón */}
        <div
          onClick={() => onPlay(movie)}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
        >
          <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Barra de progreso de visualización */}
        {movie.progressPercent !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-700">
            <div
              className="h-full bg-red-600"
              style={{ width: `${movie.progressPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-3.5 bg-[#181818]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-emerald-400 font-semibold text-xs">
            {movie.matchRate}% Coincidencia
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(movie);
              }}
              className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors"
            >
              {isFavorite ? <Check className="w-4 h-4 text-red-500" /> : <Plus className="w-4 h-4" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoreInfo(movie);
              }}
              className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h4 className="text-white text-sm font-bold truncate font-outfit">{movie.title}</h4>

        <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-400">
          <span>{movie.rating}</span>
          <span>•</span>
          <span>{movie.remainingTime || movie.durationOrSeasons}</span>
        </div>
      </div>
    </div>
  );
};
9. src/components/ContentRow.tsx
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface ContentRowProps {
  title: string;
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  favorites: Movie[];
  onToggleFavorite: (movie: Movie) => void;
}

export const ContentRow: React.FC<ContentRowProps> = ({
  title,
  movies,
  onPlay,
  onMoreInfo,
  favorites,
  onToggleFavorite,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!movies.length) return null;

  return (
    <div className="py-4 md:py-6 px-6 md:px-12 relative group/row">
      <h2 className="text-lg md:text-xl font-bold text-white mb-3 font-outfit tracking-wide">
        {title}
      </h2>

      {/* Flechas de desplazamiento */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/70 text-white opacity-0 group-hover/row:opacity-100 hover:bg-black/95 transition-opacity backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/70 text-white opacity-0 group-hover/row:opacity-100 hover:bg-black/95 transition-opacity backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Carrusel Horizontal */}
      <div
        ref={rowRef}
        className="flex items-center gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2"
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onPlay={onPlay}
            onMoreInfo={onMoreInfo}
            isFavorite={favorites.some((f) => f.id === movie.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};
10. src/components/MovieDetailsModal.tsx
import React, { useEffect } from 'react';
import { X, Play, Plus, Check } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieDetailsModalProps {
  movie: Movie | null;
  onClose: () => void;
  onPlay: (movie: Movie) => void;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movie,
  onClose,
  onPlay,
  isFavorite,
  onToggleFavorite,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (movie) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Clic de fondo para cerrar */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#141414] rounded-3xl overflow-y-auto z-10 shadow-2xl border border-neutral-800">
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Banner de cabecera */}
        <div className="relative aspect-video w-full">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover filter brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-3xl font-black text-white font-outfit mb-3">
              {movie.title}
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onPlay(movie)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-transform hover:scale-105"
              >
                <Play className="w-4 h-4 fill-black" />
                Reproducir
              </button>
              <button
                onClick={() => onToggleFavorite(movie)}
                className={`p-2.5 rounded-full border ${
                  isFavorite
                    ? 'bg-red-600/20 border-red-500 text-red-500'
                    : 'bg-black/40 border-neutral-500 text-white hover:bg-black/70'
                }`}
              >
                {isFavorite ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Ficha técnica y sinopsis */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-emerald-400 font-bold">{movie.matchRate}% Coincidencia</span>
                <span className="text-neutral-400">{movie.year}</span>
                <span className="border border-neutral-600 text-neutral-300 text-xs px-2 py-0.5 rounded-full">
                  {movie.rating}
                </span>
                <span className="text-neutral-400">{movie.durationOrSeasons}</span>
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed">{movie.description}</p>
            </div>

            <div className="text-xs space-y-2 text-neutral-400 border-l border-neutral-800 pl-4">
              <div>
                <span className="text-neutral-500">Reparto: </span>
                <span className="text-neutral-200">{movie.cast.join(', ')}</span>
              </div>
              <div>
                <span className="text-neutral-500">Dirección: </span>
                <span className="text-neutral-200">{movie.director}</span>
              </div>
              <div>
                <span className="text-neutral-500">Géneros: </span>
                <span className="text-neutral-200">{movie.genres.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
11. src/components/VideoPlayer.tsx
import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Movie } from '../types/movie';

interface VideoPlayerProps {
  movie: Movie;
  onBack: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ movie, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBack();
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      localStorage.setItem(`progress_${movie.id}`, String(videoRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      const savedTime = localStorage.getItem(`progress_${movie.id}`);
      if (savedTime) {
        videoRef.current.currentTime = parseFloat(savedTime);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between group">
      {/* Elemento de video HTML5 */}
      <video
        ref={videoRef}
        src={movie.videoUrl}
        autoPlay
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Cabecera superior con botón de salida */}
      <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-red-500 font-semibold transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver al catálogo</span>
        </button>
        <span className="text-white font-bold text-lg font-outfit">{movie.title}</span>
        <div className="w-10" />
      </div>

      {/* Controles de reproducción inferiores */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-3">
        {/* Barra de progreso interactiva (scrubber) */}
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full accent-red-600 bg-neutral-700 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-neutral-300 whitespace-nowrap">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="hover:text-red-500 transition-colors">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white" />}
            </button>
            <button onClick={() => skip(-10)} className="hover:text-red-500 transition-colors">
              <RotateCcw className="w-5 h-5" />
            </button>
            <button onClick={() => skip(10)} className="hover:text-red-500 transition-colors">
              <RotateCw className="w-5 h-5" />
            </button>

            {/* Control de volumen */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }
                }}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setVolume(val);
                  if (videoRef.current) {
                    videoRef.current.volume = val;
                    videoRef.current.muted = false;
                    setIsMuted(false);
                  }
                }}
                className="w-20 accent-red-600 bg-neutral-700 h-1 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <button onClick={toggleFullscreen} className="hover:text-red-500 transition-colors">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
12. src/App.tsx (Componente Principal)
import React, { useState, useEffect } from 'react';
import { HERO_MOVIE, CATALOG } from './data/movies';
import { Movie } from './types/movie';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ContentRow } from './components/ContentRow';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { VideoPlayer } from './components/VideoPlayer';

export const App: React.FC = () => {
  const [activeMovieForVideo, setActiveMovieForVideo] = useState<Movie | null>(null);
  const [activeMovieForModal, setActiveMovieForModal] = useState<Movie | null>(null);
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('streamflix_my_list');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Persistir en LocalStorage
  useEffect(() => {
    localStorage.setItem('streamflix_my_list', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      if (exists) {
        return prev.filter((item) => item.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  // Filtrado de búsqueda en tiempo real
  const allMovies = [HERO_MOVIE, ...CATALOG.flatMap((c) => c.movies)];
  const filteredMovies = searchQuery
    ? allMovies.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : null;

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white font-sans selection:bg-red-600 selection:text-white">
      {/* Navegación Fija */}
      <Navbar onSearch={setSearchQuery} myListCount={favorites.length} />

      {/* Reproductor de Video Fullscreen */}
      {activeMovieForVideo && (
        <VideoPlayer
          movie={activeMovieForVideo}
          onBack={() => setActiveMovieForVideo(null)}
        />
      )}

      {/* Vista de Búsqueda o Vista Principal */}
      {filteredMovies ? (
        <div className="pt-28 px-6 md:px-12">
          <h2 className="text-xl font-bold mb-6 font-outfit">
            Resultados para: "{searchQuery}" ({filteredMovies.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMovies.map((movie) => (
              <ContentRow
                key={movie.id}
                title=""
                movies={[movie]}
                onPlay={setActiveMovieForVideo}
                onMoreInfo={setActiveMovieForModal}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Banner Panorámico Principal */}
          <HeroBanner
            movie={HERO_MOVIE}
            onPlay={setActiveMovieForVideo}
            onMoreInfo={setActiveMovieForModal}
            isFavorite={favorites.some((f) => f.id === HERO_MOVIE.id)}
            onToggleFavorite={handleToggleFavorite}
          />

          {/* Carruseles de Contenido */}
          <div className="-mt-16 md:-mt-24 relative z-20 space-y-2 pb-16">
            {CATALOG.map((section) => (
              <ContentRow
                key={section.category}
                title={section.category}
                movies={section.movies}
                onPlay={setActiveMovieForVideo}
                onMoreInfo={setActiveMovieForModal}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}

            {/* Fila dinámica de Mi Lista */}
            {favorites.length > 0 && (
              <div id="milista">
                <ContentRow
                  title={`Mi Lista (${favorites.length})`}
                  movies={favorites}
                  onPlay={setActiveMovieForVideo}
                  onMoreInfo={setActiveMovieForModal}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
            )}
          </div>
        </>
      )}

      {/* Modal de Detalles Enriquecido */}
      <MovieDetailsModal
        movie={activeMovieForModal}
        onClose={() => setActiveMovieForModal(null)}
        onPlay={(m) => {
          setActiveMovieForModal(null);
          setActiveMovieForVideo(m);
        }}
        isFavorite={activeMovieForModal ? favorites.some((f) => f.id === activeMovieForModal.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};
13. src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
¡Todo listo! Con estos archivos puedes ejecutar npm run dev y tendrás la plataforma completa con reproducción, buscador, modal y persistencia en LocalStorage. 🍿🎬