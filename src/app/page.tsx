// src/app/page.tsx
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

      <p>Admin</p>
      <div className="flex gap-3 flex-wrap items-center px-4 py-3 rounded-xl">
        <Link href="/users" className="pill-button pill-button-default">
          Usuarios
        </Link>
      </div>

      <p>Dashboard</p>
      <div className="flex gap-3 flex-wrap items-center px-4 py-3 rounded-xl">
        <Link href="/overview" className="pill-button pill-button-default">
          Overview
        </Link>

        <Link href="/analytics" className="pill-button pill-button-default">
          Analytics
        </Link>
      </div>

      <p>Settings</p>
      <div className="flex gap-3 flex-wrap items-center px-4 py-3 rounded-xl">
        <Link href="/profile" className="pill-button pill-button-default">
          Profile
        </Link>

        <Link href="/preferences" className="pill-button pill-button-default">
          Preferences
        </Link>
      </div>
    </main>
  );
}
