# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

> Para simular la carga de datos en los ejemplos vamos utilizaremos la siguiente API:
>
> - themealdb [[ref](https://www.themealdb.com/)]

## error.tsx

> Para todos los ejemplos se toma el siguiente proyecto base [[ref](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-2)] (`branch: base-project-2`).

### ¿Qué es error.tsx?

`error.tsx` es una archivo especial del App Router que permite manejar errores de renderizado en una ruta específica mediante el patrón de Error Boundaries de React. Su función principal es capturar y renderizar errores que ocurren durante la renderización de rutas específicas, ya sea en Server Components, layouts, o en Client Components cuando se usan con Suspense.

Se trata de una forma declarativa y encapsulada de manejar errores específicos de una ruta o layout. A diferencia del enfoque tradicional de usar `try/catch`, este archivo permite desacoplar el manejo de errores de la lógica de renderizado, proporcionando una UX más robusta y una DX más mantenible.

Este archivo se define por ruta o layout, lo que significa que puedes tener un `error.tsx` global o uno local por sección.

> A tener en cuenta: Este archivo solo aplica en el contexto del App Router (introducido desde Next.js 13) y no funciona en el Pages Router.

### Principales características

- Se coloca en cualquier segmento del árbol de rutas bajo `app/`.

- Implementa un Error Boundary de React (`componentDidCatch` y `getDerivedStateFromError` implícitos).

- Soporta reinicio del estado con una función `reset()` que puede volver a intentar el render.

- Solo captura errores de render, efectos y render async (no fetch o lógica de backend).

- Puede anidarse: si falla un segmento hijo, se muestra su `error.tsx` más cercano.

- Se desactiva en tiempo de desarrollo para facilitar el debugging

- Puede coexistir con `loading.tsx`, `not-found.tsx` y `layout.tsx` en el mismo segmento.

- Soporte automático para streaming + Suspense.

### Ventajas

- Scoped boundaries: Evita que la app se caiga ante un error inesperado.

- Mejor experiencia de usuario: Se pueden ofrecer mensajes personalizados, opciones de reintento.

- Modularidad: Puedes tener un error boundary específico por sección (ej: `/movies`).

- Reintentos controlados: Puedes reiniciar el layout con `reset()` sin recargar.

- Separación de preocupaciones: El código de presentación del error vive separado del layout o de los componentes funcionales.

- Integración con Suspense: Permite capturar errores durante el rendering asíncrono.

### ¿Cómo se crea o implementa?

Dentro de cualquier segmento de ruta (`/app/dashboard/`, `/app/profile/`, etc.), crea un archivo llamado `error.tsx`, define un componente con la siguiente estructura base:

```typescript
// error.tsx

'use client';
interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorComponentProps) {
  return <div className="p-4 text-red-600">Mensaje de error.</div>;
}
```

### ¿Cómo funciona?

Internamente, Next.js se basa en el mecanismo de Error Boundaries de React, específicamente:

- Renderizado asíncrono: Cuando un Server Component falla, el error se propaga al boundary más cercano.

- React Error Boundary: Internamente, Next.js crea un ErrorBoundary React que envuelve los layouts y páginas.

- Streaming y Suspense: Si el error ocurre en medio del stream, la parte ya renderizada puede mantenerse, y solo se renderiza el fallback donde se requiera.

- Reset via React internals: La función `reset()` desencadena una reinicialización del segmento, limpiando cachés asociadas.

> Nota: los errores lanzados en métodos como `getServerSideProps`, `generateStaticParams`, o el backend no son capturados aquí. Estos requieren un middleware o logging a otro nivel.

### Ejemplos

**Ejemplo básico -Un error lanzado manualmente.**

Crea el `error.tsx` y `page.tsx` en `src/app/error-handling-ex`:

```typescript
// src/app/error-handling-ex/error.tsx
'use client';

import { useEffect } from 'react';

export default function RootError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error capturado en error.tsx: ', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-3xl font-semibold text-red-700 mb-4">
        ¡Oops! Algo salió mal
      </h2>
      <p className="text-gray-700 mb-2">
        {error.message || 'Error desconocido'}
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Reintentar
      </button>
    </div>
  );
}
```

```typescript
// app/error-handling-example/page.tsx

'use client';

import { useState } from 'react';

export default function ErrorExamplePage() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    // Este error será capturado por error.tsx
    throw new Error('Simulación de error manual');
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-blue-400 p-6">
      <h1 className="text-2xl font-bold mb-4">Manejo de errores en Next.js</h1>
      <p className="mb-2">Haz clic en el botón para lanzar un error.</p>
      <button
        onClick={() => setShouldThrow(true)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded cursor-pointer"
      >
        Lanzar error
      </button>
    </main>
  );
}
```

Actualiza la página principal `/app/page.tsx`:

```typescript
// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <Link
        href={'/error-handling-ex'}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Ir a error controlado
      </Link>
    </main>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando `http://localhost:3000`, da clic en "Ir a error controlado"

**¿Qué está pasando aquí?**

- Estado local con useState controla si debe lanzarse un error.

- Al lanzar el error, React lanza una excepción durante el render.

- Next.js detecta que hay un error.tsx en el mismo segmento de ruta y lo renderiza automáticamente.

- La función `reset()` reinicia el estado del segmento (React remonta el componente).

#### **Ejemplo - Petición de series top con la API de themoviedb (SSG)**

Crea el componente `List` en `src/components/`:

```typescript
// src/components/List.tsx

'use client';

interface List {
  id: number;
  name: string;
  first_air_date: string;
  original_title: string;
  release_date: string;
  poster_path: string;
  overview: string;
}

export default function List({ list }: { list: List[] }) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-3 p-4">
      {list.map((item) => (
        <div key={item.id} className="p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.name}
            className=" w-full h-auto object-cover border-8 border-slate-600"
          />
          <div className="text-gray-100 text-sm">
            <div className="truncate ">{item.name || item.original_title}</div>
            <div className="text-gray-400 ">
              (
              {item.first_air_date?.split('-')[0] ||
                item.release_date?.split('-')[0]}
              )
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

Crea el servicio `tmdbService` en `src/services/`:

```typescript
// src/services/tmdbService.ts

const TMDB_API_KEY = 'TU API KEY';

const BASE_URL = 'https://api.themoviedb.org/3';

export async function getSeries(type = 'tv') {
  let token = TMDB_API_KEY;

  if (!token) throw new Error('No API key provided');

  const res = await fetch(`${BASE_URL}/${type}/top_rated`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Error al obtener series: ${res.statusText}`);
  }

  const data = await res.json();
  return data.results;
}
```

Crea el `error.tsx`, `loading.tsx` y `page.tsx` en `src/app/series`:

```typescript
// src/app/series/loading.tsx

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800 text-gray-100">
      <div className="text-center animate-pulse space-y-2">
        <div className="text-xl font-semibold">Cargando series...</div>
        <div className="w-8 h-8 border-4 border-t-transparent border-emerald-400 rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
}
```

```typescript
// src/app/series/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error('Error en series:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800 text-gray-100">
      <h2 className="text-3xl font-semibold">¡Algo salió mal!</h2>
      <p className="mt-2 text-sm italic text-slate-500">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer"
      >
        Reintentar
      </button>
    </div>
  );
}
```

```typescript
// src/app/series/page.tsx

import { getSeries } from '@/services/tmdbService';
import List from '@/components/List';

export default async function SeriesPage() {
  const series = await getSeries();

  return (
    <main className="min-h-screen bg-slate-800">
      <h1 className="text-4xl font-bold px-4 py-2 text-emerald-400">
        Series Top
      </h1>
      <List list={series} />
    </main>
  );
}
```

Actualiza la página principal `/app/page.tsx`, agregando el `Link` a `/series`:

```typescript
// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <Link
        href={'/error-handling-ex'}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Ir a error controlado
      </Link>

      <Link
        href={'/series'}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        Ir a las series
      </Link>
    </main>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando `http://localhost:3000`, da clic en "Ir a las series".

Los siguientes pasos son para bloquear/desbloquear la API y probar el mensaje:

- Bloquea el dominio api.themoviedb.org desde tus herramientas de red o firewall (puedes usar herramientas como DevTools → Network conditions, Mock Service Worker, Charles Proxy, etc.)

- Accede a la página para forzar un error de red.

- Verifica que se muestra correctamente la interfaz de error.tsx

- Luego, desbloquea el dominio

- Haz clic en el botón "Reintentar" (que internamente ejecuta reset()), y observa cómo la página no renderiza correctamente (aunque ya no haya error).

Es importante comprender que `reset()` solo re-renderiza los componentes del lado del cliente. Si tu página o componentes dependen de datos o renderizado del lado del servidor (como es este caso), `reset()` por sí solo no actualizará esos contenidos.

Para forzar una re-renderización completa que incluye tanto componentes del lado del cliente como del servidor, se recomienda utilizar el hook `useRouter()` de next/navigation y la función `startTransition()` de React.

Esto va a garantizar una re-renderización sincronizada de ambos lados, cliente y servidor.

Actualiza `error.tsx`:

```typescript
// src/app/series/error.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, startTransition } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error('Error en series:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800 text-gray-100">
      <h2 className="text-3xl font-semibold">¡Algo salió mal!</h2>
      <p className="mt-2 text-sm italic text-slate-500">{error.message}</p>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer"
      >
        Reintentar
      </button>
    </div>
  );
}
```

**¿Por qué `startTransition`?**

- `reset()` es ideal para errores causados por interacciones del cliente, pero no reinicia la lógica del servidor.
- `router.refresh()` actualiza el contenido SSR/Server Components, pero no limpia el estado del cliente.
- `startTransition()` permite coordinar ambas operaciones sin bloquear el render principal, garantizando una experiencia fluida y coherente en toda la aplicación.

Ahora sí, repite todos los pasos…

#### **Ejemplo - Petición de películas top con la API de themoviedb (CSR)**

Crea el `error.tsx` y `page.tsx` en `src/app/movies`:

> Nota: Por ahora vamos a copiar y a pegar el mismo que tenemos en /app/series/error.tsx (más adelante veremos cómo reutilizar el mismo archivo de error)

```typescript
// Es el mismo que tenemos en src/app/series/error.tsx

// src/app/movies/error.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { startTransition } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error('Error en series:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800 text-gray-100">
      <h2 className="text-3xl font-semibold">¡Algo salió mal!</h2>
      <p className="mt-2 text-sm italic text-slate-500">{error.message}</p>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer"
      >
        Reintentar
      </button>
    </div>
  );
}
```

```typescript
// src/app/movies/page.tsx

'use client';

import { useEffect, useState } from 'react';
import List from '@/components/List';
import { getSeries } from '@/services/tmdbService';

interface Series {
  id: number;
  name: string;
  original_title: string;
  first_air_date: string;
  release_date: string;
  poster_path: string;
  overview: string;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Series[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getSeries('movie')
      .then((data) => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err); // Guardamos el error
        setIsLoading(false);
      });
  }, []);

  if (error) throw error; // Lanzamos el error para que se active error.tsx

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-800 text-gray-100">
        <div className="text-center animate-pulse space-y-2">
          <div className="text-xl font-semibold">Cargando películas...</div>
          <div className="w-8 h-8 border-4 border-t-transparent border-indigo-400 rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-800">
      <h1 className="text-4xl font-bold px-4 py-2 text-indigo-400">
        Peliculas Top
      </h1>
      {movies && <List list={movies} />}
    </main>
  );
}
```

Actualiza la página principal `/src/app/page.tsx`, agregando el `Link` a `/movies`:

```typescript
// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <Link
        href={'/error-handling-ex'}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Ir a error controlado
      </Link>
      <Link
        href={'/series'}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        Ir a las series
      </Link>
      <Link
        href={'/movies'}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Ir a las peliculas
      </Link>
    </main>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando `http://localhost:3000`, da clic en "Ir a las películas".

#### **Ejemplo - Cachar un error por componente con Suspense**

Instala desde la consola el paquete `react-error-boundary`:

```yaml
npm install react-error-boundary
```

Crea el componente `ErrorList` en `src/components/` :

Será el componente de React que se muestre cuando ocurre un error dentro de un Error Boundary.

```typescript
// src/components/ErrorList.tsx
'use client';

import { FallbackProps } from 'react-error-boundary';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export default function ErrorList({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const router = useRouter();
  return (
    <div className="p-2 flex items-center gap-4 bg-slate-600 rounded-md">
      <div className="text">¡Algo salió mal!</div>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            resetErrorBoundary();
          });
        }}
        className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-sm cursor-pointer"
      >
        Reintentar
      </button>
    </div>
  );
}
```

- 'use client' es obligatorio en App Router ya que indica que el archivo es un Client Component. Recuerda que los Error Boundaries de React solo funcionan en el cliente, ya que internamente usan el ciclo de vida `componentDidCatch` (inexistente en el server).

- Esta interfaz tipa las props que ErrorFallback recibe automáticamente cuando es usado en un `<ErrorBoundary />`.

- Al hacer clic en el botón "Reintentar", ejecuta `resetErrorBoundary()`, que reinicia el estado del Error Boundary (usa el mismo patrón que `reset()`).

Crea el componente `WrapperList` en `src/components`, será el encargado de llamar al servicio y mostrar la lista:

```typescript
import { getSeries } from '@/services/tmdbService';
import List from '@/components/List';

export default async function WrapperList({ type = 'tv' }: { type?: string }) {
  const media = await getSeries(type);
  return <List list={media} />;
}
```

Crea el componente `SkeletonList` en `src/components` :

```typescript
// src/components/SkeletonList.tsx

interface SkeletonProps {
repeat?: number;
}
export default function SkeletonList({ repeat = 1 }: SkeletonProps) {
return (

<div className="grid grid-cols-4 md:grid-cols-8 gap-4">
{Array.from({ length: repeat }).map((\_, index) => (
<div
          key={index}
          className="p-2 rounded animate-pulse space-y-2 min-h-50"
        >
<div className="h-2/3 bg-gray-300 rounded w-full " />
<div className="h-1/14 bg-gray-200 rounded w-3/4" />
<div className="h-1/16 bg-gray-200 rounded w-1/4" />
</div>
))}
</div>
);
}
```

Crea el `page.tsx` en `src/app/media`:

```typescript
// src/app/media/page.tsx

import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import SkeletonList from '@/components/SkeletonList';
import ErrorList from '@/components/ErrorList';
import WrapperList from '@/components/WrapperList';

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-slate-800 p-4 space-y-5">
      <h1 className="text-4xl font-bold text-pink-400">
        Películas y Series Top
      </h1>

      <h2 className="text-2xl font-bold text-pink-600">Series Top</h2>
      <ErrorBoundary FallbackComponent={ErrorList}>
        <Suspense fallback={<SkeletonList repeat={4} />}>
          <WrapperList />
        </Suspense>
      </ErrorBoundary>

      <h2 className="text-2xl font-bold text-pink-600">Películas Top</h2>
      <ErrorBoundary FallbackComponent={ErrorList}>
        <Suspense fallback={<SkeletonList repeat={4} />}>
          <WrapperList type="movie" />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
```

Donde:
**`<ErrorBoundary FallbackComponent={ErrorList}>`**

- Este es un Error Boundary que proviene de la librería react-error-boundary de React.

- Atrapa cualquier error en tiempo de render que ocurra dentro de sus hijos (`<Suspense>`, `<WrapperList>`, etc.).

- En lugar de mostrar una pantalla rota, renderiza el componente que le pasas como FallbackComponent.

- En este caso: ErrorList será el componente visual que se mostrará cuando ocurra un error.

**`<Suspense fallback={<SkeletonList repeat={4} />}>`**

- API de React y Next.js App Router que define una UI de carga temporal mientras se resuelve un componente asíncrono o una promesa (como un fetch o await en un Server Component).

- Si `<WrapperList />` tarda en resolver datos (como llamar a la API de TMDB), entonces se muestra el fallback: `<SkeletonList />`.

- El `Suspense` se reemplaza automáticamente por el contenido real una vez que se resuelve.

**`<WrapperList />`**

- Invoca `getSeries()`.

- Puede lanzar errores si la API falla (`throw new Error(...)`).

- Puede tardar en resolverse (por eso lo envolvemos en `Suspense`).

> **¿Por qué se hace así?**
> Porque `Suspense` no atrapa errores. Solo maneja carga (render async). `ErrorBoundary` no muestra loading UI, solo captura errores.

Actualiza la página principal `/src/app/page.tsx`, agregando el `Link` a `/media`:

```typescript
// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <Link
        href={'/error-handling-ex'}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Ir a error controlado
      </Link>

      <Link
        href={'/series'}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        Ir a las series
      </Link>

      <Link
        href={'/movies'}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Ir a las peliculas
      </Link>

      <Link
        href={'/movies'}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        Ir al Top
      </Link>
    </main>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando `http://localhost:3000`, da clic en "Ir al top".

### A considerar

- No captura errores de efectos (`useEffect`, etc.) → usa window.onerror o herramientas externas para eso.

- Compatible con Server Actions y `cache: 'no-store'`, aunque los errores deben lanzarse en el render.

- `error.tsx` debe ser un Client Component ya que necesita acceso a `reset()` y estados del cliente.

- No intentes capturar errores de eventos o efectos, no están soportados.

- Usa `reset()` solo si sabes que el error es transitorio.

---

## Ejecutar el proyecto

Para correr o ejecutar el proyecto [[ref]](https://nextjs.org/docs/app/getting-started/installation#run-the-development-server):

```bash
npm run dev
```

Abre en tu navegador:

```bash
http://localhost:3000
```

---

## Cómo descargar el proyecto

Clona el repositorio:

```bash
git clone https://github.com/mauriciogc/next.js-15.3-1
cd next.js-15.3-1
```

Cambia a la rama:

```bash
git checkout error
```

Instala las dependencias:

```bash
npm install
```

Ejecuta el proyecto en modo desarrollo:

```bash
npm run dev
```

Abre tu navegador en:

```yaml
http://localhost:3000
```
