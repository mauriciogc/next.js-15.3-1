import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container">
      <h1 className="title">Página principal</h1>
      <div className="flex gap-3 flex-wrap items-center px-4 py-3 rounded-xl">
        <Link href="/login" className="pill-button pill-button-default">
          Iniciar sesión
        </Link>
        <Link href="/register" className="pill-button pill-button-default">
          Registrarse
        </Link>
      </div>
    </main>
  );
}
