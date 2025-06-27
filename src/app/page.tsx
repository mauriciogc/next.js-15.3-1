// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container">
      <h1 className="title">Página principal</h1>
      <div className="flex gap-3 flex-wrap items-center px-4 py-3 rounded-xl">
        <Link
          href={'/gallery'}
          className="pill-button pill-button-active flex items-center"
        >
          Gallery
        </Link>

        <Link
          href={'/projects'}
          className="pill-button pill-button-active flex items-center"
        >
          Projects
        </Link>
      </div>
    </main>
  );
}
