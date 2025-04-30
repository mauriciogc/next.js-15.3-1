// src/app/product/[id]

export function generateStaticParams() {
  // Indicamos a Next.js que archivos se van a generar estáticamente
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

// Se generarán estáticamente tres versiones de esta página
// utilizando las `params` devueltas por `generateStaticParams`
// - /product/1
// - /product/2
// - /product/3
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div className="p-4">Id params: {id} </div>;
}
