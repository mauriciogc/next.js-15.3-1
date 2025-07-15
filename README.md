# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Optimización de Imágenes con <Image>

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-3)**] (branch: base-project-3).** Este proyecto incluye actualización visual y estructural de estilos utilizando TailwindCSS v4.

> Para simular la carga de datos en los ejemplos vamos utilizar la API **themoviedb**[[ref](https://developer.themoviedb.org/docs/getting-started)].

### ¿Que es?

La **Optimización de Imágenes** en Next.js es una funcionalidad integrada que permite **servir imágenes de forma eficiente**, adaptadas al dispositivo del usuario, con soporte para formatos modernos, compresión automática y lazy loading por defecto.

Next.js lo hace automáticamente mediante su componente `<Image>`, generando múltiples tamaños (responsive), usando formatos modernos (como WebP o AVIF), y aplicando lazy loading y placeholders por defecto.

### Principales características

- Optimizado con props declarativas (`src`, `width`, `height`, `fill`, `priority`).

- Compresión automática adaptada al dispositivo (`srcset`, `sizes`).
- Soporte para **formato AVIF, WebP**, JPEG progresivo.
- **Lazy loading** (carga diferida automática) por defecto.
- Integración con CDN de Vercel o loaders personalizados (ImageKit, Cloudinary, etc.).
- Compatible con SSR, ISR y streaming.
- Responsive behavior mediante `sizes` y `fill`.
- Soporte para imágenes locales y remotas con control de dominios.

### ¿Por qué es relevante?

Las imágenes son responsables de más del **50% del peso promedio de una página web**. Una carga no optimizada puede arruinar la performance y penalizar métricas como:

- Largest Contentful Paint (LCP)

- Time to Interactive (TTI)
- SEO y Core Web Vitals

Next.js resuelve este problema desde la raíz, integrando la optimización **en tiempo de desarrollo y producción** con compatibilidad automática con CDNs, streaming y SSR.

### Ventajas

- **Multiformato automático** — Convierte imágenes a WebP o AVIF según el navegador.

- **Calidad adaptable** — Control sobre calidad, prioridad, loading y display.
- **Plug and play** — No requiere librerías externas ni configuración inicia.
- **Integrado con el router y el compilador** — Se adapta al uso de App Router y layouts.
- **Reduce el CLS y mejora el LCP** — Establece layout estático para evitar reflow.

### ¿Cómo se crea o implementa?

Importa el componente

```js
import Image from 'next/image';
```

####  — Imagen local

Usa una imagen local (las imagenes locales deben ir en `/public`):

```js
<Image src="/avatar.png" alt="Foto de perfil" width={300} height={300} />
```

Donde:

- Reserva espacio (`300x300`) para evitar layout shift.

- Genera imágenes responsivas (`srcset`) para pantallas retina.
- Usa WebP si es soportado por el navegador.
- Aplica `loading="lazy"` por defecto.

> **Importante:** Al usar imágenes locales (carpeta `public/`), no necesitas configurar dominios.

####  — Imagen remota

A partir de Next.js 15.3+, ya **no puedes usar** `domains`. En su lugar, se deben definir **patrones explícitos de imágenes remotas seguras.**

Utiliza `remotePatterns` en tu archivo `next.config.js` para permitir imágenes de rutas externas específicas y bloquear todas las demás. Esto garantiza que solo se puedan servir imágenes externas de su cuenta.

```js
//next.config.js
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://image.tmdb.org/t/p/**')],
  },
};

export default nextConfig;
```

Si utilizas una versión anterior a la 15.3.0, puedes configurar `remotePatterns` utilizando el objeto:

```js
//next.config.js
//...
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/account123/**',
        search: '',
      },
    ],
  },
};
//...
```

Con esto, le estas indicando que la propiedad `src` de `next/image` comience por `https://example.com/account123/`. Cualquier otro protocolo, nombre de host, puerto o ruta que no coincida responderá con un `400 Bad Request`.

> **Importante**: Este patrón previene ataques SSRF o abusos de recursos en Edge Runtime.

### ¿Cómo funciona?

- Next.js detecta el uso del componente `<Image>`.

- Durante el build, crea variantes de diferentes tamaños y formatos.
- Sirve las imágenes desde el servidor (local) o CDN externo.
- Se sirve una versión adaptada con `srcSet` y `sizes` para dispositivos móviles, tablets y desktops.
- Si el navegador soporta AVIF/WebP, se entrega el formato más eficiente.
- Carga las imágenes solo cuando están en el viewport (lazy loading).
- Puede agregar placeholders visuales mientras carga.
- Todo se cachea y se puede pre-renderizar con `priority`.

### Propiedades clave del componente `<Image />`

El componente `<Image />` cuenta con las siguientes propiedades:

#### — Obligatorias

- `src:string` — Url de la imagen (local o remota).

- `alt:string` — Texto alternativo.

#### — Opcionales

- `width` / `height:number`— Dimensiones (cuando no se usa `fill`).

- `fill:boolean`— Hace que la imagen llene su contenedor (`position: absolute`).
- `quality:number(1-100)`— Calidad de compresión.
- `priority:boolean`— Fuerza la precarga (útil en imágenes above-the-fold).
- `placeholder:'blur'|'empty'` — Aplica un placeholder hasta cargar la imagen.
- `blurDataURL:string`— URL base64 o local para `blur` placeholder.
- `style:CSSProperties` —E stilos inline (útil con `fill`).
- `onLoad:function`— Callback nativo al evento `onLoad`.
- `onError:function` — Callback al fallar la carga de la imagen.
- `loading:'lazy'|'eager'`— Controla si se carga de inmediato o diferido.
- `overrideSrc:string` —Sobrescribe el `src` en tiempo de ejecución

> Para revisar todas las propiedades, revisa la documentación oficial [[ref](https://nextjs.org/docs/app/api-reference/components/image#props)].

### Ejemplos

#### Ejemplo — Imagen local

Este ejemplo muestra cómo utilizar el componente `<Image />` de Next.js para cargar una imagen almacenada localmente dentro de la carpeta `public/`. Se utilizan propiedades mínimas como `src`, `alt`, `width` y `height`, lo cual permite que Next.js optimice automáticamente el tamaño, formato y carga de la imagen sin necesidad de configuraciones adicionales.

Guarda la siguiente imagen [[image](https://media.themoviedb.org/t/p/w600_and_h900_bestv2/x26MtUlwtWD26d0G0FXcppxCJio.jpg)] en `/public`.

Crea `page.tsx` de movies en `src/app/local-example/`:

```js
// /src/app/local-example/page.tsx
import Image from 'next/image';

export default function LocalExamplePage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">
        The Fantastic Four: First Steps (2025)
      </h2>
      <Image
        src={'/movies/theFantastic4.png'}
        alt="The Fantastic Four"
        width={200}
        height={300}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}
```

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000/local-example`.

![](https://cdn-images-1.medium.com/max/1600/1*OI6XeeUTX9Xd-3VhgpYNRQ.png)

#### Ejemplo — Imagen remota

Aquí se muestra cómo cargar una imagen desde un dominio externo ( `image.tmdb.org`) utilizando `<Image />`. Se emplean propiedades básicas como `src`, `alt`, `width`, `height` y configura el dominio remoto en `remotePatterns` dentro de `next.config.js` para cumplir con las políticas de seguridad de Next.js 15+.

Actualiza `next.config.js` para que acepte imágenes remotas de `image.tmdb.org`:

```js
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://image.tmdb.org/t/p/**')],
  },
};

export default nextConfig;
```

Crea `page.tsx` de movies en `src/app/remote-example/`:

```js
// /src/app/remote-example/page.tsx
import Image from 'next/image';

export default function RemoteExamplePage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Superman (2025)</h2>
      <Image
        src={'https://image.tmdb.org/t/p/w500/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg'}
        alt="Superman"
        width={200}
        height={300}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}
```

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000/remote-example`.

![](https://cdn-images-1.medium.com/max/1600/1*8a2vGy5QReLPG1c_flutCg.png)

Comenta en `next.config.js` la confioguración para que acepte imágenes remotas de `image.tmdb.org`:

```js
//next.config.js
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    //remotePatterns: [new URL('https://image.tmdb.org/t/p/**')],
  },
};

export default nextConfig;
```

Acceder a `http://localhost:3000/remote-example`.

![](https://cdn-images-1.medium.com/max/1600/1*OYwcyHkEgisMPfu2uLW63w.png)

Como ya lo mencionamos, a partir de Next.js **v14+**, el sistema de optimización de imágenes **bloquea por defecto cualquier dominio externo** para prevenir vulnerabilidades como SSRF y abusos del runtime en producción.

**Así que nunca olvides** declarar **explícitamente** los **dominios** **permitidos** mediante la propiedad `remotePatterns` en tu archivo `next.config.js`.

#### Ejemplo — Imágenes de un servicio

Este ejemplo consume imágenes de una API, y las renderiza usando propiedades avanzadas como `fill` para ocupar todo el contenedor, `placeholder="blur"` para mejorar la experiencia de carga inicial, y `priority` para indicar qué imágenes deben ser cargadas con mayor urgencia.

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

type Movie = {
  id: string,
  poster_path: string,
  title: string,
};

type MoviesResponse = {
  results: Movie[],
};

export async function fetchMovies(
  timeWindow: 'week' | 'day'
): Promise<MoviesResponse> {
  try {
    const url = `${BASE_URL}/trending/movie/${timeWindow}`;
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

Crea la `page.tsx` de la lista de películas en `src/app/list-movies/`:

```ts
// src/app/list-movies/page.tsx
import Image from 'next/image';
import { fetchMovies, Movie } from '@/services/tmdbService';

export default async function MoviesPage() {
  const { results } = await fetchMovies('week');

  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {results.map((movie: Movie) => (
          <div
            key={movie.id}
            className="relative w-full h-[400px] rounded-lg overflow-hidden border border-(--color-border) bg-(--color-muted) hover:shadow-lg transition-shadow"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPk2vyjHgAEugI2P+EanAAAAABJRU5ErkJggg=="
              priority={movie.id === results[0].id}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-(--color-background)/50 text-(--color-foreground) text-sm font-medium px-3 py-2 backdrop-blur-sm">
              {movie.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

La propiedad `placeholder="blur"` habilita un modo de carga progresiva: muestra primero una versión “_borrosa_” de la imagen mientras se descarga la versión completa y optimizada. Para ello, es necesario acompañar esta opción con `blurDataURL`, que define la fuente de la imagen borrosa que se muestra cómo _preview_. En este caso, se usa un **pixel PNG base64 transparente**, generado desde _png-pixel.com_ [[ref](https://png-pixel.com)], una herramienta gratuita que crea imágenes base64 de 1×1 píxel de peso ultraligero.

> Este enfoque es ideal cuando no tienes una versión optimizada borrosa de la imagen original y solo quieres evitar un "flash" en blanco mientras se carga la real.

La propiedad `priority` está condicionada para que solo la **primera imagen de la lista (`results[0].id`)** sea marcada como prioritaria. Esto significa que Next.js la cargará lo antes posible, sin aplicar lazy loading..

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000/list-movies`

![](https://cdn-images-1.medium.com/max/1600/1*q9Al8LD_inSsEoYMHyMy4w.gif)
![](https://cdn-images-1.medium.com/max/1600/1*S-qGjUYEG9CfX3S_gVjKbQ.gif)

#### Ejemplo — Imágenes en una página Client Component

Debido a que las funciones como `onLoad`, `onError` no están permitidas en **Server Components**, este ejemplo implementa una página **Client Component** donde se puede reaccionar ante eventos del ciclo de vida de la imagen. Es ideal para métricas, tracking, fallback dinámico, logs de rendimiento o UX personalizada basada en el estado de carga de cada imagen.

Crea el componente `Img` en `src/components/`:

```js
// src/components/img.tsx
'use client';

import { useState, useCallback, memo } from 'react';
import Image from 'next/image';

type ImageStatus = 'idle' | 'loaded' | 'error';
type ImgProps = { url: string };

function ImgComponent({ url }: ImgProps) {
  const [status, setStatus] = useState < ImageStatus > 'idle';
  const onSuccess = useCallback(() => setStatus('loaded'), []);
  const onError = useCallback(() => setStatus('error'), []);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-(--color-border) bg-(--color-muted) hover:shadow-lg transition-shadow">
      {status === 'error' && <div>placeholder</div>}
      <Image
        alt={url}
        src={url}
        fill
        className="object-cover hover:scale-105 transition-transform duration-300"
        onLoad={onSuccess}
        onError={onError}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-(--color-background)/50 text-(--color-foreground) text-sm font-medium px-3 py-2 backdrop-blur-sm">
        <span
          className={`font-semibold ${
            status === 'error'
              ? 'text-red-600'
              : status === 'loaded'
              ? 'text-green-600'
              : 'text-yellow-600'
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export const Img = memo(ImgComponent);
```

Crea la `page.tsx` de la lista de películas en `src/app/client-image/`:

```js
import { Img } from '@/components/img';

const imageSources = [
  'https://image.tmdb.org/t/p/w500/tUae3mefrDVTgm5mRzqWnZK6fOP.jpg', // válida
  'https://image.tmdb.org/t/p/w500/no-existe2.jpg', // inválida para probar error
];

export default function ClientImagePage() {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-6">
      <div className="grid grid-cols-2 gap-6">
        {imageSources.map((src, index) => (
          <Img key={index} url={src} />
        ))}
      </div>
    </div>
  );
```

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000/client-image`.

![](https://cdn-images-1.medium.com/max/1600/1*09FRi3QK16ZEEttHoSMC1g.gif)

### A considerar

- **Imágenes locales** — Se deben almacenar dentro de `/public` o importar directamente.

- **Imágenes externas** — Requieren configuración en `next.config.js`.
- **Para SVGs — **No uses `<Image>`, utiliza mejor `<img>`.
- **Accesibilidad** — Siempre usar `alt` descriptivo para mejorar accesibilidad y SEO.
- **Placeholder** — Usa `placeholder="blur"` para mejorar la experiencia visual inicial.
- **width/height** — Es obligatorio definir ambos para evitar CLS (layout shift).
- **Loader personalizado** — Puedes usar servicios como ImageKit, Cloudinary o Imgix.

### Tips avanzados

- Puedes servir imágenes diferentes según entorno (dev vs prod)

```js
const imageUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://cdn.myapp.com/img.jpg'
    : '/img-dev.jpg';
```

- Controla el `object-fit` con Tailwind (`object-cover`, `object-contain`) para evitar deformaciones con `fill`.

- Evalúa si tu imagen es decorativa (`role="presentation"` o `alt=""`) para evitar ruido accesible.
- Evita `unoptimized` salvo que tengas un sistema CDN propio muy optimizado (y que entiendas los riesgos de hacerlo).

### Hasta este punto…

Ya comprendes cómo funciona la optimización de imágenes en Next.js, sus ventajas, cómo aplicarla tanto en imágenes locales como remotas, y cómo sacarle el máximo provecho con placeholders, lazy loading y formatos modernos.

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
git checkout image-optimization
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
