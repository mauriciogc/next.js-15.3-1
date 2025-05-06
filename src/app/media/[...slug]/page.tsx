//src/app/media/[...slug]/page.tsx

import Link from 'next/link';

export default async function MediaPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-700 text-white p-2">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-gray-300">
              Inicio
            </Link>
          </div>
        </div>
      </nav>
      <h2 className="text-xl font-semibold p-2">Por categoría</h2>
      <p>Ruta actual: /media/{slug.join('/')}</p>
      <pre className="mt-4 bg-amber-100 text-amber-700 p-2 rounded">
        {JSON.stringify(slug, null, 2)}
      </pre>
    </div>
  );
}
