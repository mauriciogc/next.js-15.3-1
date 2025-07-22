// src/app/hello/page.tsx
'use client';

import dynamic from 'next/dynamic';

// Lazy load sin SSR
const Hello = dynamic(() => import('@/components/hello'), {
  ssr: false,
  loading: () => <p className="text-(--color-muted)">Cargando componente...</p>,
});

export default function HomePage() {
  return (
    <main className="container">
      <h1 className="title">Hello Page</h1>
      <Hello />
    </main>
  );
}
