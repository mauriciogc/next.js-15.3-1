// src/app/blog/tech/page.tsx

export default async function TechArticlesPage() {
  // Simulación de carga (como si estuvieras esperando un fetch real)
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Aqui van los últimos articulos de tecnología...
      </h1>
    </div>
  );
}
