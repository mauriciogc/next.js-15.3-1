// src/services/tmdbService.tsx
const API_KEY = process.env.TMDB_API_KEY || '';
const BASE_URL = process.env.TMDB_BASE_URL || '';

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export interface Movie {
  id: number;
  title: string;
}

export interface MoviesResponse {
  results: Movie[];
}

export async function fetchMovies(category: string): Promise<MoviesResponse> {
  try {
    const url = `${BASE_URL}/movie/${category}`;
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
