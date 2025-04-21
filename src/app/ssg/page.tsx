// src/app/ssg/page.tsx

interface Post {
  id: number;
  title: string;
  body: string;
}

// Esta función se ejecuta durante el build y los resultados se guardan como HTML estático
async function getPosts(): Promise<Post[]> {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=500',
    {
      // Asegura que se cachea la respuesta como estática
      next: { revalidate: false },
    }
  );

  if (!res.ok) throw new Error('Error al cargar posts');
  return res.json();
}

// Se declara y exporta el componente funcional llamado SSGPage
export default async function SSGPage() {
  const posts = await getPosts();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">SSG – Static Site Generation</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-2">
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
