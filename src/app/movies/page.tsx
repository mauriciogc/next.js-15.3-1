import { fetchMovies } from '../../services/tmdbService';

export default async function MoviesPage() {
  const data = await fetchMovies('popular');

  return (
    <div>
      <ul>
        {data.results.map((movie: any) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
