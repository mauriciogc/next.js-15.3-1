// src/app/services/tmdbService.tsx

const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDhiYjcxZTc0MzY5NjJlZTU1NGRjYTM2MjI4NWMyNSIsIm5iZiI6MTQwODk5ODQ3NS40MDksInN1YiI6IjUzZmI5YzRiYzNhMzY4NzM1MjAwNTEzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fZkT-UrteTuSdwgUSpqIfKqiB-dFUs6sIepZ1sr4xMI';

const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function fetchMovies(category: string): Promise<any> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

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
