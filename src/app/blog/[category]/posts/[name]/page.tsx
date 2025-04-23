// src/app/blog/[category]/posts/[name]/page.tsx

interface PageParams {
  category: string;
  name: string;
}

// La propiedad params es asincrona, por lo que se debe de tratar como promesa
interface PageProps {
  params: Promise<PageParams>;
}

export default async function BlogPostPage({ params }: PageProps) {
  // Desestructuramos los parámetros de la promesa
  const { category, name } = await params;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Post: {name}</h1>
      <p className="text-lg">Categoría: {category}</p>
    </div>
  );
}
