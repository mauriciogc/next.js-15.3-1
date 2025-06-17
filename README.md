# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## not-found.tsx

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-2)**] (branch: base-project-2).** Este proyecto contiene los archivos: `src/app/page.tsx` y `src/app/layout.tsx`, configurados con una estructura mínima.

> Para simular la carga de datos en los ejemplos vamos utilizar la API **jsonplaceholder**[[ref](https://jsonplaceholder.typicode.com/)].

### ¿Qué es not-found`.tsx`?

`not-found.tsx` es un archivo especial dentro del App Router de Next.js que permite definir una **UI personalizada para errores 404 (página no encontrada)** en un segmento de ruta específico. Se complementa con la función `notFound()` del runtime, que se puede invocar manualmente desde cualquier componente del lado del servidor para forzar un error 404.

Este patrón reemplaza el enfoque centralizado de `pages/404.tsx` del Pages Router, brindando una experiencia **modular, segmentada y escalable** en aplicaciones modernas construidas con App Router.

### Principales características

- Se ubica por segmento (e.g. `/app/blog/not-found.tsx`).
- Soporta múltiples niveles de fallback: cada segmento puede tener su propio `not-found.tsx`.
- Se activa automáticamente si la ruta no existe o cuando se llama manualmente `notFound()`.
- Compatible con renderizado estático, dinámico y stream (SSR/SSG/CSR).
- Puede usarse junto con `generateStaticParams`, `fetch`, `params` y validaciones personalizadas.
- Es **estática y ligera**, lo que mejora la UX.

### Ventajas

- **Control granular del estado 404**, permitiendo definir cuándo una página no debe renderizarse.
- **Mejor experiencia de usuario**, ya que puedes diseñar interfaces 404 alineadas con tu branding.
- **Manejo de errores limpio y declarativo**, sin necesidad de lógica condicional en cada componente.
- **Separación de responsabilidades:** la vista de “no encontrado” está desacoplada del fetch/render.
- **Optimización SEO:** el status code 404 se refleja correctamente en respuestas server-side.
- **Facilidad de mantenimiento:** cada ruta puede tener su propio 404 específico, útil para grandes plataformas.
- **Scope local de errores 404**: no necesitas una única página 404 para toda la app.

### ¿Cómo se crea o implementa?

- Simplemente crea un archivo llamado `not-found.tsx` dentro de la carpeta donde quieras capturar rutas no válidas. Debe exportar un componente de React por defecto.

```js
export default function NotFound() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">404 - Página no encontrada</h1>
      <p>Lo sentimos, el recurso que buscas no existe.</p>
    </div>
  );
}
```

- Desde cualquier archivo de página o layout puedes lanzar manualmente un 404 usando la función:

```js
import { notFound } from 'next/navigation';

notFound();
```

Ejemplo en la estructura de carpetas:

![](https://cdn-images-1.medium.com/max/800/1*0pSpbbkc3ddMtRb6THYAkw.png)

### ¿Cómo funciona?

- `notFound()` lanza una excepción especial en tiempo de ejecución (equivalente a `throw new NotFoundError()`).
- Durante el renderizado en el App Router, Next.js intercepta esta excepción, busca el `not-found.tsx` más cercano en el árbol de segmentos y detiene el render actual y devuelve el contenido de `not-found.tsx`.
- Esto es parte de un sistema de control de flujo interno de Next.js basado en `React Server Components`, `React Suspense`, y el compilador que transforma el código de rutas en segmentos serializables.
- El archivo se comporta como un reemplazo de página y **no puede ser ignorado** una vez invocado.

> **Importante**: si el archivo no existe, Next.js muestra su fallback genérica de 404.

### Ejemplos

#### **Ejemplo — Not found en raíz**

Crea el `not-found.tsx` en `src/app/` :

```js
// app/not-found.tsx
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 px-6">
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            WHOOPS!
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            We couldn’t find the page you are looking for
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition"
          >
            GO BACK
            <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="flex items-center justify-center w-44 h-44 rounded-full shadow-lg  bg-red-500 text-5xl text-white">
          404
        </div>
      </div>
    </div>
  );
}
```

![](https://cdn-images-1.medium.com/max/800/1*QvEHMVE3Fu5GtHvg5XYE1Q.png)

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000/chat`:

![](https://cdn-images-1.medium.com/max/1600/1*JMuzHgbil3ZoXpfNJWWDpw.gif)

#### **Ejemplo — Uso con validación de parámetros**

Crea el `not-found.tsx` y `page.tsx` del blog en `src/app/blog/[id]` :

```js
// src/app/blog/[id]/not-found.tsx

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 px-6">
        {/* Texto */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Uh ohhhh!
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Sorry, the page could couldn’t be found
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-2 border border-amber-500 text-amber-500 rounded-full hover:bg-amber-500 hover:text-white transition"
          >
            BACK TO DASHBOARD
          </Link>
        </div>

        <div className="flex items-center justify-center w-44 h-44 rounded-ss-4xl shadow-lg  bg-amber-500 text-5xl text-white">
          404
        </div>
      </div>
    </div>
  );
}
```

```js
// src/app/blog/[id]/page.tsx

import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { id } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) return notFound(); // Se ejecuta manualmente

  const blog = await res.json();
  return (
    <div className="p-4 space-y-3 ">
      <h1 className="text-2xl text-amber-400">{blog.title}</h1>
      <p className="text-gray-500">{blog.body}</p>
    </div>
  );
}
```

![](https://cdn-images-1.medium.com/max/800/1*B_u8yjFWzptK4gxoEz-ULQ.png)

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000/blog`, podrás observar que manda el `not-found.tsx` más cercano que en este caso es `app/not-found.tsx`

![](https://cdn-images-1.medium.com/max/1600/1*KYLEuUZfsTykDtoRzIeSGQ.gif)

Accede a:

```yaml
http://localhost:3000/blog/1      → [OK]
http://localhost:3000/blog/10     → [OK]
http://localhost:3000/blog/1000   → [404]
```

![](https://cdn-images-1.medium.com/max/1600/1*km39d5BK-d8C3yGju2q1WA.gif)

Podrás observar que cuando falla el `fetch`, manda el `not-found.tsx` más cercano que en este caso es `app/blog/[id]/not-found.tsx`.

### A considerar

- **Siempre crea** `**not-found.tsx**` **en segmentos críticos** como `blog/`, `profile/`, `media/`.
- No recibe props ni contextos dinámicos.
- Usa `notFound()` en puntos de validación clave (e.g., `fetch()`, `params`, `generateStaticParams()`).
- Evita usar `throw new Error('404')`: no es interceptado como `notFound()` y termina como un error general (`500`).
- Siempre usa `notFound()` en lugar de retornar `null`, para evitar renderizados vacíos.
- Si usas rutas dinámicas con `generateStaticParams`, asegúrate de controlar los errores con `notFound()`.
- No renderices condicionalmente desde `not-found.tsx`: su propósito es **mostrar**, **no manejar lógica**.
- Puedes usar `not-found.tsx` junto con `error.tsx` en el mismo segmento.
- Agrega tests E2E para rutas inexistentes y respuestas esperadas.

### `error.tsx` o `not-found.tsx`

**¿Qué se ejecuta primero?**

- Si el componente lanza `notFound()` se ejecuta `not-found.tsx` ya que lanza una excepción especial que interrumpe el render y activa el 404.
- La ruta no existe o no está pre-generada se ejecuta `not-found.tsx` ya que es el fallback por defecto cuando no se encuentra un segmento válido.
- Ocurre un error inesperado en el render, efecto o carga asíncrona se ejecuta `error.tsx` ya que es capturado por React como un **error boundary** local.
- El componente o fetch lanza `throw new Error()` se ejecuta `error.tsx` ya que Next.js lo trata como error genérico (`500`) si no se usa `notFound()`.

Entonces:

- Usa `not-found.tsx` para recursos **faltantes**, rutas inválidas o validaciones de negocio.
- Usa `error.tsx` para **errores inesperados**: caídas de API, bugs de render, fallos de efectos.
- Ambos se complementan, pero no se encadenan: `**notFound()**` **interrumpe antes de que** `**error.tsx**` **tenga oportunidad de ejecutarse**.

---

Hasta este punto, has aprendido a **utilizar correctamente el archivo** `**not-found.tsx**` **dentro del App Router de Next.js**, entendiendo su propósito, cuándo se ejecuta y cómo se diferencia del comportamiento que ofrece `error.tsx`.

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
git checkout not-found
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
