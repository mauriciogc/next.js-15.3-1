# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## `(..)(..)segment` (Interceptar dos niveles arriba)

> **Nota:** Simularemos los componentes para darle más estructura visual a la interfaz y mostrar cómo se integra de una manera más realista dentro de la aplicación. Esto ayuda a visualizar mejor cómo conviven los componentes con las rutas interceptadas.

Al hacer clic en el “Projects” se navegará a `/projects`, posteriormente se podrá dar clic en un proyecto, donde navegará a `/project/[projectId]` donde mostrará la lista de tareas que tiene ese proyecto, al dar clic en una tarea navegará a `/task/[taskId]` , pero el contenido de esa ruta será interceptado y renderizado **como un modal** sin desmontar el feed principal. Esto se logra con:

- `(..)(..)` — Para interceptar una ruta con dos niveles arriba.

- `@modal` — Para aislar visualmente el modal de forma paralela.

![](https://cdn-images-1.medium.com/max/1600/1*n5mAuwFNH3i77XiP_YXSAg.gif)

Deberás generar un interceptador en:

![](https://cdn-images-1.medium.com/max/1600/1*pGCaBNSjLWPpdXnurPJ2Dg.png)

Dentro de `/projects/[projectID]`, cualquier navegación hacia `/task/[taskId]` será interceptada y redireccionada al slot `@modal` para que lo muestre como modal.

En consola instala el paquete de `lucide-react` para agregar iconos:

```bash
npm install lucide-react
```

Actualiza el layout principal `/app/layout.tsx`, agregando el `div#modal-root` para la carga del modal:

Crea el componente `sidebar.tsx` en `src/components` :

```ts
// src/components/sidebar.tsx
'use client';

import { PanelLeftOpen, PanelLeftClose, FolderOpen } from 'lucide-react';
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
          onClick={() => handleClick('/projects')}
        >
          <FolderOpen className="w-6 h-6" />
          {!isCollapsed && <span className="text-sm">Projects</span>}
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

```ts
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

Crea el componente `project-card.tsx` en `src/components` :

```ts
//src/components/project-card.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProjectCard({ url }: { id: string; url: string }) {
  return (
    <div className="bg-(--color-background) text-(--color-foreground) rounded-xl p-6 border border-(--color-border) flex flex-wrap justify-between items-center gap-3 transition-colors duration-300 ease-in-out">
      <div className="flex flex-col gap-3">
        <div className="h-6 w-30  bg-(--color-border) rounded-md" />
        <div className="h-4 w-3/4 bg-(--color-border) rounded" />
        <div className="h-3 w-1/2 bg-(--color-border) rounded-full" />
      </div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-(--color-border) border border-(--color-muted)" />
        <div className="-ml-5 w-8 h-8 rounded-full bg-(--color-border) border border-(--color-muted)" />
        <div className="-ml-5 w-8 h-8 rounded-full bg-(--color-border) border border-(--color-muted)" />
        <div className="-ml-5 w-8 h-8 rounded-full bg-(--color-border) border border-(--color-muted) text-xs text-center text-(--color-foreground) flex items-center justify-center">
          +2
        </div>
      </div>

      <div className="hidden sm:flex flex-col items-center gap-2">
        <div className="w-20 h-12 bg-(--color-border) rounded" />
        <div className="h-3 w-16 bg-(--color-border) rounded" />
      </div>

      <div className="hidden md:flex flex-col items-start gap-2">
        <div className="h-3 w-16 bg-(--color-border) rounded" />
        <div className="h-4 w-20 bg-(--color-border) rounded" />
        <div className="flex items-center gap-1">
          <div className="w-6 h-1 rounded-full bg-(--color-border)" />
          <div className="w-6 h-1 rounded-full bg-(--color-border)" />
          <div className="w-6 h-1 rounded-full bg-(--color-border)" />
        </div>
      </div>
      <Link
        href={url}
        className="pill-button pill-button-default pill-button-active p-2"
      >
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
```

Crea el componente `bookmark-card.tsx` en `src/components` :

```ts
//src/components/bookmark-card.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BookmarkCard({ url }: { url: string }) {
  return (
    <div className="bg-(--color-background) border border-(--color-border) rounded-xl p-4 flex flex-col gap-4 transition-colors duration-300 ease-in-out">
      <div className="h-4 w-3/4 bg-(--color-border) rounded" />
      <div className="h-3 w-1/2 bg-(--color-border) rounded" />

      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-(--color-border)" />
        <div className="h-3 w-24 bg-(--color-border) rounded" />
      </div>

      <div className="w-full h-2 bg-(--color-border) rounded-full" />

      <div className="relative flex gap-2 mt-2 justify-end">
        <div className="w-7 h-7 rounded-full bg-(--color-border) border border-(--color-muted)" />
        <div className="-ml-5 w-7 h-7 rounded-full bg-(--color-border) border border-(--color-muted)" />
        <div className="-ml-5 w-7 h-7 rounded-full bg-(--color-border) text-xs text-center text-(--color-foreground) flex items-center justify-center">
          +2
        </div>
        <Link
          href={url}
          scroll={false}
          className="pill-button pill-button-default pill-button-active p-2"
        >
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
```

Crea el componente `task-card.tsx` en `src/components` :

```ts
//src/components/task-card.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TaskCard({ url }: { url: string }) {
  return (
    <div className="flex justify-between items-center bg-(--color-background) border border-(--color-border) rounded-lg p-4 transition-colors duration-300 ease-in-out">
      {/* Info de proyecto */}
      <div className="space-y-1">
        <div className="h-4 w-32 bg-(--color-border) rounded" />
        <div className="h-3 w-24 bg-(--color-muted) rounded" />
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-(--color-muted)" />
        <div className="h-3 w-20 bg-(--color-border) rounded" />
      </div>

      {/* Avatares */}
      <div className="flex gap-2">
        <div className="-ml-5 w-7 h-7 rounded-full bg-(--color-border) border border-(--color-muted)" />
        <div className="-ml-5 w-7 h-7 rounded-full bg-(--color-border) border border-(--color-muted)" />
        <div className="-ml-5 w-7 h-7 rounded-full bg-(--color-border) border border-(--color-muted)" />
        <div className="-ml-5 w-7 h-7 rounded-full bg-(--color-muted) text-xs text-center text-(--color-foreground) flex items-center justify-center">
          +2
        </div>
      </div>
      <Link
        href={url}
        scroll={false}
        className="pill-button pill-button-default pill-button-active p-2"
      >
        <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
```

Crea el componente `detail-task.tsx` en `src/components` :

```ts
// src/components/detail-task.tsx
export default function DetailTask({ id }: { id: string }) {
  return (
    <div className="max-w-3xl p-6 bg-(--color-background) text-(--color-foreground) border border-(--color-border) rounded-xl space-y-6">
      <div className="bg-(--color-border) text-(--color-primary) rounded">
        {id}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-(--color-muted)" />
          <div className="h-3 w-24 bg-(--color-border) rounded" />
        </div>

        <div className="h-3 w-32 bg-(--color-muted) rounded" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-(--color-muted)" />
          <div className="w-24 h-3 bg-(--color-border) rounded" />
          <div className="w-8 h-8 rounded-full bg-(--color-muted)" />
          <div className="w-24 h-3 bg-(--color-border) rounded" />
        </div>

        <div className="flex gap-2">
          <div className="px-4 py-1 rounded-full bg-(--color-muted) w-20 h-6" />
          <div className="px-4 py-1 rounded-full bg-(--color-muted) w-20 h-6" />
        </div>
      </div>

      <div className="p-4 border border-(--color-border) rounded-md bg-(--color-muted)/20 space-y-2">
        <div className="h-3 w-full bg-(--color-border) rounded" />
        <div className="h-3 w-2/3 bg-(--color-border) rounded" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-32 bg-(--color-muted) rounded" />
        <div className="flex gap-4">
          <div className="w-36 h-16 bg-(--color-muted) rounded" />
          <div className="w-36 h-16 bg-(--color-muted) rounded" />
          <div className="w-12 h-16 bg-(--color-muted) rounded flex items-center justify-center"></div>
        </div>
      </div>

      <div className="flex gap-6 border-b border-(--color-border) pb-2">
        <div className="h-4 w-16 bg-(--color-border) rounded" />
        <div className="h-4 w-20 bg-(--color-border) rounded" />
        <div className="h-4 w-24 bg-(--color-border) rounded" />
      </div>

      <div className="space-y-4">
        <div className="h-3 w-1/2 bg-(--color-border) rounded" />

        <div className="flex items-start gap-2 p-3 bg-(--color-muted)/20 rounded-lg">
          <div className="w-5 h-5 rounded-full bg-(--color-muted)" />
          <div className="space-y-2">
            <div className="h-3 w-60 bg-(--color-border) rounded line-through" />
            <div className="h-3 w-80 bg-(--color-muted) rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
```

Actualiza el layout principal `/app/layout.tsx`, agregando el `sidebar` y `div#modal-root` para la carga del modal:

```ts
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
  children: React.ReactNode;
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

        <div id="modal-root" />
      </body>
    </html>
  );
}
```

> **Recuerda:**`#modal-root` es una convención para usar **React Portals**, lo que permite renderizar contenido modal fuera del flujo del DOM principal, por encima del resto. [[ref](https://medium.com/@mauriciogc/react-portales-8ff12de4b8e9)]

Crea la `page.tsx`, `default.tsx` de los **proyectos** en `src/app/projects/`:

```ts
//src/app/projects/default.tsx
export default function Default() {
  return null;
}
```

```ts
// src/app/projects/page.tsx
import ProjectCard from '@/components/project-card';

export default function ProjectsPage() {
  const projects = Array.from({ length: 6 }, (_, i) => crypto.randomUUID());

  return (
    <>
      <h1 className="title">Projects</h1>
      <div className="w-full grid grid-cols-1 gap-6 p-6">
        {projects.map((id) => (
          <ProjectCard url={`/projects/${id}`} key={id} id={id.toString()} />
        ))}
      </div>
    </>
  );
}
```

Crea la `page.tsx`, `default.tsx` y `layout.tsx` del **detalle de los projectos** en `src/app/projects/[projectId]`:

```ts
//src/app/projects/[projectId]/default.tsx
export default function Default() {
  return null;
}
```

```ts
//src/app/projects/[projectId]/layout.tsx
export default function ProjectLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="title">Project View</h1>
      {children}
      {modal}
    </div>
  );
}
```

```ts
//src/app/projects/[projectId]/page.tsx
import BookmarkCard from '@/components/bookmark-card';
import TaskCard from '@/components/task-card';

export default async function ProjectDashboardSkeleton({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const favourites = Array.from({ length: 3 }, (_, i) => crypto.randomUUID());
  const tasks = Array.from({ length: 8 }, (_, i) => crypto.randomUUID());

  return (
    <div className="bg-(--color-background) text-(--color-foreground) space-y-5 p-6 max-w-6xl mx-auto">
      <p>
        These are the tasks of the project:{' '}
        <span className="text-(--color-highlight)">{projectId}</span>
      </p>
      <h2 className="subTitle">Favourites</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {favourites.map((id) => (
          <BookmarkCard url={`/tasks/${id}`} key={id} />
        ))}
      </div>

      {/* Todos los proyectos */}
      <h2 className="subTitle">All task</h2>

      <div className="flex flex-col space-y-3">
        {tasks.map((id) => (
          <TaskCard key={id} url={`/tasks/${id}`} />
        ))}
      </div>
    </div>
  );
}
```

Aunque el modal se renderiza dentro de `@modal`, la navegación ocurre sobre la **ruta real** `/tasks/[taskId]`.

Crea el `default.tsx` de la ruta parallel route de `@modal` dentro de `src/app/projects/[projectId]/@modal/default.tsx`:

```ts
//src/app/projects/[projectId]/@modal/default.tsx
export default function Default() {
  return null;
}
```

> **Recuerda:** Que los archivos `default.tsx` sirven para mantener la integridad del layout donde se encuentran los slots.

Crea el interceptor `page.tsx` del **detalle de la foto** dentro de `src/app/projects/[projectId]/@modal/(..)(..)tasks/[taskId]/page.tsx`:

```ts
// src/app/projects/[projectId]/@modal/(..)(..)tasks/[taskId]/page.tsx
import DetailTask from '@/components/detail-task';
import Modal from '@/components/modal';

export default async function TaskModal({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  return (
    <Modal>
      <DetailTask id={taskId} />
    </Modal>
  );
}
```

Crea la `page.tsx` del **detalle de la tarea** en `src/app/tasks/[taskId]/`, que será la encargada de cargar la ruta navegable real (para accesos directos o recargas):

```ts
// src/app/tasks/[taskId]/page.tsx
import DetailTask from '@/components/detail-task';

export default async function TaskPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  return (
    <div className="mb-16">
      <h2 className="subTitle">Detail Task</h2>
      <DetailTask id={taskId} />
    </div>
  );
}
```

Al iniciar el servidor con `npm run dev`, podrás acceder a esta página visitando `http://localhost:3000`, da clic en “Projects” y posteriormente da clic en el botón “→” de cualquier proyecto para visualizar la lista de tareas, finalmente da clic en el botón “→” de cualquier tarea para visualizar su detalle.

![](https://cdn-images-1.medium.com/max/1600/1*0FcBr-DQG-dAVolCnVjHuw.gif)

Puedes visitar directamente `http://localhost:3000/task/abc123` o modifica la URL manualmente en el navegador (sin usar navegación por clic).

![](https://cdn-images-1.medium.com/max/1600/1*u1nJv5nB6AVhwEWQPT7PDA.gif)

Con esta estructura, ya tenemos cubiertos ambos escenarios esenciales:

#### — Ruta interceptada (`src/app/projects/[projectId]/@modal/(..)(..)tasks/[taskId]/page.tsx`)

- Esta ruta permite mostrar el detalle de la tarea como **modal**, manteniendo el contexto del proyecto actual.

####  — Ruta real (`src/app/tasks/[taskId]/page.tsx`)

- Esta ruta sirve como página independiente, ideal para accesos directos, compartir enlaces, SEO y fallback si se recarga la página.

## Ambas deben coexistir para garantizar una experiencia de usuario fluida tanto en navegación interna como en accesos directos o desde otras fuentes externas.

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
git checkout example-intercepting-routes--two-levels-above
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
