# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Componente Link

En el ecosistema de Next.js, el componente `Link` cumple un rol fundamental en la experiencia de usuario: permite transiciones entre páginas sin recargar el navegador, manteniendo el estado del cliente y optimizando el rendimiento mediante precarga automática de recursos.

### ¿Qué es Link?

`Link` es un componente de alto nivel proporcionado por Next.js para manejar navegación interna en aplicaciones web. Está **diseñado** para **reemplazar** el uso de `<a href="...">` en **contextos** donde se **navega entre rutas definidas** en el **App Router o Pages Router**.

Este componente **mejora** la **navegación** de una **aplicación tipo SPA** (Single Page Application) sin perder las ventajas de SSR (Server-Side Rendering) o SSG (Static Site Generation).

### Características

- **Navegación sin recarga:** transiciones instantáneas sin refrescar el documento completo.

- **Precarga automática:** Next.js precarga JavaScript y datos asociados en segundo plano.
- **Detección por visibilidad:** usa `IntersectionObserver` para prefetch inteligente.
- **Comportamiento de `<a>` respetado:** clic derecho, nueva pestaña, accesibilidad, SEO.
- **Soporte para rutas dinámicas:** compatible con `[foldername]`,`[slug]`, `[...slug]`, `[[...slug]]`.

### Ventajas

- Mejora el rendimiento al evitar recargas del navegador.

- Anticipa la navegación del usuario con `prefetch`.
- Compatible con SSR/SSG, pero con experiencia SPA.
- Soporta objetos `href` para query params dinámicos.
- Puede envolver otros elementos (`<span>`, `<div>`) sin perder funcionalidad.

### ¿Cómo se crea o implementa?

Primero, importa el componente:

```js
import Link from 'next/link';
```

Su uso más básico:

```js
<Link href="/movies">Películas</Link>
```

También puedes incluir un `<a>` explícito si necesitas más control:

```js
<Link href="/movies">
  <a className="text-blue-500 hover:underline">Películas</a>
</Link>
```

Con elementos personalizados:

```js
<Link href="/movies">
  <span className="text-blue-500 underline">Películas</span>
</Link>
```

Con parámetros dinámicos:

```js
<Link href={`/blog/${slug}`}>{title}</Link>
```

### ¿Cómo funciona?

`Link` utiliza el sistema interno de navegación client-side basado en `next/navigation` (en App Router) o `next/router` (en Pages Router). El flujo es:

- Detecta si el destino (`href`) es interno.

- Si es interno, intercepta el clic y evita la recarga completa.
- Usa `pushState` o `replaceState` para modificar el historial.
- Precarga la página de destino si está visible.
- Hidrata el nuevo contenido sin perder estado global.

### Opciones disponibles

#### `**herf` (Obligatorio)\*\*

La ruta interna o URL a la que navegar.

```js
<Link href="/movies">Películas</Link>
```

También permite pasar un objeto con las propiedades `pathname` y `query` para construir la URL:

```js
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

![](https://cdn-images-1.medium.com/max/1600/1*4SnvMhy5W5_R3CkP8e4JSw.gif)

#### **`Replace` (Default `false`)**

Reemplaza la entrada actual en el historial ( `history.replace`)

<Link href="/movies" replace>Movies</Link>

`**prefetch**` **(Default** `**null**`**)**

Inicia una precarga del recurso cuando un componente `<Link>` se visualiza en la ventana del usuario. Next.js precarga y carga la ruta vinculada y sus datos en segundo plano, con la finalidad de mejorar el rendimiento de las navegaciones del lado del cliente.

Valores que acepta la propiedad:

- `null` — Para las rutas estáticas, se precargará la ruta completa (incluyendo datos). Para las rutas dinámicas, se precargará la ruta parcial.

- `true` — Para rutas estáticas y dinámicas, se precargará la ruta completa (incluyendo datos).
- `false` — La precarga nunca se producirá.

```js
<Link href="/movies" prefetch={false}>
  Movies
</Link>
```

#### **`scroll` (Default `true`)**

El comportamiento predeterminado de `Link` es mantener la posición del scroll (de forma similar a como los navegadores se manejan).

- `true`— Cuando se navega a una nueva página, la posición del scroll se mantendrá siempre que la página sea visible en la ventana. En caso contrario, se desplazará hasta la parte superior del primer elemento de la página.

- `false`— Next.js no intentará desplazarse hasta el primero elemento de la página.

```js
<Link href="/movies" scroll={false}>
  Movies
</Link>
```

![](https://cdn-images-1.medium.com/max/1600/1*qld2jCzKK5MlttkOnl9ALQ.gif)

Los **`links`** tienen **`scroll = {false}`**

También permite desplazarse a un elemento específico de la página utilizando un enlace con **hash** (`#`) hacia un `id` determinado:

```js
<Link href="/tv#popular">TV popular</Link>
```

![](https://cdn-images-1.medium.com/max/1600/1*ePRroqU5oz3lws0rRw608w.gif)

#### **`onNavigate`**

Cuando se da clic, se manda a llamar un manejador de eventos (event handler) de lado del cliente. El manejador recibe un objeto que incluye el método `preventDefault()`.

> **Importante:** `onNavigate` **solo se ejecuta durante navegaciones del lado del cliente** **y dentro del mismo origen**. **No se activará** si el usuario utiliza **teclas** **modificadoras** (como Ctrl/Cmd + clic) o si la **navegación** apunta a una **URL** **externa** o los **enlaces con el atributo** `download`, ya que este comportamiento está limitado exclusivamente a transiciones internas dentro de la aplicación.

```js
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

### Ejemplos

#### **Ejemplo — Navegación entre páginas estáticas**

> **Nota: Al ser ejemplos básicos no he agregado la navegación dentro del** `**layout.tsx**`**, pero como buena práctica deberías de hacerlo.**

```js
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

```js
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

```js
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

![](https://cdn-images-1.medium.com/max/1600/1*Ty7fDiq9uokbYRY-O3oHSw.gif)

#### **Ejemplo — Navegación entre páginas dinámicas**

```js
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

```js
//src/app/media/[...slug]/page.tsx

import Link from 'next/link';

export default async function MediaPage({
  params,
}: {
  params: Promise<{ slug: string[] }>,
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

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000
```

![](https://cdn-images-1.medium.com/max/1600/1*iUOekyVNgTn7QHeQCVtPBQ.gif)

### A considerar

- **No usar `Link` para URLs externas.** Usa `<a href="https://...">` directamente.

- **Evita `Link` sin `href`**. Genera errores de navegación.
- **Evita usarlo en archivos como `route.tsx` o `layout.tsx`**.
- **Asegura accesibilidad:** usa elementos interactivos como `<span>` o `<button>`.
- **Usa `replace` si no deseas guardar en historial.**
- **El `prefetch` solo funciona en producción.**

### ¿Es compatible usar Link dentro de Layouts?

Si, pero evítalos usar cuando:

- **`layout.tsx` depende de parámetros (`params`)** — Si estás en un layout dinámico como `app/media/[...slug]/layout.tsx`, los `params` cambian cuando navegas entre subrutas, pero el layout **no se recarga automáticamente**. Eso puede provocar desincronización entre lo que muestra el layout y el contenido actual.

- **Precarga innecesaria en cada ruta** — Si colocas muchos `Link` dentro de un layout persistente y esos links tienen prefetch activo (por defecto), se puede generar precarga innecesaria de muchas rutas cada vez que se monta el layout. **Esto no rompe nada, pero puede afectar el rendimiento en apps grandes**.

Entonces:

- Usa `Link` en layouts **cuando el menú sea global** y no dependa de `params`.

- Si el menú cambia según la ruta, considera moverlo a un layout más específico o incluso al nivel de `page.tsx`.
- Puedes encapsular la navegación en un componente tipo `<Navbar />` y re-utilizarlo donde convenga.

### Comparación con `<a>` tradicional

![](https://cdn-images-1.medium.com/max/1600/1*roTl7Elz1LBo4K83ec_Z4w.png)

---

Hasta este punto, has aprendido a utilizar el componente `Link` para implementar navegación interna. Comprendiste cómo este componente mejora la experiencia del usuario al habilitar transiciones sin recarga, precarga automática de rutas visibles y soporte completo para rutas dinámicas como `[slug]` o `[...slug]`.

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
