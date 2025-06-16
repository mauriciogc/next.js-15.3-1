# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## middleware.js

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-2)**] (branch: base-project-2).** Este proyecto contiene los archivos: `src/app/page.tsx` y `src/app/layout.tsx`, configurados con una estructura mínima.

### ¿Qué es?

`middleware.js` es un archivo especial dentro del sistema de rutas de Next.js (a partir de la versión 12 y mejorado en v13+) que permite interceptar y modificar solicitudes HTTP **antes de que lleguen a las rutas o páginas** correspondientes.

Se ejecuta en el **edge runtime (V8 Engine con restricciones)** y está diseñado para ser **ligero, rápido y asincrónico**.

### Principales características

- **Edge Runtime:** se ejecuta en la red de borde, no en Node.js.

- **Intercepta requests** entrantes antes de llegar a cualquier página o API route.
- **Modifica el request antes del rendering**, pero no puede acceder a componentes de React.
- **Permite redirecciones, reescrituras, rewrites o abortar la navegación.**
- **Rendimiento optimizado:** sin tiempo de arranque, ideal para decisiones rápidas.
- **Integración profunda con App Router:** trabaja con `matcher` para definir qué rutas afecta.
- **Ideal para autenticación, A/B testing, personalización regional.**
- **Sin acceso al DOM ni a APIs de Node como `fs`, `path`, `process`.**

### Ventajas

¿Por qué usar **middleware** en Next.js en lugar de otros mecanismos como API routes o `useEffect`?

- Se **ejecuta** **antes** que **cualquier** **rendering**; ideal para lógica que debe ocurrir antes de que el usuario vea algo.

- **Funciona** en todo el **árbol** de **rutas** y en rutas **dinámicas**, **estáticas** o **protegidas**.
- **No necesita esperar** a cargar componentes **React**.
- **Autenticación sin client-side JS**: Ideal para **proteger** **rutas** sin exponer lógica en el navegador.
- Una sola **función** **centralizada** que intercepta múltiples rutas.
- **Soporte para respuestas tempranas;** ideal para **abortar** una solicitud **antes** de llegar al render.

### ¿Cómo se crea o implementa?

Crea un archivo `middleware.ts` (o `.js`) en la raíz del proyecto (`/src`), define una función `middleware()` que reciba `NextRequest` y retorne `NextResponse`:

```js
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest): NextResponse {
  console.log('Interceptando request:', request.nextUrl.pathname);
  // lógica antes de procesar la ruta

  return NextResponse.next(); // Continúa la navegación normal
}
```

> **Nota**: `NextResponse.next()` permite que la navegación continúe. Puedes reemplazarlo por `NextResponse.redirect(...)` o `NextResponse.rewrite(...)`.

Usa el export `config` _(opcional)_ para limitar rutas (en el mismo archivo o en `middleware.config.js`):

```js
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'], // solo aplica en estas rutas
};
```

#### Ejemplo funcional

```js
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Redirigir si el usuario no está logueado
  if (pathname.startsWith('/dashboard') && !request.cookies.has('auth-token')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

Donde:

- Solo aplica para rutas que empiezan con `/dashboard`

- Revisa si hay una cookie `auth-token`
- Redirige al usuario a `/login` si no está autenticado, caso contrario continua el flujo.

### ¿Cómo funciona?

El middleware en Next.js actúa como un **proxy de ejecución anticipada**: intercepta toda solicitud HTTP entrante **antes** de que llegue a los componentes de página, API Routes, Server Components o Layouts. Se ejecuta en la capa de edge runtime y su principal función es **evaluar la solicitud y devolver una respuesta modificada o permitir que continúe el flujo normal**.

![](https://cdn-images-1.medium.com/max/1600/1*F2jOwr89WGlN7RA2qgNjtQ.png)

Esto permite optimizaciones importantes como: Redirigir, reescribir URL, continuar, bloquear, manipular headers, etc.

Internamente, el middleware intercepta el request **antes del routing** y devuelve una instancia de `NextResponse`, que se convierte en la respuesta efectiva o continúa con la ejecución estándar.

```js
// Tipificación interna (simplificada)
export function middleware(request: NextRequest): NextResponse {
  // ... lógica ...
}
```

### NextResponse y NextRequest

Ambos provienen de `next/server` y están optimizados para Edge:

import { NextRequest, NextResponse } from 'next/server';

`NextResponse` es una extensión del objeto `Response` de la **Web API**, proporcionada por Next.js. Está diseñado para **interactuar con funcionalidades específicas del framework**, como redirecciones, reescrituras, manipulación de cookies o headers, y control de flujo en middleware o endpoints.

`NextRequest` es una extensión del estándar `Request` del **Web Platform**, proporcionada por Next.js. Diseñada para **agregar funcionalidades** adicionales relevantes en el contexto de ejecución del servidor (ya sea Node.js o Edge Runtime).

#### ¿Por qué usar `NextRequest` y `NextResponse`? —

**`NextRequest` (extiende de `Request`)**

Ofrece métodos y propiedades específicas de Next.js, como:

- `.nextUrl` – Una instancia de `URL` enriquecida con información de pathname, query, etc..

- `.cookies.get(name)` – Acceso directo a cookies.
- `.headers.get(name)` – Acceso directo a encabezados.
- `.geo`, `.ip`– Disponibles si se habilita Vercel.

**`NextResponse` (extiende de `Response`)**

Ofrece formas de retornar un control de flujo o una respuesta directa:

- `.next()` – Continuar navegación.

- `.redirect(url)` – Redirección simple.
- `.rewrite(url)` – Reescritura del request.
- `.json(data)` – Para respuestas JSON formateadas.
- `.headers.set()`, `.cookies.set()` – Manejo de headers/cookies de forma declarativa.

#### Diferencias clave (`Request` or `NextRequest`)—

![](https://cdn-images-1.medium.com/max/1600/1*OnwD_VnXfNLq3KnUWxSnOA.png)

#### Diferencias clave (`Response` or `NextReponse`)—

![](https://cdn-images-1.medium.com/max/1600/1*YzcJLOExwltlqIroIG_kug.png)

### Ejemplos

#### Ejemplo 1 — Redirigir a usuarios no autenticados

Instala el paquete `Lucide` para React [[ref](https://lucide.dev/icons/)]:

```bash
npm install lucide-react
```

Crea el `middleware.tsx` en `src/`:

```js
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Redirigir si el usuario no está logueado
  if (pathname.startsWith('/dashboard') && !request.cookies.has('auth-token')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

Crea la `page.tsx` de **dashboard** en `src/app/dashboard/`:

```js
// src/app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-stone-100 p-6 flex">
      <aside className="w-20 flex flex-col gap-4 items-center py-6 bg-white rounded-2xl shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-gray-200" />
        <div className="w-6 h-6 rounded-md bg-gray-200" />
        <div className="w-6 h-6 rounded-md bg-gray-200" />
        <div className="w-6 h-6 rounded-md bg-gray-200" />
        <div className="w-6 h-6 rounded-md bg-gray-200" />
        <div className="w-6 h-6 rounded-md bg-gray-200" />
        <div className="w-6 h-6 rounded-md bg-gray-200 mt-auto mb-4" />
      </aside>

      <section className="flex-1 px-6">
        <div className="flex justify-between items-center mb-6">
          <div className="w-40 h-6 rounded-md bg-gray-200" />
          <div className="w-32 h-6 rounded-full bg-gray-200" />
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-gray-200 shadow-sm" />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="h-56 rounded-xl bg-gray-200 shadow-sm" />
          <div className="h-56 rounded-xl bg-gray-200 shadow-sm" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="h-40 rounded-xl bg-gray-200 shadow-sm" />
          <div className="h-40 rounded-xl bg-gray-200 shadow-sm" />
        </div>
      </section>
    </main>
  );
}
```

Crea la `page.tsx` de **login** en `src/app/login/`:

```js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, MoveRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      document.cookie = `auth-token=fake-token; path=/; max-age=${
        60 * 60 * 24
      }`;
      router.push('/dashboard');
    } else {
      setErrorMessage('Por favor completa ambos campos.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-300">
      <div className="bg-white rounded-xl shadow-md flex overflow-hidden w-[900px] h-[460px]">
        <div className="w-1/2 bg-stone-200 p-6 flex flex-col justify-between"></div>

        <div className="w-1/2 px-12 py-10">
          <div className="flex flex-col justify-center min-h-full ">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Iniciar sesión
            </h1>
            <p className="text-gray-500 mb-6 text-sm">
              Inicia sesión con tu correo
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex justify-center border border-gray-200 rounded-md p-2 gap-2">
                <Mail className="text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage('');
                  }}
                  className="w-full border-0 text-sm text-gray-800 focus:outline-none"
                />
              </div>

              <div className="flex justify-center border border-gray-200 rounded-md p-2 gap-2">
                <Lock className="text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage('');
                  }}
                  className="w-full border-0 text-sm text-gray-800 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center mt-2 gap-2 bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700 transition cursor-pointer"
              >
                Entrar <MoveRight className="w-5 h-5" />
              </button>

              {errorMessage && (
                <p className="bg-red-200 text-red-500 text-sm text-center p-2">
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
```

Actualiza la página principal `/app/page.tsx`, agregando el `Link` a `/dashboard`:

```js
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <Link
        href={'/dashboard'}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Dashboard
      </Link>
    </main>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*I4o2X1BECsyzrlY-quZZsg.png)

Al iniciar el servidor con `npm run dev`, podrás acceder a esta página visitando `http://localhost:3000`, da clic en “Dashboard”.

![](https://cdn-images-1.medium.com/max/1600/1*ucgZ1qLSAz-_3oTVxTsCvA.gif)

Donde:

- Navegar a a `/dashboard` sin cookie, te redirige a `/login`.

- Si tienes la cookie `auth-token`, la navegación continúa.

> Útil para redirigir a usuarios no autenticados que accedan a páginas privadas.

#### Ejemplo 2 — Inyectar un header personalizado

Actualiza el `middleware.tsx` en `src/` :

```js
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  if (pathname.startsWith('/dashboard') && !request.cookies.has('auth-token')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Agregar un header a la respuesta de /about
  if (request.nextUrl.pathname === '/about') {
    response.headers.set('x-custom-analytics', 'about-visited');
  }

  return response;
}

//Se agrega /about a la lista
export const config = {
  matcher: ['/dashboard/:path*', '/about'],
};
```

Crea la `page.tsx` de **about** en `src/app/about/`:

```js
export default function AboutUs() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-stone-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-3">
        <div>
          <p className="text-sm text-gray-500 mb-2">Sobre nosotros</p>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Lorem ipsum dolor sit amet
          </h2>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
            minima temporibus, consequuntur eius incidunt ullam, sapiente
            nesciunt eum quod eaque quia aspernatur quasi a harum mollitia
            adipisci ut recusandae provident?
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-1 border-t border-pink-500 pt-3">
                50+ elit
              </h3>
              <p className="text-sm text-gray-600">
                consectetur adipisicing elit
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-1 border-t border-pink-500 pt-3">
                100+ consectetur
              </h3>
              <p className="text-sm text-gray-600">
                nesciunt eum quod eaque quia aspernatur
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-1 border-t border-pink-500 pt-3">
                20+ aspernatur
              </h3>
              <p className="text-sm text-gray-600">quasi a harum mollitia</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-1 border-t border-pink-500 pt-3">
                99% adipisci
              </h3>
              <p className="text-sm text-gray-600">
                eum quod eaque quia aspernatur
              </p>
            </div>
          </div>
        </div>

        <div className=" bg-stone-300 p-6 flex flex-col justify-between h-full"></div>
      </div>
    </section>
  );
}
```

Actualiza la página principal `/app/page.tsx`, agregando el `Link` a `/about`:

```js
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <Link
        href={'/dashboard'}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Dashboard
      </Link>
      <Link
        href={'/about'}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        Sobre nosotros
      </Link>
    </main>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*wLKq7PkuO6gs2q3aBhb8WQ.png)

Al iniciar el servidor con `npm run dev`, podrás acceder a esta página visitando `http://localhost:3000`, da clic en “About”.

![](https://cdn-images-1.medium.com/max/1600/1*ZfGXCuI1vBNYj_t7Y7T2hw.png)

Donde:

- Navegar a `/about`, se inyecta el header `x-custom-analytics`.

> Útil para tracking, testing, debugging, tokens, etc.

#### Ejemplo 3 — En rutas dinámicas

Actualiza el `middleware.tsx` en `src/` :

```js
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  if (pathname.startsWith('/dashboard') && !request.cookies.has('auth-token')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname === '/about') {
    response.headers.set('x-custom-analytics', 'about-visited');
  }

  // Validar que la ruta dinámica de /blog no sea maliciosa
  if (pathname.startsWith('/blog')) {
    const forbiddenSlugs = ['admin', 'delete', 'root'];
    const match = pathname.match(/^\/blog\/([^\/]+)/);
    const slug = match?.[1];

    if (slug && forbiddenSlugs.includes(slug)) {
      return NextResponse.redirect(new URL('/404', request.url));
    }
  }

  return response;
}

//Se agrega /blog:/:slug a la lista
export const config = {
  matcher: ['/dashboard/:path*', '/about', '/blog/:slug*'],
};
```

Crea la `page.tsx` de **blog** en `src/app/blog/[slug]/`:

```js
//src/blog/[slug]/page.tsx
type BlogPostProps = {
  params: Promise<{
    slug: string,
  }>,
};

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Blog Post</h1>
      <p className="text-lg">Slug: {slug}</p>
    </main>
  );
}
```

Actualiza la página principal `/app/page.tsx`, agregando el `Link` a `/blog/hello-world` y `/blog/admin`:

```js
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <Link
        href={'/dashboard'}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Dashboard
      </Link>
      <Link
        href={'/about'}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        Sobre nosotros
      </Link>

      <Link
        href={'/blog/hello-world'}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Blog - Hello World
      </Link>
      <Link
        href={'/blog/admin'}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Blog - Admin
      </Link>
    </main>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*3SZz8S0S1P0CFKb0PUiQIA.png)

Al iniciar el servidor con `npm run dev`, podrás acceder a esta página visitando `http://localhost:3000`, da clic en “Blog — Hello World” o “Blog — Admin”.

![](https://cdn-images-1.medium.com/max/1600/1*22AbbDBe1U4JsJpPVMPbmA.gif)

Donde:

- Navegar a `/blog/delete`, `/blog/admin` o `/blog/root`, redirige automáticamente a `/404`.

- Caso contrario, la navegación continúa.

> Útil para filtrar slugs peligrosos o controlar el acceso dinámico.

### A considerar

**Es importante** saber que el middleware no se ejecuta en Node.js, sino en un entorno ligero basado en **WebAssembly + V8**, conocido como **Edge Runtime**. Esto trae varias limitaciones:

No tiene acceso a:

- APIs de Node.js (`fs`, `crypto`, `os`, etc.).

- Librerías que dependen de Node.
- Base de datos directa (sin fetch).
- `window`, `document`, ni a ninguna API del navegador.
- **No puedes acceder al HTML renderizado ni a los componentes React directamente** desde el middleware.

Pero, si es compatible con:

- Web APIs estándar: `Request`, `Response`, `URL`, `Headers`.

- Manipular cookies, headers.
- Ejecutar lógica síncrona o async.

> Si usas código no compatible con edge runtime, obtendrás errores como `This module cannot be used in edge functions`.

---

Hasta este punto…Has aprendido qué es el `middleware.js` en Next.js, cómo funciona en el runtime de borde (Edge Runtime), y cómo puede ayudarte a interceptar rutas antes del renderizado.

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
git checkout middleware
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
