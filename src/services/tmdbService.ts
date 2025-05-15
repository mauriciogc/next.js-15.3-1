// src/services/tmdbService.ts

const TMDB_API_KEY = 'TU API';

const BASE_URL = 'https://api.themoviedb.org/3';

export async function getSeries(type = 'tv') {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  let token = TMDB_API_KEY;

  if (!token) throw new Error('No API key provided');

  const res = await fetch(`${BASE_URL}/${type}/top_rated`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  setTimeout(() => {}, 3000);

  if (!res.ok) {
    throw new Error(`Error al obtener series: ${res.statusText}`);
  }

  const data = await res.json();
  return data.results;
}
