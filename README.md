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

```typescript
//src/app/layout.tsx

import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex flex-col min-h-screen">
          <nav className="bg-gray-700 text-white p-4">
            <ul className="flex space-x-4">
              <li>Dashboard</li>
              <li>Movies</li>
              <li>TV Shows</li>
            </ul>
          </nav>

          <main className="flex-grow p-4 bg-white text-gray-800">
            {children}
          </main>

          <footer className="bg-gray-800 text-white p-4 text-center">
            &copy; 2025
          </footer>
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

**Ejemplo 2 (Layout para `/movies`)**

```typescript
// src/app/movies/layout.tsx

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-xl font-semibold p-2">
        Bienvenido a la sección de Películas
      </h2>
      <section className="flex-grow p-2 bg-white">{children}</section>
    </div>
  );
}
```

```typescript
// src/app/movies/page.tsx

export default function MoviesPage() {
  return (
    <div>
      <p>Lista de secciones próximamente...</p>
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/movies
```

### ¿Cómo funcionan?

- Cuando Next.js renderiza una ruta, empieza desde el layout raíz (`/app/layout.tsx`) hacia abajo anidando los layouts (si aplica) necesarios antes de mostrar la página.

- Los layouts NO se desmontan al navegar entre subrutas dentro del mismo segmento.

- Permite que componentes como `Header`, `Navbar`, `Footer`, `Sidebar`, `Context Providers`, etc persistan y no pierdan su estado.

### Layouts con params

Desde **Next.js 15**, los layouts también pueden recibir los parámetros dinámicos (`params`) de la URL. Bastante útil cuando necesitas personalizar la estructura del layout (idioma, categoría, tipo, etc) de acuerdo a la ruta activa.

```yaml
app/dasboard/[team]/layout.js   → /dasboard/1 → { team: '1' }
app/shop/[tag]/[item]/layout.js → /shop/1/2   → { tag: '1', item: '2' }
app/blog/[...slug]/layout.js    → /blog/1/2   → { slug: ['1', '2'] }
```

**Ejemplo 3 (Layout para `/movies/[category]` con `params`)**

```typescript
// src/app/movies/[category]/layout.tsx

// Títulos de las categorías
const CATEGORY_TITLES: Record<string, string> = {
  popular: 'más populares',
  'now-playing': 'en cartelera',
  upcoming: 'próximamente',
  'top-rated': 'mejor calificadas',
};

// Layout de la categoría de películas
export default async function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    category: string;
  }>;
}) {
  const { category } = await params;
  const categoryLabel = CATEGORY_TITLES[category];

  if (!categoryLabel) {
    return (
      <div className="flex flex-col min-h-screen">
        <h2 className="text-xl font-semibold p-2">Categoría no encontrada</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-xl font-semibold p-2">Películas {categoryLabel}</h2>
      <section className="flex-grow p-2 bg-white">{children}</section>
    </div>
  );
}
```

```typescript
// src/app/movies/[category]/page.tsx

export default function MoviesPage() {
  return (
    <div>
      <p>Lista de películas próximamente...</p>
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/movies/popular
http://localhost:3000/movies/now-playing
http://localhost:3000/movies/upcoming
http://localhost:3000/movies/top-rated
```

### A considerar

- `layout.tsx` debe incluir siempre la propiedad `{children}`.

- Es un Componente Server por defecto.

- No reciben la propiedad `searchParams` y `pathname` ya que los layouts no se vuelven a renderizar.

- Solo recibe params si está en una carpeta dinámica (`[id]`, `[slug]`, etc).

- Los params no se actualizan entre rutas hijas si no cambia el segmento.

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
