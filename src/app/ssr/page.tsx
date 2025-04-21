// src/app/ssr/page.tsx

interface Post {
  id: number;
  title: string;
  body: string;
}

// Función para obtener los datos en el servidor en cada request
async function getPosts(): Promise<Post[]> {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=500'
  );
  if (!res.ok) throw new Error('Error al cargar posts');
  return res.json();
}

// Se declara y exporta el componente funcional llamado SSRPage
export default async function SSRPage() {
  const posts = await getPosts();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">SSR – Server Side Rendering</h1>
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
