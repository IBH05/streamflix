// Start times in seconds. Keep exact on-disk filenames, including full-width punctuation.
export const TRAILERS = {
  arcane: ['Arcane (EN ESPAÑOL) ｜ Tráiler oficial ｜ Netflix [0qSarZpylxs].mp4', 0],
  batmanRises3: ['BATMAN： EL CABALLERO DE LA NOCHE ASCIENDE - Trailer 3 HD - Oficial de WB Pictures [ECc5lQUt6HQ].mp4', 5],
  batmanRises4: ['BATMAN： EL CABALLERO DE LA NOCHE ASCIENDE - Trailer 4 doblado al español HD oficial WB [aXU81Wzq4ts].mp4', 0],
  breakingBad: ['Breaking Bad - Trailer Estena [mXd1zTwcQ18].mp4', 1],
  fordVsFerrari: ['CONTRA LO IMPOSIBLE - Trailer Español Latino Sub 2019 [MpkLQg38aaY].mp4', 0],
  dahmer: ['DAHMER Tráiler Español Latino Subtitulado (2022) [Ro3iCwDUWFI].mp4', 0],
  chihiro: ['El Viaje De Chihiro - Trailer [0Fobamq5NdM].mp4', 5],
  jujutsuKaisen: ['JUJUTSU KAISEN： Ejecución - Tráiler Oficial [fYL0ni7N4bw].mp4', 2],
  laLaLand: ['La La Land 10th Anniversary (2026) Trailer - Ryan Gosling, Emma Stone, John Legend [Zfy4rGzZDes].mp4', 7],
  madMax: ['MAD MAX： FURIA EN EL CAMINO - Tráiler 2 (Doblado) - Oficial Warner Bros. Pictures [3KMMdqfwvmc].mp4', 8],
  nuestroPlaneta: ['Nuestro Planeta ｜ Tráiler oficial extendido ｜ Netflix [IrER_EpwGjg].mp4', 0],
  parasitos: ['Parásitos - Trailer español (HD) [90dWVETAdtI].mp4', 2],
  shogun: ['Shōgun ｜ Tráiler oficial subtitulado en castellano ｜ Disney+ [HGMfpNxv5H4].mp4', 0],
  theOffice: ['Simulacro de Incendio ｜ The Office Latinoamérica [Bx6e_1a18ow].mp4', 0],
  spiderMan: ['Spider-Man Un Nuevo Día ｜ Tráiler Oficial (Doblado) [Pw1X-57Ms-8].mp4', 0],
  starWars: ['Star Wars Episode III： Revenge of the Sith - Trailer [5UnjrG_N8hU].mp4', 12],
  strangerThings: ['Stranger Things Season 2 Comic-Con Trailer (2017) ｜ TV Trailer ｜ Movieclips Trailers [bRG5HeNKwKY].mp4', 1],
  theBear: ['The Bear ｜ Season 5 Official Trailer ｜ Jeremy Allen White, Ayo Edebiri, Ebon Moss-Bachrach ｜ FX [ojjCvICC86c].mp4', 0],
  huye: ['¡HUYE! - TRAILER A - DOBLADO [xGhKr2uNkI4].mp4', 0],
  batmanBegins: ['＂Batman Begins (2005)＂ Theatrical Trailer #2 [-6aIuxNRtNk].mp4', 11],
} as const;

export function trailer(key: keyof typeof TRAILERS) {
  const [filename, start] = TRAILERS[key];
  return { trailerUrl: `/trailers/${filename}`, trailerStartSeconds: start };
}

const movieTrailers: Record<string, keyof typeof TRAILERS> = {
  'star-wars-episodio-3': 'starWars', 'dahmer': 'dahmer',
  'spider-man-un-nuevo-dia': 'spiderMan', 'batman-inicia': 'batmanBegins',
  // Requested demo assignment: the spare file is a second trailer for The Dark Knight Rises.
  'batman-el-caballero-de-la-noche': 'batmanRises4',
  'batman-el-caballero-de-la-noche-asciende': 'batmanRises3',
  'breaking-bad': 'breakingBad', 'arcane': 'arcane', 'ford-vs-ferrari': 'fordVsFerrari',
  'el-viaje-de-chihiro': 'chihiro', 'jujutsu-kaisen': 'jujutsuKaisen',
  'la-la-land': 'laLaLand', 'mad-max-furia-en-el-camino': 'madMax',
  'nuestro-planeta': 'nuestroPlaneta', 'parasitos': 'parasitos', 'shogun': 'shogun',
  'the-office': 'theOffice', 'stranger-things': 'strangerThings', 'the-bear': 'theBear', 'huye': 'huye',
};

export function trailerForMovie(id: string) {
  const key = movieTrailers[id];
  return key ? trailer(key) : undefined;
}
