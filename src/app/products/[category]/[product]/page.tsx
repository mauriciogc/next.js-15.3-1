// src/app/products/[category]/[product]
export function generateStaticParams() {
  // Indicamos a Next.js que archivos se van a generar estáticamente
  return [
    { category: 'a', product: '1' },
    { category: 'b', product: '2' },
    { category: 'c', product: '3' },
    { category: 'c', product: '4' },
  ];
}

// Se generarán estáticamente cuatro versiones de esta página
// utilizando las `params` devueltas por `generateStaticParams`
// - /product/a/1
// - /product/b/2
// - /product/c/3
// - /product/d/4
export default async function Page({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category, product } = await params;
  return (
    <div className="p-4">
      category = {category}, product = {product}
    </div>
  );
}
