# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## generateStaticParams

`generateStaticParams` [[ref]](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) es una función especial que se utiliza en rutas dinámicas (`[namefolder]`,`[slug]`, `[...slug]`, `[[...slug]]`) en el **App Router** de Next.js para indicar qué páginas dinámicas deben ser pre-renderizadas de forma estática en el momento de la construcción (`npm run build`), también conocido como subconjunto de rutas.

### ¿Por qué se usa?

- Next.js necesita saber que subconjunto de rutas dinámicas deberá construir como archivos estáticos.

- Sin `generateStaticParams`, Next.js no puede generar automáticamente rutas dinámicas estáticas.

- Es obligatorio si quieres usar **SSG (Static Site Generation)** en rutas dinámicas.

### Ventajas de usar generateStaticParams

- Las páginas se cargan como archivos HTML estáticos, lo que se refleja en cargas rápidas para el usuario y excelente para SEO.

- NO depende de lógica en el navegador para mostrar datos públicos.

- El servidor solo envía archivos estáticos, no ejecuta lógica en cada request.

### ¿Cómo funciona?

- Durante el build (`npm run build`), Next.js ejecuta `generateStaticParams`.

- Esta función retorna un array de parámetros que representan rutas dinámicas que deberán generarse.

- Next.js usa esos parámetros para pre-renderizar cada página individualmente con archivos HTML.

**Ejemplo (segmento dinámico simple)**

```yaml
src/app/product/[id]/page.tsx
```

```typescript
// src/app/product/[id]/page.tsx

export function generateStaticParams() {
  // Indicamos a Next.js que archivos se van a generar estáticamente
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

// Se generarán estáticamente tres versiones de esta página
// - /product/1
// - /product/2
// - /product/3
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div className="p-4">Id params: {id} </div>;
}
```

Ejecuta en la consola `npm run build`, verás que Next.js genera los archivos estáticos correspondientes.

Si revisas el directorio generado después del build en `/.next/server/app/product`, podrás observar que Next.js ha creado los archivos estáticos para `product/1`, `product/2`, `product/3`

Ejecuta en la consola npm run start, podrás acceder a esta página visitando:

```yaml
http://localhost:3000/product/1
http://localhost:3000/product/2
http://localhost:3000/product/3
```

**Ejemplo (segmentos dinámicos múltiples)**

```yaml
src/app/products/[category]/[product]/page.tsx
```

```typescript
// src/app/products/[category]/[product]/page.tsx
export function generateStaticParams() {
  // Indicamos a Next.js que archivos se van a generar estáticamente
  return [
    { category: 'a', product: '1' },
    { category: 'b', product: '2' },
    { category: 'c', product: '3' },
    { category: 'c', product: '4' },
  ];
}

// Se generarán estáticamente cuatro versiones de esta página
// - /product/a/1
// - /product/b/2
// - /product/c/3
// - /product/d/4
export default async function Page({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category, product } = await params;
  return (
    <div className="p-4">
      category = {category}, product = {product}
    </div>
  );
}
```

Ejecuta en la consola npm run build, verás que Next.js genera los archivos estáticos correspondientes.

Si revisas el directorio generado después del build en `/.next/server/app/products`, podrás observar que Next.js ha creado los archivos estáticos para `products/a/1`, `products/b/2`, `products/c/3`, `products/c/4`.

> Importante: Next.js también genera la página dinámica `page.js` para manejar cualquier slug no contemplado estáticamente.

Ejecuta en la consola `npm run start`, podrás acceder a esta página visitando:

```yaml
http://localhost:3000/products/a/1
http://localhost:3000/products/b/2
http://localhost:3000/products/c/3
http://localhost:3000/products/c/4
```

**Ejemplo (Segmentos dinámicos `[...slug]`)**

```yaml
src/app/shop/[...slug]/page.tsx
```

```typescript
// src/app/shop/[...slug]/page.tsx

export function generateStaticParams() {
  // Indicamos a Next.js que archivos se van a generar estáticamente
  return [
    { slug: ['a', '1'] },
    { slug: ['b', '2'] },
    { slug: ['c', '3'] },
    { slug: ['c', '4'] },
  ];
}

// Se generarán estáticamente cuatro versiones de esta página
// - /shop/a/1
// - /shop/b/2
// - /shop/c/3
// - /shop/c/4
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return (
    <div className="p-4">Parámetros recibidos: {JSON.stringify(slug)}</div>
  );
}
```

Ejecuta en la consola `npm run build`, verás que Next.js genera los archivos estáticos correspondientes.

Si revisas el directorio generado después del build en `/.next/server/app/shop`, podrás observar que Next.js ha creado los archivos estáticos para `shop/a/1`, `shop/b/2`, `shop/c/3`, `shop/c/4`.

> Importante: Next.js también genera la página dinámica `page.js` para manejar cualquier slug no contemplado estáticamente.

Ejecuta en la consola `npm run start`, podrás acceder a esta página visitando:

```yaml
http://localhost:3000/shop/a/1
http://localhost:3000/shop/b/2
http://localhost:3000/shop/c/3
http://localhost:3000/shop/c/4
```

**Ejemplo (Segmentos dinámicos `[...slug]` con una API)**

```yaml
src/app/pokemon/[...slug]/page.tsx
```

```typescript
// src/app/pokemon/[slug]/page.tsx

interface PageParams {
  slug: string;
}

interface PokemonPageProps {
  params: Promise<PageParams>;
}

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

export async function generateStaticParams() {
  console.log('Generando static params...');
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=3');
  const data = await res.json();

  return data.results.map((pokemon: { name: string }) => ({
    slug: pokemon.name,
  }));
}

async function fetchPokemon(slug: string): Promise<Pokemon> {
  console.log('Fetching Pokémon data...');
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
  if (!res.ok) {
    throw new Error('Error al obtener los datos del Pokémon');
  }
  return res.json();
}

export default async function Page({ params }: PokemonPageProps) {
  const { slug } = await params;
  const pokemon = await fetchPokemon(slug);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
}
```

> Nota:
> Se han agregado dos `console.log()` en el código:
>
> - Uno dentro de `generateStaticParams` para identificar cuándo se generan los parámetros estáticos durante el build.
>
> - Otro dentro de `fetchPokemon` para observar cuándo se ejecuta la llamada a la API.

Ejecuta en la consola `npm run build`, verás que Next.js genera los archivos estáticos correspondientes.

Podras observar:

- Solo se ejecuta una sola vez `generateStaticParams` para definir las rutas que deben renderizarse durante el build.

- Se ejecuta `fetchPokemon` por cada parámetro estático generado, en este caso son 3 (`bulbasaur`, `ivysaur`, `venusaur`).

Si revisas el directorio generado después del build en `/.next/server/app/pokemon`, podrás observar que Next.js ha creado los archivos estáticos para `pokemon/bulbasaur`, `pokemon/ivysaur`, `pokemon/venusaur`.

> Importante: Next.js también genera la página dinámica `page.js` para manejar cualquier slug no contemplado estáticamente.

Ejecuta en la consola `npm run start`, podrás acceder a esta página visitando:

```yaml
http://localhost:3000/pokemon/bulbasaur
http://localhost:3000/pokemon/ivysaur
http://localhost:3000/pokemon/venusaur
```

Cuando accedes a páginas que no están pre-renderizadas:

```yaml
http://localhost:3000/pokemon/pikachu
http://localhost:3000/pokemon/charmander
http://localhost:3000/pokemon/charizard
http://localhost:3000/pokemon/ditto
```

Cuando un parámetro no se definió como estático, Next.js lo procesa de forma dinámica y genera la página.

Si revisas el directorio generado después del build en `/.next/server/app/pokemon`, podrás observar que Next.js ha creado los archivos estáticos de los páginas que se han generado.

> Importante:
>
> - Si tienes `dynamicParams: true` (ver siguiente tema) y accedes a una ruta no generada, Next.js la renderiza dinámicamente durante el build (en desarrollo) o en producción (si tienes habilitado ISR - Incremental Static Regeneration).
>
> - En futuros accesos una vez generada, Next.js ya no la vuelve a regenerar, a menos que el tiempo de revalidate haya expirado.
>
> - En caso de que retorne un 404 NO genera ninguna página estática

### A considerar

- Si la página tiene bugs, el tiempo del build aumentará.

- Si los datos cambian después del build, necesitarías regenerar la app.

- Solo debe usarse en rutas dinámicas, NO en rutas estáticas normales.

- Si no tiene la página estática en el build, la primera vez se ejecutará como server-side (SSG).

---

## dynamicParams

### ¿Qué es dynamicParams?

`dynamicParams` es una configuración opcional que se puede colocar en el archivo `page.tsx` para indicar si quieres permitir rutas dinámicas adicionales NO incluidas en el build.

Por defecto tiene `true`, es decir que si accedes a una ruta que no estaba generada dentro de generateStaticParams, Next.js intentará renderizarla dinámicamente por **SSR**.

### Ventajas de usar dynamicParams

- `dynamicParams: true` - Cuando no se han generado todas las rutas en el build, permitiendo manejar nuevas rutas.

- `dynamicParams: true` - Evita tener que hacer `npm run build` cada vez que hay cambios pequeños de rutas.

- `dynamicParams: false` - Puedes restringir rutas no generadas en generateStaticParams, regresando un 404.

### ¿Cómo funciona?

- `dynamicParams: true` -Next.js hará una petición dinámica al servidor y generará la página en tiempo real.

- `dynamicParams: false` - Next.js devolverá un 404 si la ruta no estaba en `generateStaticParams`.

**Ejemplo (Segmentos dinámicos `[slug]`)**

```yaml
src/app/blog/[slug]/page.tsx
```

```typescript
// src/app/blog/[slug]/page.tsx

export const dynamicParams = false;

export function generateStaticParams() {
  // Indicamos a Next.js que archivos se van a generar estáticamente
  return [{ slug: '1' }, { slug: '2' }];
}

// Se generarán estáticamente SOLO dos versiones de esta página
// - /blog/1
// - /blog/2
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <div className="p-4">Parámetros recibidos: {slug}</div>;
}
```

Ejecuta en la consola `npm run build`, verás que Next.js genera los archivos estáticos correspondientes.

Si revisas el directorio generado después del build en `/.next/server/app/blog`, podrás observar que Next.js ha creado los archivos estáticos para `blog/1`, `blog/2`

Ejecuta en la consola `npm run start`, podrás acceder a esta página visitando:

```yaml
http://localhost:3000/blog/1
http://localhost:3000/blog/2

http://localhost:3000/blog/3 → 404
http://localhost:3000/blog/4 → 404
```

> Importante: Next.js **NO** genera nuevas páginas dinámicas, ya que `dynamicParams = false`, es decir las rutas no pre-renderizadas regresan 404 automáticamente.

### A considerar

- Las rutas generadas en vivo NO estarán listas para el build inicial, por lo que podrían no ser indexadas para el SEO.

- Manejar las rutas dinámicas requiere configurar bien errores 404.

- Con `dynamicParams: false` las rutas no pre-renderizadas regresan 404 automáticamente.

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
git checkout examples-generateStaticParams
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
