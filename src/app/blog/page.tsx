// src/app/blog/page.tsx

import Link from 'next/link';

export default function BlogHomePage() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-zinc-800">Blog de ejemplo</h1>
      <p className="text-zinc-600">Elige una categoría para comenzar:</p>

      <div className="grid gap-2 grid-cols-2">
        <Link
          href="/blog/tech"
          className="block bg-cyan-900 text-white rounded-lg p-4 hover:bg-cyan-800 transition"
        >
          <h2 className="text-xl font-semibold">Tecnología</h2>
        </Link>

        <Link
          href="/blog/design"
          className="block bg-cyan-900 text-white rounded-lg p-4 hover:bg-cyan-800 transition"
        >
          <h2 className="text-xl font-semibold">Diseño</h2>
        </Link>
      </div>
    </div>
  );
}
