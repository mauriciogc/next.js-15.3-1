// src/app/ssg/page.tsx

interface Post {
  id: number;
  title: string;
  body: string;
}

// Función para obtener los datos en el servidor en cada request
async function getPosts(): Promise<Post[]> {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=5',
    {
      // Asegura que se cachea la respuesta como estática
      next: { revalidate: false },
    }
  );
  if (!res.ok) throw new Error('Error al cargar posts');
  return res.json();
}

export default async function SSRPage() {
  try {
    const posts = await getPosts();

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          SSG - Static Site Generation
        </h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error('Error al cargar los posts:', error);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>No se pudieron cargar los posts.</p>
      </div>
    );
  }
}
