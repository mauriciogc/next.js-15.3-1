//src/app/page.tsx

export default async function Home() {
  // Simula una carga
  //await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <main className="flex justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold">Página principal</h1>
    </main>
  );
}
