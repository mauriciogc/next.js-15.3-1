import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container gap-3">
      <h1 className="title">Página principal</h1>
      <Link
        href="/hello"
        className="flex pill-button pill-button-default pill-button-primary"
      >
        Go to Hello page
      </Link>

      <Link
        href="/dashboard"
        className="flex pill-button pill-button-default pill-button-primary"
      >
        Go to Dashboard page
      </Link>

      <Link
        href="/store"
        className="flex pill-button pill-button-default pill-button-primary"
      >
        Go to Store page
      </Link>

      <Link
        href="/wordle"
        className="flex pill-button pill-button-default pill-button-primary"
      >
        Go to Wordle page
      </Link>
    </main>
  );
}
