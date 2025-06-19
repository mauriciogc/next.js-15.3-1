# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Private Folders \_folder

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-3)**] (branch: base-project-3).** Este proyecto incluye actualización visual y estructural de estilos utilizando TailwindCSS v4.

> Para simular la carga de datos en los ejemplos vamos utilizar la API **themoviedb**[[ref](https://developer.themoviedb.org/docs/getting-started)].

### ¿Qué es?

Las **carpetas privadas** en Next.js, identificadas por el prefijo de guión bajo (`_`), son **convenciones de estructura** introducidas a partir de Next.js 13+ y formalizadas en Next.js 15+ para **excluir directorios del sistema de rutas públicas** del App Router.

Es decir, cualquier carpeta que comience con `_` será **ignorada por el enrutador de Next.js** y **no generará una ruta accesible directamente**.

Su propósito es permitir la **organización y encapsulamiento de lógica auxiliar o interna**, como funciones de utilidades, servicios, configuraciones o componentes compartidos, **co-localizados dentro de la estructura del proyecto**, pero sin contaminar el sistema de rutas.

### Principales características

- **Ignorada por el sistema de enrutamiento:** No aparece como segmento de ruta, aunque esté dentro de `/app`.

- **Permite co-locación modular:** Puedes poner helpers, hooks, servicios o configs junto a las rutas que los usan.
- **Aplica a cualquier nivel de profundidad:** Desde la raíz (`/app/_utils/`) hasta rutas dinámicas (`/app/blog/[slug]/_helpers/`).
- **Compatible con TypeScript, ESLint, testing, etc.:** Estas carpetas no afectan negativamente la compilación ni el análisis de código.
- **No exporta archivos especiales:** Cualquier archivo reservado de Next.js (`page.tsx`, `layout.tsx`, etc.) dentro de una carpeta privada será ignorado.

### Ventajas

- **Mejora la organización:** Agrupa layouts, componentes, utilidades o servicios en lugares estructurados.

- **Evita rutas accidentales:** Archivos cómo `page.tsx` o `layout.tsx` en `_folders` no son registrados.
- **Modularidad real sin contaminación del enrutador:** Agrupar lógica interna en carpetas privadas permite separar _intención_ de _estructura pública_. Evitas estructuras abstractas y genéricas como `/lib`, `/utils`, `/helpers` que escalan mal a gran tamaño.
- **Flujo de trabajo más claro para grandes equipos:** Los desarrolladores pueden distinguir entre **segmentos públicos** (que afectan la URL) y **carpetas internas** (solo organización).
- **Autocompletado más limpio:** al usar VSCode o editores similares.
- **Transparente para compilación:** no interfiere con build ni con client bundles.

### ¿Cómo se crea o implementa?

- Crea cualquier carpeta cuyo nombre comience con `_`, dentro o fuera de rutas dinámicas, y coloca archivos auxiliares ahí.

- **Crea** **archivos** como helpers, funciones, UI o servicios que **no deben ser rutas**.
- **Importa** el **contenido** desde cualquier archivo de tu árbol de rutas sin problemas.

![](https://cdn-images-1.medium.com/max/800/1*oRatHJ6b8WezqWK52CWUQg.png)

> **No abuses del patrón global:** En vez de eso, **co-localiza** según la ruta donde se necesita.

#### Ejemplo funcional:

```js
// src/app/_utils/formatDate.ts
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-MX', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
```

Uso en `app/blog/page.tsx`:

```ts
// src/app/blog/page.tsx
import { formatDate } from '../_utils/formatDate';

export default function BlogPage() {
  const date = formatDate('2025-06-17T00:00:00Z');
  return <p>Última actualización: {date}</p>;
}
```

> `_utils` no genera ninguna ruta. Sirve sólo como contenedor privado.

> **Importante:** Si cambias `_util` por `utils`, la carpeta formará parte del enrutamiento, generando errores o rutas inesperadas.

![](https://cdn-images-1.medium.com/max/800/1*qdiPq7RYmjP3nFRpxTa2KA.png)

### ¿Cómo funciona?

Next.js 15+ usa un sistema de **file-based routing jerárquico** que sigue un patrón declarativo de construcción de rutas.

Durante el análisis de árbol de archivos:

- El router ignora todas las carpetas que **empiezan con** `_`, usando una expresión regular parecida a `/^_(?!.*\.ts)/`.

- Next.js **no genera una ruta**, ni layout, ni carga templates desde ese segmento.
- Durante el build, el contenido se incluye **solo si es importado explícitamente**.
- El código en `_folders` **puede ser tree-shakeado [**[**ref**](https://developer-mozilla-org.translate.goog/en-US/docs/Glossary/Tree_shaking?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc)**]** si no es usado.

### Ejemplos

#### Ejemplo 1 — Centralizar funciones auxiliares en la raíz del proyecto

Crea la `formatDate.ts` para el formateo de fechas en `src/app/_utils/`

```js
// src/app/_utils/formatDate.ts
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-MX', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
```

Crea la `page.tsx` del **Blog** en `src/app/blog` :

```js
// src/app/blog/page.tsx
import { formatDate } from '../_utils/formatDate';

export default function BlogPage() {
  const date = formatDate('2025-06-17T00:00:00Z');
  return (
    <div className="container">
      <p>Última actualización: {date}</p>
    </div>
  );
}
```

![](https://cdn-images-1.medium.com/max/800/1*7JEYRJ6V-uiIeEAsD-y5sg.png)

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000` y navegar a `/blog`.

![](https://cdn-images-1.medium.com/max/800/1*nwv_Kxdmihu9tZ2xHO6izA.png)

#### Ejemplo 2 — Dentro de una ruta estática

Para encapsular helpers solo usados por la página `/about`. Crea la `getTeam.ts` para el formateo de fechas en `src/app/about/_helpers`

```js
// src/app/about/_helpers/getTeam.ts
export const team = ['Angie', 'Peter', 'Mau'];

Crea la `page.tsx` de **About** en `src/app/about` :

// src/app/about/page.tsx
import { team } from './_helpers/getTeam';

export default function AboutPage() {
  return (
    <div className="container">
      <ul>
        {team.map((name) => (
          <li key={name} className="subTitle">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

![](https://cdn-images-1.medium.com/max/800/1*oBhZRsPPiENVLgEEmjIOWA.png)

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000` y navegar a `/about`.

![](https://cdn-images-1.medium.com/max/800/1*cM_MMLWpiKja05B6a3GBAQ.png)

#### Ejemplo 3 — Dentro de una ruta dinámica

Para encapsular la lógica de fetching de una API de películas.

Crea el archivo `.env.local` la variable de entorno `TMDB_API_KEY` y `TMDB_BASE_URL` :

```ini
# TMDB Config
TMDB_API_KEY = abcd1234supersecret
TMDB_BASE_URL=https://api.themoviedb.org/3
```

Crea el servicio `tmdbServices.ts` en `/src/series/_services` :

```ts
// app/series/[slug]/_services/tmdbServices.ts

const API_KEY = process.env.TMDB_API_KEY || '';
const BASE_URL = process.env.TMDB_BASE_URL || '';

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export interface Serie {
  id: number;
  name: string;
  overview?: string;
}

export interface SeriesResponse {
  results: Serie[];
}

/**
 * @description Obtiene una lista de series de la API de TMDB.
 * @param category - Categoría de series a obtener (default: 'top_rated')
 * @throws Error si hay un problema al obtener los datos
 * @returns  Promise<SeriesResponse>
 * @example
 * fetchSeries().then(data => console.log(data));
 * @example
 * fetchSeries('popular').then(data => console.log(data));
 */
export async function fetchSeries(
  category: string = 'top_rated'
): Promise<SeriesResponse> {
  try {
    const url = `${BASE_URL}/tv/${category}`;
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Error al obtener los datos: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error en fetchSeries:', error);
    throw error;
  }
}

/**
 *
 * @description Obtiene los detalles de una serie específica por su ID.
 * @param id - ID de la serie a obtener
 * @throws Error si hay un problema al obtener los datos
 * @returns Promise<Serie>
 * @example
 * fetchSeriesDetail('12345').then(data => console.log(data));
 */
export async function fetchSeriesDetail(id: string): Promise<Serie> {
  try {
    const url = `${BASE_URL}/tv/${id}`;
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Error al obtener los datos: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error en fetchSeries:', error);
    throw error;
  }
}
```

Crea el `loading.tsx`, `layout.tsx` y `page.tsx` de **series** en `src/app/series/`:

```ts
// src/app/series/loading.tsx
export default function SeriesLoading() {
  return (
    <div className="flex animate-pulse justify-start items-start space-x-4">
      <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin" />
      <div>Cargando contenido...</div>
    </div>
  );
}
```

```ts
// src/app/series/layout.tsx
export default function SeriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container">
      <h1 className="title">Series</h1>
      {children}
    </div>
  );
}
```

```ts
// src/app/series/page.tsx
import Link from 'next/link';

// Importa el servicio para obtener la lista de series y el type Serie
import { Serie, fetchSeries } from './_services/tmdbServices';

export default async function SeriesPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await fetchSeries(params.slug);
  return (
    <ul className="space-y-2">
      {data.results.map((serie: Serie) => (
        <li key={serie.id}>
          <Link
            href={`series/${serie.id}`}
            className="text-(--color-foreground)"
          >
            {serie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

Crea la `page.tsx` del **detalle de la serie** en `src/app/series/[slug]`:

```ts
// app/series/[slug]/page.tsx

// Importa el servicio para obtener el detalle de una serie y el type Serie
import { Serie, fetchSeriesDetail } from '../_services/tmdbServices';

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data: Serie = await fetchSeriesDetail(slug);
  return (
    <div>
      <h2 className="subTitle">{data.name}</h2>
      <p>{data.overview}</p>
    </div>
  );
}
```

Actualiza la página principal `/app/page.tsx`, agregando el `Link` a `/series`:

```ts
// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container">
      <h1 className="title">Página principal</h1>
      <div className="flex gap-3 flex-wrap items-center px-4 py-3 rounded-xl">
        <Link
          href={'/series'}
          className="pill-button pill-button-active flex items-center"
        >
          Series
        </Link>
      </div>
    </main>
  );
}
```

![](https://cdn-images-1.medium.com/max/800/1*1nnJaNEI6vC19HoRq1T3SQ.png)

Al iniciar el servidor con `npm run dev`, podrás acceder a esta página visitando `http://localhost:3000`, da clic en “Series”.

![](https://cdn-images-1.medium.com/max/800/1*OzF1Q1baQO7FFVfDLq0Xlw.gif)

### A considerar

- **Usa** `_folders` **para agrupar**: Servicios (fetch de APIs externas, lógica de negocio), componentes internos (que no deben ser rutas), hooks, helpers, validadores, schemas.

- **No abuses**: Una jerarquía de `_utils/_utils/_utils` puede volverse ilegible.
- **No confundas con “rutas protegidas”**: Esto es una **convención estructural**, no una capa de seguridad.
- **No abuses del patrón global:** En vez de eso, **co-localiza** según la ruta donde se necesita.
- **No dependas de** `@/` **o imports globales con** `_folder`**:** Siempre usa imports relativos o configura correctamente `tsconfig` si vas a compartir recursos desde `_folder`.
- Evita estructuras abstractas y genéricas como `/lib`, `/utils`, `/helpers` que escalan mal a gran tamaño.

---

**Hasta este punto…** Has aprendido qué son las carpetas privadas en Next.js (`_folders`), cómo te ayudan a estructurar mejor tu proyecto y evitar rutas no deseadas. Viste cómo integrarlas con layouts, servicios y componentes reutilizables, usando una estructura limpia y profesional.

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
git checkout private-folders
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
