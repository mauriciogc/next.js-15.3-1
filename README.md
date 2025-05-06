# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Componente Link

### ¿Qué es Link?

Link es un componente especial para navegación interna, que se utiliza para enlazar diferentes páginas dentro de una aplicación sin recargar el navegador.

Es equivalente a `<a href="/ruta">`, pero optimizado para el sistema de rutas y el rendimiento de Next.js.

### Características

- Navegación sin recarga (SPA). Usa enrutamiento basado en el App Router.

- Precarga los recursos en segundo plano el contenido de la ruta destino.

- Puede detectar visibilidad para precargar inteligentemente.

- Actúa como wrapper de `<a>` sin romper el comportamiento nativo (accesibilidad, SEO, clic derecho, nueva pestaña, etc.)

### Ventajas

- No recarga el DOM ni layouts, por lo que las transiciones son más rápidas.

- Acelera la navegación al anticipar qué va a visitar el usuario gracias a TTFB (Time of first byte) cuando el usuario hace hover.

- Ideal para apps tipo SPA sin perder beneficios SSR/SSG.

- Soporta rutas dinámicas, slug, anidadas, layouts, etc.

- Se puede envolver a `<a>` dentro del componente Link y conservar sus funcionalidades.

### ¿Cómo se crea?

Se importa desde:

```typescript
import Link from 'next/link';
```

Su uso más básico:

```typescript
<Link href="/movies">Películas</Link>
```

También puedes incluir un `<a>` explícito si necesitas más control:

```typescript
<Link href="/movies">
  <a className="text-blue-500 hover:underline">Películas</a>
</Link>
```

Se puede usar como un wrapper para otro elemento:

```typescript
<Link href="/movies">
  <span className="text-blue-500 underline">Películas</span>
</Link>
```

Con rutas dinámicas:

```typescript
<Link href={`/blog/${slug}`}>{title}</Link>
```

### Opciones disponibles

#### `herf` (Obligatorio)

La ruta interna o URL a la que navegar.

```typescript
<Link href="/movies">Películas</Link>
```

También permite pasar un objeto con las propiedades pathname y query para construir la URL:

```typescript
// Navega a /movies?name=test
<Link
  href={{
    pathname: '/movies',
    query: { name: 'test' },
  }}
>
  Películas con query
</Link>
```

#### `Replace` (Default false)

Reemplaza la entrada actual en el historial (`history.replace`)

```typescript
<Link href="/movies" replace>
  Movies
</Link>
```

#### `prefetch` (Default null)

Inicia una precarga del recurso cuando un componente `<Link>` se visualiza en la ventana del usuario. Next.js precarga y carga la ruta vinculada y sus datos en segundo plano, con la finalidad de mejorar el rendimiento de las navegaciones del lado del cliente.

Valores que acepta la propiedad:

- `null`  -  Para las rutas estáticas, se precargará la ruta completa (incluyendo datos). Para las rutas dinámicas, se precargará la ruta parcial.

- `true `- Para rutas estáticas y dinámicas, se precargará la ruta completa (incluyendo datos).

- `false`  -  La precarga nunca se producirá.

```typescript
<Link href="/movies" prefetch={false}>
  Movies
</Link>
```

#### `scroll` (Default true)

El comportamiento predeterminado de Link es mantener la posición del scroll (de forma similar a como los navegadores se manejan).

- `true` - Cuando se navega a una nueva página, la posición del scroll se mantendrá siempre que la página sea visible en la ventana. En caso contrario, se desplazará hasta la parte superior del primer elemento de la página.

- `false` - Next.js no intentará desplazarse hasta el primero elemento de la página.

```typescript
<Link href="/movies" scroll={false}>
  Movies
</Link>
```

También permite desplazarse a un elemento específico de la página utilizando un enlace con hash (`#`) hacia un id determinado:

```typescript
<Link href="/tv#popular">TV popular</Link>
```

#### `onNavigate`

Cuando se da clic, se manda a llamar un manejador de eventos (event handler) de lado del cliente. El manejador recibe un objeto que incluye el método `preventDefault()`.

> Importante: `onNavigate` solo se ejecuta durante navegaciones del lado del cliente y dentro del mismo origen. No se activará si el usuario utiliza teclas modificadoras (como `Ctrl/Cmd + clic`) o si la navegación apunta a una URL externa o los enlaces con el atributo download, ya que este comportamiento está limitado exclusivamente a transiciones internas dentro de la aplicación.

```typescript
<Link
  href="/movies"
  onNavigate={(e) => {
    // Sólo se ejecuta durante la navegación SPA
    console.log('Navegando...');

    // Opcionalmente impedir la navegación
    // e.preventDefault()
  }}
>
  Movies
</Link>
```

### ¿Cómo funciona?

- Usa `next/router` internamente para hacer push en el historial (sin recargar).

- Detecta si el href es interno (`/ruta`) o externo (`https://`).

- Si es interno, hace una navegación client-side con `pushState`.

- Precarga el JavaScript y HTML del destino si está visible (Intersection Observer)

- Actualiza la URL sin recargar y rehidrata el contenido nuevo.

**Ejemplo (navegación entre páginas estáticas)**

```typescript
//src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <nav className="bg-gray-700 text-white p-2">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-gray-300">
              Inicio
            </Link>
            <Link href="/movies" className="hover:text-gray-300">
              Películas
            </Link>
            <Link href="/tv" className="hover:text-gray-300">
              Series
            </Link>
          </div>
        </div>
      </nav>
    </main>
  );
}
```

```typescript
// src/app/movies/page.tsx

import Link from 'next/link';

export default function Movies() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-700 text-white p-2">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-gray-300">
              Inicio
            </Link>
          </div>
        </div>
      </nav>
      <h2 className="text-xl font-semibold p-2">
        Bienvenido a la sección de Películas
      </h2>
    </div>
  );
}
```

```typescript
// src/app/series/page.tsx
import Link from 'next/link';

export default function Series() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-700 text-white p-2">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-gray-300">
              Inicio
            </Link>
          </div>
        </div>
      </nav>
      <h2 className="text-xl font-semibold p-2">
        Bienvenido a la sección de Series
      </h2>
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000
```

**Ejemplo (navegación entre páginas dinámicas)**

```typescript
//src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <nav className="bg-gray-700 text-white p-2">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-gray-300">
              Inicio
            </Link>
            <Link href="/movies" className="hover:text-gray-300">
              Películas
            </Link>
            <Link href="/series" className="hover:text-gray-300">
              Series
            </Link>
          </div>
        </div>
        <div className="bg-gray-500 px-4 py-2">
          <div className="flex space-x-4">
            <Link href="/media/movies/action" className="hover:text-gray-300">
              Acción
            </Link>
            <Link href="/media/movies/comedy" className="hover:text-gray-300">
              Comedia
            </Link>
            <Link href="/media/movies/drama" className="hover:text-gray-300">
              Drama
            </Link>
            <Link href="/media/series/anime" className="hover:text-gray-300">
              Anime
            </Link>
            <Link
              href="/media/series/documentary"
              className="hover:text-gray-300"
            >
              Documentales
            </Link>
          </div>
        </div>
      </nav>
    </main>
  );
}
```

```typescript
//src/app/media/[...slug]/page.tsx

import Link from 'next/link';

export default async function MediaPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-700 text-white p-2">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-gray-300">
              Inicio
            </Link>
          </div>
        </div>
      </nav>
      <h2 className="text-xl font-semibold p-2">Por categoría</h2>
      <p>Ruta actual: /media/{slug.join('/')}</p>
      <pre className="mt-4 bg-amber-100 text-amber-700 p-2 rounded">
        {JSON.stringify(slug, null, 2)}
      </pre>
    </div>
  );
}
```

### A considerar

- La precarga (`prefetch`) sólo está habilitada en producción.

- No usar `Link` para enlaces externos.

- No se usa en `route.tsx` o `layout.tsx`.

- Usa elementos clicables accesibles dentro de `Link` (`<span>`, `<button>` o texto).

- Usa `replace={true}` si no quieres que se agregue al historial.

- No pongas un `Link` vacío o sin `href`.

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
git checkout link
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
