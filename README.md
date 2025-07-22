# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-15%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Lazy loading

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-3)**] (branch: base-project-3).** Este proyecto incluye actualización visual y estructural de estilos utilizando TailwindCSS v4.

> Para simular la carga de datos en los ejemplos vamos utilizar la API **fakestoreapi**[[ref](https://fakestoreapi.com/)]

### ¿Qué es?

**Lazy Loading** o carga diferida es una técnica de optimización que retrasa la carga de componentes, módulos o librerías **hasta que realmente se necesiten** en tiempo de ejecución. En lugar de cargar todo el bundle desde el inicio, Next.js permite dividir dinámicamente tu aplicación y cargar piezas bajo demanda, mejorando el **Time to Interactive (TTI)** y reduciendo el **Largest Contentful Paint (LCP)**.

Esto se logra principalmente mediante:

- El uso del **componente** `next/dynamic` para componentes React.

- La carga condicional de librerías **externas pesadas**.
- La capacidad de **omitir SSR** para ciertos componentes exclusivamente del cliente.
- Y el uso de `**Suspense**` con streaming para _fine-grained hydration_.

### ¿Por qué usarlo?

- Evitar el **renderizado innecesario** de componentes que el usuario quizás nunca vea.

- **Mejorar el rendimiento percibido** al reducir el tamaño inicial del bundle.
- Permitir una **mejor experiencia de usuario en dispositivos móviles o redes lentas**.
- Posibilitar una **mejor modularización del código**, separando lógica pesada o de bajo uso.

Además en un contexto donde el rendimiento y la percepción del usuario son prioritarios para SEO, Core Web Vitals, y UX en general:

- **Google prioriza LCP, TTI y CLS** en sus rankings.

- Aplicaciones SPA pueden penalizarse por **JS excesivo al arranque**.
- Con App Router y React Server Components, el lazy loading se vuelve una _herramienta esencial para la fragmentación controlada_ del renderizado.

### Ventajas

Lazy Loading no es simplemente una técnica de performance, es una **decisión estratégica de arquitectura frontend moderna**. A continuación explicaremos sus beneficios clave.

#### — Reducción significativa del bundle inicial (JS/CSS)

Al dividir dinámicamente los componentes, Next.js evita incluir en el bundle inicial toda la UI o lógica innecesaria.

Es decir:

- Menor `first-load JS`.

- Menor tiempo de parseo/ejecución.
- Menor memoria usada al arranque.

Ejemplo: Una librería de gráficos (`chart.js`, `apexcharts`) que solo se usa en una dashboard, pero no en el landing.

#### — Mejora del Time To Interactive (TTI)

Al cargar primero lo mínimo necesario, la app es óptima desde un inicio, incluso si el resto aún se está descargando.

De hecho, Google favorece a los sitios que se perciben como rápidos, ya que la velocidad de carga es un factor clave para la experiencia del usuario. En consecuencia, los sitios más veloces tienden a posicionarse mejor en los resultados de búsqueda.

#### — Mejora la UX en dispositivos móviles

Lazy Loading permite que:

- El contenido visible cargue rápido.

- El JS no bloquee el renderizado de componentes visibles.
- El scroll o la interacción no se vean afectadas por lógica innecesaria.

En dispositivos móviles, cada KB de JS mal cargado puede generar **jank**, **stuttering** o incluso crashes.

#### — Evita cargar librerías pesadas innecesariamente

¿Usas Leaflet, Three.js, Chart.js, GSAP, o Moment.js? o algún otra librería pesada.

- Cárgalas **sólo cuando el usuario realmente acceda** a la sección que lo requiere.

- Incluso si están en la misma ruta, puedes renderizarlas condicionalmente.

#### — Carga por eventos (on demand)

Puedes disparar la carga dinámica:

- Al hacer scroll (`intersectionObserver`).

- Al hacer clic (`onClick`).
- Cuando aparece en viewport.

Ejemplo: Cuando se le da clic en abrir modal.

#### — Mejora la escalabilidad del código base

Lazy Loading fomenta:

- Separación de responsabilidades.

- División natural en features o secciones.
- Mejor mantenimiento a largo plazo.

Ejemplo: Puedes cargar features completas como componentes dinámicos.

#### — Compatible con múltiples estrategias de renderizado

- SSR tradicional.

- Static Generation.
- Edge SSR
- Streaming / RSC (con Suspense)

Esto lo hace **ideal en entornos híbridos**, especialmente en apps con Shell principal + slots (como Instagram, YouTube, Inbox, etc).

#### — Permite componentes “Client Only”

Esto evita:

- Errores de `window is not defined`.

- Carga de lógica innecesaria en el servidor.
- Incompatibilidades con Server Components.

#### — Optimiza server-side rendering sin sacrificar interactividad

Con `next/dynamic` y `Suspense`, puedes:

- Renderizar una página SSR rápidamente.

- Cargar los detalles después (modales, gráficas, mapas).

#### — Mejora la seguridad y privacidad en algunos contextos

Lazy Loading puede:

- Prevenir la exposición de librerías sensibles si no se usan.

- Evitar cargar código asociado a usuarios no autenticados.

Ejemplo: No cargues el panel de administración si el usuario no está logueado.

#### — Perfecto para patrones de microfrontend

Al dividir tu app en dominios (inbox, profile, search), puedes cargar:

- **Solo los componentes requeridos.**

- Bajo demanda.
- Incluso desde otro repo o team (con Module Federation o Turbopack).

#### — Habilita feature toggling y A/B Testing

Puedes cargar componentes o librerías:

- Basado en flags (`isBetaEnabled`).

- Por entorno (`process.env.NEXT_PUBLIC_EXPERIMENTAL`).
- Por permisos de usuario.

Sin modificar el layout principal ni recompilar todo el bundle.

### ¿Cómo se crea o implementa?

En Next.js 15+, lazy loading se implementa principalmente a través de la función `dynamic()` del módulo `next/dynamic`, combinada (opcionalmente) con `Suspense`, `loading.tsx`, y `ssr: false` si el componente requiere evitar Server Components.

Esta técnica permite cargar componentes, librerías o funciones **bajo demanda**, optimizando el bundle y mejorando el rendimiento percibido.

Importar `dynamic` desde `next/dynamic`:

```js
import dynamic from 'next/dynamic';
```

Crear el componente con `dynamic()`:

```js
const LazyComponent = dynamic(() => import('./MyComponent'));
```

Esto indica que `MyComponent` **no se incluirá en el bundle inicial**, sino que será solicitado _cuando se necesite_.

Usarlo como cualquier componente:

```js
export default function Page() {
  return (
    <main>
      <h1>Mi página</h1>
      <LazyComponent />
    </main>
  );
}
```

> **Importante**: Este componente se cargará **justo después del primer render**.

#### — Evitar SSR

Si el componente:

- Usa `window`, `document`, APIs del navegador.

- Es incompatible con Server Components (como algunos charts).
- Solo tiene sentido en cliente.

Entonces se deberas **desactivar SSR**:

```js
const NoSSRComponent = dynamic(() => import('./OnlyClient'), { ssr: false });
```

Esto obliga a que se cargue solo en el cliente. Recomendado para animaciones, mapas, librerías DOM-heavy, etc.

#### — `fallback` visual (loading state)

Puedes pasar un componente o función como `loading` mientras se carga:

```js
const LazyChart = dynamic(() => import('./Chart'), {
  loading: () => <p>Cargando gráfica...</p>,
});
```

También puedes usar `Suspense` con componentes server/client compatibles:

```js
import { Suspense, lazy } from 'react';

const LazyChart = lazy(() => import('./Chart'));

<Suspense fallback={<p>Cargando gráfica...</p>}>
  <LazyChart />
</Suspense>;
```

####  — Librerías externas

Cárgala bajo demanda:

```js
const Chart = dynamic(() => import('react-chartjs-2'), { ssr: false });
```

Esto evita incluirla en el JS inicial si no se está usando activamente.

#### — Por evento (onClick / scroll / vista)

```js
const Modal = dynamic(() => import('./Modal'), { ssr: false });

function Page() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Abrir Modal</button>
      {open && <Modal />}
    </>
  );
}
```

### ¿Cómo funciona?

#### — El ciclo de ejecución de un componente lazy

Cuando usas `dynamic(() => import('./Chart'))`, el flujo general es:

- **Next.js no lo incluye en el bundle inicial** gracias al _Webpack chunking_.

- **Al renderizar el componente**: Se genera una `<script>` que apunta al chunk dinámico y se muestra el componente `loading` (sí lo definiste).
- **Cuando el bundle llega al cliente**: React _resuelve_ el `Promise` del `import()` y renderiza el componente real.
- El **componente queda cacheado** en el browser (como cualquier chunk).

####  — ¿Qué pasa en el build?

En `next build`:

- Next analiza tus `dynamic()` y `import()` calls.

- Crea un árbol de dependencias dinámicas.
- Usa Webpack para: Extraer el código en un chunk aparte e insertar instrucciones para cargarlo bajo demanda.

### Ejemplos

#### Ejemplo — Lazy loading básico.

Cargar un componente de forma dinámica (lazy) usando `dynamic()` para que no se incluya en el bundle inicial.

Crea el componente `Hello` en `src/components` :

```js
// src/components/hello.tsx
'use client';

export default function Hello() {
  return <p>Hola desde el componente lazy cargado</p>;
}
```

Crea la `page.tsx` en `src/app/hello`

```js
// src/app/hello/page.tsx
'use client';

import dynamic from 'next/dynamic';

// Lazy load sin SSR
const Hello = dynamic(() => import('@/components/hello'), {
  ssr: false,
  loading: () => <p className="text-(--color-muted)">Cargando componente...</p>,
});

export default function HomePage() {
  return (
    <main className="container">
      <h1 className="title">Hello Page</h1>
      <Hello />
    </main>
  );
}
```

Actualiza la página principal `/app/page.tsx`. Agrega un `Link` hacia `hello/`:

```js
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container gap-3">
      <h1 className="title">Página principal</h1>
      <Link
        href="/hello"
        className="flex pill-button pill-button-default pill-button-primary"
      >
        Go to Hello page
      </Link>
    </main>
  );
}
```

Al iniciar el servidor con `npm run dev`, podrás acceder a la aplicación visitando `http://localhost:3000`, da clic en “_Go to Hello page_”.

![](https://cdn-images-1.medium.com/max/1600/1*1wz2QKvmSlXw_zp2S9IWdg.gif)

Resultado esperado:

- El texto “Hello Page” aparece inmediatamente.

- Luego, se carga `Hello.tsx` dinámicamente (sin estar en el bundle inicial).
- Mientras carga, se muestra el texto: `Cargando componente...`.

_Este patrón es ideal para:_

- Reducir bundle inicial.

- Modularizar tu UI.
- Mostrar componentes pesados _después_ del render inicial

#### Ejemplo 2 —  Lazy loading de una librería pesada

Cargar una librería pesada (como Chart.js) de forma dinámica **sólo cuando el usuario interactúe**, mejorando el tiempo de carga inicial y evitando SSR.

En consola instala el paquete de `chart.js react-chartjs-2`[[ref](https://react-chartjs-2.js.org/)]:

```bash
npm install chart.js react-chartjs-2
```

Crea el componente `ChartClient` en `src/components/` :

```js
// src/components/chart-client.tsx
'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
  datasets: [
    {
      label: 'Visitas',
      data: [15, 20, 12, 18, 22],
      fill: false,
      borderColor: 'rgb(180, 83, 9)',
    },
  ],
};

export default function ChartClient() {
  return (
    <div className="max-w-md">
      <Line data={data} />
    </div>
  );
}
```

Crea la `page.tsx` en `src/app/dashboard`:

```js
// src/app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ChartClient = dynamic(() => import('@/components/chart-client'), {
  ssr: false,
  loading: () => <p className="text-(--color-muted)">Cargando gráfico...</p>,
});

export default function DashboardPage() {
  const [showChart, setShowChart] = useState(false);

  return (
    <main className="container">
      <h1 className="title">Dashboard</h1>
      <h1 className="subTitle">Gráficas</h1>

      {showChart ? (
        <ChartClient />
      ) : (
        <button
          onClick={() => setShowChart(true)}
          className="flex pill-button pill-button-default"
        >
          Ver gráfico
        </button>
      )}
    </main>
  );
}
```

Actualiza la página principal `/app/page.tsx`. Agrega un `Link` hacia `dashboard/`:

```js
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container gap-3">
      <h1 className="title">Página principal</h1>
      <Link
        href="/hello"
        className="flex pill-button pill-button-default pill-button-primary"
      >
        Go to Hello page
      </Link>

      <Link
        href="/dashboard"
        className="flex pill-button pill-button-default pill-button-primary"
      >
        Go to Dashboard page
      </Link>
    </main>
  );
}
```

Al iniciar el servidor con `npm run dev`, podrás acceder a la aplicación visitando `http://localhost:3000`, da clic en “_Go to Dashboard page_”.

![](https://cdn-images-1.medium.com/max/1600/1*dVlc1oJfjoZlV_jOIRNFwQ.gif)

![](https://cdn-images-1.medium.com/max/1600/1*Xl13_JUB1M6siLOkrAeIYQ.gif)

Resultado esperado:

Solo cuando el usuario da click en “Ver gráfico”:

- Se importa la librería Chart.js dinámicamente.

- Se renderiza el componente `<ChartClient />`.
- Mientras tanto, se muestra “_Cargando gráfico…_”.

Cuando visita una segunda vez y el usuario da click en “Ver gráfico”:

- Carga el componente **cacheado** en el browser.

- Se renderiza el componente `<ChartClient />`.

_Este patrón es ideal cuando:_

- Usas librerías como **Chart.js**, **Three.js**, **Mapbox**, etc.

- Solo se necesita el recurso tras una acción.
- Quieres ahorrar peso del bundle inicial y evitar hidratarlo en SSR.

#### Ejemplo 3 — Lazy loading con `Suspense` + `lazy`

En una tienda, lista de películas o dashboard, la lista de items son visualmente pesadas (imágenes, animaciones, tooltips, etc). Lazy load permite:

- Renderizar layout general rápidamente.

- Cargar las tarjetas mientras se muestran placeholders (`Skeleton`).

Crea el archivo `.env.local` dentro del directorio raíz del proyecto (no dentro de `/src`) :

```ini
# FAKE STORE Config
FAKE_STORE_BASE_URL = https://fakestoreapi.com
```

Actualiza `next.config.js` para que acepte imágenes remotas de `fakestoreapi.com`:

```js
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://fakestoreapi.com/img/**')],
  },
};

export default nextConfig;
```

Crea el servicio `productsService` en `/src/services/`:

```js
// services/productsService.ts
const FAKE_API_URL = process.env.NEXT_PUBLIC_FAKE_STORE_BASE_URL;

export type Product = {
  id: string,
  title: string,
  image: string,
  price: number,
  description: string,
  category: string,
  rating: {
    rate: number,
    count: number,
  },
};

type ProductsResponse = {
  results: Product[],
};

export async function fetchProducts(): Promise<ProductsResponse> {
  try {
    const res = await fetch(`${FAKE_API_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return { results: data };
  } catch (error) {
    console.error('Error fetchProducts:', error);
    throw error;
  }
}
```

Crea el componente `ProductCard` en `src/components/`:

```js
// src/components/product-card.tsx
'use client';
import Image from 'next/image';

type ProductCardPops = {
  title: string,
  image: string,
  price: number,
};

export default function ProductCard({ title, image, price }: ProductCardPops) {
  return (
    <div className="border border-(--color-border) rounded-lg p-4 shadow-sm bg-(--color-background) text-(--color-foreground) space-y-3">
      <div className="relative w-full h-48 bg-(--color-muted) rounded">
        <Image src={image} alt={title} fill className="object-cover p-2" />
      </div>
      <div className="font-semibold text-base">{title}</div>
      <div className="text-sm text-(--color-foreground)">${price}</div>
    </div>
  );
}
```

Crea el componente `SkeletonCard` en `src/components/`:

```js
// src/components/skeleton-card-tsx
export default function SkeletonCard() {
  return (
    <div className="border border-(--color-border) rounded-lg p-4 bg-(--color-muted) animate-pulse space-y-4">
      <div className="w-full h-48 bg-(--color-border) rounded" />
      <div className="h-4 w-3/4 bg-(--color-border) rounded" />
      <div className="h-3 w-1/2 bg-(--color-border) rounded" />
    </div>
  );
}
```

Crea la `page.tsx` en `src/app/store`:

```js
// src/app/store/page.tsx
'use client';

import { Suspense, useEffect, useState, lazy } from 'react';
import SkeletonCard from '@/components/skeleton-card';
import { Product, fetchProducts } from '@/services/productsService';

const LazyProductCard = lazy(() => import('@/components/product-card'));

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(({ results }) => setProducts(results))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        : products.map((p) => (
            <Suspense fallback={<SkeletonCard />} key={p.id}>
              <LazyProductCard
                title={p.title}
                image={p.image}
                price={p.price}
              />
            </Suspense>
          ))}
    </section>
  );
}
```

> **Nota:** Puedes manejar el estado de carga utilizando un archivo `loading.tsx` [[Next.js — loading.tsx](https://mauriciogc.medium.com/next-js-loading-tsx-d5b1b1ae3f7a)], o bien, como en este caso, gestionarlo manualmente con un estado local en React (`useState`). Ambas opciones son válidas dependiendo del contexto y del control que necesites sobre la interfaz.

Actualiza la página principal `/app/page.tsx`. Agrega un `Link` hacia `store/`:

```js
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container gap-3">
      <h1 className="title">Página principal</h1>
      <Link
        href="/hello"
        className="flex pill-button pill-button-default pill-button-primary"
      >
        Go to Hello page
      </Link>

      <Link
        href="/dashboard"
        className="flex pill-button pill-button-default pill-button-primary"
      >
        Go to Dashboard page
      </Link>

      <Link
        href="/store"
        className="flex pill-button pill-button-default pill-button-primary"
      >
        Go to Store page
      </Link>
    </main>
  );
}
```

Al iniciar el servidor con `npm run dev`, podrás acceder a la aplicación visitando `http://localhost:3000`, da clic en “_Go to Store page_”.

![](https://cdn-images-1.medium.com/max/1600/1*Xv6EvL9W9bv5xM7IIM7TUw.gif)

Resultado esperado:

- Se renderiza el grid de productos.

- Cada tarjeta carga de forma independiente, con su skeleton.
- No se bloquea el resto del contenido.
- `Suspense` mejora la UX.

_Este patrón es ideal:_

- Con interfaces con **varias vistas repetidas**.

- Con una UI interactiva **antes de que esté todo cargado**.
- Compatible con Streaming + layouts asíncronos.

#### Ejemplo 4— Lazy loading con `Modal` + `dynamic`

En aplicaciones tipo galería o tienda, al hacer clic en un ítem se suele abrir un modal con más información. Cargar ese modal y sus datos **solo cuando se necesite** ahorra peso inicial y mejora UX.

En consola instala el paquete de `lucide-react` para agregar iconos:

```bash
npm install lucide-react
```

Crea el componente `ProductModal` en `src/components/`:

```js
// src/components/product-modal.tsx
'use client';

import { X, Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Product } from '@/services/productsService';

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product,
  onClose: () => void,
}) {
  const dialogRef = useRef < HTMLDivElement > null;

  useEffect(() => {
    document.body.classList.add('noscroll');
    return () => document.body.classList.remove('noscroll');
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white z-50"
        aria-label="Cerrar"
      >
        <X size={28} />
      </button>

      <div className="bg-(--color-background) text-(--color-foreground) rounded-xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh] space-y-4">
        <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden bg-white">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover p-1"
          />
        </div>

        <div className="flex items-center gap-2 justify-center text-sm text-(--color-muted)foreground]">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-semibold">{product.rating.rate}</span>
          <span className="text-xs opacity-80">
            {product.rating.count} reviews
          </span>
        </div>

        <h2 className="text-xl font-semibold text-center text-(--color-primary)">
          {product.title}
        </h2>
        <p className="text-(--color-foreground) text-sm text-center">
          {product.description}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-(--color-border)">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <button className="px-4 py-2 bg-(--color-foreground) text-(--color-background) rounded-md font-semibold hover:opacity-90 transition">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
```

Crea el componente `SkeletonModal` en `src/components/`:

```js
// src/components/skeleton-modal.tsx
'use client';

export default function SkeletonModal() {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="bg-(--color-background) text-(--color-foreground) rounded-xl w-full max-w-md p-6 shadow-xl overflow-y-auto max-h-[90vh] space-y-4">
        <div className="w-full aspect-[4/3] rounded-lg bg-(--color-muted) animate-pulse" />

        <div className="flex items-center gap-2 justify-center animate-pulse">
          <div className="w-4 h-4 rounded-full bg-(--color-muted)" />
          <div className="w-10 h-3 rounded bg-(--color-muted)" />
          <div className="w-12 h-2 rounded bg-(--color-muted)" />
        </div>

        <div className="h-5 rounded bg-(--color-muted) w-3/4 mx-auto animate-pulse" />

        <div className="space-y-2 text-sm animate-pulse">
          <div className="h-3 rounded bg-(--color-muted) w-full" />
          <div className="h-3 rounded bg-(--color-muted) w-5/6" />
          <div className="h-3 rounded bg-(--color-muted) w-2/3" />
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-(--color-border) animate-pulse">
          <div className="h-6 w-16 bg-(--color-muted) rounded" />
          <div className="h-8 w-24 bg-(--color-muted) rounded" />
        </div>
      </div>
    </div>
  );
}
```

Actualiza el componente `ProductCard` agregando el evento `onClick`:

```js
// src/components/product-card.tsx
'use client';
import Image from 'next/image';

type ProductCardPops = {
  onClick: () => void,
  title: string,
  image: string,
  price: number,
};

export default function ProductCard({
  onClick,
  title,
  image,
  price,
}: ProductCardPops) {
  return (
    <div
      className="border border-(--color-border) rounded-lg p-4 shadow-sm bg-(--color-background) text-(--color-foreground) space-y-3"
      onClick={onClick}
    >
      <div className="relative w-full h-48 bg-(--color-muted) rounded">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover p-2"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="font-semibold text-base">{title}</div>
      <div className="text-sm text-(--color-foreground)">${price}</div>
    </div>
  );
}
```

Actualiza la página de `Store`:

```js
// src/app/store/page.tsx
'use client';

import { Suspense, useEffect, useState, lazy } from 'react';
import dynamic from 'next/dynamic';
import SkeletonCard from '@/components/skeleton-card';
import { Product, fetchProducts } from '@/services/productsService';
//Importa el skeleton del modal
import SkeletonModal from '@/components/skeleton-modal';

const LazyProductCard = lazy(() => import('@/components/product-card'));

//Carga el componente modal bajo demanda
const DynamicProductModal = dynamic(
  () => import('@/components/product-modal'),
  {
    ssr: false,
    loading: () => <SkeletonModal />,
  }
);

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null); //Producto seleccionado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(({ results }) => setProducts(results))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((p) => (
              <Suspense fallback={<SkeletonCard />} key={p.id}>
                <LazyProductCard
                  onClick={() => setSelected(p)}
                  title={p.title}
                  image={p.image}
                  price={p.price}
                />
              </Suspense>
            ))}
      </section>
      {/* Si hay un producto seleccionado */}
      {selected && (
        <DynamicProductModal
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
```

> **Nota:** Los ejemplos presentados son básicos y están pensados solo con fines didacticos. En una implementación real, se recomienda separar el componente `ProductModal` en dos partes: un modal genérico reutilizable y un componente específico para mostrar los detalles del producto.
>
> Además, podrías aprovechar las **rutas interceptadas** y el uso de `**@parallel**` [Next.js — Parallel and Intercepted Routes****] para una mejor arquitectura y experiencia de usuario. Si decides utilizar rutas interceptadas, recuerda que **necesitarás un servicio** que obtenga el detalle del producto de forma dinámica a partir del `id` recibido en los parámetros de la URL.

Al iniciar el servidor con `npm run dev`, podrás acceder a la aplicación visitando `http://localhost:3000`, da clic en “_Go to Store page_” y da click en un producto.

![](https://cdn-images-1.medium.com/max/1600/1*3snhQyBjifXsAjELsX7PwQ.gif)

Resultado esperado:

- El usuario ve una lista de productos.

- Al hacer clic, se **carga dinámicamente el modal**.
- Mientras carga, se muestra un `SkeletonModal`.
- El modal está fuera del bundle inicial.

_Este patrón es ideal:_

- Refleja casos reales: modal de detalle, ficha técnica, perfil.

- **Evita precargar recursos pesados** innecesarios.
- Se integra bien con Parallel Routes o Intercepting Routes.

#### Ejemplo 5 —  Lazy loading de módulos JS pesados\*\*

Supongamos que tenemos un juego tipo Wordle o una app educativa. Necesitamos cargar **grandes volúmenes de palabras por idioma**. No queremos que se incluyan en el bundle inicial.

Crea la librería de palabras en inglés `word.en.ts` en `src/lib/`:

```js
// src/lib/words.en.ts
const words = ['apple', 'table', 'mouse', 'orange', 'banana' /* miles más */];
export default { words };

Crea la librería de palabras en español `word.en.ts` en `src/lib/`:

// src/lib/words.es.ts
const words = [
  'manzana',
  'mesa',
  'ratón',
  'naranja',
  'plátano' /* miles más */,
];
export default { words };
```

Crea la librería para obtener archivos `word-loader.ts` en `src/lib/`:

```js
// src/lib/word-loader.ts
type WordModule = { words: string[] };

const wordModuleCache = new Map<string, WordModule>();

export async function getWordModule(locale: string): Promise<WordModule> {
  if (wordModuleCache.has(locale)) {
    return wordModuleCache.get(locale)!;
  }

  let module: WordModule;

  switch (locale) {
    case 'es':
      module = (await import('./words.es')).default;
      break;
    case 'en':
    default:
      module = (await import('./words.en')).default;
      break;
  }

  wordModuleCache.set(locale, module);
  return module;
}
```

Crea la página `WordlePage` en `src/wordle/`:

```js
// src/app/wordle/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getWordModule } from '@/lib/word-loader';

export default function WordlePage() {
  const [locale, setLocale] = useState<'en' | 'es'>('en');
  const [words, setWords] = useState<string[] | null>(null);

  useEffect(() => {
    setWords(null);
    (async () => {
      const mod = await getWordModule(locale);
      setWords(mod.words);
    })();
  }, [locale]);

  return (
    <main className="p-6 max-w-3xl mx-auto text-(--color-foreground)">
      <h1 className="title">
        Word List <span className="subTitle">({locale.toUpperCase()})</span>
      </h1>

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => setLocale('en')}
          className={`pill-button ${
            locale === 'en' ? 'pill-button-active' : 'pill-button-default'
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLocale('es')}
          className={`pill-button ${
            locale === 'es' ? 'pill-button-active' : 'pill-button-default'
          }`}
        >
          Español
        </button>
      </div>

      {words ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {words.map((word, i) => (
            <li
              key={i}
              className="bg-(--color-muted) text-sm rounded px-3 py-2 text-(--color-foreground)"
            >
              {word}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-(--color-muted)">Cargando palabras...</div>
      )}
    </main>
  );
}
```

Actualiza la página principal `/app/page.tsx`. Agrega un `Link` hacia `wordle/`:

```js
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container gap-3">
      <h1 className="title">Página principal</h1>
      <Link
        href="/hello"
        className="flex pill-button pill-button-default pill-button-primary"
      >
        Go to Hello page
      </Link>

      <Link
        href="/dashboard"
        className="flex pill-button pill-button-default pill-button-primary"
      >
        Go to Dashboard page
      </Link>

      <Link
        href="/store"
        className="flex pill-button pill-button-default pill-button-primary"
      >
        Go to Store page
      </Link>

      <Link
        href="/wordle"
        className="flex pill-button pill-button-default pill-button-primary"
      >
        Go to Wordle page
      </Link>
    </main>
  );
}
```

Al iniciar el servidor con `npm run dev`, podrás acceder a la aplicación visitando `http://localhost:3000`, da clic en “_Go to Wordle page_”.

![](https://cdn-images-1.medium.com/max/1600/1*3sBgjeZGdG9O8I4uT1Odnw.gif)

Resultado esperado:

- Inicialmente se cargan sólo las palabras en inglés.

- Al hacer clic en “Español”, se hace un import dinámico (`./words.es`).
- Se cachea el resultado, así que no se vuelve a cargar si ya se usó.

_Este patrón es ideal:_

- Para localización, configuración por región, features avanzadas.

- Fácil de mantener y escalar con más idiomas.
- Compatible con Server Components o Client.

### ¿Cuándo usar `dynamic()` vs `import()` directo?

#### — Cuándo usar `dynamic()`

- **Cuándo estás cargando un componente React** y necesitas mostrar un fallback (`loading`, `skeleton`, etc.) mientras se carga.

- **Cuándo quieres saltarte el SSR** usando `{ ssr: false }`, para componentes que dependen del `window`, librerías del cliente, o solo funcionan en el navegador.
- **Cuándo quieres aprovechar code-splitting** sin tener que manejar la lógica manual con `useEffect`.
- **Cuando el componente se usará directamente en el JSX** y necesitas que se comporte como uno más del árbol.
- **No ideal para funciones o datos** que necesitas usar dentro de un `useEffect` o `handler`, ya que la API está pensada para React Components.

#### — Cuándo usar `import()` dinámico (directo)

- **Cuando necesitas cargar datos, objetos o funciones pesadas bajo demanda**.

- **Cuando estás dentro de un hook (`useEffect`, `event handler`, etc.)** y quieres hacer la carga manualmente sin depender de un componente React.
- **Cuando estás haciendo SSR** y necesitas evitar envolver todo con `dynamic()`, o cuando el contenido debe cargarse _antes_ de renderizar algo.
- **Recuerda: No muestra fallback visual automáticamente**, por lo que tú debes encargarte de eso si es necesario.

### A considerar

Lazy loading, aunque poderoso, también requiere planificación para que no se convierta en una fuente de bugs, malas experiencias de usuario o incluso penalizaciones en performance si se aplica mal.

Aquí te dejo algunos puntos críticos que debes considerar:

- Identifica correctamente que cargar de forma lazy.

- Evita Lazy loading de componentes críticos para el flujo principal, mejor considera prefetch o preload.
- Utiliza `loading.tsx` o `<Suspense>` para UX fluida.
- Evita lazy loading de componentes muy pequeños.
- Fragmenta por feature, no por componente.

---

### Hasta este punto…

Hemos desglosado a profundidad cómo funciona y cómo se implementa el **Lazy Loading** en Next.js 15+, entendiendo que no es solo una cuestión de rendimiento, sino también de **arquitectura reactiva**, **modularización inteligente**, y **mejora progresiva de la experiencia del usuario**.

Aprendimos que `next/dynamic` es una herramienta que sirve para dividir el bundle de nuestra aplicación en partes más pequeñas, pero que **debe usarse estratégicamente**, evaluando su impacto en el SSR, el SEO, y la percepción de carga.

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
git checkout lazy-loading
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
