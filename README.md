# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

Cuando trabajamos con rutas dinámicas, es importante saber cuando puede ser conveniente usar CSR, SSR o SSG con cada tipo de segmento (`[slug]`, `[...slug]`, `[[...slug]]`, `[id]`).

A continuación veremos varios ejemplos, utilizando APIs públicas y distintas estrategias de renderizado híbrido.

Para simular la carga de datos en los ejemplos vamos utilizaremos las siguientes APIs:

- Poke API[ref]

- Dungeons and Dragons[ref]

- Anime Schedule [ref]

---

## CSR (Client Side Rendering)

### `[slug]`

- Contenido que depende de interacciones del usuario o datos del navegador.

- Permite una experiencia de usuario más dinámica.

```yaml
src/app/csr/pokemon/[slug]/page.tsx
```

```typescript
// src/app/csr/pokemon/[slug]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

// Definimos la interfaz para el objeto Pokemon
interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

export default function PokemonPage() {
  // Obtenemos el slug de la URL
  const { slug } = useParams();
  // Definimos el estado para almacenar el Pokemon
  const [pokemon, setPokemon] = useState<Pokemon>();
  // Definimos el estado para almacenar el error
  const [error, setError] = useState<string | null>(null);

  // Efecto para obtener el Pokemon de la API cuando el slug cambia
  // y almacenarlo en el estado
  useEffect(() => {
    if (slug) {
      setError(null);
      fetch(`${API_URL}/${slug}`)
        .then((res) => res.json())
        .then((data: Pokemon) => setPokemon(data))
        .catch(setError);
    }
  }, [slug]);

  if (error)
    return <p className="p-4 text-red-500">Error al cargar los datos</p>;

  if (!pokemon) return <p>Cargando...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/csr/pokemon/charmander
http://localhost:3000/csr/pokemon/ditton
http://localhost:3000/csr/pokemon/pikachu
```

Si haces clic derecho en la página y seleccionas **"Ver el código fuente de la página"**, podrás validar que el contenido no aparece dentro del HTML. Esto ocurre porque la página fue renderizada en el cliente (CSR), y el contenido se genera después con JavaScript/React una vez que la app ha sido cargada en el navegador.

### `[…slug]`

- Ideal para contenido que depende de interacciones del usuario o datos del navegador.

- Permite una experiencia de usuario más dinámica.

```yaml
src/app/csr/dnd/[...slug]/page.tsx
```

```typescript
// src/app/csr/dnd/[...slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const API_URL = 'https://www.dnd5eapi.co/api/monsters';

// Interfaz para los datos del país
interface Monster {
  name: string;
  type: string;
  image: string;
}

export default function Page() {
  // Obtenemos el slug de la URL
  const { slug } = useParams<{ slug: string[] }>();
  // Definimos el estado para almacenar el monstruo
  const [monster, setMonster] = useState<Monster | null>(null);
  // Definimos el estado para almacenar el error
  const [error, setError] = useState<string | null>(null);

  // Efecto para obtener el monstruo de la API cuando el slug cambia
  // y almacenarlo en el estado
  useEffect(() => {
    // Si no hay slug, no hacemos nada
    if (slug && slug.length > 1) {
      const [, monsterName] = slug;
      fetch(`${API_URL}/${monsterName}`)
        .then((res) => res.json())
        .then((data: Monster) => setMonster(data))
        .catch(setError);
    } else {
      setError('No se ha encontrado el monstruo');
    }
  }, [slug]);

  if (error)
    return <p className="p-4 text-red-500">Error al cargar los datos</p>;

  if (!monster) return <p>Cargando...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold capitalize">{monster.name}</h1>
      <img
        src={`https://www.dnd5eapi.co${monster.image}`}
        alt={monster.name}
        className="w-48"
      />
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/csr/dnd/monster/aboleth
http://localhost:3000/csr/dnd/monster/adult-brass-dragon
http://localhost:3000/csr/dnd/monster/acolyte
```

### `[[…slug]]`

- Puedes construir URLs muy flexibles para filtros.

- Si no se proporciona ningún parámetro, la ruta sigue funcionando.

- Todo se maneja del lado del cliente, permitiendo interacción sin recarga.

```yaml
src/app/csr/anime/[[...slug]]/page.tsx
```

```typescript
// src/app/csr/anime/[[...slug]]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const API_URL = 'https://animeschedule.net/api/v3/anime';
const IMAGE_URL = 'https://img.animeschedule.net/production/assets/public/img';

// Definimos la interfaz para el objeto Anime
interface Anime {
  id: number;
  title: string;
  year: number;
  imageVersionRoute: string;
}

interface AnimeAPIResponse {
  anime: Anime[];
}

// Este componente se encarga de mostrar la información de los animes
// según los parámetros de búsqueda que se pasen en la URL.
// Por ejemplo: anime/2023/tv/action/kikansha-no-mahou
export default function AnimePage() {
  // Obtenemos el slug de la URL
  const params = useParams<{ slug?: string[] }>();
  // Definimos el estado para almacenar los animes
  const [anime, setAnime] = useState<Anime[] | null>(null);
  // Definimos el estado para almacenar el error
  const [error, setError] = useState<string | null>(null);

  const slugArray = params.slug || [];

  // Efecto para obtener los animes de la API cuando el slug cambia
  // y almacenarlos en el estado
  useEffect(() => {
    const [year, type, genre, title] = slugArray;
    const queryParams = new URLSearchParams();
    if (title) queryParams.append('q', title.split('-').join(' '));
    if (genre) queryParams.append('genres', genre);
    if (type) queryParams.append('media-types', type);
    if (year) queryParams.append('years', year);

    fetch(`${API_URL}?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data: AnimeAPIResponse) => setAnime(data.anime))
      .catch(setError);
  }, [slugArray]);

  if (error)
    return <p className="p-4 text-red-500">Error al cargar los datos</p>;

  if (!anime) {
    return <p className="p-4">Cargando...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Resultados de búsqueda</h1>
      <ul>
        {anime.map((an) => (
          <li key={an.id}>
            <h2 className="text-lg font-semibold truncate">{an.title}</h2>
            <img
              src={`${IMAGE_URL}/${an.imageVersionRoute}`}
              alt={an.title}
              className="w-32 h-32 object-cover"
            />
            <p>Año: {an.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/csr/anime
http://localhost:3000/csr/anime/2020
http://localhost:3000/csr/anime/2020/movie
http://localhost:3000/csr/anime/2020/movie/drama
http://localhost:3000/csr/anime/2020/movie/drama/Made-in-abyss
```

---

## ## SSR (Server Side Rendering)

### `[slug]`

- El contenido se renderiza en el servidor, lo que mejora el SEO.

- Los datos están disponibles antes de que la página se entregue al navegador.

```yaml
src/app/ssr/pokemon/[slug]/page.tsx
```

```typescript
// src/app/ssr/pokemon/[slug]/page.tsx

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

interface PokemonPageProps {
  params: Promise<{ slug: string }>;
}

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

// Función para obtener los datos del Pokémon desde la API
async function fetchPokemon(slug: string): Promise<Pokemon> {
  const res = await fetch(`${API_URL}/${slug}`);
  if (!res.ok) {
    throw new Error('Error al obtener los datos.');
  }
  return res.json();
}

export default async function Page({ params }: PokemonPageProps) {
  // Obtenemos el slug de la URL
  const { slug } = await params;

  try {
    // Obtenemos los datos del Pokémon
    const pokemon = await fetchPokemon(slug);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <p className="p-4 text-red-500">Error al cargar los datos</p>;
  }
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/ssr/pokemon/charmander
http://localhost:3000/ssr/pokemon/ditton
http://localhost:3000/ssr/pokemon/pikachu
```

Si haces clic derecho en la página y seleccionas **"Ver el código fuente de la página"**, podrás validar que el contenido ya está cargado en el HTML. Esto ocurre porque la página fue renderizada en el servidor (SSR), no en el cliente (CSR).

### `[…slug]`

- Ideal para contenido que depende de interacciones del usuario o datos del navegador.

- Permite una experiencia de usuario más dinámica.

```yaml
src/app/ssr/dnd/[...slug]/page.tsx
```

```typescript
// src/app/ssr/dnd/[...slug]/page.tsx

const API_URL = 'https://www.dnd5eapi.co/api/monsters';
const IMG_URL = 'https://www.dnd5eapi.co';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

interface Monster {
  name: string;
  type: string;
  image: string;
}

// Función para obtener los datos del monstruo desde la API
async function fetchMonster(slug: string[] = []): Promise<Monster> {
  const [, monsterName] = slug;

  const res = await fetch(`${API_URL}/${monsterName}`);
  if (!res.ok) {
    throw new Error('Error al obtener los datos.');
  }
  return res.json();
}

export default async function Page({ params }: PageProps) {
  // Obtenemos el slug de la URL
  const { slug } = await params;
  try {
    // Obtenemos los datos del monstruo
    const monster = await fetchMonster(slug);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold capitalize">{monster.name}</h1>
        <img
          src={`${IMG_URL}${monster.image}`}
          alt={monster.name}
          className="w-48"
        />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <p className="p-4 text-red-500">Error al cargar los datos</p>;
  }
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/ssr/dnd/monster/aboleth
http://localhost:3000/ssr/dnd/monster/adult-brass-dragon
http://localhost:3000/ssr/dnd/monster/acolyte
```

### `[[…slug]]`

- Se genera HTML completo con contenido visible desde el primer render (SEO-friendly).

- Permite manejar múltiples combinaciones de filtros en una misma ruta sin crear componentes adicionales.

```yaml
src/app/ssr/anime/[[...slug]]/page.tsx
```

```typescript
//src/app/ssr/anime/[[...slug]]/page.tsx

const API_URL = 'https://animeschedule.net/api/v3/anime';
const IMAGE_URL = 'https://img.animeschedule.net/production/assets/public/img';

interface Anime {
  id: number;
  title: string;
  year: number;
  imageVersionRoute: string;
}

interface AnimeAPIResponse {
  anime: Anime[];
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

async function fetchAnimes(slug: string[] = []): Promise<AnimeAPIResponse> {
  const [year, type, genre, title] = slug;

  const queryParams = new URLSearchParams();
  if (title) queryParams.append('q', title.split('-').join(' '));
  if (genre) queryParams.append('genres', genre);
  if (type) queryParams.append('media-types', type);
  if (year) queryParams.append('years', year);

  const res = await fetch(`${API_URL}?${queryParams.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Error al cargar los datos');
  return res.json();
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  try {
    const { anime } = await fetchAnimes(slug);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Resultados de búsqueda</h1>
        <ul>
          {anime.map((an: Anime) => (
            <li key={an.id} className="mb-4">
              <h2 className="text-lg font-semibold truncate">{an.title}</h2>
              <img
                src={`${IMAGE_URL}/${an.imageVersionRoute}`}
                alt={an.title}
                className="w-32 h-32 object-cover"
              />
              <p>Año: {an.year}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <p className="p-4 text-red-500">Error al cargar los datos</p>;
  }
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/ssr/anime
http://localhost:3000/ssr/anime/2019
http://localhost:3000/ssr/anime/2019/tv
http://localhost:3000/ssr/anime/2019/tv/comedy
http://localhost:3000/ssr/anime/2019/tv/comedy/karakai-jouzu
```

---

## SSG (Static Site Generation)

### `[slug]`

- Las páginas se generan en tiempo de construcción (build), lo que resulta en tiempos de carga muy rápidos.

- Para contenido que no cambia frecuentemente.

```yaml
src/app/ssg/pokemon/[slug]/page.tsx
```

```typescript
// src/app/ssg/pokemon/[slug]/page.tsx

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

interface PokemonAPIResponse {
  results: { name: string }[];
}

// Función para generar los parámetros estáticos
export async function generateStaticParams() {
  const res = await fetch(`${API_URL}?limit=50`);
  if (!res.ok) {
    throw new Error('Error al obtener los datos de los monstruos.');
  }
  const data: PokemonAPIResponse = await res.json();

  return data.results.map((pokemon) => ({
    slug: pokemon.name,
  }));
}

// Función para obtener los datos del Pokémon desde la API
async function fetchPokemon(slug: string): Promise<Pokemon> {
  const res = await fetch(`${API_URL}/${slug}`);
  if (!res.ok) {
    throw new Error('Error al obtener los datos.');
  }
  return res.json();
}

export default async function Page({ params }: PageProps) {
  // Obtenemos el slug de la URL
  const { slug } = await params;

  try {
    // Obtenemos los datos del Pokémon
    const pokemon = await fetchPokemon(slug);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <p className="p-4 text-red-500">Error al cargar los datos</p>;
  }
}
```

Ejecuta en la consola `npm run build`, verás que Next.js genera los archivos estáticos correspondientes.

Ejecuta en la consola `npm run start`, podrás acceder a esta página visitando:

```yaml
→ Se han renderizado los primeros 50 pokemon

http://localhost:3000/ssg/pokemon/arbok
http://localhost:3000/ssg/pokemon/charmander
http://localhost:3000/ssg/pokemon/ditton
http://localhost:3000/ssg/pokemon/pikachu
```

> Recuerda: Al tener `dynamicParams: true` (default) Next.js va a renderizar dinámicamente durante el build (en desarrollo) o en producción (si tienes habilitado ISR).

### `[…slug]`

- Las páginas se generan en tiempo de construcción, lo que resulta en tiempos de carga muy rápidos.

- Ideal para contenido que no cambia frecuentemente.

```yaml
src/app/ssg/dnd/[...slug]/page.tsx
```

```typescript
// src/app/ssg/dnd/[...slug]/page.tsx

// Solo acepta los pre-renderizados
// de las rutas que se generan estáticamente
export const dynamicParams = false;

const API_URL = 'https://www.dnd5eapi.co/api/monsters';
const IMG_URL = 'https://www.dnd5eapi.co';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

interface Monster {
  name: string;
  type: string;
  image: string;
}

interface MonsterAPIResponse {
  results: { url: string }[];
}

export async function generateStaticParams() {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) {
    throw new Error('Error al obtener los datos de los monstruos.');
  }

  const data: MonsterAPIResponse = await res.json();

  // Limitar a 20 monstruos para la generación de rutas estáticas
  return data.results.slice(0, 20).map((monster) => {
    // Obtener el nombre del monstruo de la URL
    const urlParam = monster.url.split('/').at(-1);

    return { slug: ['monster', urlParam] };
  });
}

// Función para obtener los datos del monstruo desde la API
async function fetchMonster(slug: string): Promise<Monster> {
  const res = await fetch(`${API_URL}/${slug}`);
  if (!res.ok) {
    throw new Error('Error al obtener los datos.');
  }
  return res.json();
}

export default async function Page({ params }: PageProps) {
  // Obtenemos el slug de la URL
  const { slug } = await params;
  try {
    const [, monsterName] = slug;
    // Obtenemos los datos del monstruo
    const monster = await fetchMonster(monsterName);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold capitalize">{monster.name}</h1>
        <img
          src={`${IMG_URL}${monster.image}`}
          alt={monster.name}
          className="w-48"
        />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <p className="p-4 text-red-500">Error al cargar los datos</p>;
  }
}
```

Ejecuta en la consola `npm run build`, verás que Next.js genera los archivos estáticos correspondientes.

Ejecuta en la consola `npm run start`, podrás acceder a esta página visitando:

```yaml
→ Se han renderizado los primeros 20

http://localhost:3000/ssr/dnd/monster/acolyte
http://localhost:3000/ssr/dnd/monster/adult-black-dragon
http://localhost:3000/ssr/dnd/monster/adult-blue-dragon
http://localhost:3000/ssr/dnd/monster/adult-bronze-dragon
http://localhost:3000/ssr/dnd/monster/adult-silver-dragon
http://localhost:3000/ssr/dnd/monster/ancient-blue-dragon
http://localhost:3000/ssr/dnd/monster/ancient-copper-dragon
```

> Recuerda: Al tener `dynamicParams: false` las páginas que no estén pre-renderizadas Next.js va a retornar un error 404.

### `[[…slug]]`

- Genera rutas estáticas y ultra rápidas desde el build.

- Optimiza para SEO desde el primer render.

- Puedes usar `generateStaticParams()` para controlar qué rutas se precargan.

```yaml
src/app/ssg/anime/[[...slug]]/page.tsx
```

```typescript
//src/app/ssg/anime/[[...slug]]/page.tsx
export const dynamicParams = false;

const API_URL = 'https://animeschedule.net/api/v3/anime';
const IMAGE_URL = 'https://img.animeschedule.net/production/assets/public/img';

interface Anime {
  id: number;
  title: string;
  year: number;
  imageVersionRoute: string;
}

interface AnimeAPIResponse {
  anime: Anime[];
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ['2023'] },
    { slug: ['2023', 'movie'] },
    { slug: ['2023', 'movie', 'drama'] },
    { slug: ['2023', 'movie', 'drama', 'monk-seishin'] },
    { slug: ['2024', 'tv'] },
    { slug: ['2024', 'tv', 'action'] },
    { slug: ['2024', 'tv', 'action', 'solo-leveling'] },
  ];
}

// Función para obtener los datos de los animes desde la API
async function fetchAnimes(slug: string[] = []): Promise<AnimeAPIResponse> {
  const [year, type, genre, title] = slug;

  const queryParams = new URLSearchParams();
  if (title) queryParams.append('q', title.split('-').join(' '));
  if (genre) queryParams.append('genres', genre);
  if (type) queryParams.append('media-types', type);
  if (year) queryParams.append('years', year);

  const res = await fetch(`${API_URL}?${queryParams.toString()}`, {
    next: { revalidate: false },
  });

  if (!res.ok) throw new Error('Error al cargar los datos');
  return res.json();
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  try {
    const { anime } = await fetchAnimes(slug);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Resultados de búsqueda</h1>
        <ul>
          {anime.map((an: Anime) => (
            <li key={an.id}>
              <h2 className="text-lg font-semibold truncate">{an.title}</h2>
              <img
                src={`${IMAGE_URL}/${an.imageVersionRoute}`}
                alt={an.title}
                className="w-32 h-32 object-cover"
              />
              <p>Año: {an.year}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <p className="p-4 text-red-500">Error al cargar los datos</p>;
  }
}
```

Ejecuta en la consola `npm run build`, verás que Next.js genera los archivos estáticos correspondientes.

Ejecuta en la consola `npm run start`, podrás acceder a esta página visitando:

```yaml
http://localhost:3000/csr/anime
http://localhost:3000/csr/anime/2023
http://localhost:3000/csr/anime/2023/movie
http://localhost:3000/csr/anime/2023/movie/drama
http://localhost:3000/csr/anime/2023/movie/drama/monk-seishin

http://localhost:3000/csr/anime/2024/
http://localhost:3000/csr/anime/2024/tv
http://localhost:3000/csr/anime/2024/tv/action
http://localhost:3000/csr/anime/2024/tv/action/solo-leveling
```

> Recuerda: Al tener `dynamicParams: false` las páginas que no estén pre-renderizadas Next.js va a retornar un error 404.

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
git checkout examples-advanced-dynamic-routes-hybrid-rendering
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
