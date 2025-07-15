// src/app/list-movies/page.tsx
import Image from 'next/image';
import { fetchMovies, Movie } from '@/services/tmdbService';

export default async function MoviesPage() {
  const { results } = await fetchMovies('week');

  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {results.map((movie: Movie) => (
          <div
            key={movie.id}
            className="relative w-full h-[400px] rounded-lg overflow-hidden border border-(--color-border) bg-(--color-muted) hover:shadow-lg transition-shadow"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPk2vyjHgAEugI2P+EanAAAAABJRU5ErkJggg=="
              priority={movie.id === results[0].id}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-(--color-background)/50 text-(--color-foreground) text-sm font-medium px-3 py-2 backdrop-blur-sm">
              {movie.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
