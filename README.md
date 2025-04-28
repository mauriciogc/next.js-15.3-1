# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Hook useParams

### ¿Qué es useParams?

`useParams` [[ref]](https://nextjs.org/docs/app/api-reference/functions/use-params) es un `hook` de Next.js para **App Router** que permite acceder a los parámetros dinámicos de la URL en componentes del lado del cliente.

### ¿Por qué se usa?

- Para acceder dinámicamente a valores `[slug]`, `[id]`, `[userId]`, etc. dentro de un componente cliente.

- Para renderizar dinámicamente contenido basado en la URL.

- Cuando no requieres hacer fetching server-side.

### Ventajas que tiene useParams

- Puedes leer los parámetros sin necesidad de hacer un componente server-side.

- Útil en componentes interactivos que dependen de la URL.

- No necesitas pasar params como propiedad.

### ¿Cómo funciona?

- Se importa desde `next/navigation`.

```typescript
import { useParams } from 'next/navigation';
```

Sólo puede usarse en componentes marcados con `'use client'`, es decir que el renderizado va a ser del lado del cliente (CSR).

Para el caso de `[foldername]`, `[slug]` va a retornar un objeto:

```typescript
// /posts → /posts
{ }

// /posts/[id] → /posts/123
{ id: "123" }

// posts/[tag]/[item] → posts/1/2
{ tag: "1", item: "2" }

// posts/[slug] → posts/3
{ slug: "3" }
Para el caso de [...slug], [[…slug]] va a retornar un arreglo:

// countries/[...slug]/ → countries/america/mexico
{ slug: ["america", "mexico"] }
```

**Ejemplo**

```yaml
src/app/posts/[id]/page.tsx
```

```typescript
// src/app/posts/[id]/page.tsx

'use client';

import { useParams } from 'next/navigation';

export default function PostView() {
  const params = useParams<{ id: string }>();

  return (
    <div className="p-4">
      <h1 className="text-2xl">Post ID: {params.id}</h1>
    </div>
  );
}
```

**Ejemplo 2**

```yaml
src/app/catalog/[[...slug]]/page.tsx
```

```typescript
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
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/catalog/men
http://localhost:3000/catalog/men/shoes
http://localhost:3000/catalog/men/shoes/running
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/1
```

### A considerar

- Solo lo puedes usar en componentes cliente (`'use client'` **obligatorio**).

- No reemplaza a params en componentes server-side.

- No hace fetch automático de datos, solo lee la URL.
