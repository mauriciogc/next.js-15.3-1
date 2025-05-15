// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <Link
        href={'/error-handling-ex'}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Ir a error controlado
      </Link>

      <Link
        href={'/series'}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        Ir a las series
      </Link>

      <Link
        href={'/movies'}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Ir a las peliculas
      </Link>

      <Link
        href={'/media'}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        Ir al Top
      </Link>
    </main>
  );
}
