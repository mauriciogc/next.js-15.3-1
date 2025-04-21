// src/app/csr/page.tsx

// ***Obligatorio: Componentes que se ejecutan en el navegador***
'use client';

import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

// Se declara y exporta el componente funcional llamado CSRPage
export default function CSRPage() {
  // Declaramos un estado, inicialmente es array vacío con la interface Post
  const [posts, setPosts] = useState<Post[]>([]);

  // Este efecto se ejecuta al montar el componente (en el navegador)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=500')
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">CSR – Client Side Rendering</h1>
      {posts.length === 0 && <p>Cargando...</p>}
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
