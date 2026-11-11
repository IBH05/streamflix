import type { Movie } from '../types/movie';

const image = (id: string, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=84`;
const video = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/';

export const HERO_MOVIE: Movie = {
  id: 'star-wars-episodio-3',
  title: 'Star Wars: Episodio III – La venganza de los Sith',
  type: 'movie',
  description:
    'Mientras la República libra las últimas batallas de las Guerras Clon, Anakin Skywalker teme perder a Padmé. Palpatine aprovecha ese miedo para acercarlo al lado oscuro.',
  year: 2005,
  rating: 'PG-13',
  durationOrSeasons: '2 h 20 min',
  matchRate: 98,
  qualityBadges: [],
  genres: ['Ciencia ficción', 'Aventura'],
  cast: ['Hayden Christensen', 'Ewan McGregor', 'Natalie Portman'],
  director: 'George Lucas',

  // Recursos provisionales del proyecto.
  backdropUrl: image('photo-1542751371-adc38448a05e', 1920),
  thumbnailUrl: image('photo-1578632767115-351597cf2477', 600),
  videoUrl: `${video}TearsOfSteel.mp4`,

  topBadge: 'Película destacada',
};

const catalogMovie = (movie: Omit<Movie, 'backdropUrl' | 'thumbnailUrl'> & { imageId: string }): Movie => ({
  ...movie,
  backdropUrl: image(movie.imageId),
  thumbnailUrl: image(movie.imageId, 700),
});

export const CATALOG: { category: string; movies: Movie[] }[] = [
  {
    category: 'Continuar viendo para Alex',
    movies: [
      catalogMovie({ id: 'cv-1', title: 'Sintética: Consciencia Cero', subtitle: 'T2:E4 «Resonancia»', type: 'series', description: 'Una androide de combate escapa de su reprogramación para salvar a un niño en las ruinas submarinas.', year: 2023, rating: '16+', durationOrSeasons: 'T2:E4', matchRate: 96, qualityBadges: ['4K', 'HDR'], genres: ['Sci-Fi', 'Suspense'], cast: ['Sarah Chen', 'Lucas Vance'], director: 'David Fincher', imageId: 'photo-1509198397868-475647b2a1e5', videoUrl: `${video}ElephantsDream.mp4`, progressPercent: 65, remainingTime: '38 min restantes' }),
      catalogMovie({ id: 'cv-2', title: 'Crónicas de Shinjuku', subtitle: 'T1:E8 «La Falla»', type: 'series', description: 'Un detective retirado rastrea crímenes rituales bajo las luces de neón del Tokio nocturno.', year: 2024, rating: '18+', durationOrSeasons: 'T1:E8', matchRate: 99, qualityBadges: ['DOLBY VISION'], genres: ['Neo-noir', 'Drama'], cast: ['Ken Watanabe', 'Rinko Kikuchi'], director: 'Takashi Miike', imageId: 'photo-1503899036084-c55cdd92da26', videoUrl: `${video}BigBuckBunny.mp4`, progressPercent: 82, remainingTime: '12 min restantes' }),
      catalogMovie({ id: 'cv-3', title: 'Horizonte Evento', type: 'movie', description: 'Una misión de rescate en el borde de un agujero negro descubre que el tiempo corre en reversa.', year: 2022, rating: '13+', durationOrSeasons: '2 h 10 min', matchRate: 94, qualityBadges: ['IMAX', 'ATMOS'], genres: ['Espacio', 'Sci-Fi'], cast: ['Matthew Vance', 'Jessica Hall'], director: 'Christopher Nolan', imageId: 'photo-1451187580459-43490279c0fa', videoUrl: `${video}Sintel.mp4`, progressPercent: 45, remainingTime: '1 h 05 min restantes' }),
      catalogMovie({ id: 'cv-4', title: 'Poder Líquido', subtitle: 'T3:E2 «Auditoría Negra»', type: 'series', description: 'La batalla corporativa más sanguinaria de Wall Street por el control de la última reserva de litio.', year: 2024, rating: '16+', durationOrSeasons: '3 temporadas', matchRate: 91, qualityBadges: ['4K UHD'], genres: ['Thriller', 'Finanzas'], cast: ['Damian Lewis', 'Paul Giamatti'], director: 'Brian Koppelman', imageId: 'photo-1486406146926-c627a92ad1ab', videoUrl: `${video}ForBiggerBlazes.mp4`, progressPercent: 30, remainingTime: '45 min restantes' }),
    ],
  },
  {
    category: 'Aclamadas por la crítica y galardones',
    movies: [
      catalogMovie({ id: 'ac-1', title: 'La Medida del Cosmos', type: 'movie', description: 'Un astrónomo del siglo XIX descubre una señal periódica en las estrellas que desafía las leyes físicas.', year: 2023, rating: 'TP', durationOrSeasons: '1 h 58 min', matchRate: 99, qualityBadges: ['4K UHD', 'HDR10+'], genres: ['Drama histórico', 'Poético'], cast: ['Jeremy Irons', 'Florence Pugh'], director: 'Denis Villeneuve', imageId: 'photo-1516339901601-2e1b62dc0c45', videoUrl: `${video}TearsOfSteel.mp4`, awardBadge: '6 PREMIOS ÓSCAR' }),
      catalogMovie({ id: 'ac-2', title: 'Abismo Abisal', type: 'movie', description: 'Investigadores en la Fosa de las Marianas descubren una biosfera consciente que despierta.', year: 2024, rating: '16+', durationOrSeasons: '2 h 15 min', matchRate: 98, qualityBadges: ['DOLBY ATMOS'], genres: ['Suspenso', 'Claustrofóbico'], cast: ['Sigourney Weaver', 'Cillian Murphy'], director: 'James Cameron', imageId: 'photo-1518709268805-4e9042af9f23', videoUrl: `${video}ElephantsDream.mp4`, awardBadge: 'PALMA DE ORO' }),
      catalogMovie({ id: 'ac-3', title: 'Faro de Sombras', type: 'movie', description: 'Dos cuidadores de faro en una isla remota de Islandia enfrentan la locura y tormentas eternas.', year: 2023, rating: '18+', durationOrSeasons: '1 h 49 min', matchRate: 95, qualityBadges: ['4K UHD'], genres: ['Terror psicológico', 'Misterio'], cast: ['Willem Dafoe', 'Robert Pattinson'], director: 'Robert Eggers', imageId: 'photo-1507525428034-b723cf961d3e', videoUrl: `${video}Sintel.mp4`, awardBadge: 'FESTIVAL DE CANNES' }),
      catalogMovie({ id: 'ac-4', title: 'Nocturno en Si Menor', type: 'movie', description: 'La obsesiva odisea de un pianista de jazz ciego que persigue un acorde legendario por París.', year: 2024, rating: '13+', durationOrSeasons: '2 h 02 min', matchRate: 97, qualityBadges: ['DOLBY ATMOS', 'ULTRA HD'], genres: ['Música', 'Drama'], cast: ['Mahershala Ali', 'Léa Seydoux'], director: 'Damien Chazelle', imageId: 'photo-1511671782779-c97d3d27a1d4', videoUrl: `${video}ForBiggerBlazes.mp4`, awardBadge: 'MEJOR BANDA SONORA' }),
    ],
  },
  {
    category: 'Porque viste ciencia ficción',
    movies: [
      catalogMovie({ id: 'sf-1', title: 'Órbita Fantasma', type: 'movie', description: 'Una piloto despierta sola en una estación que no aparece en ningún mapa.', year: 2025, rating: '13+', durationOrSeasons: '1 h 52 min', matchRate: 97, qualityBadges: ['4K'], genres: ['Ciencia ficción', 'Misterio'], cast: ['Ava Torres', 'Hugo Lin'], director: 'Lina Ortega', imageId: 'photo-1446776811953-b23d57bd21aa', videoUrl: `${video}TearsOfSteel.mp4` }),
      catalogMovie({ id: 'sf-2', title: 'Neón Infinito', type: 'series', description: 'En una ciudad iluminada por recuerdos artificiales, una hacker busca su verdadera identidad.', year: 2025, rating: '16+', durationOrSeasons: '1 temporada', matchRate: 95, qualityBadges: ['HDR'], genres: ['Ciberpunk', 'Thriller'], cast: ['Noa Kim', 'Mateo Cruz'], director: 'Iris Bell', imageId: 'photo-1519608487953-e999c86e7455', videoUrl: `${video}BigBuckBunny.mp4` }),
      catalogMovie({ id: 'sf-3', title: 'La Última Señal', type: 'movie', description: 'Una señal desde el lado oscuro de la Luna cambia para siempre la historia de la humanidad.', year: 2024, rating: 'TP', durationOrSeasons: '2 h 06 min', matchRate: 93, qualityBadges: ['4K UHD'], genres: ['Espacio', 'Drama'], cast: ['Mara Stone', 'Eliot Reed'], director: 'Jonas Vale', imageId: 'photo-1462331940025-496dfbfc7564', videoUrl: `${video}Sintel.mp4` }),
      catalogMovie({ id: 'sf-4', title: 'Código Aurora', type: 'series', description: 'Tres ciudades compiten por controlar la primera inteligencia artificial consciente.', year: 2022, rating: '16+', durationOrSeasons: '2 temporadas', matchRate: 92, qualityBadges: ['DOLBY VISION'], genres: ['Tecnología', 'Drama'], cast: ['Lena Park', 'Ravi Shah'], director: 'Sofia Kim', imageId: 'photo-1519608487953-e999c86e7455', videoUrl: `${video}ElephantsDream.mp4` }),
    ],
  },
];
