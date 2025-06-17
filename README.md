# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## layout.tsx

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-2)**] (branch: base-project-2).** Este proyecto contiene los archivos: `src/app/page.tsx` y `src/app/layout.tsx`, configurados con una estructura mínima.

### ¿Qué es `layout.tsx`?

El archivo `layout.tsx` es una convención del **App Router** de Next.js 13+, usado para **definir la estructura persistente** de una **ruta** y sus **subrutas**. Es un **Server Component** por defecto que se renderiza una única vez y permanece **montado entre navegaciones** dentro de su árbol de rutas.

Su propósito principal es **encapsular** **elementos** como _headers, sidebars, footers, providers (theme, auth, etc.) y layout visual_, **evitando su re-renderizado innecesario**, mejorando el rendimiento y facilitando la composición modular de interfaces complejas.

### Principales características

- **Persistencia entre rutas hijas:** evita desmontes innecesarios.
- **Composición jerárquica:** layouts anidados para estructuras complejas.

- **Server Components por defecto:** ideales para render inicial optimizado.
- **Soporte de `params` dinámicos** (desde Next.js 15+).
- **Compatible con Server Components y Client Components**.
- Compatible con `loading.tsx`, `error.tsx`, `not-found.tsx`.
- Ideal para envolver contextos (Auth, Theme, i18n, etc).

### Ventajas

- **Rendimiento superior:** el layout no se desmonta, solo cambia el contenido.

- **Código más limpio y DRY:** evita repetir estructura visual.
- **Mejor experiencia de usuario:** transiciones más suaves.
- **Extensibilidad:** permite layouts independientes para secciones como `/admin`, `/dashboard`, `/auth`, etc.
- **Composición reactiva:** ideal para diseño basado en componentes reutilizables.

### ¿Cómo se crea o implementa?

- Dentro de una carpeta de ruta (`app/`, `app/about/`, `app/[slug]/`, etc.), crea un archivo `layout.tsx`.

- Exporta un componente React de servidor.
- **Usa** `**children**` **obligatoriamente.**

```js
// Layout.tsx

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
```

Ejemplo en la estructura de carpetas:

![](https://cdn-images-1.medium.com/max/800/1*IULDIKTb-o0mJ0YLiq4EWw.png)

### ¿Cómo funcionan?

Cuando Next.js renderiza una ruta, **comienza desde el layout raíz** (`/app/layout.tsx`) y desciende anidando todos los layouts correspondientes hasta llegar a la página.

- Los layouts se procesan en el **servidor** durante la construcción de la ruta.

- Internamente, Next.js utiliza el **árbol de rutas** (`Routing Tree`) para componer los layouts y las páginas.
- Cada layout puede agregar **su propia capa de HTML, CSS o lógica**.
- Al ser Server Components por defecto, su ejecución **no llega al cliente** salvo que se use `'use client'`.
- Se integran con el sistema de **streaming y suspense**, lo que permite mostrar contenido progresivamente.
- `params` se resuelve antes del renderizado del layout si está dentro de una carpeta dinámica.
- Los layouts **no se desmontan** al navegar dentro del mismo grupo.

Esto permite que estados como autenticación, navegación, temas o menús, se mantengan persistentes.

#### Visualización de la página principal (`/`)

![](https://cdn-images-1.medium.com/max/800/1*9paKdRYNzUev7c-XDRIMzA.png)

#### Visualización de la página `/media/movies` (`/media/[...slug]` )

![](https://cdn-images-1.medium.com/max/800/1*hYLiZrJ0sCtdvLoDTBPDRA.png)

#### Visualización de la página `/person`

![](https://cdn-images-1.medium.com/max/800/1*nvevAxQy8RZ_LYhJtLXmow.png)

### Ejemplos

#### Ejemplo básico — Layout raíz

Crea el componente `Navbar` y `Footer` en `src/components/`:

```js
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

```js
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

Importa el componente `Navbar, Footer` al layout global (**RootLayout**) `src/app/layout.tsx`:

```js
//src/app/layout.tsx

import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
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

![](https://cdn-images-1.medium.com/max/800/1*xQXYAF6ykUSBOfLkxSxtlA.png)

Al iniciar el servidor `npm run dev`, podrás acceder a esta página visitando:

```yaml
http://localhost:3000
```

![](https://cdn-images-1.medium.com/max/1600/1*DfHR0C-aeeZ2hjt-j3vlug.gif)

> **Importante**: Es **obligatorio** siempre poner `{children}`, ya que durante la renderización se rellenará con los segmentos de ruta.

#### Ejemplo — Layout anidado

Puedes tener **layouts** **dentro** de **subcarpetas** y **Next.js** los **encapsula** **automáticamente**.

Crea el `layout.tsx` y `page.tsx` de media en `src/app/media/[...slug]/` :

```js
// src/app/media/[...slug]/layout.tsx

export default async function MoviesLayout({
  children,
}: {
  children: React.ReactNode,
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

```js
//src/app/media/[...slug]/page.tsx

export default async function MediaPage({
  params,
}: {
  params: Promise<{ slug: string[] }>,
}) {
  const { slug } = await params;
  return (
    <div>
      <p>Tarjetas de {slug.join('/')}</p>
    </div>
  );
}
```

![](https://cdn-images-1.medium.com/max/800/1*ynqhnpYsH88Ix1KsepegEQ.png)

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:300` y navegar por el menú.

![](https://cdn-images-1.medium.com/max/1600/1*UMmZvq2ZQ9PiKlbQ4Ei9Aw.gif)

#### Ejemplo — Layouts independientes

Agrega al menú `Navbar` la sección de “_Person_” :

```js
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

Crea el `loading.tsx` y `page.tsx` de person en `src/app/person/` :

```js
// src/app/person/layout.tsx

export default function PersonLayout({
  children,
}: {
  children: React.ReactNode,
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

```js
// src/app/person/page.tsx

export default function PersonPage() {
  return (
    <div>
      <p>Aquí aparecerán las tarjetas de personas más populares...</p>
    </div>
  );
}
```

![](https://cdn-images-1.medium.com/max/800/1*LPRmVP1kQ41s2OjO6976Xw.png)

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:300` y navegar por el menú.

![](https://cdn-images-1.medium.com/max/1600/1*6-UyogaNZmE0Cc3acZxMJA.gif)

#### Ejemplo — Layout con `params` y navegación dinámica

Desde **Next.js 15**, los **layouts** también pueden recibir los **parámetros dinámicos (**`params`**) de la URL**. Bastante útil cuando necesitas **personalizar la estructura del layout** (idioma, categoría, tipo, etc) de acuerdo a la ruta activa.

Actualiza el layout `media/[...slug]/layout`:

```js
// src/app/media/[...slug]/layout.tsx

const TYPE_TITLES: Record<string, string> = {
  movies: 'Películas',
  series: 'Series',
};

export default async function MoviesLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{ slug: string[] }>,
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

![](https://cdn-images-1.medium.com/max/800/1*wx2DytWfLr5fDTEEJ15EBQ.png)

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:300` y navegar por el menú.

![](https://cdn-images-1.medium.com/max/1600/1*nPzbJ8Pn17bY2PDBZs-DiQ.gif)

#### Ejemplo — Layout con más de un `params` y navegación dinámica

Crea el menú dinámico `NAVIGATION` en `src/constants/navigation.ts`:

```js
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

```js
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

Importa `NAVIGATION` y actualizar el layout `media/[...slug]/layout` :

```js
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

![](https://cdn-images-1.medium.com/max/800/1*ocGI8Sw2D5UW6zdtk7rrWw.png)

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:300` y navegar por el menú.

![](https://cdn-images-1.medium.com/max/1600/1*ax9KZGbLjwBqwXor7FnjGQ.gif)

### A considerar

- `layout.tsx` **debe incluir** `{children}`, siempre.
- **No** puedes acceder a `searchParams` o `pathname` dentro de layouts.
- **No** se deben usar **hooks** (`useEffect`) **directamente** a menos que sea un **Client Component**.

- **Puedes** **anidar layouts indefinidamente**, pero evita sobreestructura innecesaria.
- **No puedes sobrescribir layouts existentes** desde una subruta.
- Los `params` solo se **actualizan** si el **segmento** dinámico **cambia** (no entre rutas hijas estáticas).

---

Hasta este punto, has aprendido a utilizar `layout.tsx` como pilar para la estructura visual y lógica de tu aplicación Next.js. Has explorado cómo definir un layout global, cómo anidar layouts dentro de rutas específicas, e incluso cómo personalizar su comportamiento con `params` dinámicos.

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
