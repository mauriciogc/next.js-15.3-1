// src/app/movies/page.tsx

// Importamos el componente Card y la función fetchMovies
import Card from '@/components/Card';
import { fetchMovies } from '@/services/tmdbService';

// Definimos la URL base para las imágenes
const IMAGE_URL = 'https://image.tmdb.org/t/p/w400';

// Definimos la interfaz Movie para tipar los datos de las películas
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

export default async function MoviesPage() {
  try {
    const data = await fetchMovies('popular');
    const movies: Movie[] = data.results;

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            age={movie.release_date.slice(0, 4)}
            imageUrl={`${IMAGE_URL}${movie.poster_path}`}
          />
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 text-red-500">
        <h1 className="text-xl font-bold">Error</h1>
        <p>
          No se pudieron cargar los datos. Por favor, inténtalo de nuevo más
          tarde.
        </p>
      </div>
    );
  }
}
