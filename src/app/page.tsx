import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <Link
        href={'/dashboard'}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Dashboard
      </Link>
      <Link
        href={'/about'}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        Sobre nosotros
      </Link>

      <Link
        href={'/blog/hello-world'}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Blog - Hello World
      </Link>
      <Link
        href={'/blog/admin'}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Blog - Admin
      </Link>
    </main>
  );
}
