# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

> Para simular la carga de datos en los ejemplos vamos utilizaremos la siguiente API:
>
> - themoviedb [[ref](https://developer.themoviedb.org/docs/getting-started)]

## Layout.tsx

> Para todos los ejemplos se toma el siguiente proyecto base [[ref](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-2)] (`branch: base-project-2`).

### ¿Qué es layout.tsx?

El archivo `layout.tsx` es un **Server Component** especial y persistente que define la estructura común que comparten todas las páginas hijas dentro de una ruta.

Cuando colocas un archivo `layout.tsx` en cualquier subcarpeta dentro de `app/`, este se ejecuta una sola vez y envuelve todas las subrutas que estén dentro.

### Principales características

- Define una estructura compartida: `Header`, `Navbar`, `Footer`, `Sidebar`, `Context Providers`, etc.

- Se mantiene entre rutas hijas, lo que evita repetir estructura común.

- Soporta anidamiento, puedes tener layouts dentro de layouts.

- Compatible con `loading.tsx`, `error.tsx` y `not-found.tsx`, lo que permite una experiencia de usuario más fluida.

- Puede recibir `params` dinámicos (versión +15).

### Ventajas

- No se desmonta al navegar dentro del mismo layout.

- Puedes tener múltiples layouts para cada grupo (ej. `/admin`, `/dashboard`, `/blog`, etc).

- Puedes envolver componentes con `ThemeProvider`, `AuthContext`, etc.

- Solo cambia el contenido y no el layout, por lo que mejora exponencialmente el rendimiento.

### ¿Cómo se crea?

- Crea una carpeta con nombre de ruta (ej. `scr/app/dashboard`, `src/app/movies`)

- Dentro de la carpeta crea `layout.tsx`.

- Debes incluir siempre la propiedad `{children}`

**Ejemplo de `/src/app/layout.tsx` (RootLayout)**

Crea el componente `Navbar` y `Footer` en `src/components/`:

```typescript
// src/components/Navbar.tsx
'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-950 text-white px-6 py-4">
      <ul className="flex space-x-8 items-center">
        <li>
          <Link href="/" className="hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/media/movies" className="hover:underline">
            Movies
          </Link>
        </li>
        <li>
          <Link href="/media/series" className="hover:underline">
            Series
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
```

```typescript
// app/components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white p-4 text-center">
      &copy; 2025
    </footer>
  );
};

export default Footer;
```

Importa el componente `Navbar`, `Footer` al layout global (**RootLayout**) `src/app/layout.tsx`:

```typescript
//src/app/layout.tsx

import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow bg-white text-gray-800">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
```

> Nota: Este `layout` se usa para toda la app. Es ideal para colocar fuentes, temas y estructura general de HTML.

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000
```

> Importante: Es obligatorio siempre poner `{children}`, ya que durante la renderización se rellenará con los segmentos de ruta.

### Layouts anidados

Puedes tener layouts dentro de subcarpetas y Next.js los encapsulará automáticamente.

**Ejemplo de /src/media/[...slug]/layout.tsx (Layout anidado)**

Crea el layout y su página en src/app/media/[...slug]/ :

```typescript
// src/app/media/[...slug]/layout.tsx

export default async function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <h2 className="text-xl font-semibold p-2">
        Lista de películas y series.
      </h2>
      <section className="flex-grow p-2 bg-white">{children}</section>
    </div>
  );
}
```

```typescript
//src/app/media/[...slug]/page.tsx

export default async function MediaPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <p>Tarjetas de {slug.join('/')}</p>
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), acceder a `http://localhost:300` y navega por el menú.

### Layouts independientes

Agrega al menú `Navbar` la sección de "Person" :

```typescript
// src/components/Navbar.tsx
'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-950 text-white px-6 py-4">
      <ul className="flex space-x-8 items-center">
        <li>
          <Link href="/" className="hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/media/movies" className="hover:underline">
            Movies
          </Link>
        </li>
        <li>
          <Link href="/media/series" className="hover:underline">
            Series
          </Link>
        </li>
        <li>
          <Link href="/person" className="hover:underline">
            Person
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
```

Crea el layout y su página en `src/app/person/` :

```typescript
export default function PersonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 min-h-screen bg-slate-200 text-slate-800">
      <div className="p-2">
        <h1 className="text-3xl font-bold">Personas destacadas</h1>
        <p className="text-sm text-gray-400 mt-1">
          Descubre actores, directores y figuras del cine y TV
        </p>
        <div className="p-2 border-b border-slate-400"></div>
      </div>
      <section className="flex-grow p-2">{children}</section>
    </div>
  );
}
```

```typescript
// src/app/person/page.tsx

export default function PersonPage() {
  return (
    <div>
      <p>Aquí aparecerán las tarjetas de personas más populares...</p>
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), acceder a `http://localhost:300` y navega por el menú.

### ¿Cómo funcionan?

- Cuando Next.js renderiza una ruta, empieza desde el layout raíz (`/app/layout.tsx`) hacia abajo anidando los layouts (si aplica) necesarios antes de mostrar la página.

- Los layouts NO se desmontan al navegar entre subrutas dentro del mismo segmento.

- Permite que componentes como `Header`, `Navbar`, `Footer`, `Sidebar`, `Context Providers`, etc persistan y no pierdan su estado.

### Layouts con params

Desde **Next.js 15**, los layouts también pueden recibir los parámetros dinámicos (`params`) de la URL. Bastante útil cuando necesitas personalizar la estructura del layout (idioma, categoría, tipo, etc) de acuerdo a la ruta activa.

**Ejemplo de /src/media/[...slug]/layout.tsx con params**

Actualiza el layout `media/[...slug]/layout`:

```typescript
// src/app/media/[...slug]/layout.tsx

const TYPE_TITLES: Record<string, string> = {
  movies: 'Películas',
  series: 'Series',
};

export default async function MoviesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const [type] = slug;
  const typeLabel = TYPE_TITLES[type];

  if (!typeLabel) {
    return (
      <div className="flex flex-col min-h-screen p-4">
        <h2 className="text-xl font-semibold p-2">Tipo no encontrado.</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-4">
      <h2 className="text-xl font-semibold p-2">Lista de {typeLabel}</h2>
      <section className="flex-grow p-2 bg-white">{children}</section>
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), acceder a `http://localhost:300` y navega por el menú.

**Ejemplo de menú dinámico y rutas dinámicas avanzadas (más de un parámetro)**
Crea el menú dinámico en `src/constants/navigation.ts`:

```typescript
//src/constants/navigation.ts

export const NAVIGATION = {
  dashboard: {
    label: 'Dashboard',
    path: '/',
    children: null,
  },
  movies: {
    label: 'Películas',
    path: '/media/movies',
    children: {
      popular: { label: 'Populares', path: '/popular' },
      'top-rated': { label: 'Mejor valoradas', path: '/top-rated' },
      upcoming: { label: 'Próximamente', path: '/upcoming' },
      'now-playing': { label: 'En cines', path: '/now-playing' },
    },
  },
  series: {
    label: 'Series',
    path: '/media/series',
    children: {
      popular: { label: 'Populares', path: '/popular' },
      'top-rated': { label: 'Mejor valoradas', path: '/top-rated' },
      'now-playing': { label: 'En emisión', path: '/now-playing' },
    },
  },
} as const;
```

Importa `NAVIGATION` y actualiza el componente `NavBar`:

```typescript
// src/components/Navbar.tsx

'use client';

import Link from 'next/link';
import { NAVIGATION } from '@/constants/navigation';

const Navbar = () => {
  return (
    <nav className="bg-blue-950 text-white px-6 py-4">
      <ul className="flex space-x-8 items-center">
        {Object.entries(NAVIGATION).map(([key, { label, path, children }]) => (
          <li key={key} className={children ? 'relative group' : ''}>
            <Link href={path} className="hover:underline">
              {label}
            </Link>
            {children && (
              <ul className="absolute top-full left-0 mt-1 bg-white text-black shadow-md rounded-md py-2 w-48 z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                {Object.entries(children).map(
                  ([key, { label, path: cpath }]) => (
                    <li key={key}>
                      <Link
                        href={`${path}${cpath}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
```

Importa `NAVIGATION` y actualizar el layout `media/[...slug]/layout`

```typescript
// src/app/media/[...slug]/layout.tsx

import { NAVIGATION } from '@/constants/navigation';

export default async function MoviesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const [type, category] = slug ?? [];

  // Obtener el label principal (type)
  const typeData = NAVIGATION[type as keyof typeof NAVIGATION];
  const typeLabel = typeData?.label;

  // Obtener el label del children (category)
  const categoryData =
    typeData?.children?.[category as keyof typeof typeData.children];
  const categoryLabel = categoryData?.label;

  return (
    <div className="flex flex-col min-h-screen p-4">
      <h2 className="text-xl font-semibold p-2">
        {typeLabel} {categoryLabel ? ` - ${categoryLabel}` : ''}
      </h2>
      <section className="flex-grow p-2 bg-white">{children}</section>
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), acceder a `http://localhost:300` y navega por el menú.

### A considerar

- `layout.tsx` debe incluir siempre la propiedad `{children}`.

- Es un Componente Server por defecto.

- No reciben la propiedad `searchParams` y `pathname` ya que los layouts no se vuelven a renderizar.

- Solo recibe params si está en una carpeta dinámica (`[id]`, `[slug]`, etc).

- Los params no se actualizan entre rutas hijas si no cambia el segmento.

- No puedes sobrescribir layouts.

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
git checkout layout
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
