# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## global-error.tsx

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-2)**] (branch: base-project-2).** Este proyecto contiene los archivos: `src/app/page.tsx` y `src/app/layout.tsx`, configurados con una estructura mínima.

> Para simular la carga de datos en los ejemplos vamos utilizar la API **jsonplaceholder**[[ref](https://jsonplaceholder.typicode.com/)].

### ¿Qué es `global-error.tsx`?

`global-error.tsx` es un archivo especial del sistema de convenciones de Next.js que permite definir una **interfaz global de fallback para errores no controlados** dentro del **App Router**. A diferencia de los archivos `error.tsx` específicos por segmento, `global-error.tsx` se utiliza para capturar **cualquier error no manejado a lo largo de toda la aplicación**.

Su propósito es garantizar una **última opción** ante fallos inesperados durante el render, ya sea en layouts, páginas, Server Components o efectos client-side. Se basa en el mecanismo de **React Error Boundaries** pero aplicado de forma global.

### Principales características

- **Ubicación fija**: debe estar en `app/global-error.tsx`.

- **Global scope:** Cubre cualquier error que no haya sido atrapado por un `error.tsx` en rutas hijas.
- **Client Component obligatorio**: requiere `'use client'` ya que utiliza hooks.
- **Recibe los props estándar de error boundaries:** `error` y `reset()`, por lo que permite intentar re-renderizados.
- **Compatible con layouts, streaming, y React Server Components.**
- **No captura errores de efectos (**`useEffect`**), solo renderización.**
- **Funciona bien con internacionalización y middlewares.**

### Ventajas

- **Seguridad global**: asegura que ningún error quede sin capturar visualmente.

- **Consistencia UX**: puedes centralizar la experiencia de errores críticos.
- **Fallback predeterminado**: ideal para errores no previstos o de última instancia.
- **Integración fácil**: se instala como un componente client sin configuraciones adicionales.

### ¿Cómo se crea o implementa?

Simplemente crea un archivo `global-error.tsx` dentro de `src/app/`:

```js
'use client';

import './globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error,
  reset: () => void,
}) {
  useEffect(() => {
    // Logging para monitorización
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body className="p-6 text-center">
        <h1 className="text-3xl font-bold text-red-600">¡Oops!</h1>
        <p>Algo salió mal !</p>
        <button
          className="mt-4 bg-gray-100 p-2 rounded"
          onClick={() => {
            startTransition(() => {
              router.refresh();
              reset();
            });
          }}
        >
          Reintentar
        </button>
      </body>
    </html>
  );
}
```

> **Importante**: Este componente **debe envolver su contenido en `<html><body>`**, a diferencia de `error.tsx`, para evitar conflictos con la raíz de render.

#### No olvides…

Qué `reset()` solo re-renderiza los componentes del lado del cliente. Si tu página o componentes dependen de datos o renderizado del lado del servidor, `reset()` por sí solo no actualizará esos contenidos.

Para forzar una re-renderización completa que incluye tanto componentes del lado del cliente como del servidor, se recomienda utilizar el hook `useRouter()` de next/navigation y la función `startTransition()` de React.

Esto va a garantizar una re-renderización sincronizada de ambos lados, cliente y servidor.

#### ¿Por qué `startTransition`?

- `reset()` es ideal para errores causados por interacciones del cliente, pero no reinicia la lógica del servidor.

- `router.refresh()` actualiza el contenido SSR/Server Components, pero no limpia el estado del cliente.
- `startTransition()` permite coordinar ambas operaciones sin bloquear el render principal, garantizando una experiencia fluida y coherente en toda la aplicación.

### ¿Cómo funciona?

- Si un error ocurre en cualquier parte de la aplicación y no hay un `error.tsx` local para manejarlo...

- Next.js asciende por la jerarquía de rutas buscando un archivo `error.tsx`.
- Si no encuentra ninguno, **renderiza** `global-error.tsx` como fallback de nivel superior.
- El componente recibe `error` y `reset()` como props.
- La función `reset()` permite reintentar el renderizado del árbol afectado.

Este comportamiento se integra con el sistema de streaming y Suspense de React, permitiendo manejar incluso errores en flujos asíncronos o SSR.

### Ejemplos

#### Ejemplo — Uso con validación de parámetros

Crea el `global-error.tsx`

```js
// src/app/global-error.tsx
'use client';

import './globals.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { startTransition } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error,
  reset: () => void,
}) {
  const router = useRouter();
  useEffect(() => {
    // Enviar a un servicio externo como Sentry, LogRocket, etc.
    console.error('Error en el blog:', error);
  }, [error]);

  return (
    <html>
      <body>
        <main className="flex flex-col items-center font-serif justify-center min-h-screen text-center px-4 bg-white text-gray-800">
          <h1 className="text-3xl md:text-5xl mb-6">
            Se suponía que este error nunca debía de ocurrir.
          </h1>
          <p className="text-base md:text-lg font-serif  max-w-xl mb-8">
            No tenemos un nombre especial para este sitio. Algunos lo llaman
            página cuatro-cero-cuatro, pero nosotros preferimos decir que es el
            lugar donde descansa el alma de Tim Berners-Lee.
          </p>
          <button
            className="inline-flex items-center px-12 py-2 border border-blue-500 font-light text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition cursor-pointer"
            onClick={() => {
              startTransition(() => {
                router.refresh();
                reset();
              });
            }}
          >
            Reintentar
          </button>
        </main>
      </body>
    </html>
  );
}
```

Cera `page.tsx` del blog en `src/app/blog/[id]` :

```js
// src/app/blog/[id]/page.tsx

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error('¡Error!');

  const blog = await res.json();
  return (
    <div className="p-4 space-y-3 ">
      <h1 className="text-2xl text-amber-400">{blog.title}</h1>
      <p className="text-gray-500">{blog.body}</p>
    </div>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*O35abNnnTy7Edjbb-8dXkw.png)

Ejecuta en la consola `npm run build && npm run start`, podrás acceder a esta página visitando `http://localhost:3000/blog/1`

![](https://cdn-images-1.medium.com/max/1600/1*t5wcksNZZgemM9L4t_w-vg.gif)

Los siguientes pasos son para bloquear/desbloquear la API y probar el mensaje:

- Bloquea el dominio `jsonplaceholder.typicode.com` desde tus herramientas de red o firewall (puedes usar herramientas como _DevTools → Network conditions_, _Mock Service Worker_, _Charles Proxy_, etc.)

- Accede a la página para forzar un error de red.
- Verifica que se muestra correctamente la interfaz de `global-error.tsx`
- Luego, desbloquea el dominio.
- Haz clic en el botón “Reintentar” (que internamente ejecuta `reset()`), y observa cómo la página se re-renderiza.

![](https://cdn-images-1.medium.com/max/1600/1*TEhvSlnY8iAmzH5boMyO-A.gif)

> **Recuerda**: Que para visualizar el archivo `global-error.tsx` solo es en producción en dev se muestra el error detallado

### A considerar

- Solo funciona en **producción** (en dev se muestra el error detallado).
- **Siempre incluye** `reset()` como opción para **recargar** o reintentar la operación.

- Idealmente integra servicios de logging (Sentry, LogRocket, consola propia) para registrar errores críticos.
- No recargues con lógica de negocio.
- **No utilices lógica asincrónica** compleja dentro del componente (e.g., `fetch()`), ya que **no es un componente server-side**.
- **No omitas la etiqueta** `<html><body>`: es obligatorio, ya que reemplaza la estructura de documento original.

### ¿Se puede usar con `loading.tsx`?

**Sí**. Si tienes una página o layout que carga contenido asíncrono:

![](https://cdn-images-1.medium.com/max/1600/1*Z5DA2JX6cRaFAEVBnxCZHw.png)

Y ocurre un error en el `fetch()` o `render`, y no tienes un `error.tsx` ahí, **Next.js cargará** `global-error.tsx`.

### Comparativa: global-error.tsx vs error.tsx vs not-found.tsx

![](https://cdn-images-1.medium.com/max/1600/1*bLmL5CdFTNVIpSJ363AvkA.png)

---

Hasta este punto, has aprendido a utilizar correctamente el archivo `global-error.tsx` dentro del App Router de Next.js, comprendiendo su propósito como mecanismo de protección global ante errores no controlados. A diferencia de `error.tsx`, que captura errores a nivel de layout o ruta específica, y de `not-found.tsx`, que se utiliza exclusivamente para manejar rutas inexistentes (404), `global-error.tsx` actúa como el último fallback de toda la aplicación, garantizando una experiencia controlada incluso cuando no hay manejadores locales definidos.

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
git checkout global-error
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
