// src/app/movies/
import { fetchMovies } from '@/services/tmdbService';

type Movie = {
  id: number;
  title: string;
};

export default async function MoviesPage() {
  const data = await fetchMovies('popular');

  return (
    <div>
      <ul>
        {data.results.map((movie: Movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
