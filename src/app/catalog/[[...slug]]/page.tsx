// src/app/catalog/[[...slug]]/page.tsx

'use client';

import { useParams } from 'next/navigation';

export default function CatalogPage() {
  const params = useParams<{ slug?: string[] }>();

  return (
    <div>
      <h2 className="text-xl mb-2">
        Parámetros recibidos: {JSON.stringify(params.slug || 'Sin parámetros')}
      </h2>

      {params.slug?.length ? (
        <p>Has navegado a: /{params.slug.join('/')}</p>
      ) : (
        <p>Estás en el catálogo principal</p>
      )}
    </div>
  );
}
