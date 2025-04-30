// src/app/shop/[...slug]

export function generateStaticParams() {
  // Indicamos a Next.js que archivos se van a generar estáticamente
  return [
    { slug: ['a', '1'] },
    { slug: ['b', '2'] },
    { slug: ['c', '3'] },
    { slug: ['c', '4'] },
  ];
}

// Se generarán estáticamente tres versiones de esta página
// utilizando las `params` devueltas por `generateStaticParams`
// - /shop/a/1
// - /shop/b/2
// - /shop/c/3
// - /shop/c/4
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return (
    <div className="p-4">Parámetros recibidos: {JSON.stringify(slug)}</div>
  );
}
