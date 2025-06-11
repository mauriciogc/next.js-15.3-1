// src/services/tmdbService.ts
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;

export async function getSeries(type = 'tv') {
  if (!API_KEY) throw new Error('No API key provided');

  const res = await fetch(`${BASE_URL}/${type}/top_rated`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Error al obtener series: ${res.statusText}`);
  }

  const data = await res.json();
  return data.results;
}
