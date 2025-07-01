# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

---

##  `(.)segment` (Interceptar en el mismo nivel)

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-3)**] (branch: base-project-3).** Este proyecto incluye actualización visual y estructural de estilos utilizando TailwindCSS v4.

> **Nota:** Simularemos los componentes para darle más estructura visual a la interfaz y mostrar cómo se integra de una manera más realista dentro de la aplicación. Esto ayuda a visualizar mejor cómo conviven los componentes con las rutas interceptadas.

---

Al hacer clic en el “Reels” se navegará a `/reels`, posteriormente se podrá dar clic en un reel, donde navegará a `/p/[reelId]`, pero el contenido de esa ruta será interceptado y renderizado **como un modal** sin desmontar el feed principal. Esto se logra con:

- `(..)` — Para interceptar una ruta con un nivel arriba.

- `@modal` — Para aislar visualmente el modal de forma paralela.

![](https://cdn-images-1.medium.com/max/1600/1*7iS1p_qFaP21ZmL7epdOZA.gif)

Deberás generar un interceptador en:

![](https://cdn-images-1.medium.com/max/1600/1*ZR8lzylsbNr3Ubd2Af0YdA.png)

Dentro de `/reels`, cualquier navegación hacia `/p/[reelId]` será interceptada y redireccionada al slot `@modal` para que lo muestre como modal.

**No olvides que…** Intercepting Routes requiere dos contextos.

Para que el patrón de rutas interceptadas funcione correctamente, **debes definir siempre dos rutas complementarias**:

- **Ruta interceptada:** Se utiliza para navegación interna (por ejemplo, desde un feed o vista padre).

- **Ruta real:** Se utiliza para accesos directos, recargas de página, compartir enlaces o SEO.

> Si omites la ruta real, acceder directamente a la URL completa provocará un **404**, ya que Next.js no podrá renderizar la página fuera del layout interceptado.

Ambas rutas deben existir para garantizar una experiencia coherente en todas las formas de navegación.

En consola instala el paquete de `lucide-react` para agregar iconos:

```bash
npm install lucide-react
```

Crea el componente `sidebar.tsx` en `src/components` :

```js
// src/components/sidebar.tsx
'use client';

import { PanelLeftOpen, PanelLeftClose, TvMinimalPlay } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SidebarSkeletonLayout() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const router = useRouter();

  const handleClick = async (href: string) => {
    setIsCollapsed(true);
    router.push(href);
  };

  return (
    <aside
      className={`fixed z-40 top-0 left-0 h-screen bg-(--color-background) border-r border-(--color-border) text-(--color-foreground) transition-all duration-300 flex flex-col justify-between ${
        isCollapsed ? 'w-[78px]' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="relative p-4 flex justify-between items-center">
        <div
          className="w-10 h-10 bg-gray-400 rounded-full cursor-pointer"
          onClick={() => handleClick('/')}
        />
        {!isCollapsed && (
          <div className="w-24 h-4 bg-(--color-muted) rounded-full ml-2" />
        )}
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className={`${
            isCollapsed && 'absolute -right-6'
          } pill-button p-2 bg-none `}
        >
          {!isCollapsed ? (
            <PanelLeftClose className="w-6 h-6" />
          ) : (
            <PanelLeftOpen className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-3">
        <div
          className="flex items-center gap-3 rounded-md bg-transparent px-3 py-2 text-(--color-foreground) hover:bg-(--color-overlay) transition-all duration-200 cursor-pointer"
          onClick={() => handleClick('/reels')}
        >
          <TvMinimalPlay className="w-6 h-6" />
          {!isCollapsed && <span className="text-sm">Reels</span>}
        </div>

        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 rounded-md bg-transparent px-3 py-2 hover:bg-(--color-overlay) transition-all duration-200`}
          >
            <div className="w-6 h-6 bg-(--color-muted) rounded" />
            {!isCollapsed && (
              <div className="h-3 w-24 bg-(--color-muted) rounded-full" />
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 px-2 py-4 space-y-3 border-t border-(--color-border)">
        <div
          className={`bg-(--color-muted) rounded-md transition-all ${
            isCollapsed ? 'w-10 h-10 mx-auto' : 'h-10 w-full'
          }`}
        />
        <div
          className={`rounded-md bg-(--color-muted) flex items-center justify-between px-3 py-2 ${
            isCollapsed ? 'w-10 h-10 mx-auto' : 'w-full'
          }`}
        >
          {!isCollapsed && (
            <>
              <div className="w-16 h-3 bg-(--color-border) rounded-full" />
              <div className="w-10 h-5 bg-white rounded-full" />
            </>
          )}
        </div>
      </div>
    </aside>
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

Crea el componente `stories.tsx` en `src/components` :

```js
// src/components/stories.tsx

export default function Stories() {
  return (
    <div className="flex items-center gap-4 overflow-x-auto px-4 py-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-3 w-16 shrink-0"
        >
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 via-yellow-500 to-purple-500 p-[2px]">
            <div className="w-full h-full bg-(--color-background) rounded-full flex items-center justify-center">
              <div className="w-14 h-14 bg-(--color-muted) rounded-full" />
            </div>
          </div>

          <div className="w-full h-2 bg-(--color-muted) rounded-full" />
        </div>
      ))}
    </div>
  );
}
```

Crea el componente `suggestions-sidebar.tsx` en `src/components` :

```js
// src/componments/suggestions-sidebar.tsx
export default function SuggestionsSidebar() {
  return (
    <aside className="w-full max-w-xs space-y-6 text-(--color-foreground)">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-(--color-muted)" />
          <div className="flex flex-col gap-1">
            <div className="w-24 h-3 bg-(--color-muted) rounded-full" />
            <div className="w-20 h-2 bg-(--color-muted) rounded-full" />
          </div>
        </div>
        <div className="w-10 h-3 bg-(--color-muted) rounded-full" />
      </div>

      <div className="flex justify-between items-center">
        <div className="w-24 h-3 bg-(--color-muted) rounded-full" />
        <div className="w-10 h-2 bg-(--color-muted) rounded-full" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-(--color-muted)" />
              <div className="flex flex-col gap-1">
                <div className="w-24 h-2 bg-(--color-muted) rounded-full" />
                <div className="w-32 h-2 bg-(--color-muted) rounded-full" />
              </div>
            </div>
            <div className="w-10 h-3 bg-(--color-muted) rounded-full" />
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-4 border-t border-(--color-border) text-xs text-(--color-muted)">
        <div className="w-full h-2 bg-(--color-muted) rounded-full" />
        <div className="w-4/5 h-2 bg-(--color-muted) rounded-full" />
        <div className="w-3/5 h-2 bg-(--color-muted) rounded-full" />
      </div>
    </aside>
  );
}
```

Crea el componente `reel-card.tsx` en `src/components` :

```js
//src/components/reel-card.tsx
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ReelCard({ url }: { url: string }) {
  return (
    <div className="w-full max-w-[380px] h-[640px] bg-(--color-background) rounded-lg overflow-hidden relative flex flex-col border border-(--color-border)">
      <div className="flex items-center gap-3 p-4 border-b border-(--color-border)">
        <div className="w-10 h-10 bg-(--color-muted) rounded-full" />
        <div className="flex flex-col gap-1">
          <div className="w-24 h-3 bg-(--color-muted) rounded-full" />
          <div className="w-16 h-2 bg-(--color-muted) rounded-full" />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 text-center">
        <div className="space-y-2">
          <div className="w-3/4 h-4 bg-(--color-muted) rounded" />
          <div className="w-2/4 h-4 bg-(--color-muted) rounded" />
        </div>
      </div>

      <div className="px-4 py-3 space-y-2 border-t border-(--color-border)">
        <div className="flex space-x-2">
          <div className="w-10 h-10 bg-(--color-muted) rounded-full" />
          <Link
            href={url}
            scroll={false}
            className=" bg-none pill-button pill-button-default p-2 "
          >
            <MessageCircle className="w-6 h-6 text-(--color-foreground)" />
          </Link>
          <div className="w-10 h-10 bg-(--color-muted) rounded-full" />
        </div>
        <div className="w-full h-3 bg-(--color-muted) rounded-full" />
        <div className="w-3/5 h-3 bg-(--color-muted) rounded-full" />
      </div>
    </div>
  );
}
```

Crea el componente `reel-detail.tsx` en `src/components` :

```js
// src/components/reel-detail.tsx
export default function ReelDetail({ id }: { id: string }) {
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-3xl h-auto lg:h-[80vh] bg-(--color-background) border border-(--color-border) rounded-lg overflow-hidden">
      {/* Video (arriba en mobile, izquierda en desktop) */}
      <div className="w-full lg:flex-1 bg-black flex items-center justify-center">
        <div className="w-[280px] h-[500px] bg-(--color-muted)" />
      </div>

      <div className="w-full lg:w-[350px] flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-(--color-border)">
        <div className="p-4 space-y-3 border-b border-(--color-border)">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-(--color-muted)" />
            <div className="w-32 h-3 bg-(--color-muted) rounded-full" />
          </div>
          <div className="w-4/5 h-2 bg-(--color-muted) rounded-full" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px] lg:max-h-none">
          <p className="text-xs text-muted-foreground">{id}</p>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="w-24 h-2 bg-(--color-muted) rounded-full" />
              <div className="w-full h-2 bg-(--color-muted) rounded-full" />
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-(--color-border)">
          <div className="w-full h-10 bg-(--color-muted) rounded-full" />
        </div>
      </div>
    </div>
  );
}
```

Actualiza el layout principal `/app/layout.tsx`, agregando el `sidebar` y `div#modal-root` para la carga del modal:

```js
//src/app/layout.tsx

import Sidebar from '@/components/sidebar';
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
      <body className="antialiased bg-(--color-background) text-(--color-foreground)">
        <Sidebar />

        <div className="pl-20 overflow-y-auto">
          <div className="flex items-center justify-between w-full h-full max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8 pt-20">
            <div className="w-full">{children}</div>
            <div id="modal-root" />
          </div>
        </div>
      </body>
    </html>
  );
}
```

> **Recuerda:** `#modal-root` es una convención para usar **React Portals**, lo que permite renderizar contenido modal fuera del flujo del DOM principal, por encima del resto. [[ref](https://medium.com/@mauriciogc/react-portales-8ff12de4b8e9)]

Crea la `default.tsx`, `layout.tsx`, `page.tsx` de los **reels** en `src/app/reels/`:

```js
//src/app/reels/default.tsx
export default function Default() {
  return null;
}
```

```js
//src/app/reels/layout.tsx
export default function ProjectLayout({
  children,
  modal,
}: {
  children: React.ReactNode,
  modal: React.ReactNode,
}) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}
```

```js
// src/app/reels/page.tsx
import ReelCard from '@/components/reel-card';
import Stories from '@/components/stories';
import SuggestionsSidebar from '@/components/suggestions-sidebar';

const mockReels = [
  '00a41623-457e-4f9a-9031-679096ae3655',
  'd872c3fa-81d4-46fb-a100-ff4754530e12',
  '9297d606-1695-4d2f-96b9-92010d15a746',
  'd34c57b4-4486-47a9-93b4-f7e1e09c7707',
  '3cc52721-8d65-48a3-9734-48080d189807',
  'bf491444-db28-4cb6-8eda-720f133f9342',
];

export default function ReelsFeed() {
  return (
    <div className="flex justify-center gap-8 px-4 py-6">
      <div className="flex flex-col items-center space-y-6  w-full">
        <Stories />
        {mockReels.map((id) => (
          <ReelCard url={`/p/${id}`} key={id} />
        ))}
      </div>

      <div className="hidden lg:block w-[300px] shrink-0">
        <SuggestionsSidebar />
      </div>
    </div>
  );
}
```

Aunque el modal se renderiza dentro de `@modal`, la navegación ocurre sobre la **ruta real** `/p/[reelId]`.

Crea el `default.tsx` de la ruta parallel route de `@modal` dentro de `src/app/reels/@modal/default.tsx`:

```js
//src/app/reels/@modal/default.tsx
export default function Default() {
  return null;
}
```

> **Recuerda:** Que los archivos `_default.tsx_` sirven para mantener la integridad del layout donde se encuentran los slots.

Crea el interceptor `page.tsx` del **detalle de la foto** dentro de `src/app/reels/@modal/(..)p/[reelId]/page.tsx`:

```js
// src/app/reels/@modal/(..)p/[reelId]/page.tsx
import Modal from '@/components/modal';
import ReelDetail from '@/components/reel-detail';

export default async function ReelModal({
  params,
}: {
  params: Promise<{ reelId: string }>,
}) {
  const { reelId } = await params;
  return (
    <Modal>
      <ReelDetail id={reelId} />
    </Modal>
  );
}
```

Crea la `page.tsx` del **reel** en `src/app/p/[reelId]/`, que será la encargada de cargar la ruta navegable real (para accesos directos o recargas):

```js
// src/app/p/[reelID]/page.tsx
import ReelDetail from '@/components/reel-detail';

export default async function ReelPage({
  params,
}: {
  params: Promise<{ reelId: string }>,
}) {
  const { reelId } = await params;
  return (
    <div className="flex flex-col items-center justify-center ">
      <ReelDetail id={reelId} />
      <div className="w-full max-w-5xl mt-12 pt-12 border-t-1 border-(--color-border)">
        <div className="w-1/2 h-6 bg-(--color-muted) rounded-full"></div>
      </div>
      <div className="w-full max-w-5xl mx-auto grid grid-cols-3 gap-1 py-6 ">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="w-full aspect-[3/4] rounded-lg bg-(--color-muted) border border-(--color-border) flex items-center justify-center"
          />
        ))}
      </div>
    </div>
  );
}
```

Al iniciar el servidor con `npm run dev`, podrás acceder a esta página visitando `http://localhost:3000`, da clic en “Reels” y posteriormente da clic en cualquier reel para visualizar su detalle.

![](https://cdn-images-1.medium.com/max/1600/1*RrdSkY-dHts_gwJLnRSUUA.gif)

Puedes visitar directamente `http://localhost:3000/p/abc123` o modifica la URL manualmente en el navegador (sin usar navegación por clic).

![](https://cdn-images-1.medium.com/max/1600/1*ZL3hd9a9LXMvMDur_MBk6A.gif)

Con esta estructura, ya tenemos cubiertos ambos escenarios esenciales:

- **Ruta interceptada** (`src/app/reels/@modal/(..)p/[reelId]/page.tsx`): Esta ruta permite mostrar el detalle de la tarea como **modal**, manteniendo el contexto del proyecto actual.

- **Ruta real** (`src/app/p/[reelId]/page.tsx`) : Esta ruta sirve como página independiente, ideal para accesos directos, compartir enlaces, SEO y fallback si se recarga la página.

Ambas deben coexistir para garantizar una experiencia de usuario fluida tanto en navegación interna como en accesos directos o desde otras fuentes externas.

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
git checkout example-intercepting-routes--one-level-above
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
