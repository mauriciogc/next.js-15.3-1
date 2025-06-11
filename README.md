# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Variables de Entorno (`env.*`)

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-2)**] (branch: base-project-2).** Este proyecto contiene los archivos: `src/app/page.tsx` y `src/app/layout.tsx`, configurados con una estructura mínima.

> Para simular la carga de datos en los ejemplos vamos utilizar la API **themoviedb**[[ref](https://developer.themoviedb.org/docs/getting-started)].

### ¿Qué son?

Los archivos `env.*` son mecanismos de configuración que permiten definir **variables de entorno** que pueden ser accedidas tanto en tiempo de ejecución (server) como en tiempo de build (browser, si se explicita).

Next.js extiende esta funcionalidad con soporte para múltiples entornos (`.env.local`, `.env.development`, `.env.production`), integración con Webpack para exponer variables al cliente de forma segura y compatibilidad con runtimes modernos (Node.js / Edge).

### Principales características

- Soporte para archivos `.env`, `.env.local`, `.env.development`, `.env.production`.
- Soporte automático para variables **privadas (servidor)** y **públicas (cliente).**

- Recarga automática en dev (`next dev`) al editar `.env.local`.
- Variables disponibles en `process.env` del entorno de Node.js.
- Soporte para exponer variables al cliente mediante el prefijo `NEXT_PUBLIC_`.
- Compatible con `next.config.js` y `webpack.DefinePlugin`.

### Ventajas

- **Seguridad**: Permite ocultar claves API o tokens del cliente.

- **Separación de ambientes**: Soporte nativo para entornos locales, de desarrollo y producción.
- **Build-time y runtime**: Disponibles tanto en el build como durante la ejecución del server.
- **Integración con CI/CD**: Compatible con sistemas como Vercel, GitHub Actions, Docker, etc.
- **Escalabilidad**: Permite cambiar comportamientos sin tocar código, útil para múltiples tenants.
- **Integración total con Next.js**: Compatible con App Router, Route Handlers, middleware, layouts, SSR, etc.

### ¿Qué archivo `.env` se usa en cada entorno en Next.js?

En Next.js, el manejo de variables de entorno se basa en una jerarquía clara y un comportamiento definido según el entorno de ejecución. Comprender **qué archivo `.env` se carga en qué contexto**, es esencial para evitar conflictos, fugas de configuración y resultados inesperados.

![](https://cdn-images-1.medium.com/max/1600/1*Fq8cIQIeVP32BTLp085qdg.png)

**El archivo `.env.local` siempre se carga y tiene la mayor prioridad** por lo que **anulará cualquier otra configuración**, incluso si estás en producción (`NODE_ENV=production`), **a menos que estés en un entorno como Vercel donde `.env.local` no existe**.

Por eso, es importante que:

- **NUNCA uses `.env.local` para variables de staging o producción.**

- **Limita** su **uso** exclusivamente para valores de **desarrollo local y personales**.
- **Excluye el archivo de tu control de versiones** (`.gitignore`).

### ¿Cómo se crea o implementa?

- En la raíz de tu proyecto Next.js, crea uno de los siguientes archivos:

```bash
.env.local
.env.development
.env.production
.env
```

- Agrega tus variables:

```ini
# Para Server Components, route.ts, middleware, etc.
TMDB_API_KEY = 123456abcdef

# Para Client Components
NEXT_PUBLIC_APP_NAME = MovieExplorer
```

- Desde el código:

```js
// En server components, route.ts, middleware, etc.
const apiKey = process.env.TMDB_API_KEY;

// En Client Components
const appName = process.env.NEXT_PUBLIC_APP_NAME;
```

> **Importante**: Asegúrate de documentar todas las variables de entorno requeridas por tu aplicación en un archivo llamado `.env.example`. Esto permite que cualquier persona que clone o utilice tu proyecto sepa exactamente qué variables debe configurar en su entorno local o de producción para que la aplicación funcione correctamente.

Las variables de entorno **sin el prefijo** `NEXT_PUBLIC_` están disponibles **únicamente en el entorno de Node.js**, es decir, **no son accesibles desde el navegador**. Esto se debe a que el cliente (browser) y el servidor (Node.js) se ejecutan en entornos separados.

Para hacer que una variable de entorno sea accesible en el navegador, Next.js permite **_incrustar_ su valor en tiempo de compilación** dentro del bundle JavaScript enviado al cliente. Lo que hace este proceso es reemplazar todas las referencias a `process.env.VARIABLE` por el valor literal definido.

Ejemplo:

```ini
NEXT_PUBLIC_API_URL = https://api.example.com
```

```js
// Desde un Client Components
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

En cambio, una variable como:

```ini
SECRET_KEY = abcdef123456
```

**No estará disponible en el navegador**, lo cual es ideal para mantener la seguridad en claves privadas o tokens de acceso.

### ¿Cómo funciona?

- Next.js carga las variables de entorno usando el paquete `dotenv` [[ref](https://github.com/motdotla/dotenv)], y las expone a través de `process.env`.

- En tiempo de **build**, Next.js lee los archivos `.env*` y fusiona los valores con el entorno `process.env`.
- Las variables ya presentes en el sistema `process.env` sobrescriben a las de archivos `.env`.
- Si estás en `next dev`, los cambios en `.env.local` se recargan sin reiniciar.
- Si usas `getServerSideProps`, `route.ts`, Server Actions o Middleware, las variables están disponibles en tiempo de ejecución.
- Las variables **con** `NEXT_PUBLIC_` son reemplazadas por literales en el bundle del cliente (se _embeben_ durante el build).
- Las variables **sin** `NEXT_PUBLIC_` solo están disponibles en código ejecutado del lado del servidor (Route Handlers, Server Components, Middleware).

### ¿Se pueden usar con layouts, loading o route.ts?

![](https://cdn-images-1.medium.com/max/1600/1*V7cGkFIYrQ6Z7LGjik9TVw.png)

### Ejemplos

#### Ejemplo 1 — Variable de entorno pública

Crea el archivo `.env.local` dentro del directorio raíz del proyecto (no dentro de `/src`):

```ini
# APP Version
NEXT_PUBLIC_APP_VERSION = 1.0.0
```

Actualiza la página principal `/app/page.tsx` agregando la variable de entorno:

```js
// src/app/page.tsx
export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <p>Versión pública: {process.env.NEXT_PUBLIC_APP_VERSION}</p>
    </main>
  );
}
```

Al iniciar el servidor con `npm run dev`, accede a `http://localhost:3000`

![](https://cdn-images-1.medium.com/max/1600/1*jXpaYPEu2kxjkyppCOxhHA.png)

> **Importante**: Asegúrate de documentar todas las variables de entorno requeridas por tu aplicación en un archivo llamado `.env.example`

#### Ejemplo 2— Variables de entorno para una API

Agrega al archivo `.env.local` la variable de entorno `TMDB_API_KEY`:

```ini
# APP Version
NEXT_PUBLIC_APP_VERSION = 1.0.0

# TMDB Config
TMDB_API_KEY = abcd1234supersecret
TMDB_BASE_URL=https://api.themoviedb.org/3
```

Crea el servicio `tmdbService` en `/src/services/` :

```js
// src/services/tmdbService.tsx

const API_KEY = process.env.TMDB_API_KEY || '';
const BASE_URL = process.env.TMDB_BASE_URL || '';

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export interface Movie {
  id: number;
  title: string;
}

export interface MoviesResponse {
  results: Movie[];
}

export async function fetchMovies(category: string): Promise<MoviesResponse> {
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

Crea la `page.tsx` de **películas** en `src/app/movies/`:

```js
// src/app/movies/
import { fetchMovies } from '@/services/tmdbService';

type Movie = {
  id: number,
  title: string,
};

export default async function MoviesPage() {
  const data = await fetchMovies('popular');

  return (
    <div>
      <ul>
        {data.results.map((movie: Movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

Agrega el `Link` hacia `/movies` en `src/app/page.tsx`

```js
// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <p>Versión pública: {process.env.NEXT_PUBLIC_APP_VERSION}</p>

      <Link href="/movies" className="text-blue-500 hover:underline ">
        Lista de películas populares
      </Link>
    </main>
  );
}
```

Al iniciar el servidor con `npm run dev`, accede a `http://localhost:3000` y navega a la ruta `/movies`

![](https://cdn-images-1.medium.com/max/1600/1*pKmtTsDQ6ljysXnMEWIsGw.gif)

#### Ejemplo 3 — Variables de entorno en producción

Ejecuta en consola `npm run build && npm run start`

![](https://cdn-images-1.medium.com/max/1600/1*DwiHvhFZ6WmjoYGfTczJOQ.png)

Donde:

- **Ambiente activo**: Está usando el archivo `.env.local`, lo que indica que _NO_ está cargando variables de `.env.production`, aunque estés haciendo `npm run build`.

Crea el archivo `.env.production` dentro del directorio raíz del proyecto (no dentro de `/src`):

```ini
# APP Version
NEXT_PUBLIC_APP_VERSION = 1.0.0

# TMDB Config
TMDB_API_KEY = abcd1234supersecret
TMDB_BASE_URL=https://api.themoviedb.org/3
```

Ejecuta en consola `npm run build && npm run start`:

![](https://cdn-images-1.medium.com/max/1600/1*7qs8QudF4bWqerYEYY1BuA.png)

Donde:

- **Ambiente activo**: Está indicando que tiene acceso a ambos archivos `.env.local` y `.env.production`, **pero usará primero `.env.local`** porque **es el archivo con mayor prioridad**.

Esto ocurre porque `.env.local` siempre tiene prioridad si existe, incluso en `build`, a menos que se configure explícitamente lo contrario.

Por eso es **IMPORTANTE** que **SIEMPRE** **excluyas el archivo de tu control de versiones** (`.gitignore`)**,** ya que esto puede provocar que en producción accidentalmente uses variables locales.

Para el ejemplo, vamos a renombrar `.env.local` por `_.env.local`. Ejecuta en consola `npm run build && npm run start`

![](https://cdn-images-1.medium.com/max/1600/1*Zlm61Ld1IChvqtqJDcLvVg.png)

Una práctica recomendada para depuración, monitoreo o despliegue es identificar en qué ambiente se encuentra ejecutando tu aplicación.

Para ello, puedes definir una variable de entorno llamada `NEXT_PUBLIC_ENV` en tus archivos `.env.*`:

```ini
# .env.local
NEXT_PUBLIC_ENV=local

# .env.development
NEXT_PUBLIC_ENV=development

# .env.production
NEXT_PUBLIC_ENV=production
```

Esta variable estará disponible tanto en el cliente como en el servidor (gracias al prefijo `NEXT_PUBLIC_`).

Actualiza la página principal `/app/page.tsx` agregando la variable de entorno:

```js
// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <p>Versión pública: {process.env.NEXT_PUBLIC_APP_VERSION}</p>
      <div className="bg-gray-100 text-center text-sm p-2 text-gray-600">
        Ambiente actual: {process.env.NEXT_PUBLIC_ENV}
      </div>

      <Link href="/movies" className="text-blue-500 hover:underline ">
        Lista de películas populares
      </Link>
    </main>
  );
}
```

Ejecuta en consola `npm run build && npm run start`

![](https://cdn-images-1.medium.com/max/1600/1*r2HNPSoac23MUNyx9ORu1Q.png)

### A considerar

- Usa `.env.local` para valores únicos por máquina
- Usa el prefijo `NEXT_PUBLIC_` solo si necesitas exponer variables en el cliente.
- Nunca subas archivos `.env*` a tu repositorio: agrégalos a `.gitignore`.
- Documenta las variables requeridas por tu app en un archivo `.env.example`.
- Usa `process.env` directamente en código, no desestructures.
- Valida la existencia de variables críticas en tiempo de ejecución.
- Revisa `.env.production` en despliegues para mantener consistencia

---

Hasta este punto…has aprendido cómo funcionan las variables de entorno (`env.*`) en Next.js, su diferencia entre público y privado, cómo se integran en los distintos entornos (SSR, CSR), y cómo implementarlas con seguridad y buenas prácticas.

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
git checkout env
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
