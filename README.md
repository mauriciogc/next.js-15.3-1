# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-2)**] (branch: base-project-2).** Este proyecto contiene los archivos: `src/app/page.tsx` y `src/app/layout.tsx`, configurados con una estructura mínima.

> Para simular la carga de datos en los ejemplos vamos utilizar la API **themealdb**[[ref](https://www.themealdb.com/)].

## `Suspense`

Además del uso de `loading.tsx`, Next.js también permite definir **estados de carga personalizados manualmente** para componentes específicos utilizando el componente `Suspense` de React.

Esto es especialmente útil cuando estás trabajando con componentes cliente `'use client'` o estás cargando contenido de forma dinámica `next/dynamic`, donde `loading.tsx` no tiene efecto.

**Next.js y React permiten** el **renderizado** **estático** (SSG) para optimizar el rendimiento inicial. Esto **mejora los tiempos de carga percibidos**, ya que una versión no interactiva de la página se entrega al usuario tan pronto como sea posible.

![](https://cdn-images-1.medium.com/max/1600/1*f5XryQzQK080oqwu18wY6Q.png)

Aunque la página llega rápido, aún **es necesario completar la obtención de todos los datos en el servidor** antes de que se pueda renderizar el HTML completo, por lo que aún puede ocurrir latencias en secciones que dependen de recursos externos.

Streaming permite que Next.js divida el HTML de una página en fragmentos pequeños y los envíe al cliente **progresivamente**, conforme están listos. Esto quiere decir:

- **Partes prioritarias** (layout, ,título, etc.) se muestren primero.

- **Partes dependientes de dato**s (comentarios, análisis, productos, etc) se carguen después.

![](https://cdn-images-1.medium.com/max/1600/1*ENjodOUDXLOnEit3yPRSUw.png)

Esto encaja perfectamente con el modelo de componentes de React, donde cada componente se considera un fragmento independiente. Gracias a `Suspense`, puedes controlar el fallback visual **por componente**, como: Estadísticas, secciones lentas, Widgets cargados con `next/dynamic`.

React puede empezar a hidratar la UI incluso **antes de que todos los datos hayan llegado**, lo cual mejora tanto el rendimiento técnico como la experiencia del usuario.

### ¿Qué es `React.Suspense`?

`<Suspense>` es un **componente nativo de React** que permite “**_suspender_**” la **renderización de una parte del árbol de componentes hasta que ciertas operaciones asincrónicas se completen**. Su principal objetivo es proporcionar una **experiencia de usuario fluida** durante la carga de recursos como datos, componentes dinámicos o cualquier operación que no esté lista en el render inicial.

En el contexto de **Next.js (App Router)**, `<Suspense>` se utiliza como herramienta para **controlar el flujo de renderizado progresivo**, aprovechando el **streaming de contenido desde el servidor** y mostrando interfaces de carga personalizadas (fallbacks) de forma localizada y precisa.

```js
import { Suspense } from 'react';

<Suspense fallback={<p>Cargando...</p>}>
  <ComponentConFetch />
</Suspense>;
```

### Principales características

- Permite renderizado asincrónico con un fallback.

- Funciona tanto en el **cliente** como en el **servidor** (con React Server Components).
- Habilita **streaming progresivo** desde el servidor.
- **Composición local**: se puede usar varias veces, en diferentes partes del árbol de componentes.
- Se integra con `React.lazy`, `fetch`, `dynamics`, y componentes suspendibles.
- Puede anidarse para mostrar múltiples niveles de carga diferenciados.

### Ventajas

- **Evita el bloqueo completo del renderizado**: solo “suspende” partes del árbol y no toda la página como `loading.tsx`.

- **Mejora la percepción de velocidad**: el usuario ve el layout y partes de la UI mientras se cargan otras.
- **Permite granularidad en la carga**: fallbacks por segmento.
- **Facilita el diseño de interfaces reactivas y escalables**.

### ¿Cómo se crea o implementa?

Para usar `<Suspense>`, hay que importarlo desde React:

```js
import { Suspense } from 'react';
```

Se utiliza como un wrapper alrededor de los componentes que pueden suspenderse, y se le proporciona un `fallback`, que puede ser cualquier componente de carga (cargando, spinner, skeleton, animación, etc.) mientras se carga el contenido.

```js
<Suspense fallback={<div>Loading...</div>}>
  <MyAsyncComponent />
</Suspense>
```

### ¿Cómo funciona?

- React evalúa el componente envuelto por `<Suspense>`.

- Si el componente ejecuta una promesa (`fetch` o `dynamic()`), React pausa esa rama del árbol.
- Mientras espera, muestra el contenido del `fallback`.
- Una vez resuelta la promesa, React reintenta renderizar el componente original y lo inserta reemplazando el fallback.

Lo interesante es que en **Next.js App Router**, este proceso **también** **puede ocurrir desde el servidor**, enviando primero el `fallback` al cliente, y luego el resto del contenido en cuanto está listo. Esto es posible a al **streaming de React 18**.

### Ejemplos

#### Ejemplo — Básico

Crea el componente `DummyComponent` en `src/components/`:

```js
// src/components/DummyComponent

export default async function DummyComponent() {
  // Simula una carga de 3s
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="w-full bg-orange-100 text-orange-800 p-4 rounded shadow">
      <h2 className="text-xl font-bold">Component</h2>
      <p>Dummy component...</p>
    </div>
  );
}
```

Importa el componente `DummyComponent` y el componente `Suspense` a la página global `src/app/page.tsx`:

```js
// src/app/page.tsx

import { Suspense } from 'react';
import DummyComponent from '@/components/DummyComponent';

export default function Home() {
  return (
    <main className="flex min-h-screen p-4">
      <div className="w-full space-y-4">
        <h1 className="text-3xl font-bold">Página principal</h1>

        <Suspense fallback={<p>Cargando componente...</p>}>
          <DummyComponent />
        </Suspense>
      </div>
    </main>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*AXah8ITHLEqUK2eXdIjmbg.png)

Al iniciar el servidor con `npm run dev` y acceder a `http://localhost:3000`, verás que al ejecutarse la función `fetch` dentro del componente `DummyComponent`, se suspende su renderizado durante 3 segundos. Durante ese tiempo, React muestra el contenido definido en el `fallback` y, una vez que la promesa se resuelve, renderiza nuevamente el componente original.

![](https://cdn-images-1.medium.com/max/1600/1*dU2s4o5hrO8fomHlpFQ6kA.gif)

#### Ejemplo — Con un componente Skeleton

Crea el componente `CardSkeleton` en `src/components` :

```js
// src/components/CardSkeleton.tsx

interface CardSkeletonProps {
  repeat?: number;
}
export default function CardSkeleton({ repeat = 1 }: CardSkeletonProps) {
  return (
    <>
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={index}
          className="bg-orange-50 p-4 rounded shadow animate-pulse space-y-2 mb-4"
        >
          <div className="h-6 bg-orange-200 rounded w-3/4" />
          <div className="h-4 bg-orange-100 rounded w-full" />
        </div>
      ))}
    </>
  );
}
```

Importa el componente `CardSkeleton` y agrega otro `Suspense` al componente `DummyComponent` en la página global `src/app/page.tsx`:

```js
// src/app/page.tsx

import { Suspense } from 'react';
import DummyComponent from '@/components/DummyComponent';
import CardSkeleton from '@/components/CardSkeleton';

export default function Home() {
  return (
    <main className="flex min-h-screen p-4">
      <div className="w-full space-y-4">
        <h1 className="text-3xl font-bold">Página principal</h1>

        <Suspense fallback={<p>Cargando componente...</p>}>
          <DummyComponent />
        </Suspense>

        <Suspense fallback={<CardSkeleton />}>
          <DummyComponent />
        </Suspense>
      </div>
    </main>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*o9RrmvdWfL-AAcwhcGaP4A.png)

Al iniciar el servidor con `npm run dev` y acceder a `http://localhost:3000`, verás que React muestra el `fallback`,donde el primero muestra un simple texto de carga y el segundo un componente _Skeleton_ visual. Una vez que la promesa se resuelve, React vuelve a intentar renderizar los componentes originales, reemplazando los fallbacks por el contenido real.

![](https://cdn-images-1.medium.com/max/1600/1*XsT3JvkwZplbe2ANDrwsAA.gif)

#### Ejemplo —Cargando una lista de recetas

Crea el componente `RecipeCard` en `src/components/`:

```js
//src/components/RecipeCard.tsx

'use client';

type Props = {
  recipe: { strMeal: string, strInstructions: string },
};

export default function RecipeCard({ recipe }: Props) {
  return (
    <div className="bg-orange-100 text-orange-800 p-4 rounded shadow">
      <h2 className="text-xl font-bold">{recipe.strMeal}</h2>
      <p className="truncate">{recipe.strInstructions}</p>
    </div>
  );
}
```

Crea el servicio `recipeService` en `/src/services/` :

```js
// src/services/recipeService.ts

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

type Recipe = {
  idMeal: string,
  strMeal: string,
  strInstructions: string,
};

export async function fetchRecipes(
  category: string
): Promise<{ meals: Recipe[] }> {
  try {
    const url = `${BASE_URL}/search.php?s=${category}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error al obtener los datos: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error en fetchRecipes:', error);
    throw error;
  }
}
```

Crea la `page.tsx` de recetas en `src/app/recipes`:

```js
// src/app/recipe/page.tsx

import { Suspense } from 'react';

import CardSkeleton from '@/components/CardSkeleton';
import RecipeCard from '@/components/RecipeCard';
import { fetchRecipes } from '@/services/recipeService';

// Contenedor que invoca el servicio y regresa la lista de recetas
async function RecipeCardWithData({ type }: { type: string }) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const recipe = await fetchRecipes(type);
  return recipe.meals.map((recipe) => (
    <RecipeCard key={recipe.idMeal} recipe={recipe} />
  ));
}

export default function RecipePage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Recetas disponibles</h1>
      <Suspense fallback={<CardSkeleton repeat={3} />}>
        <h2 className="text-1xl font-bold">Recetas con carne</h2>
        <RecipeCardWithData type="beef" />
      </Suspense>
    </div>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*P5IMmFiPw2pewF-I6838aQ.png)

Al iniciar el servidor (`npm run dev`), acceder a `[http://localhost:3000](http://localhost:300)`, ve a la sección de recetas (`/recipe`).

![](https://cdn-images-1.medium.com/max/1600/1*WNpwSerrB5YYd12fXfA9kA.gif)

Cuando se usa `Suspense` de esta manera, React evalúa **cada bloque de forma independiente**. Si el contenido dentro de un bloque `Suspense` se “_suspende_”, es decir, hay una promesa pendiente como un `await`, React muestra el `fallback` correspondiente **solo en esa sección**.

Es decir…

- El servidor empieza a renderizar la página.

- Llega a `<RecipeCardWithData type="beef" />` y detecta una operación asíncrona → **suspende todo lo que este dentro de** `Suspense`**.**
- React activa el `fallback` asociado `<CardSkeleton />` para esa sección.
- Lo mismo ocurre con `<RecipeCardWithData type="beef" />`.
- Cada sección **se resuelve de forma separada** y React reemplaza el skeleton con el componente `<RecipeCard>` cuando la promesa termina.

### Aspectos a considerar / Buenas prácticas

- Usa `<Suspense>` donde los componentes pueden tardar en visualizarse.
- Colócalo dentro de layouts o páginas para aprovechar el streaming.

- No mezcles `Suspende` en cliente y servidor sin entender qué componente es cuál ya que `'use client'` puede cambiar el comportamiento.
- Usa `suspense: true` con `next/dynamic` para que funcione correctamente.
- No pongas lógica de negocio dentro de fallbacks (sólo UI).
- `Suspense` solo funciona en React +18.
- No uses `Suspense` en componentes que no lanzan promesas.

### loading.tsx o Suspense

![](https://cdn-images-1.medium.com/max/1600/1*OuZV99JHJB-7RkAH3C0XIQ.png)

---

## Hasta este punto, has aprendido a utilizar el componente `Suspense` de forma sencilla dentro del App Router de Next.js, comprendiendo cómo suspende temporalmente la interfaz mientras se resuelven operaciones asíncronas. También implementamos un skeleton como interfaz de carga visual, mejorando la experiencia del usuario al proporcionar retroalimentación inmediata durante la carga de datos.

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
git checkout suspense
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
