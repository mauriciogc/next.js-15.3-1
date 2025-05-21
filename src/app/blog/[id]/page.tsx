// src/app/blog/[id]/page.tsx

//import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error('¡Error inesperado en el render del post 13!');

  const blog = await res.json();
  return (
    <div className="p-4 space-y-3 ">
      <h1 className="text-2xl text-amber-400">{blog.title}</h1>
      <p className="text-gray-500">{blog.body}</p>
    </div>
  );
}
