// src/app/movies/[category]/layout.tsx

// Títulos de las categorías
const CATEGORY_TITLES: Record<string, string> = {
  popular: 'más populares',
  'now-playing': 'en cartelera',
  upcoming: 'próximamente',
  'top-rated': 'mejor calificadas',
};

// Layout de la categoría de películas
export default async function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    category: string;
  }>;
}) {
  const { category } = await params;
  const categoryLabel = CATEGORY_TITLES[category];

  if (!categoryLabel) {
    return (
      <div className="flex flex-col min-h-screen">
        <h2 className="text-xl font-semibold p-2">Categoría no encontrada</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-xl font-semibold p-2">Películas {categoryLabel}</h2>
      <section className="flex-grow p-2 bg-white">{children}</section>
    </div>
  );
}
