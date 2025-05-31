// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gray-800 auth-layout space-x-3 space-y-3">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <Link href="/login" className="text-blue-500 hover:underline ">
        Iniciar sesión
      </Link>
      <Link href="/register" className="text-blue-500 hover:underline ">
        Registrarse
      </Link>

      <h2 className="text-2xl">Admin</h2>
      <Link href="/users" className="text-blue-500 hover:underline ">
        Users
      </Link>
      <h3 className="text-xl">Dashboard</h3>
      <Link href="/overview" className="text-blue-500 hover:underline ">
        Overview
      </Link>
      <Link href="/analytics" className="text-blue-500 hover:underline ">
        Analytics
      </Link>
      <h3 className="text-xl">Settings</h3>
      <Link href="/profile" className="text-blue-500 hover:underline ">
        Profile
      </Link>
      <Link href="/preferences" className="text-blue-500 hover:underline ">
        Preferences
      </Link>
    </main>
  );
}
