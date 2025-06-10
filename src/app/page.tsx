// src/app/page.tsx
export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <p>Versión pública: {process.env.NEXT_PUBLIC_APP_VERSION}</p>
    </main>
  );
}
