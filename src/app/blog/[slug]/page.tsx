// src/app/blog/[slug]/page.tsx

interface PageParams {
  slug: string;
}

// La propiedad params es asincrona, por lo que se debe de tratar como promesa
interface BlogPageProps {
  params: Promise<PageParams>;
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  // Desestructuramos el `slug` de params, ya que es una promesa
  const { slug } = await params;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Post: {slug}</h1>
    </div>
  );
}
