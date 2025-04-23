// src/app/blog/[slug]/page.tsx

interface PageParams {
  slug: string[];
}

// La propiedad params es asincrona, por lo que se debe de tratar como promesa
interface BlogPageProps {
  params: Promise<PageParams>;
}

export default async function DocsPage({ params }: BlogPageProps) {
  // Desestructuramos el `slug` de params, ya que es una promesa
  const { slug } = await params;

  // Unimos los segmentos del slug para mostrarlos como una ruta
  const fullPath = slug.join('/');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Ruta: /docs/{fullPath}</h1>
      <p className="text-lg">Params: {JSON.stringify(slug, null, 2)}</p>
    </div>
  );
}
