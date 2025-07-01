# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

##  `(...)segment` (**Interceptar** **desde la raíz)**

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-3)**] (branch: base-project-3).** Este proyecto incluye actualización visual y estructural de estilos utilizando TailwindCSS v4.

> **Nota:** Simularemos los componentes para darle más estructura visual a la interfaz y mostrar cómo se integra de una manera más realista dentro de la aplicación. Esto ayuda a visualizar mejor cómo conviven los componentes con las rutas interceptadas.

---

Al hacer clic en el ícono de “Login” desde el sidebar, se navegará a `/login`, pero el contenido de esa ruta será **interceptado globalmente**, sin importar desde qué parte de la app se invoque. Esto se logra con:

Esto se logra con:

- `(...)` — Para interceptar una ruta desde **la raíz** sin importar el nivel actual.

- `@modal` — Para aislar visualmente el modal de forma paralela.

![](https://cdn-images-1.medium.com/max/1600/1*aJoTo7n52hz-8Iv1clAWYg.gif)

Deberás generar un interceptador en:

![](https://cdn-images-1.medium.com/max/1600/1*3zJnk49nVagHhz3ruVfG9A.png)

Cualquier navegación hacia `/login` será interceptada y redireccionada al slot `@modal` para que lo muestre como modal.

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

Crea el componente `sidebar.tsx` en `src/components` . Deberá de ir `/reels`, `/projects`, `/login`:

```js
// src/components/sidebar.tsx
'use client';

import {
  PanelLeftOpen,
  PanelLeftClose,
  LogIn,
  TvMinimalPlay,
  Folder,
} from 'lucide-react';
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
        <div
          className="flex items-center gap-3 rounded-md bg-transparent px-3 py-2 text-(--color-foreground) hover:bg-(--color-overlay) transition-all duration-200 cursor-pointer"
          onClick={() => handleClick('/projects')}
        >
          <Folder className="w-6 h-6" />
          {!isCollapsed && <span className="text-sm">Projects</span>}
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
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
          className="flex items-center gap-3 rounded-md bg-transparent px-3 py-2 text-(--color-foreground) hover:bg-(--color-overlay) transition-all duration-200 cursor-pointer"
          onClick={() => handleClick('/login')}
        >
          <LogIn className="w-6 h-6" />
          {!isCollapsed && <span className="text-sm">Login</span>}
        </div>
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

Crea el componente `login.tsx` en `src/components` :

```js
//src/components/login.tsx
export default function Login() {
  return (
    <div className="w-full max-w-sm mx-auto p-6 space-y-6 border border-(--color-border) rounded-lg bg-(--color-background)">
      <div className="w-20 h-20 rounded-full bg-(--color-muted) mx-auto" />

      <div className="text-center space-y-2">
        <div className="w-3/4 h-4 bg-(--color-muted) rounded mx-auto" />
        <div className="w-1/2 h-3 bg-(--color-muted) rounded mx-auto" />
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <div className="w-28 h-3 bg-(--color-muted) rounded" />
          <div className="w-full h-10 bg-(--color-muted) rounded" />
        </div>

        <div className="space-y-1">
          <div className="w-24 h-3 bg-(--color-muted) rounded" />
          <div className="w-full h-10 bg-(--color-muted) rounded" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-(--color-muted) rounded" />
            <div className="w-24 h-3 bg-(--color-muted) rounded" />
          </div>
          <div className="w-20 h-3 bg-(--color-muted) rounded" />
        </div>

        <div className="w-full h-11 rounded-full bg-(--color-muted)" />
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
  modal,
}: Readonly<{
  children: React.ReactNode,
  modal: React.ReactNode,
}>) {
  return (
    <html lang="en" className={dmSans.className}>
      <body className="antialiased bg-(--color-background) text-(--color-foreground)">
        <Sidebar />

        <div className="pl-20 overflow-y-auto">
          <div className="w-full grid grid-cols-1 gap-6 p-6">
            <div className="w-full">{children}</div>
            {modal}
            <div id="modal-root" />
          </div>
        </div>
      </body>
    </html>
  );
}
```

> **Recuerda:**`#modal-root` es una convención para usar **React Portals**, lo que permite renderizar contenido modal fuera del flujo del DOM principal, por encima del resto. [[ref](https://medium.com/@mauriciogc/react-portales-8ff12de4b8e9)]

Crea el `default.tsx`en la raíz del proyecto `src/app/`:

```js
//src/app/default.tsx
export default function Default() {
  return null;
}
```

Aunque el modal se renderiza dentro de `@modal`, la navegación ocurre sobre la **ruta real** `/login`.

Crea el `default.tsx` de la ruta parallel route de `@modal` dentro de `src/app/login/@modal/default.tsx`:

```js
//src/app/@modal/default.tsx
export default function Default() {
  return null;
}
```

> **Recuerda:** Que los archivos `default.tsx` sirven para mantener la integridad del layout donde se encuentran los slots.

Crea el interceptor `page.tsx` del **login** dentro de `src/app/@modal/(...)login/page.tsx`:

```js
// src/app/@modal/(...)login/page.tsx
import Login from '@/components/login';
import Modal from '@/components/modal';

export default function LoginModal() {
  return (
    <Modal>
      <Login />
    </Modal>
  );
}
```

Crea la `page.tsx` del **login** en `src/app/login/`, que será la encargada de cargar la ruta navegable real (para accesos directos o recargas):

```js
// src/app/login/page.tsx
import Login from '@/components/login';

export default function LoginPage() {
  return <Login />;
}
```

No olvides crear su `default.tsx`:

```js
// src/app/login/default.tsx
export default function Default() {
  return null;
}
```

Al iniciar el servidor con `npm run dev`, podrás acceder a esta página visitando `http://localhost:3000`, da clic en “Login”.

![](https://cdn-images-1.medium.com/max/1600/1*-B74FiQGZi1v7_hhH5J9SA.gif)

Al definir el layout principal de nuestra aplicación en la raíz (`/app/layout.tsx`) y declarar ahí mismo un **slot paralelo** como `@modal`, ganamos múltiples beneficios estructurales y de escalabilidad:

- **Un solo layout para toda la app:** No importa si estás en `/reels`, `/projects`, `/dashboard/settings` o cualquier otra ruta, el modal de **login** aparece sobre todo sin desmontar el contenido actual.

- **Interceptación desde cualquier nivel:** Si estás en una ruta como `/projects/[projectId]/task/[taskId]`, aún puedes interceptar `/login` con `(...)login` y mostrarlo como modal sin perder el contexto actual.
- **Escalabilidad sin esfuerzo:** Puedes reutilizar esta lógica para otros modales como “Ver tarea”, “Editar perfil”, “Nueva notificación”, etc., sin duplicar layouts o estructuras.

Crea la `page.tsx`, `default.tsx` de **reels** en `src/app/reels`:

```js
//src/app/reels/default.tsx
export default function Default() {
  return null;
}
```

```js
//src/app/reels/page.tsx
export default function ReelsPage() {
  return (
    <div className="bg-(--color-background) text-(--color-foreground) space-y-5 p-6 max-w-6xl mx-auto">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          className="w-full max-w-[380px] h-[640px] bg-(--color-background) rounded-lg overflow-hidden relative flex flex-col border border-(--color-border)"
          key={i}
        >
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
              <div className="w-10 h-10 bg-(--color-muted) rounded-full" />
            </div>
            <div className="w-full h-3 bg-(--color-muted) rounded-full" />
            <div className="w-3/5 h-3 bg-(--color-muted) rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

Crea la `page.tsx`, `default.tsx` de **proyectos** en `src/app/projects`:

```js
// src/app/projects/default.tsx
export default function Default() {
  return null;
}
```

```js
// src/app/projects/page.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="bg-(--color-background) text-(--color-foreground) space-y-5 p-6 max-w-6xl mx-auto">
      <h1 className="title">Projects</h1>
      <div className="w-full grid grid-cols-1 gap-6 p-6">
        <div className="bg-(--color-background) text-(--color-foreground) rounded-xl p-6 border border-(--color-border) flex flex-wrap justify-between items-center gap-3 transition-colors duration-300 ease-in-out">
          <div className="flex items-center gap-2 w-1/2">
            <div className="w-full h-8 rounded-full bg-(--color-border) border border-(--color-muted)" />
          </div>

          <Link
            href="/projects/abc123"
            className="pill-button pill-button-default pill-button-active p-2"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
```

Crea la `page.tsx` del **detalle del proyecto** en `src/app/projects/[projectId]`:

```js
// src/app/projects/[projectId]/page.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>,
}) {
  const { projectId } = await params;
  return (
    <div className="bg-(--color-background) text-(--color-foreground) space-y-5 p-6 max-w-6xl mx-auto">
      <p>
        These are the tasks of the project:{' '}
        <span className="text-(--color-highlight)">{projectId}</span>
      </p>
      <h2 className="subTitle">All task</h2>
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center bg-(--color-background) border border-(--color-border) rounded-lg p-4 transition-colors duration-300 ease-in-out">
          <div className="flex items-center gap-2 w-1/2">
            <div className="w-full h-4 rounded-full bg-(--color-border) border border-(--color-muted)" />
          </div>
          <Link
            href={`/projects/${projectId}/tasks/taskhyutt67`}
            scroll={false}
            className="pill-button pill-button-default pill-button-active p-2"
          >
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
```

Crea la `page.tsx` del **detalle de la tarea** en `src/app/projects/[projectId]/task/[taskId]`. Agrega un `Link` hacia `login/`:

```js
// src/app/projects/[projectId]/task/[taskId]/page.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function TaksPage({
  params,
}: {
  params: Promise<{ projectId: string, taskId: string }>,
}) {
  const { projectId, taskId } = await params;
  return (
    <div className="bg-(--color-background) text-(--color-foreground) space-y-5 p-6 max-w-6xl mx-auto">
      <p>
        This is the task detail
        <span className="text-(--color-highlight)"> {taskId} </span> of the project{' '}
        <span className="text-(--color-highlight)"> {projectId} </span>.
      </p>
      <Link
        href="/login"
        className="flex pill-button pill-button-default pill-button-primary"
      >
        Go to Login <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
```

Al iniciar el servidor con `npm run dev`, podrás acceder a la aplicación visitando `http://localhost:3000`.

Desde ahí, puedes:

- Ir a la sección **Reels** mediante el menú lateral.

- Hacer clic en el botón de **Login** del sidebar para abrir el modal interceptado desde `/login`.
- Navegar a `/projects/[projectId]/task/[taskId]` desde el sidebar.
- Dentro de esa vista, también encontrarás un botón que activa el mismo modal de login desde un nivel mucho más profundo.

En ambos casos (ya sea desde el sidebar o desde dentro de una ruta anidada) el modal de login se muestra correctamente, sin desmontar el contexto actual y sin duplicar layouts, gracias al uso de intercepting routes `(…)login` combinado con un slot paralelo `@modal` definido en el layout raíz.

![](https://cdn-images-1.medium.com/max/1600/1*aJoTo7n52hz-8Iv1clAWYg.gif)

Puedes visitar directamente `http://localhost:3000/login` o modifica la URL manualmente en el navegador (sin usar navegación por clic).

![](https://cdn-images-1.medium.com/max/1600/1*_VG2E37YjkC7mEHV5PZGFQ.gif)

Con esta estructura, ya tenemos cubiertos ambos escenarios esenciales:

- **Ruta interceptada** (`src/@modal/(...)login/page.tsx`): Esta ruta permite mostrar el **login** como **modal**, manteniendo el contexto del proyecto actual.

- **Ruta real** (`src/app/login/page.tsx`) : Esta ruta sirve como página independiente, ideal para accesos directos, compartir enlaces, SEO y fallback si se recarga la página.

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
