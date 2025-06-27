# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## `(.)segment` (Interceptar en el mismo nivel)

> **Nota:** Simularemos los componentes para darle más estructura visual a la interfaz y mostrar cómo se integra de una manera más realista dentro de la aplicación. Esto ayuda a visualizar mejor cómo conviven los componentes con las rutas interceptadas.

Al hacer clic en una Card en `/gallery`, se navegará a `/gallery/photos/[id]`, pero el contenido de esa ruta será interceptado y renderizado **como un modal** sin desmontar el feed principal. Esto se logra con:

- `(.)` — Para interceptar una ruta al mismo nivel.

- `@modal` — Para aislar visualmente el modal de forma paralela.

![](https://cdn-images-1.medium.com/max/800/1*IoLt2E770b4VO8Q7oZ5yOA.gif)

Deberás generar un interceptador en:

![](https://cdn-images-1.medium.com/max/800/1*k1rljcTPULY3unrLV7mcbQ.png)

Esto intercepta cualquier navegación a `/gallery/photos/[id]`, y la redirige al slot `@modal` para que lo muestre como modal.

En consola instala el paquete de `lucide-react` para agregar iconos:

```bash
npm install lucide-react
```

Actualiza el layout principal `/app/layout.tsx`, agregando el `div#modal-root` para la carga del modal:

```js
//src/app/layout.tsx
import './globals.css';

import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  weight: '300',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <html lang="en" className={dmSans.className}>
      <body className="antialiased">
        <div className="flex items-center justify-between w-full h-full max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8 pt-20">
          <div className="w-full">{children}</div>
          <div id="modal-root" />
        </div>
      </body>
    </html>
  );
}
```

> **Recuerda:**`#modal-root` es una convención para usar **React Portals**, lo que permite renderizar contenido modal fuera del flujo del DOM principal, por encima del resto. [[ref](https://medium.com/@mauriciogc/react-portales-8ff12de4b8e9)]

Actualiza la página principal `/app/page.tsx`, agregando el `Link` a `/gallery`:

```js
// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container">
      <h1 className="title">Página principal</h1>
      <div className="flex gap-3 flex-wrap items-center px-4 py-3 rounded-xl">
        <Link
          href={'/gallery'}
          className="pill-button pill-button-active flex items-center"
        >
          Gallery
        </Link>
      </div>
    </main>
  );
}
```

Crea el componente `photo-card.tsx` en `src/components` :

```js
//src/components/PhotoCard.tsx
import Link from 'next/link';

export default function PhotoCard({ id, url }: { id: string, url: string }) {
  return (
    <div className="bg-(--color-background) text-(--color-foreground) rounded-2xl border border-(--color-border) overflow-hidden flex flex-col transition-colors duration-300 ease-in-out">
      <div className="w-full h-48 bg-(--color-muted) rounded-2xl" />

      <div className="p-4 space-y-3">
        <div className="h-4 w-full bg-(--color-border) rounded-full" />
        <div className="h-3 w-3/4 bg-(--color-muted) rounded-full" />
        <div className="h-3 w-2/3 bg-(--color-muted) rounded-full" />
      </div>

      <div className="border-t border-(--color-border)" />

      <div className="p-4 flex justify-between items-center">
        <Link
          className="pill-button pill-button-primary w-full flex items-center justify-center"
          href={url}
          scroll={false}
        >
          Ver detalle {id}
        </Link>
      </div>
    </div>
  );
}
```

Crea el componente `detail-photo.tsx` en `src/components` :

```js
//src/components/detail-photo.tsx
export default function DetailPhoto({ id }: { id: string }) {
  return (
    <div className="bg-(--color-background) text-(--color-foreground) rounded-xl overflow-hidden">
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-(--color-muted) flex items-center justify-center">
            {id}
          </div>
          <div className="w-32 h-4 rounded bg-(--color-border)" />
        </div>
      </div>

      <div className="w-[100vw] h-80 bg-(--color-muted)" />

      <div className="p-4 space-y-3">
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="h-8 w-20 bg-(--color-muted) rounded-full" />
          <div className="h-8 w-20 bg-(--color-muted) rounded-full" />
          <div className="h-8 w-28 bg-(--color-muted) rounded-full" />
          <div className="h-8 w-32 bg-(--color-primary) rounded-full" />
        </div>

        <div className="h-3 w-1/2 bg-(--color-border) rounded" />
        <div className="h-3 w-3/4 bg-(--color-muted) rounded" />
        <div className="h-3 w-1/4 bg-(--color-muted) rounded" />

        <div className="flex gap-2 mt-4">
          <div className="h-8 w-28 bg-(--color-muted) rounded-full" />
          <div className="h-8 w-32 bg-(--color-muted) rounded-full" />
        </div>
      </div>
    </div>
  );
}
```

Crea el componente `modal.tsx` en `src/components`:

```js
//src/components/modal.tsx
'use client';

import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('noscroll');
    return () => {
      document.body.classList.remove('noscroll');
    };
  }, []);

  const onDismiss = () => {
    router.back();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onDismiss();
    }
  };

  return createPortal(
    <div
      ref={dialogRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-(--color-overlay) flex items-center justify-center px-16 py-8 overflow-auto"
    >
      <button
        onClick={onDismiss}
        aria-label="Cerrar"
        className="fixed top-4 right-4 z-50 text-white hover:text-(--color-primary) transition cursor-pointer"
      >
        <X size={28} />
      </button>

      <div className="relative bg-(--color-background) text-(--color-foreground) min-w-sm max-h-full max-w-5xl min-h-1/2   h-auto rounded shadow-xl overflow-y-auto">
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
}
```

Crea la `page.tsx`, `default.tsx` y `layout.tsx` de la **galería** en `src/app/gallery/`:

```js
// src/app/gallery/default.tsx
export default function Default() {
  return null;
}
```

```js
// src/app/gallery/layout.tsx
export default function GalleryLayout({
  children,
  modal,
}: {
  children: React.ReactNode,
  modal: React.ReactNode,
}) {
  return (
    <div>
      <h1 className="title">Gallery</h1>
      {children}
      {modal}
    </div>
  );
}
```

```js
// src/app/gallery/page.tsx
import PhotoCard from '@/components/photo-card';

export default function Page() {
  const photos = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {/* Aunque el modal se renderiza dentro de @modal, la navegación ocurre sobre la ruta real /gallery/photos/[id] */}
      {photos.map((id) => (
        <PhotoCard key={id} id={id.toString()} url={`/gallery/photos/${id}`} />
      ))}
    </div>
  );
}
```

Aunque el modal se renderiza dentro de `@modal`, la navegación ocurre sobre la **ruta real** `/gallery/photos/[id]`.

Crea el `default.tsx` de la ruta parallel route de `@modal` dentro de `src/app/gallery/@modal/default.tsx`:

```js
// src/app/gallery/@modal/default.tsx
export default function Default() {
  return null;
}
```

> **Recuerda:** El archivo `default.tsx` sirve para mantener la integridad del layout donde se encuentran los slots.

Crea el interceptor `page.tsx` del **detalle de la foto** dentro de `src/app/gallery/@modal/(.)photos/[id]page.tsx`:

```js
// src/app/gallery/@modal/(.)photos/[id]/page.tsx
import Modal from '@/components/modal';
import DetailPhoto from '@/components/detail-photo';

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>,
}) {
  const { id } = await params;
  return (
    <Modal>
      <DetailPhoto id={id} />
    </Modal>
  );
}
```

![](https://cdn-images-1.medium.com/max/800/1*zYPXINc4Ks1bWLJ3-V-now.png)

Al iniciar el servidor con `npm run dev`, podrás acceder a esta página visitando `http://localhost:3000`, da clic en “Gallery” y posteriormente da clic en el botón “Ver detalle x” de alguna tarjeta.

![](https://cdn-images-1.medium.com/max/800/1*o-CZepXkYoiO8tP7kfCDsQ.gif)

Intenta visitar directamente `http://localhost:3000/gallery/photos/3` o modifica la URL manualmente en el navegador (sin usar navegación por clic).

![](https://cdn-images-1.medium.com/max/800/1*SsSTuEN4MXgAYyPq6MhHUg.gif)

![](https://cdn-images-1.medium.com/max/800/0*W8rCXVaNHvwh4Flv.gif)

Realmente hay una explicación…

Cuando defines una ruta interceptada con un segmento como `(.)`, por ejemplo:

```bash
/app/gallery/(.)photos/[id]/page.tsx
```

… estás diciendo:

_“Quiero_ **_interceptar la ruta real_** `_/gallery/photos/[id]_` _desde_ `_/gallery_` _y renderizarla como modal_ **_en el layout de gallery_**_,_ **_no como una página independiente_**_.”_

Sin embargo, si el usuario accede directamente a la URL completa `/gallery/photos/3` el comportamiento es distinto:

El layout activo **ya no es** `/gallery` y cómo `(.)photos/[id]` **solo está disponible desde** `/gallery`, no existe una ruta real que se monte de forma independiente, por tanto, **Next.js no encuentra** `/gallery/photos/[id]` **como ruta normal**, porque nunca la definimos explícitamente, por lo que el resultado: Next.js devuelve un **404.**

Para solucionarlo debes crear la ruta real navegable además de la interceptada. Esto se hace con una **estructura duplicada** que permita dos contextos:

- Ruta interceptada (para navegación interna desde gallery)

```bash
/app/gallery/(.)photos/[id]/page.tsx   ← se monta sobre /gallery
```

- Ruta navegable real (para accesos directos o recargas)

```bash
/app/gallery/photos/[id]/page.tsx      ← página normal de fallback
```

![](https://cdn-images-1.medium.com/max/800/1*DAokkxVlUL4ZX6Wg4NrUeQ.png)

Crea la `page.tsx` del **detalle de la foto** en `src/app/gallery/photos/[id]`:

```js
//src app/gallery/photos/[id]/page.tsx
import DetailPhoto from '@/components/detail-photo';

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>,
}) {
  const { id } = await params;
  return <DetailPhoto id={id} />;
}
```

Intenta nuevamente visitar directamente `http://localhost:3000/gallery/photos/3` o modifica la URL manualmente en el navegador (sin usar navegación por clic).

![](https://cdn-images-1.medium.com/max/800/1*D8QT6D3tcUnF1-REdrfq1g.gif)

Para que la duplicación de rutas (interceptada y navegable) **valga realmente la pena**, es recomendable **diferenciar la experiencia entre ambas:**

####  — Modal (ruta interceptada)

Cuando se accede a la ruta interceptada (`/gallery/(.)photos/[id]`), el objetivo es mantener el contexto del usuario:

- Evita recargar el feed.
- Muestra solo el detalle esencial (ej. un tráiler, una imagen, un perfil).
- Usa el layout existente.
- Ideal para interacciones rápidas y no intrusivas.

####  — Página completa (ruta real)

Cuando se accede directamente a la ruta navegable (`/gallery/photos/[id]`), se puede ofrecer una experiencia **más enriquecedora y completa**:

- Se aprovecha todo el espacio de pantalla.

- Se pueden mostrar recomendaciones, secciones relacionadas, comentarios, etc.
- Es útil para compartir enlaces directos.
- Mejora el SEO y accesibilidad.

Actualiza la página del **detalle de la foto** `/app/gallery/photos/[id]/page.tsx`, agregando **sugerencias** reutilizando el componente `card` :

```js
//src app/gallery/photos/[id]/page.tsx
import PhotoCard from '@/components/photo-card';
import DetailPhoto from '@/components/detail-photo';

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>,
}) {
  const { id } = await params;
  const suggestions = Array.from({ length: 6 }, (_, i) => (i + 1) ** 2);

  return (
    <div>
      <DetailPhoto id={id} />
      <hr className="border-t border-(--color-border) my-8" />

      <h2 className="subTitle">Suggestions</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {suggestions.map((id) => (
          <PhotoCard
            key={id}
            id={id.toString()}
            url={`/gallery/photos/${id}`}
          />
        ))}
      </div>
    </div>
  );
}
```

Intenta visitar directamente `http://localhost:3000/gallery/photos/3` o modifica la URL manualmente en el navegador (sin usar navegación por clic).

![](https://cdn-images-1.medium.com/max/800/1*A-uBd0B7ZizEkrfy2LuTnw.gif)

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
git checkout base-project-3
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
