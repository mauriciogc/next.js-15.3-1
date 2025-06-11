// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-3">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <p>Versión pública: {process.env.NEXT_PUBLIC_APP_VERSION}</p>
      <div className="bg-gray-100 text-center text-sm p-2 text-gray-600">
        Ambiente actual: {process.env.NEXT_PUBLIC_ENV}
      </div>

      <Link href="/movies" className="text-blue-500 hover:underline ">
        Lista de películas populares
      </Link>
    </main>
  );
}
