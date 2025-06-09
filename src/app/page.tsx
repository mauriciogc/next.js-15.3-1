// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-y-4">
      <h1 className="text-3xl font-bold">Página principal</h1>

      <Link href="/test" className="text-blue-500 hover:underline ">
        Test
      </Link>
    </main>
  );
}
