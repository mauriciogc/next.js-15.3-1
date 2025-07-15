// src/services/tmdbService.tsx

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export type Movie = {
  id: string;
  poster_path: string;
  title: string;
};

type MoviesResponse = {
  results: Movie[];
};

export async function fetchMovies(
  timeWindow: 'week' | 'day'
): Promise<MoviesResponse> {
  try {
    const url = `${BASE_URL}/trending/movie/${timeWindow}`;
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Error al obtener los datos: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error en fetchMovies:', error);
    throw error;
  }
}
