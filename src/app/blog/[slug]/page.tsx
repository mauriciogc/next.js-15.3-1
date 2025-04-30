// src/app/blog/[slug]/page.tsx

export const dynamicParams = false;

export function generateStaticParams() {
  // Indicamos a Next.js que archivos se van a generar estáticamente
  return [{ slug: '1' }, { slug: '2' }];
}

// Se generarán estáticamente tres versiones de esta página
// utilizando las `params` devueltas por `generateStaticParams`
// - /blog/1
// - /blog/2
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <div className="p-4">Parámetros recibidos: {slug}</div>;
}
