# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Metadata

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-3)**] (branch: base-project-3).** Este proyecto incluye actualización visual y estructural de estilos utilizando TailwindCSS v4.

> Para simular la carga de datos en los ejemplos vamos utilizar la API **jsonplaceholder**[[ref](https://jsonplaceholder.typicode.com/)] y **fakestoreapi**[[ref](https://fakestoreapi.com/)]

**Desde Next.js 13 App Router**, los metadatos dejaron de definirse directamente en JSX dentro del `<head>`, y pasaron a estar controlados por un **objeto exportado llamado** `metadata` o una **función** `generateMetadata()` dentro del archivo `page.tsx`, `layout.tsx` o `route.ts`.

### ¿Qué es?

El sistema de **metadata** en Next.js 15+ es una **API declarativa** diseñada para definir metadatos SEO, Open Graph, Twitter Cards, configuración del viewport, íconos, y más, **de forma estructurada, segura y escalable**.

Este sistema reemplaza al tradicional uso de componentes como `<Head>` o `next/head`, integrando la metadata como parte del _App Router_, completamente tipada y compatible con SSR/SSG.

Esto permite que Next.js compile, optimice y sirva la metadata junto con el HTML, mejorando el rendimiento y la experiencia en motores de búsqueda y redes sociales.

### Principales características

- API estructurada (`metadata`, `generateMetadata`).

- Soporte para metadatos estáticos y dinámicos.
- **Más seguridad** evitando inyecciones, errores de head mal formateado y validado en build-time.
- Se puede definir por layout o por página.
- Compatible con `app/` y el sistema de file-based routing.
- Renderizado en el servidor, compatible con SSR e ISR.

### Ventajas

- **Mejora el SEO** de forma declarativa y escalable.

- **Centraliza la configuración** sin tener que manipular el DOM directamente.
- **Previene duplicaciones** o errores típicos con `<Head>`.
- **Compatible** con modales, rutas dinámicas e internacionalización.
- Se **integra** con **herramientas** de **análisis** y preview (Twitter, Slack, Discord).
- **Mejor integración con navegadores** (viewport, robots, manifest, themeColor)

### ¿Dónde se define?

- `page.tsx` — Metadata específica de página (`title`).

- `layout.tsx` Metadata común para todas las páginas hijas (nombre del sitio, favicon, etc).
- `generateMetadata()` — Metadata dinámica, basada en `params`, `searchParams`, o `fetch()` (title y descripción dinámica por ID).

### ¿Cómo se crea o implementa?

#### — Estática

Cuando conoces todos los datos en tiempo de build.

```js
// app/blog/page.tsx
export const metadata = {
  title: 'Blog - Mi Sitio',
  description: 'Explora los artículos del blog',
};
```

![](https://cdn-images-1.medium.com/max/1600/1*K0KEhYFfFaQ4osREUcF0yg.png)

####  — Dinámica

Cuando necesitas datos del backend o del `params` para generar contenido dinámico.

```js
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: [post.coverImage],
    },
  };
}
```

![](https://cdn-images-1.medium.com/max/1600/1*aLz6befamqkFqKEAC_zHVw.png)

### ¿Cómo funciona?

- **En build** (estático): se extrae la metadata declarada desde `metadata`.

- **En runtime** (SSR): se ejecuta `generateMetadata()` con `params` y `searchParams`.
- Next.js fusiona la metadata del layout superior y la de la página.
- El resultado se inyecta en el `<head>` del HTML que Next.js entrega al cliente.
- Si usas Open Graph o Twitter Cards, Next.js lo convierte a etiquetas `<meta>` estándar compatibles con los crawlers.

### Propiedades disponibles

El objeto `metadata` de Next.js permite definir metadatos de forma tipada, segura y jerárquica.

####  — ¿Que puedes controlar con metadata?

- `title`— Título de la página [[ref](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#title)].

- `description` — Descripción corta de la página para buscadores [[ref](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#description)].
- `applicationName` —Nombre de la aplicación web.
- `authors` — Lista de autores.
- `keywords` — Lista de palabras clave relevantes.
- `creator` — Nombre del autor del contenido.
- `robots` — Controla indexación por crawlers [[ref](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#robots)].
- `manifest`— URL al `manifest.webmanifest` [[ref](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#manifest)].
- `icons` — Define iconos favicon, Apple Touch, etc [[ref](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#icons)].
- `openGraph`— Configuración completa de Open Graph (Facebook, LinkedIn, WhatsApp, etc) [[ref](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#opengraph)][[ref](https://ogp.me/)].
- `twitter`— Configuración específica de Twitter Cards [[ref](https://developer.x.com/en/docs/twitter-for-websites/cards/overview/markup)].
- `appleWebApp`— Metadatos específicos para Safari/Apple PWA [[ref](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#applewebapp)].
- `metadataBase` — Base para construir URLs absolutas en `openGraph`, `twitter`, `alternates`, etc. [[ref](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase)]

y otros más…para ver la lista completa revisa la documentación [[ref](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields)].

### Ejemplos

#### Ejemplo — Metadata estática por página

Definir `title` y `description` para una página pública.

Agrega el metadata a la página de la raíz `/src/app/page.tsx`

```js
//src/app/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | MyApp',
  description: 'Welcome to the site where we explain nextjs metadata',
};

export default function HomePage() {
  return (
    <main className="container gap-3">
      <h1 className="title">Página principal</h1>
      <h2 className="subTitle">Lorem ipsum dolor sit amet consectetur.</h2>
      <p>
        Maiores pariatur iste reprehenderit iure. Modi vero, rem animi aliquam,
        distinctio tempora autem quae recusandae beatae debitis blanditiis
        quasi, esse quia totam.
      </p>
      <p>
        Lorem ipsum dolor sit amet
        <span className="text-(--color-highlight)"> consectetur</span>, adipisicing
        elit.
      </p>
    </main>
  );
}
```

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000` . Cuando se renderiza la página, el HTML generado incluirá:

![](https://cdn-images-1.medium.com/max/1600/1*Yb63uNaqWObSYfcBXJDyAA.png)

#### Ejemplo — Metadata común para todas las páginas (`layout.tsx`)

Centralizar metadata base como íconos, nombre del sitio, etc.

Agrega el metadata a el layout de la raíz `/src/app/layout.tsx`

```js
//src/app/layout.tsx

import './globals.css';
import { DM_Sans } from 'next/font/google';
import { Metadata } from 'next';

const dmSans = DM_Sans({
  weight: '300',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'MyApp',
    template: '%s | MyApp',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  applicationName: 'MyAppName',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <html lang="en" className={dmSans.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*88uMVmJt2nY6qOnIHZMO8g.png)

Donde:

- Todas las páginas usarán esta metadata como base.

- Si `page.tsx` define un `title`, se combinará con la plantilla `%s | MiSitio`.

> **Importante:** `title.template` se aplica a los segmentos de ruta secundarios y no al segmento en el que está definido.

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000` . Cuando se renderiza la página, el HTML generado incluirá:

![](https://cdn-images-1.medium.com/max/1600/1*88uMVmJt2nY6qOnIHZMO8g.png)

#### Ejemplo — Metadata dinámica con `generateMetadata()`

Generar metadata SEO dinámica desde la base de datos o una API.

Crea el servicio de posts en `/src/services`

```js
//src/services/posts.ts
export async function getPost(slug: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  const data = await res.json();
  return data;
}
```

Crea la `page.tsx` del blog en `src/app/blog/[slug]/`:

```js
// app/blog/[slug]/page.tsx
import { getPost } from '@/services/posts';

type Props = {
  params: Promise<{ slug: string }>,
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.body.slice(0, 150),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <article className="container">
      <h1 className="title">{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}
```

Donde:

- Cada post tendrá su propio `<title>` y `<meta description>`, perfecto para SEO y redes sociales.

Al iniciar el servidor `npm run dev`, acceder a:

```bash
http://localhost:3000/blog/1
http://localhost:3000/blog/2
http://localhost:3000/blog/3
http://localhost:3000/blog/4
```

Cuando se renderiza la página, el HTML generado incluirá:

![](https://cdn-images-1.medium.com/max/1600/1*5EAKDP7WOYmHkpka5DIcww.png)

#### Ejemplo — Metadata completa con OpenGraph + Twitter

Simular una página de detalle tipo producto usando Open Graph y Twitter Cards para compartir.

Crea el servicio de productos en `/src/services`

```js
//src/services/products.ts
export async function getPhoto(slug: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${slug}`);
  const data = await res.json();

  return data;
}
```

Actualiza `next.config.js` para que acepte imágenes remotas de `fakestoreapi.com`:

```js
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://fakestoreapi.com/img/*')],
  },
};

export default nextConfig;
```

Crea `page.tsx` de productos en `src/app/products/[id]`:

```js
// app/photo/[id]/page.tsx
import { getPhoto } from '@/services/products';
import Image from 'next/image';

type Props = {
  params: Promise<{ id: string }>,
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const photo = await getPhoto(id);

  return {
    title: photo.title,
    description: photo.description,
    openGraph: {
      title: photo.title,
      description: photo.description,
      type: 'article',
      url: photo.image,
      images: [
        {
          url: photo.image,
          width: 600,
          height: 600,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: photo.title,
      description: 'Check out this awesome product...',
      images: [photo.image],
    },
  };
}

export default async function PhotoPage({ params }: Props) {
  const { id } = await params;
  const photo = await getPhoto(id);

  return (
    <div>
      <h1>{photo.title}</h1>
      <Image src={photo.image} width={200} height={100} alt={photo.title} />
    </div>
  );
}
```

Donde:

- Cuando alguien comparte este link, redes como WhatsApp o Twitter usarán la imagen, el título y la descripción correctamente.

- Mejor experiencia de vista previa enriquecida (Rich preview cards)

Al iniciar el servidor `npm run dev`, acceder a:

```bash
http://localhost:3000/products/1
http://localhost:3000/products/2
http://localhost:3000/products/3
http://localhost:3000/products/4
```

Cuando se renderiza la página, el HTML generado incluirá:

![](https://cdn-images-1.medium.com/max/1600/1*wou-hHMAnebELv0pXJAM7w.png)

#### Ejemplo — Multilenguaje SEO-friendly

Cuando tu app ofrece rutas o versiones por idioma (`/es`, `/en`, `/fr`, etc.) Google y otros motores lo interpretan como contenido localizado, lo que mejora el SEO internacional.

Actualiza el metadata a el layout de la raíz `/src/app/layout.tsx`

```js
export const metadata: Metadata = {
  title: {
    default: 'MyApp',
    template: '%s | MyApp',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  applicationName: 'MyAppName',
  alternates: {
    canonical: 'http://localhost:3000/', //Poner la url productiva
    languages: {
      'es-MX': '/es',
      'en-US': '/en',
      'fr-FR': '/fr',
    },
  },
};
```

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000` . Cuando se renderiza la página, el HTML generado incluirá:

![](https://cdn-images-1.medium.com/max/1600/1*zOPNKhvNQERW1TsP9M9GrA.png)

> **Importante:** asegúrate de que cada una de esas rutas exista y sirva contenido en el idioma correcto. Lo ideal es combinar esto con `i18n routing` o un sistema de localización como `next-intl` o `react-i18next`.

### A considerar

- Siempre incluye `title` y `description`.

- Usa `generateMetadata()` solo cuando realmente necesitas lógica dinámica.
- No uses `<Head>` manual con App Router.
- Usa `icons`, `robots`, `manifest`, desde la metadata, no en `public/`.
- Usa tipos de TypeScript para metadata (`Metadata` de `next`).
- No abuses del render dinámico solo para generar metadata (puede afectar el rendimiento).
- Usa herramientas como metatags.io [[ref](https://metatags.io)] para validar.

### Tips avanzados

- **Centraliza metadatos comunes en** `layout.tsx`. En vez de repetir `title`, `favicon`, etc. en cada página, defínelos a nivel global en `app/layout.tsx`. Solo sobreescribe cuando realmente cambia algo.

- **Valida rutas en** `generateMetadata()`. Previene que `params.slug` o `params.id` no devuelva 404, para evitar errores de SSR y SSG.

---

## Hasta este punto…

Ya conoces a fondo el sistema de metadata en Next.js 15+, desde su estructura estática y dinámica, hasta casos reales con SEO, OpenGraph, Twitter Cards, verificación y estrategias multilenguaje. Aprendiste a definir metadata global y por pagina, evitar errores comunes y optimizar el rendimiento de tus páginas públicas.

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
git checkout base-project-3
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
