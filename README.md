# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-2)**] (branch: base-project-2).** Este proyecto contiene los archivos: `_src/app/page.tsx_` y `_src/app/layout.tsx_`, configurados con una estructura mínima.

## route.ts

### ¿Qué es `route.ts`?

`route.ts` es un archivo especial del App Router que permite definir **endpoints API dentro del árbol de rutas**. Se comporta como una función tipo **RequestHandler,** por lo que su objetivo es manejar solicitudes HTTP (`GET`, `POST`, `PUT`, etc.) directamente desde el servidor, sin necesidad de usar un backend externo o crear un archivo aparte en `/pages/api`.

Internamente utiliza la API `Request/Response` nativa del Web Platform, complementada por utilidades propias de Next.js cómo `NextRequest` y `NextResponse`.

### Principales características

- Basado en el estándar Web API: usa `Request`, `Response`, `Headers`, etc.

- Soporta todos los métodos HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, etc.).
- Puede acceder a `params`, `headers`, `cookies`, `searchParams` y body JSON.
- Compatible con funciones asincrónicas (`async`).
- Soporta `NextRequest` para acceder a cookies, headers, geo, y otros extras.
- Corre del lado del servidor (Node.js).

### Ventajas

- **Estándar Web**: no dependes de una API interna de Next, sino del Web Platform.
- **Integración total con el árbol de rutas**: puedes tener `/user/route.ts` como parte natural de `/user`.
- **Compatibilidad con edge y server runtime**: fácilmente portable.
- **Reemplaza** `**/pages/api**` en nuevas apps sin necesidad de crear un API folder aparte.
- **Alto grado de composición**: puedes usar middlewares, cookies, redirect, revalidate, etc.

### NextResponse y NextRequest

`NextResponse` es una extensión del objeto `Response` de la **Web API**, proporcionada por Next.js. Está diseñado para **interactuar con funcionalidades específicas del framework**, como redirecciones, reescrituras, manipulación de cookies o headers, y control de flujo en middleware o endpoints.

`NextRequest` es una extensión del estándar `Request` del **Web Platform**, proporcionada por Next.js. Diseñada para **agregar funcionalidades** adicionales relevantes en el contexto de ejecución del servidor (ya sea Node.js o Edge Runtime).

#### ¿Por qué usar `NextRequest` y `NextResponse`? —

##### `NextRequest` (extiende de `Request`)

Ofrece métodos y propiedades específicas de Next.js, como:

- `request.cookies.get()` – Acceso directo a cookies.

- `request.geo` – Información geográfica (en edge).
- `request.ip` – IP del usuario.
- `request.nextUrl` – Utilidades para parsing de URL y pathname.

##### `NextResponse` (extiende de `Response**`)

Facilita:

- `.json(data)` – Para respuestas JSON formateadas.

- `.redirect(url)` – Redirección simple.
- `.rewrite(url)` – Reescritura del request.
- `.cookies.set()` – Manejo de cookies de forma declarativa.

#### Diferencias clave (`Request` or `NextRequest`)—

![](https://cdn-images-1.medium.com/max/1600/1*OnwD_VnXfNLq3KnUWxSnOA.png)

#### Diferencias clave (`Response` or `NextReponse**`)—

![](https://cdn-images-1.medium.com/max/1600/1*YzcJLOExwltlqIroIG_kug.png)

### ¿Cómo se crea o implementa?

Crea un archivo llamado `route.ts` (o `.js`, `.tsx`, `.jsx`) dentro de un segmento de `app/`.

```js
// app/api/hello/route.ts

// Requesr y Response
export async function GET() {
  return new Response(JSON.stringify({ message: 'Hola mundo desde Next.js' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

```js
// app/api/hello/route.ts

// NextRequest y NextResponse
import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Hola mundo desde Next.js con NextResponse',
  });
}
```

Al iniciar el servidor (`npm run dev`), acceder a `http://localhost:3000`, el **endpoint** estará disponible como `/api/hello`:

```bash
curl http://localhost:3000/api/hello
```

![](https://cdn-images-1.medium.com/max/1600/1*wbMtrnG766yJIPmWGPVOOg.png)

Puedes definir múltiples métodos por archivo:

```typescript
export async function POST(request: Request) { ... }
export async function PUT(request: Request) { ... }
```

### ¿Cómo funciona?

Cuando el servidor de Next.js recibe una petición HTTP que coincide con la ruta del archivo `route.ts`, se analiza el método (`GET`, `POST`, etc.) y se busca una exportación con ese nombre.

- Se ejecuta el código dentro de la función correspondiente al método HTTP.
- El objeto `Request` o `NextRequest` se pasa como argumento.

- Se debe devolver una instancia de `Response` o una Promesa que la resuelva.
- Next.js maneja la respuesta: headers, status codes, etc.

#### A más bajo nivel — 

- Next.js utiliza el Fetch API Runtime de Node.js o Edge según la configuración (`server` o `edge`).

- Compila `route.ts` como un **modificador de rutas HTTP** dentro del sistema de enrutamiento del App Router.
- Usa `Request` y `Response` del estándar **WHATWG** en vez de objetos Express.js (no hay `req.body`, `res.send`).
- Internamente traduce la URL, el método, los headers y el body del request en una instancia de `Request`, lo cual le da compatibilidad con entornos edge/cloud.

Esto permite que el código sea **más portable** entre plataformas (Vercel Edge Functions, Cloudflare, Bun, Deno, etc.).

### Ejemplos

#### Ejemplo 1 — GET sin parámetros

Crea `route.ts` en `src/app/api/time` :

```js
// src/app/api/time/route.ts

// Request y Response
export async function GET() {
  return new Response(JSON.stringify({ now: new Date().toISOString() }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

```ts
// src/app/api/time/route.ts

// NextRequest y NextResponse
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ now: new Date().toISOString() });
}
```

Al iniciar el servidor (`npm run dev`), acceder a `http://localhost:3000`, el **endpoint** estará disponible como `/api/time`:

```bash
curl http://localhost:3000/api/time
```

![](https://cdn-images-1.medium.com/max/1600/1*uSEJqUDTH_Pg95ItZ0mSoQ.png)

#### Ejemplo 2 — POST con payload y status personalizado

Crea `route.ts` en `src/app/api/contact` :

```js
// src/app/api/contact/route.ts

// Request y Response
export async function POST(req: Request) {
  const body = await req.json();

  if (!body.email || !body.message) {
    return new Response(JSON.stringify({ error: 'Datos incompletos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Aquí podrías guardar en una DB, enviar mail, etc.
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
```

```js
// src/app/api/contact/route.ts

// NextRequest y NextResponse
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.email || !body.message) {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
  }

  // Aquí podrías guardar en una base de datos, enviar correo, etc.
  return NextResponse.json({ success: true });
}
```

Al iniciar el servidor (`npm run dev`), el **endpoint** estará disponible como `/api/contact` :

```bash
##Success
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"mauricio@example.com", "message":"Hola desde curl"}'

##Error
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"mauricio@example.com"'
```

![](https://cdn-images-1.medium.com/max/1600/1*Pbb0k_zYp12h2JW3cw4rug.png)

#### Ejemplo 3— GET con servicio externo (themoviedb)

Crea el archivo `.env.local` dentro del directorio raíz del proyecto (no dentro de `/src`):

```ini
# TMDB Config
TMDB_API_KEY = abcd1234supersecret
TMDB_BASE_URL = https://api.themoviedb.org/3
```

Crea el servicio `tmdbService.ts` en `/src/services` :

```js
// src/services/tmdbService.ts
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL;

export async function getSeries(type = 'tv') {
  if (!API_KEY) throw new Error('No API key provided');

  const res = await fetch(`${BASE_URL}/${type}/top_rated`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Error al obtener series: ${res.statusText}`);
  }

  const data = await res.json();
  return data.results;
}
```

Crea `route.ts` en `src/app/api/media` :

```js
// src/app/api/media/route.ts

// Request y Response
import { getSeries } from '@/services/tmdbService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'tv'; // tv o movie

    const results = await getSeries(type);

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Error al obtener datos' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
```

```js
// src/app/api/media/route.ts

// NextRequest y NextResponse
import { NextRequest, NextResponse } from 'next/server';
import { getSeries } from '@/services/tmdbService';

export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get('type') || 'tv'; // 'tv' o 'movie'

    const results = await getSeries(type);

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error al obtener datos' },
      { status: 500 }
    );
  }
}
```

Al iniciar el servidor (`npm run dev`), el **endpoint** estará disponible como `/api/contact` :

```yaml
curl "http://localhost:3000/api/media"

curl "http://localhost:3000/api/media?type=movie"

curl "http://localhost:3000/api/media?type=anime"

![](https://cdn-images-1.medium.com/max/1600/1*5OVgY6x-GMPcjURvvwKdoQ.gif)
```

#### Ejemplo 4 — Respuesta con cookies personalizadas

```js
// app/api/cookies/route.ts
export function GET() {
  const body = JSON.stringify({ message: 'Cookie seteada' });

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'visited=true; Path=/; Max-Age=86400; HttpOnly',
    },
  });
}
```

```js
// app/api/cookies/route.ts
import { NextResponse } from 'next/server';

export function GET() {
  const response = NextResponse.json({ message: 'Cookie seteada' });
  response.cookies.set('visited', 'true', {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });
  return response;
}
```

> Aunque puede parecer que usar `Response` es más sencillo, en realidad no lo es. Cuando necesitas manejar **múltiples cookies**, realizar una **serialización adecuada**, garantizar una buena **legibilidad del código** y realizar un **seteo seguro**, todo debe hacerse **manualmente**. Esto incrementa la complejidad y el riesgo de errores. Por eso, **se recomienda utilizar** `**NextResponse**` **en entornos Next.js**.

Al iniciar el servidor (`npm run dev`), el **endpoint** estará disponible como `/api/cookies` :

```yaml
curl -i http://localhost:3000/api/cookies
```

> La `-i` muestra los **headers HTTP de la respuesta**, que incluyen la cookie (`Set-Cookie`).

![](https://cdn-images-1.medium.com/max/1600/1*hMEWForfHgxZ4wk2N5HQJA.gif)

### A considerar

- Siempre devuelve un objeto `Response` válido.

- Usa `NextRequest` si necesitas acceso a cookies, geo, etc.
- Configura `runtime = 'edge'` si buscas velocidad extrema (via segment config).
- Aprovecha los headers personalizados para controlar caché, CORS o seguridad.
- No accedas a `window` o APIs del DOM (esto es backend, no cliente).
- Maneja errores de red y validación adecuadamente.

---

Hasta este punto, has aprendido a utilizar correctamente el archivo especial `route.tsx` dentro del App Router de Next.js, entendiendo su propósito como manejador de rutas personalizadas tipo `API` dentro de la carpeta `/app`. También has explorado cómo trabajar con los objetos `NextRequest` y `NextResponse`, sus ventajas frente a los estándares `Request` y `Response`, y cuándo conviene usar cada uno.

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
git checkout error
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
