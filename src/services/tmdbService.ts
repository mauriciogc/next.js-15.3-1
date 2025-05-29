// src/services/tmdbService.ts

const TMDB_API_KEY = 'TU API KEY';

const BASE_URL = 'https://api.themoviedb.org/3';

export async function getSeries(type = 'tv') {
  if (!TMDB_API_KEY) throw new Error('No API key provided');

  const res = await fetch(`${BASE_URL}/${type}/top_rated`, {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Error al obtener series: ${res.statusText}`);
  }

  const data = await res.json();
  return data.results;
}
