// src/app/posts/[id]/page.tsx

interface PageParams {
  id: string;
}

// La propiedad params es asincrona, por lo que se debe de tratar como promesa
interface PageProps {
  params: Promise<PageParams>;
}

export default async function PostPage({ params }: PageProps) {
  // Desestructuramos el id de params, ya que es una promesa
  const { id } = await params;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{id}</h1>
    </div>
  );
}
