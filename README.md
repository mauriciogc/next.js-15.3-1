# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]**

> **Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-2)**] (branch: base-project-2).** Este proyecto contiene los archivos: `_src/app/page.tsx_` y `_src/app/layout.tsx_`, configurados con una estructura mínima.

> Para simular la carga de datos en los ejemplos vamos utilizar la API **spotify**[[ref](https://developer.spotify.com/documentation/web-api)].

## template.tsx

### ¿Qué es `template.tsx`?

`template.tsx` es una convención de archivo en el **App Router** de Next.js que permite renderizar una nueva instancia del árbol de componentes **en cada navegación a la misma ruta**. A diferencia de `layout.tsx` (que se comparte entre navegaciones), `template.tsx` **no es persistente**: se renderiza nuevamente **cada vez que el usuario entra a una ruta**, incluso si ya ha estado antes.

Es útil cuando necesitas que la estructura (layout) se reinicie cada vez que cambias de sección, por ejemplo, formularios con estado, animaciones de entrada o reinicialización de contextos.

Comparado con `layout.tsx`, `template.tsx` **no se memoriza ni persiste**, lo que es una ventaja cuando se desea recomenzar una vista con estado fresco.

### Principales características

- **Se define por segmento** dentro de `app/`.

- **Re-renderiza en cada navegación**: no mantiene el estado como `layout.tsx`..
- **Permite aislar instancias de rutas**: cada visita inicia una nueva ejecución.
- **Soporte para streaming y Suspense** sin compartir caché de estado/layout.
- **Puede coexistir con** `layout.tsx` y `page.tsx` en el mismo segmento.
- **No reemplaza a** `page.tsx`: lo envuelve como envoltorio temporal de presentación.
- **Compatible con Suspense y streaming.**
- Como se vuelve a montar, se puede usar `React.lazy` o suspense loaders sin colisiones de estado.

### Ventajas

- **Control de estado limpio**: permite limpiar o reinicializar estados entre visitas.
- **Composición dinámica**: se puede usar para generar UIs con efectos visuales nuevos por cada navegación.
- **No requiere hacks** como `key={Date.now()}` o `useEffect()` para limpiar estados.
- **Evita efectos secundarios indeseados** causados por persistencia del layout.
- **No interfiere con layouts globales superiores**: puede anidarse perfectamente.
- **Limpieza de estado entre vistas**: Útil si usas modales, efectos, scroll, focus, etc.
- Ideal para navegación “tipo SPA”, flujos paso a paso (steps, encuestas, formularios).

### ¿Cómo se crea o implementa?

- Simplemente crea un archivo `template.tsx` dentro de la carpeta de ruta o layout donde deseas aplicar este comportamiento
- Exporta un componente React de servidor.

- **Usa** `children` **obligatoriamente.**

```js
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="p-6 animate-fade-in">{children}</div>;
}
```

Puedes envolver el contenido en animaciones, contextos u otras instancias necesarias.

Ejemplo en la estructura de carpetas:

![](https://cdn-images-1.medium.com/max/1600/1*QFPomQ5aDfHcIdgsLZR3AA.png)

### ¿Cómo funcionan?

Cuando Next.js navega entre rutas, sigue un **sistema jerárquico** de **layout** y **templates**. Si encuentra un `template.tsx`, **descarta la instancia anterior y monta una nueva desde cero**.

- El usuario navega a una ruta con `template.tsx`.

- Next.js renderiza todos los `layout.tsx` superiores como siempre.

- **En lugar de reutilizar el layout del segmento actual, ejecuta nuevamente el** `template.tsx`**.**
- Se renderiza el contenido (`page.tsx`, children, etc.) dentro del template nuevo.

Esto significa que:

- `template.tsx` tiene **vida efímera**, se destruye tras cada navegación.

- **No mantiene hooks, refs ni contextos locales** (salvo que estén en un layout superior).

> **Importante**: Si usas `useRouter()` o `usePathname()` en un `template.tsx`, **sus valores se actualizan con cada renderizado**, esto es útil para determinar rutas actuales sin tener que invalidar manualmente estados.

### Ejemplos

#### Ejemplo — Reinicio de estado en barra lateral

Primero vamos a crear el ejemplo con `layout.tsx`.

En consola instala el paquete de `lucide-react` para agregar iconos:

```bash
npm install lucide-react
```

Crea el componente `Sidebar` en `/src/components` :

```js
// src/components/Sidebar.tsx

'use client';

import { useState } from 'react';
import { Menu, Home, Settings, ChartLine, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`transition-all duration-300 ease-in-out bg-gray-800 text-white h-full ${
          open ? 'w-64' : 'w-14'
        }`}
      >
        <div className="flex justify-center items-center h-14 border-b border-gray-700">
          <button onClick={() => setOpen(!open)} className="p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {open && (
          <nav className="mt-4 space-y-2 px-4">
            <Link
              href="/"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <ChartLine className="w-4 h-4" />
              <span>Analíticas</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <Settings className="w-4 h-4" />
              <span>Ajustes</span>
            </Link>
          </nav>
        )}
      </div>

      <main
        className={`transition-all duration-300 ease-in-out flex-1 ${
          open ? 'pl-0' : 'pl-0'
        }`}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
```

Crea `layout.tsx` y `page.tsx` para el **dashboard** en `src/app/dashboard` :

```js
// src/app/dashboard/layout.tsx

'use client';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return <Sidebar>{children}</Sidebar>;
}
```

```js
// src/app/dashboard/page.tsx

export default function DashboardHome() {
  return <h2>Bienvenido al Dashboard</h2>;
}
```

Crea `page.tsx` para **ajustes** del **dashboard** en `app/dashboard/settings`:

```js
// app/dashboard/settings/page.tsx

export default function SettingsPage() {
  return <h2>Sección de Configuración</h2>;
}
```

Crea `page.tsx` para **analíticas** del **dashboard** en `app/dashboard/analytics`:

```js
// app/dashboard/analytics/page.tsx

export default function AnalyticsPage() {
  return <h2>Sección de Analíticas</h2>;
}
```

Agrega el `Link` hacia `/dashboard` en `src/app/page.tsx`

```js
// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-y-4">
      <h1 className="text-3xl font-bold">Página principal</h1>

      <Link href="/dashboard" className="text-blue-500 hover:underline ">
        Dashboard
      </Link>
    </main>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*WKEr_osuowPVFhX5-_xmPw.png)

Al iniciar el servidor (`npm run dev`), acceder a `http://localhost:3000` y navegar por a la sección de `/dashboard`.

![](https://cdn-images-1.medium.com/max/1600/1*Ngov_8yqcUf8FwtiadOXxQ.gif)

Una ventaja importante del App Router de Next.js es que los archivos `layout.tsx` se **montan solo una vez** y **persisten entre navegaciones internas**, **siempre que el segmento no cambie**. Esto permite conservar el estado de componentes interactivos (como la barra lateral) sin necesidad de recurrir a contextos globales o almacenamiento externo.

Observa que la barra lateral mantiene su estado (`open`) al navegar entre las rutas: `/dashboard`, `/dashboard/settings`, `/dashboard/analytics`.

El panel lateral **no se cierra** automáticamente al cambiar de sección. Solo se colapsa si el usuario hace clic nuevamente en el botón de hamburguesa.

Esto es posible porque el archivo `layout.tsx` ubicado en `/app/dashboard/layout.tsx` **solo se monta una vez** y conserva su estado entre cambios de ruta **dentro del mismo segmento raíz (**`dashboard/`**)**.

Cambia el nombre de `app/dashboard/layout.tsx` por `app/dashboard/template.tsx`

![](https://cdn-images-1.medium.com/max/1600/1*WHP9y5tWDLG4Frjeb2ryog.png)

Al iniciar el servidor (`npm run dev`), acceder a `http://localhost:3000` y navegar por a la sección de `/dashboard`.

![](https://cdn-images-1.medium.com/max/1600/1*_wq4a-gryacrSXgKGNyjlA.gif)

A diferencia de `layout.tsx`, el archivo `template.tsx` en Next.js **se remonta cada vez que se navega a la ruta donde está definido**, incluso si el usuario ya ha estado ahí antes.

Esto significa que **todo el estado local del componente se pierde** al navegar a la misma ruta nuevamente o entre subrutas que comparten el mismo `template.tsx`.

Observa que la barra lateral reinicia su estado (`open`) al navegar entre las rutas: `/dashboard`, `/dashboard/settings`, `/dashboard/analytics`.

Como resultado, la barra lateral **se colapsará automáticamente** cada vez que cambies de sección, incluso si no se ha hecho clic en el botón.

Esto sucede porque `template.tsx` **no es persistente**, y **se vuelve a montar completamente** al navegar, eliminando cualquier estado mantenido por `useState`, `useEffect` o cualquier lógica interna del componente.

#### Ejemplo — Persistencia en el tamaño de letra

Primero vamos a crear el ejemplo con `layout.tsx`.

Crea el componente `AlbumCard` en `/src/components` :

```js
// src/components/AlbumCard.tsx

'use client';

import Link from 'next/link';

// Propiedades que acepta el componente AlbumCard
interface AlbumCardProps {
  id: string;
  name: string;
  artist: string;
  imageUrl?: string;
  withLink?: boolean;
}

export function AlbumCard({
  id,
  name,
  artist,
  imageUrl,
  withLink = false,
}: AlbumCardProps) {
  return (
    <div className="relative group flex flex-col items-center text-center text-white bg-gray-900 p-4 rounded-lg">
      <div className=" w-36 h-36 mb-4">
        {imageUrl && (
          <img src={imageUrl} alt={name} className="rounded-lg object-cover" />
        )}
      </div>

      <div className="text-[0.85em] font-semibold">{name}</div>
      <p className="text-[0.85em] text-gray-400">by {artist}</p>

      {/* Enlace opcional que envuelve todo el componente */}
      {withLink && (
        <Link
          href={`/albums/${id}`}
          className=" absolute inset-0 flex items-center justify-center   
                      opacity-0 group-hover:opacity-100 transition duration-300   
                    bg-black/40 rounded-lg cursor-pointer"
        ></Link>
      )}
    </div>
  );
}
```

Crea el archivo .env.local dentro del directorio raíz del proyecto (no dentro de /src):

```ini
# SPOTIFY Config
SPOTIFY_API_KEY = abcd1234supersecret
SPOTIFY_BASE_URL = https://api.spotify.com/v1
```

Crea el servicio `spotifyService.ts` en `/src/services` :

```js
// src/services/spotifyService.ts

const BASE_URL = process.env.SPOTIFY_BASE_URL;
const API_KEY = process.env.SPOTIFY_API_KEY;

/**
 * Obtiene albumes de Spotify.
 */
export async function fetchNewReleases(search = 'soundtracks') {
  const res = await fetch(`${BASE_URL}/search?q=${search}&type=album`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    next: { revalidate: 6000 },
  });

  if (!res.ok) throw new Error('Error al obtener nuevos lanzamientos');
  const data = await res.json();
  return data.albums.items;
}

/**
 * Obtiene los detalles de un álbum por su ID.
 */
export async function fetchAlbumById(id: string) {
  const res = await fetch(`${BASE_URL}/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!res.ok) throw new Error('Álbum no encontrado');

  return res.json();
}
```

Crea `layout.tsx` y `page.tsx` para los **albums** en `src/app/albums` :

```js
// src/app/albums/layout.tsx
'use client';
import { useState } from 'react';

export default function AlbumsLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  // Estado para controlar el tamaño de la fuente
  const [scale, setScale] = useState(1);

  return (
    <div className="min-h-screen p-6 bg-gray-800">
      <div className="max-w-7xl mx-auto mb-4 space-x-2">
        {/* Título de la página con un ícono */}
        <h1 className="flex items-center text-4xl text-green-400 mb-6 gap-3 font-semibold">
          <img src="/images/spotify.png" className="w-12 h-12" />
          Spotify
        </h1>

        {/* Controles para ajustar el tamaño de la fuente */}
        <span>Font Size:</span>
        {/* Reduce fuente con un mínimo de 0.75 */}
        <button
          onClick={() => setScale((s) => Math.max(0.75, s - 0.1))}
          className="underline text-sm cursor-pointer"
        >
          A-
        </button>
        {/* Restaura al valor predeterminado (1) */}
        <button
          onClick={() => setScale(1)}
          className="underline text-sm cursor-pointer"
        >
          A
        </button>
        {/* Aumenta fuente con un máximo de 1.5 */}
        <button
          onClick={() => setScale((s) => Math.min(1.5, s + 0.1))}
          className="underline text-sm cursor-pointer"
        >
          A+
        </button>
      </div>

      {/* Contenedor para los hijos (children) con el tamaño de fuente ajustable */}
      <div className="max-w-7xl mx-auto" style={{ fontSize: `${scale}rem` }}>
        {children}
      </div>
    </div>
  );
}
```

```js
// src/app/albums/page.tsx

import { fetchNewReleases } from '@/services/spotifyService';
import { AlbumCard } from '@/components/AlbumCard';

export default async function AlbumsPage() {
  // Llama al servicio para obtener los álbumes relacionados con el término 'soundtrack'
  const albums = await fetchNewReleases('soundtrack');

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {albums.map((album: any) => (
        <AlbumCard
          key={album.id}
          id={album.id}
          name={album.name}
          artist={album.artists[0]?.name}
          imageUrl={album.images?.[0]?.url}
          withLink={true}
        />
      ))}
    </div>
  );
}
```

Agrega la imagen de spotify en `/public/images`

```yaml
https://github.com/mauriciogc/next.js-15.3-1/blob/template/public/images/spotify.png
```

Agrega el `Link` hacia `/albums` en `src/app/page.tsx`

```js
// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-y-4">
      <h1 className="text-3xl font-bold">Página principal</h1>

      <Link href="/dashboard" className="text-blue-500 hover:underline ">
        Dashboard
      </Link>
      <Link href="/albums" className="text-blue-500 hover:underline ">
        Albums (Spotify)
      </Link>
    </main>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*nrZqGQ6U5Pf9JN4GElvfKQ.png)

Al iniciar el servidor (`npm run dev`), acceder a `http://localhost:3000` y navegar por a la sección de `/albums`.

![](https://cdn-images-1.medium.com/max/1600/1*ag21xfM81me1glS8t5UuiA.gif)

Crea `page.tsx` para **el detalle** del **album** en `app/albums/[id]`:

```js
// src/app/albums/[id]/page.tsx

import { AlbumCard } from '@/components/AlbumCard';
import { fetchAlbumById } from '@/services/spotifyService';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AlbumDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Llama al servicio para obtener los detalles del álbum
  const album = await fetchAlbumById(id);

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8">
      {album.images?.[0]?.url && (
        <AlbumCard
          key={album.id}
          id={album.id}
          name={album.name}
          artist={album.artists[0]?.name}
          imageUrl={album.images?.[0]?.url}
        />
      )}
      <div>
        <h1 className="text-[1.8em] font-bold">{album.name}</h1>
        <p className="text-[1.1em] text-gray-600">
          {album.artists.map((a: any) => a.name).join(', ')}
        </p>
        <p className="text-[0.9em] text-gray-500 mt-2">
          Lanzado: {album.release_date}
        </p>
        <p className="text-[0.9em] text-gray-500">
          Total de canciones: {album.total_tracks}
        </p>
        <h2 className="text-xl font-semibold mb-2">Pistas</h2>
        <ul className="space-y-1">
          {album.tracks.items.map((track: any, i: number) => (
            <li key={track.id} className="text-[0.9em] text-gray-400">
              {i + 1}. {track.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*jYcS_-Pgg6n2QvYwN5FWTQ.png)

Al iniciar el servidor (`npm run dev`), acceder a `http://localhost:3000` y navegar por a la sección de `/albums` y al detalle de algún album.

![](https://cdn-images-1.medium.com/max/1600/1*7xe2h87zx5doc4mUx-GlPg.gif)

- Estás en la vista de álbumes (`/albums`) y cambias el **tamaño de letra** de los títulos de los discos desde un control UI.
- Ahora, si navegas hacia una ruta dinámica como `/albums/[id]` (detalle del álbum), el estado de tamaño de fuente **se mantiene**.
- El estado **solo se pierde cuando abandonas ese sector** (por ejemplo, navegando a `/` o `/dashboard`). Si luego vuelves a `/albums`, el layout se vuelve a montar y el estado se reinicia.

Este comportamiento es posible porque el archivo `app/albums/layout.tsx` **se mantiene montado** durante toda la navegación dentro del segmento `/albums`, gracias al mecanismo de **layouts persistentes** de Next.js.

Cambia el nombre de `app/albums/layout.tsx` por `app/albums/template.tsx`

![](https://cdn-images-1.medium.com/max/1600/1*ash3CM9RSMZ2BCmk1of_9Q.png)

Al iniciar el servidor (`npm run dev`), acceder a `http://localhost:3000` y navegar por a la sección de `/albums` y al detalle de algún album.

![](https://cdn-images-1.medium.com/max/1600/1*jHyqrNR_IhhqWxlcl9G52g.gif)

Estás en `/albums` y modificas el **tamaño de fuente** de los títulos de los álbumes desde un control de UI. Si esta lógica vive dentro de un `template.tsx` en `app/albums/template.tsx`, entonces:

- Al navegar a `/albums/[id]`, se desmonta el `template.tsx` anterior y se monta uno nuevo.

- El tamaño de letra **se reinicia automáticamente**, aunque sigas dentro del mismo segmento de navegación.
- Incluso si vuelves a `/albums`, el estado estará limpio, ya que **el** `template.tsx` **no conserva estado** entre visitas.

Este comportamiento ocurre porque el archivo `app/albums/template.tsx` **fuerza una nueva instancia del árbol de React** dentro del segmento `/albums`.

> **Importante**: Si necesitas **preservar el estado entre rutas**, no uses `template.tsx`. En cambio, opta por `layout.tsx`.

### A considerar

- `template.tsx` **tiene prioridad visual** sobre `layout.tsx` si ambos están presentes.

- **No lo uses por defecto**: su uso **no es necesario** si `layout.tsx` ya cumple la función requerida. Además puede tener impacto de performance.
- Ten en cuenta que cada navegación forzará **nuevas peticiones**, **hooks**, **estados** y **re-render completo**.
- Evita lógicas pesadas en `template.tsx`: está pensado como capa visual o de comportamiento liviano.

### ¿Se puede usar con `loading.tsx`?

**Sí puedes combinar** `template.tsx` con `loading.tsx` para dar la sensación de transición total entre vistas.

Esto es especialmente útil si estás haciendo navegación tipo detalle:

![](https://cdn-images-1.medium.com/max/1600/1*DLhlQmmsH4YPcoT3RcsF0Q.png)

### ¿Se puede tener un `template.tsx` global?

**Sí puedes tener un archivo** `/app/template.tsx`, y este actuará como una “capa” volátil que envolverá todas las rutas hijas, forzando su re-renderizado en cada navegación (incluso si el usuario navega entre rutas hermanas). Pero **generalmente no es recomendable.**

#### Desventajas de un `template.tsx` global —

- **Se pierde el estado entre rutas principales.**  
  Si tienes un layout global con UI persistente (navbar, sidebar, toggles, etc.), usar `template.tsx` en raíz causará que todo ese contenido se desmonte y remonte constantemente.
- **Afecta el rendimiento.**  
  Cada navegación reconstruye la jerarquía de componentes desde el `template.tsx` hacia abajo. Si está en raíz, esto puede implicar rehacer _toda_ la estructura de la app.
- **Rompe persistencia de hooks, refs y contextos locales.**  
  Si estás usando Context Providers para temas, auth o UI entre rutas principales, estos perderán su estado en cada navegación.
- **Percepción de parpadeo o “reset” innecesario.**  
  Desde el punto de vista del usuario, puede parecer que la aplicación se reinicia constantemente, incluso si solo navega entre secciones comunes.

### layout.tsx o template.tsx

## ![](https://cdn-images-1.medium.com/max/1600/1*NzRgQg3v1eVdoD8NB8K_vA.png)

---

Hasta este punto has aprendido a utilizar correctamente el archivo especial `template.tsx` dentro del App Router de Next.js, comprendiendo su utilidad para renderizar una nueva instancia del layout cada vez que se navega hacia una página. A diferencia de `layout.tsx`, que se mantiene montado entre rutas hermanas y conserva su estado, `template.tsx` se vuelve a renderizar por completo en cada navegación, evitando compartir estado, animaciones o efectos no deseados entre vistas similares.

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
git checkout template
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
