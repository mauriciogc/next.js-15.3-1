// src/app/movies/page.tsx

'use client';

import { useEffect, useState } from 'react';
import List from '@/components/List';
import { getSeries } from '@/services/tmdbService';

interface Series {
  id: number;
  name: string;
  original_title: string;
  first_air_date: string;
  release_date: string;
  poster_path: string;
  overview: string;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Series[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getSeries('movie')
      .then((data) => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err); // Guardamos el error
        setIsLoading(false);
      });
  }, []);

  if (error) throw error; // Lanzamos el error para que se active error.tsx

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-800 text-gray-100">
        <div className="text-center animate-pulse space-y-2">
          <div className="text-xl font-semibold">Cargando películas...</div>
          <div className="w-8 h-8 border-4 border-t-transparent border-indigo-400 rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-800">
      <h1 className="text-4xl font-bold px-4 py-2 text-indigo-400">
        Peliculas Top
      </h1>
      {movies && <List list={movies} />}
    </main>
  );
}
