# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## `loading.tsx`

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-2)**] (branch: base-project-2).** Este proyecto contiene los archivos: `src/app/page.tsx` y `src/app/layout.tsx`, configurados con una estructura mínima.

> Para simular la carga de datos en los ejemplos vamos utilizar la API **themoviedb**[[ref](https://developer.themoviedb.org/docs/getting-started)].

### ¿Qué es `loading.tsx`?

`loading.tsx` es un archivo especial en el sistema de rutas del **App Router** de Next.js que permite definir una interfaz de carga **para una ruta específica** mientras se resuelven **datos o componentes asincrónicos**. Su función principal es proporcionar un **fallback** **visual** **inmediato** (como un spinner, skeleton o mensaje) mientras la página o el layout asociado se termina de cargar.

`loading.tsx` es una convención de archivo introducida con el App Router (Next.js 13+), altamente **integrada** con la **arquitectura** moderna basada en `React Suspense`, _streaming server rendering_, y componentes de servidor/cliente mixtos.

> Internamente, Next.js lo utiliza como fallback de un `<Suspense />`.

### Principales características

- **Scoped**: Se define por carpeta de ruta, por lo que su efecto es local.

- ️**Autocapturado por el sistema de rutas**: No requiere ser importado ni llamado manualmente.
- **Compatible con streaming y suspense**: Ideal para experiencias graduales de renderizado.
- **Funciona tanto para layouts como para página**s: Se puede colocar en niveles anidados.
- **React Server Component por defect**o, pero **puede convertirse en Client Component** si lo necesita (**`'use client'`**).
- **Se activa automáticamente** cuando un layout o page está en proceso de carga (SSR/SSG con `await`, fetch, etc.).

### Ventajas

- **Mejora la experiencia de usuario (UX)**: Evita pantallas en blanco o parpadeos mientras se carga contenido.

- **Streaming progresivo**: Permite que el contenido se renderice por partes y el usuario vea una respuesta rápida.
- **Composición modular**: Se puede personalizar por cada ruta anidada, generando feedback visual contextual.
- **Evita cargar lógica manualmente con** `Suspense` **en cada página**: Al definir `loading.tsx`, Next.js lo gestiona por ti.
- **Mejor percepción de velocidad**: Reduce la sensación de lentitud en aplicaciones pesadas o cargadas de datos.

### ¿Cómo se crea o implementa?

- Dentro de una carpeta de ruta (`app/`, `app/about/`, `app/[slug]/`, etc.), crea un archivo `loading.tsx`.

- Exporta un componente React de servidor (usualmente un _spinner_, _placeholder_ o _skeleton_).

```js
// app/loading.tsx

export default function Loading() {
  return <p>Cargando aplicación...</p>;
}
```

- Al navegar o renderizar rutas que impliquen carga asincrónica, Next.js lo mostrará automáticamente.

Ejemplo en la estructura de carpetas:

![](https://cdn-images-1.medium.com/max/1600/1*hdNoab8XHE8KQwlGCq0AkA.png)

### ¿Cómo funciona?

Antes de entender cómo funciona `loading.tsx`, expliquemos brevemente qué es `Suspense` de React.

`**Suspense**` **es un componente de React que suspende temporalmente la renderización** mientras se resuelve una operación asíncrona, como un `fetch()` o una importación dinámica. Durante ese tiempo, en lugar de mostrar contenido vacío, React **muestra el contenido definido en el `fallback`**.

`loading.tsx` **funciona como un fallback implícito para Suspense**. En el App Router, Next.js **genera automáticamente un árbol de `<Suspense>` alrededor de cada segmento de ruta que tenga un `loading.tsx`**, convirtiéndolo en un punto de carga segmentado y controlado.

Se activa cuando hay:

- Promesas pendientes (`await` en `layout.tsx`, `page.tsx`, o `server actions`) o Lazy imports dinámicos (`dynamic()`)

Internamente, Next.js aplica la estrategia de **segment-based streaming**:

- El layout se empieza a renderizar desde la raíz.

- Si encuentra un layout hijo o una página que no ha terminado, renderiza el `loading.tsx` de esa ruta.
- Cada segmento tiene su propio “flight” (mensaje serializado) en el streaming que React renderiza progresivamente.
- Una vez resulto, reemplaza el `loading.tsx` con el contenido real.

**Esto sucede automáticamente e implícitamente sin necesidad de usar** `Suspense` **manualmente.**

![](https://cdn-images-1.medium.com/max/1600/1*w1Y6Aym1o6qwRYDl5vy02Q.png)

Esto es **posible** gracias al **soporte** **nativo** de **React 18** para `Suspense` y al streaming parcial de Next.js. Cuando la promesa de los datos se resuelve, el contenido final reemplaza al fallback `loading.tsx` sin necesidad de un re-render completo del árbol.

> **Importante:** No hay fallback global si no defines `loading.tsx`, por lo que solo se mostraría una pantalla en blanco hasta que todo el árbol se resuelva.

#### ¿Qué activa `loading.tsx` ?

- Uso de `fetch()` en un server component.

- Server Component o Carda de layout anidado.
- Navegación entre rutas con `Link` y siempre y cuando hay un fetching involucrado.

### Ejemplos

#### Ejemplo básico — loading en la raíz

Crea el componente `loading` en `src/app/`:

```js
// app/loading.tsx

export default function LoadingRoot() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center animate-pulse space-y-4">
        <div className="text-3xl font-semibold">Cargando contenido...</div>
        <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
}
```

En `app/page.tsx` vamos tener un `fecth` artificial

```js
//src/app/page.tsx

export default async function Home() {
  // Simula una carga de 5s
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <main className="flex justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold">Página principal</h1>
    </main>
  );
}
```

> **Recuerda**: El `loading.tsx` se activa automáticamente porqué `page.tsx` contiene código asíncrono.

![](https://cdn-images-1.medium.com/max/1600/1*BE6Tkl9D8iS2enh-mRTXEg.png)

Al iniciar el servidor (`npm run dev`), acceder a `[http://localhost:300](http://localhost:300)`, verás el `loading.tsx` durante 5 segundos y luego se cargará el contenido.

![](https://cdn-images-1.medium.com/max/1600/1*wHvV-PB4_r4ojKhOirgvSA.gif)

#### Ejemplo — loading anidado

Crea el componente `Navbar` en `src/components/`:

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
          <Link href="/movies" className="hover:underline">
            Movies
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
```

Importa el componente `Navbar` al layout global (**RootLayout**) `src/app/layout.tsx`:

```js
//src/app/layout.tsx

import Navbar from '@/components/Navbar';
import './globals.css';

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
        </div>
      </body>
    </html>
  );
}
```

Crea el componente `Card` en `/src/components/`:

```js
//src/components/Card.tsx

interface CardProps {
  title: string;
  imageUrl: string;
  age: string;
}

const Card = ({ title, imageUrl, age }: CardProps) => {
  return (
    <div className="relative rounded shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-auto object-cover" />

      <div className="text-gray-800 p-2 text-md text-center font-bold truncate">
        {title} <span className="text-gray-500 font-normal">({age})</span>
      </div>
    </div>
  );
};

export default Card;
```

Crea el archivo `.env.local` dentro del directorio raíz del proyecto (no dentro de `/src`):

```ini
# TMDB Config
TMDB_API_KEY = abcd1234supersecret
TMDB_BASE_URL = https://api.themoviedb.org/3
```

Crea el servicio `tmdbService` en `/src/services/` :

```js
// src/services/tmdbService.tsx

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function fetchMovies(category: string): Promise<any> {
  try {
    const url = `${BASE_URL}/movie/${category}`;
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Error al obtener los datos: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error en fetchMovies:', error);
    throw error;
  }
}
```

Crea el `loading.tsx` y `page.tsx` de movies en `src/app/movies/`:

```js
// app/movies/loading.tsx

export default function MoviesLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen text-gray-800">
      <div className="text-center space-y-4 animate-pulse">
        <div className="text-xl font-bold">Cargando películas...</div>
        <div className="w-8 h-8 border-4 border-t-transparent border-blue-400 rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
}
```

```js
// src/app/movies/page.tsx

import Card from '@/components/Card';
import { fetchMovies } from '@/services/tmdbService';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w400';

type Movie = {
  id: number,
  title: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
};

export default async function MoviesPage() {
  try {
    const data = await fetchMovies('popular');
    const movies: Movie[] = data.results;

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            age={movie.release_date.slice(0, 4)}
            imageUrl={`${IMAGE_URL}${movie.poster_path}`}
          />
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 text-red-500">
        <h1 className="text-xl font-bold">Error</h1>
        <p>
          No se pudieron cargar los datos. Por favor, inténtalo de nuevo más
          tarde.
        </p>
      </div>
    );
  }
}
```

![](https://cdn-images-1.medium.com/max/1600/1*A_68ahjpR42XdWKapVr-Dg.png)

Al iniciar el servidor (`npm run dev`), acceder a `[http://localhost:300](http://localhost:300)`, navega a la sección de `Movies`, verás el `loading.tsx` y luego se cargará el contenido.

![](https://cdn-images-1.medium.com/max/1600/1*3bwb6XulCV7zlbDveKof0w.gif)

#### Ejemplo — Cargando el loading más cercano

Actualiza el componente `Navbar`, agregando el `Link` a blog:

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
          <Link href="/movies" className="hover:underline">
            Movies
          </Link>
        </li>
        <li>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
```

Crea el `loading.tsx` y `page.tsx` del blog en `src/app/blog`:

```js
// src/app/blog/loading.tsx

export default function BlogLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 text-gray-800">
      <div className="w-8 h-8 border-4 border-t-transparent border-yellow-400 rounded-full animate-spin mx-auto" />
      <p className="text-2xl font-bold">Soy el cargando del blog.</p>
    </div>
  );
}
```

```js
// src/app/blog/page.tsx

import Link from 'next/link';

export default function BlogHomePage() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-zinc-800">Blog de ejemplo</h1>
      <p className="text-zinc-600">Elige una categoría para comenzar:</p>

      <div className="grid gap-2 grid-cols-2">
        <Link
          href="/blog/tech"
          className="block bg-cyan-900 text-white rounded-lg p-4 hover:bg-cyan-800 transition"
        >
          <h2 className="text-xl font-semibold">Tecnología</h2>
        </Link>

        <Link
          href="/blog/design"
          className="block bg-cyan-900 text-white rounded-lg p-4 hover:bg-cyan-800 transition"
        >
          <h2 className="text-xl font-semibold">Diseño</h2>
        </Link>
      </div>
    </div>
  );
}
```

Crea el `loading.tsx` y `page.tsx` de tech en `src/app/blog/tech`:

```js
// src/app/blog/tech/loading.tsx

export default function TechLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-100 text-gray-800">
      <div className="w-8 h-8 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin mx-auto" />
      <p className="text-2xl font-bold">Soy el cargando exclusivo del Tech.</p>
    </div>
  );
}
```

```js
// src/app/blog/tech/page.tsx

export default async function TechArticlesPage() {
  // Simulación de carga (como si estuvieras esperando un fetch real)
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Aqui van los últimos articulos de tecnología...
      </h1>
    </div>
  );
}
```

Crea la `page.tsx` de design en `src/app/blog/design`:

```js
// src/app/blog/design/page.tsx

export default async function DesignArticlesPage() {
  // Simulación de carga (como si estuvieras esperando un fetch real)
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Aqui van los últimos articulos de diseño...
      </h1>
    </div>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*3Pw56UgB3SFyZfbiTurw5A.png)

Al iniciar el servidor (`npm run dev`), acceder a `[http://localhost:300](http://localhost:300)`, ve a la sección de blog y navega en las dos secciones que tiene (`blog/tech` y `blog/design`).

![](https://cdn-images-1.medium.com/max/1600/1*DFjrpSwgP2NTKlIsdTkAog.gif)

Podemos observar lo siguiente:

- Al acceder a `/blog/tech`, se muestra su propio `loading.tsx`.

- Al entrar a `/blog/design`, se activa el `loading.tsx` que está en la carpeta `/blog`.

Esto tiene todo el sentido si analizamos la estructura de carpetas de forma jerárquica:

![](https://cdn-images-1.medium.com/max/1600/1*ZR3miyda1P2etKDRf4kaQw.png)

#### ¿Por qué ocurre esto?

Esto se debe al **comportamiento jerárquico implícito** del sistema de archivos del App Router en Next.js.

> **Recuerda**: Next.js usará el archivo `loading.tsx` más cercano hacia arriba en la jerarquía de carpetas (con excepción del `loading.tsx` global en `app/`, que solo se activa si ninguna ruta intermedia lo reemplaza).

Entonces:

- Si estás en `/blog/tech` y existe `app/blog/tech/loading.tsx` **se usa ese**.

- Si estás en `/blog/design` y no existe `app/blog/design/loading.tsx` **se usa** `app/blog/loading.tsx`.

#### Ejemplo — ¿Qué pasaría si eliminamos `src/app/blog/loading.tsx`?

Cambiale el nombre a `src/app/blog/loading.tsx`

![](https://cdn-images-1.medium.com/max/1600/1*7Egz_erl5wJ2-GhzJcXiOw.png)

Al iniciar el servidor (`npm run dev`), acceder a `[http://localhost:300](http://localhost:300)`, ve a la sección de blog y navega en las dos secciones que tiene (`blog/tech` y `blog/design`).

![](https://cdn-images-1.medium.com/max/1600/1*D1ndfiDwW5B-GY_EB8G6fg.gif)

Al quitar el archivo `loading.tsx` de la carpeta `/blog`, el comportamiento **solo cambia para aquellas rutas que dependían de él como fallback**. Veamos los efectos por ruta:

- **`/blog`— No habrá UI de carga durante el renderizado**. Si esta página incluye un `fetch` o contenido asincrónico, **no se mostrará ningún loading**.

- **`/blog/tech`— Sigue mostrando su propio `loading.tsx`.**
- **`/blog/design`— No se mostrará ningún loading**, ya que no tiene uno propio y tampoco hay algún `**loading.tsx**` **en la cadena jerárquica** que pueda usarse como fallback.

### A considerar

- **Si quieres usar animaciones o hooks** (`useEffect`, `useState`), añade `'use client'` al inicio.

- **No lo confundas con un loading global**; este es por ruta.

- **No lo uses para lógicas críticas**: es una UI visual que puede durar milisegundos.
- Cada carpeta puede tener su propio `loading.tsx`. Next usará el más cercano.
- No uses `loading.tsx` si no deseas mostrar UI de carga personalizada.
- Para contenido cliente con `Suspense`, usa `fallback` dentro del componente.
- Evita cargar librerías pesadas en `loading.tsx` para no impactar negativamente su performance.
- Solo funciona en rutas con `page.tsx` o `layout.tsx` que sean async.

---

Hasta este punto, has aprendido cómo funciona `loading.tsx` en Next.js con App Router, entendiendo su rol como fallback automático durante la carga asíncrona de layouts y páginas, así como también comprendiste cómo implementar un `loading` básico a nivel de ruta, cómo definir `loading.tsx` anidados dentro de subrutas, y cómo Next.js detecta y muestra el **loading más cercano y específico** según la jerarquía del segmento activo.

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
git checkout loading
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
