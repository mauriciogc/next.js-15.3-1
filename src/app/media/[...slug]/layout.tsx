// src/app/media/[...slug]/layout.tsx

import { NAVIGATION } from '@/constants/navigation';

export default async function MoviesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const [type, category] = slug ?? [];

  // Obtener el label principal (type)
  const typeData = NAVIGATION[type as keyof typeof NAVIGATION];
  const typeLabel = typeData?.label;

  // Obtener el label del children (category)
  const categoryData =
    typeData?.children?.[category as keyof typeof typeData.children];
  const categoryLabel = categoryData?.label;

  return (
    <div className="flex flex-col min-h-screen p-4">
      <h2 className="text-xl font-semibold p-2">
        {typeLabel} {categoryLabel ? ` - ${categoryLabel}` : ''}
      </h2>
      <section className="flex-grow p-2 bg-white">{children}</section>
    </div>
  );
}
