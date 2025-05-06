//src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <nav className="bg-gray-700 text-white p-2">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-gray-300">
              Inicio
            </Link>
            <Link href="/movies" className="hover:text-gray-300">
              Películas
            </Link>
            <Link href="/series" className="hover:text-gray-300">
              Series
            </Link>
          </div>
        </div>
        <div className="bg-gray-500 px-4 py-2">
          <div className="flex space-x-4">
            <Link href="/media/movies/action" className="hover:text-gray-300">
              Acción
            </Link>
            <Link href="/media/movies/comedy" className="hover:text-gray-300">
              Comedia
            </Link>
            <Link href="/media/movies/drama" className="hover:text-gray-300">
              Drama
            </Link>
            <Link href="/media/series/anime" className="hover:text-gray-300">
              Anime
            </Link>
            <Link
              href="/media/series/documentary"
              className="hover:text-gray-300"
            >
              Documentales
            </Link>
          </div>
        </div>
      </nav>
    </main>
  );
}
