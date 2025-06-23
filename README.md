# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Parallel Routes

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-3)**] (branch: base-project-3).** Este proyecto incluye actualización visual y estructural de estilos utilizando TailwindCSS v4.

### ¿Qué son?

**Parallel Routes** en Next.js son una **funcionalidad del App Router** (versión 13+) que permite **renderizar múltiples rutas hijas dentro de un mismo layout de forma simultánea** a través de _“named slots”_, sin tener que realizar condicionales ni renderizar dinámicamente secciones con lógica cliente.

En lugar de depender de rutas anidadas o condicionales dentro de un único `<Outlet>` (ej. React router), Next.js permite especificar múltiples áreas (slots) dentro de un layout y poblar cada una desde rutas independientes.

### Principales características

- No siguen el modelo clásico de rutas anidadas.

- Son útiles para interfaces avanzadas tipo dashboard, split views, modales, o navegación en segundo plano.
- Composición declarativa mediante **slots con nombre** (`@modal`, `@feed`, `@chat`).
- Los folders cómo `@inbox`, `@preview` definen rutas paralelas **independientes**.
- Soporte nativo de `loading.tsx`, `error.tsx`, `not-found.tsx` por cada slot.
- Mejora la experiencia del usuario sin re-renderizar toda la página.
- Compatible con `Suspense` y `Streaming`.

### Ventajas

- **Persistencia real sin hacks**: No necesitas usar `useState` o `router.push()` para controlar qué panel está abierto o cerrado. Todo se maneja con rutas reales.

- **Separación de responsabilidades por vista:** Cada slot puede tener su propia lógica de datos, manejo de errores, fallback y estructura, sin acoplarse a otras secciones.
- **Streaming por slot:** Con React Server Components y Suspense, los slots se pueden cargar con streaming individual.
- **UX mejorada**: No se pierde contexto al abrir modales o subpaneles.

### ¿Cómo se crea o implementa?

Se implementan mediante **segmentos con prefijo** `@`, como `@inbox`, `@preview`, `@activity`, que funcionan como **slots independientes** dentro de un layout. Cada slot puede cargar su propia ruta, tener su propio `loading.tsx`, `error.tsx`, `default.tsx`, y renderizarse de forma asincrónica o persistente.

- Crea una carpeta que actúe como contenedor (ej. `src/app/inbox/`).

- Dentro de esa carpeta, define un layout y los _slots paralelos_ con `@nombreDelSlot`. (ej. `@panel`).
- En `layout.tsx` define los parámetros con el nombre del slot:

```js
// src/app/inbox/layout.tsx
export default function Layout({
  children,
  modal,
}: {
  children: ReactNode,
  panel: ReactNode,
}) {
  return (
    <div>
      <section>{children}</section>
      <aside>{panel}</aside>
    </div>
  );
}
```

Cada uno de los `@folders` se convierte en un **slot que puedes nombrar y montar explícitamente** en el layout.

### ¿Cómo funciona?

Las Parallel Routes funcionan como una extensión del layout tradicional de Next.js, donde **en lugar de un solo** `children`, puedes definir múltiples **slots** que se completan con los segmentos paralelos (`@folder`).

- El sistema de rutas App Router identifica `@` como un **named slot**.

- Dentro de `layout.tsx`, Next.js inyecta cada ruta correspondiente al slot como una **propiedad del layout**.
- La navegación puede dirigirse a múltiples rutas simultáneamente.
- Cada slot se renderiza de manera **aislada pero simultánea** dentro del layout.

### Ejemplos

#### Ejemplo 1: Ruta estática con un slot

Usaremos `@team` como un **slot paralelo dentro de la ruta** `/about`, lo que nos permitirá agregar una sección completa (el equipo) sin mezclar su lógica ni su estructura con la del contenido principal.

Crea la `page.tsx` de **About** en `src/app/about/`:

```js
// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <section className="py-3">
      <h2 className="subTitle">The Faces of Innovation</h2>
      <p className="text-gray-500 mt-4">
        Leverage the power of advanced technology to streamline operations and
        drive growth. Stay ahead with innovative solutions built for the future.
      </p>
    </section>
  );
}
```

Crea la `page.tsx` del **equipo** dentro de `src/app/about/@team/page.tsx`:

```js
// src/app/about/@team/page.tsx
export default function TeamPage() {
  return (
    <div className="w-full flex-1 border border-blue-600 rounded-md p-4 bg-blue-900/30">
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="rounded-xl flex flex-col items-start space-y-2"
          >
            <div className="w-full h-36 bg-gray-700 rounded-xl" />
            <div className="w-3/4 h-4 bg-gray-600 rounded" />
            <div className="w-1/2 h-3 bg-gray-500 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

Crea el `layout.tsx` de **About** en `src/app/about/` y agrega el `slot` de `team`:

```js
// src/app/about/layout.tsx
export default function AboutLayout({
  children,
  team,
}: {
  children: React.ReactNode,
  team: React.ReactNode,
}) {
  return (
    <div className="container pb-4">
      <h1 className="title">About</h1>
      {children}
      {team}
    </div>
  );
}
```

Actualiza la página principal `/app/page.tsx`, agregando el `Link` a `/about`:

```js
// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container">
      <h1 className="title">Página principal</h1>
      <div className="flex gap-3 flex-wrap items-center px-4 py-3 rounded-xl">
        <Link
          href={'/about'}
          className="pill-button pill-button-active flex items-center"
        >
          About
        </Link>
      </div>
    </main>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*zrQXpvKQomy_92DmHiISmA.png)

Al iniciar el servidor con `npm run dev`, podrás acceder a esta página visitando `http://localhost:3000`, da clic en “About”.

![](https://cdn-images-1.medium.com/max/1600/1*oq__BvEgS8jX1CNXshhDfA.gif)

#### Ejemplo 2: Ruta estática con un slot anidado dinámico

Usaremos el slot `@team` para renderizar perfiles individuales directamente desde la ruta `/about`, sin reemplazar el contenido principal. Al dar clic en un miembro del equipo, navegaremos a `/about/[name]`, pero solo se actualizará el slot correspondiente, manteniendo el layout y la vista principal persistentes e inalteradas.

Crea la `page.tsx` del **perfil** dentro de `src/app/about/@team/[name]/page.tsx`:

```js
// src/app/about/@team/[name]/page.tsx
export default async function TeamPage({
  params,
}: {
  params: Promise<{ name: string }>,
}) {
  const { name } = await params;
  return (
    <div className="w-full flex-1 border border-purple-600 rounded-md p-4 bg-purple-900/30">
      <div className="rounded-xl flex items-start space-y-2 space-x-2">
        <div className="w-1/2 h-36 bg-gray-700 rounded-xl" />
        <div className="w-full flex flex-col space-y-2 ">
          <div className="w-3/4 h-7 bg-gray-600 rounded" />
          <div className="w-1/2 h-4 bg-gray-500 rounded" />
          <div className="w-full h-3 bg-gray-400 rounded" />
          <div className="w-full h-3 bg-gray-400 rounded" />
          <div className="w-1/2 h-3 bg-gray-400 rounded" />
          <div className="text-xs">Param: {name}</div>
        </div>
      </div>
    </div>
  );
}
```

Actualiza la `page.tsx` del **team** dentro de `src/app/about/@team/page.tsx`, para que cada “miembro del equipo” vaya a su perfil:

```js
// src/app/about/@team/page.tsx
import Link from 'next/link';

// Lista de miembros del equipo
const teamMembers = [
  { id: 1, name: 'Angie' },
  { id: 2, name: 'Peter' },
  { id: 3, name: 'Mau' },
];

export default function TeamPage() {
  return (
    <div className="w-full flex-1 border border-blue-600 rounded-md p-4 bg-blue-900/30">
      <div className="grid grid-cols-3 gap-3">
        {/* Card de cada miembro del equipo */}
        {teamMembers.map((member) => (
          <Link
            key={member.id}
            href={`/about/${member.name.toLocaleLowerCase()}`}
            className="rounded-xl flex flex-col items-start space-y-2 hover:opacity-80 "
          >
            <div className="w-full h-36 bg-gray-700 rounded-xl" />
            <div className="w-3/4 h-4 bg-gray-600 rounded" />
            <div className="w-1/2 h-3 bg-gray-500 rounded" />
          </Link>
        ))}
      </div>
    </div>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*PvB2kB1WTWpbZHkH58j9TQ.png)

Al iniciar el servidor con `npm run dev`, podrás acceder a esta página visitando `http://localhost:3000`, da clic en “About” y posteriormente da clic en cada una de los miembros del equipo para ver su perfil.

![](https://cdn-images-1.medium.com/max/1600/1*W1kbk4Nvl-hjvy5RK6NUyw.gif)

En este caso aprovechamos el slot `@team` no solo para mostrar contenido fijo, sino para renderizar **rutas dinámicas** dentro del propio slot, sin alterar el resto de la interfaz.

Al definir una carpeta `@team/[name]`, habilitamos una ruta dinámica dentro del slot, como `/about/angie` o `/about/peter`. Lo importante es que **solo el contenido del slot** `@team` **se actualiza**, mientras el contenido principal (`/about`) permanece intacto y persistente.

Esta es una de las grandes ventajas de usar **Parallel Routes**: nos permite controlar qué parte de la UI cambia cuando navegamos, y qué parte permanece sin re-renderizarse. Haciendo que la experiencia sea más fluida, estructurada y desacoplada. Cada perfil individual vive en su propia ruta (`[name]`) dentro del slot `@team`, y puede tener su propio layout, error, loading, etc., **sin afectar la ruta principal** `/about`.

#### Ejemplo 3: Ruta estática con dos o más slots simultáneos

Usaremos los slots `@team` y `@analytics` para construir la interfaz de `/dashboard`, dividiendo la vista principal en secciones independientes que se renderizan en paralelo. Cada slot mostrará su contenido específico sin necesidad de tener una `page.tsx` central. Gracias a esta arquitectura, cada sección puede actualizarse de forma aislada, manteniendo el layout persistente, optimizando la carga y permitiendo experiencias avanzadas tipo dashboard sin lógica condicional ni navegación compleja.

Crea la carpeta `/dashboard`.

Crea la `page.tsx` del **equipo** dentro de `src/app/dashboard/@team/page.tsx`:

```js
// src/app/dashboard/@team/page.tsx
export default function TeamPage() {
  return (
    <div className="flex-1 border-2 border-blue-600 rounded-md p-4 bg-blue-900/30">
      <h1>Team page</h1>
    </div>
  );
}
```

Crea la `page.tsx` de los **datos análiticos** dentro de `src/app/dashboard/@analytics/page.tsx`:

```js
// src/app/dashboard/@analytics/page.tsx
export default function AnalyticsPage() {
  return (
    <div className="flex-1 border-2 border-purple-600 rounded-md p-4 bg-purple-900/30">
      <h1>Analytics page</h1>
    </div>
  );
}
```

Crea el `layout.tsx` de **Dashboard** en `src/app/dashboard/` y agrega el `slot` de `team` y `analytics`:

> **Nota:** Simularemos un sidebar y un header para darle más estructura visual a la interfaz y mostrar cómo se integra un layout más realista dentro de un dashboard. Esto ayuda a visualizar mejor cómo conviven los slots paralelos dentro de un layout completo.

```js
// src/app/dashboard/layout.tsx
export default function Layout({
  team,
  analytics,
}: {
  children: React.ReactNode,
  analytics: React.ReactNode,
  team: React.ReactNode,
}) {
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar navigation */}
      <aside className="w-20 bg-gray-900 flex flex-col items-center py-4 space-y-4">
        <div className="w-8 h-8 rounded-full bg-gray-700" />
        <div className="w-10 h-4 bg-gray-700 rounded" />
        <div className="w-10 h-4 bg-gray-700 rounded" />
        <div className="w-10 h-4 bg-gray-700 rounded" />
      </aside>
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header and main content */}
        <header className="h-12 bg-gray-800 flex items-center px-4">
          <div className="w-3/4 h-4 bg-gray-600 rounded" />
        </header>
        <main className="w-full flex flex-1 p-4 space-x-4">
          {/* Team and Analytics sections */}
          {team}
          {/* Analytics section */}
          {analytics}
        </main>
      </div>
    </div>
  );
}
```

Actualiza la página principal `/app/page.tsx`, agregando el `Link` a `/about`:

```js
// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container">
      <h1 className="title">Página principal</h1>
      <div className="flex gap-3 flex-wrap items-center px-4 py-3 rounded-xl">
        <Link
          href={'/about'}
          className="pill-button pill-button-active flex items-center"
        >
          About
        </Link>

        <Link
          href={'/dashboard'}
          className="pill-button pill-button-active flex items-center"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*WvCmg-V7gakNLxam2WiP8Q.png)

Al iniciar el servidor con `npm run dev`, podrás acceder a esta página visitando `http://localhost:3000`, da clic en “Dashboard”.

![](https://cdn-images-1.medium.com/max/1600/1*iYL6PXsCMwc-P9cbe8M02Q.gif)

Este ejemplo muestra todas las bondades del sistema de **Parallel Routes**, al usar **múltiples slots (**`@team` **y** `@analytics`**) de forma simultánea dentro del layout** `/dashboard`.

Aquí no existe `page.tsx` para `/dashboard`, lo que significa que **todo el contenido visible en la pantalla se construye únicamente a partir de los slots paralelos y layout**.

#### Ejemplo 4: Ruta estática anidada con dos o más slots simultáneos

En este ejemplo vamos a extender el dashboard incluyendo una subruta dentro del slot `@team`, específicamente en `/dashboard/settings`. Esto nos permite navegar a vistas más profundas dentro de un slot específico, como una pantalla de configuración del equipo.

Crea la `page.tsx` de los **settings del team** dentro de `src/app/dashboard/@team/settings/page.tsx`:

```js
//src/app/dashboard/@team/settings/page.tsx
export default function SettingsPage() {
  return (
    <div className="flex-1 border-2 border-green-600 rounded-md p-4 bg-green-900/30">
      <h1>Team Settings</h1>
    </div>
  );
}
```

Actualiza `page.tsx` del **team** dentro de `/app/dashboard/@team/page.tsx`, agregando el `Link` a `/dashboard/settings`:

```js
// src/app/dashboard/@team/page.tsx
import Link from 'next/link';

export default function TeamPage() {
  return (
    <div className="flex-1 border-2 border-blue-600 rounded-md p-4 bg-blue-900/30">
      <h1>Team page</h1>
      <Link href="/dashboard/settings" className="text-green-600">
        Settings
      </Link>
    </div>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*hO5fUjB5KuTHMQE7zZt1gg.png)

Al iniciar el servidor con `npm run dev`, podrás acceder a esta página visitando `http://localhost:3000`, da clic en “Dashboard” y posteriormente da clic en “Settings”

![](https://cdn-images-1.medium.com/max/1600/1*jRYI0xB6y2R75yuWszcgyQ.gif)

Intenta visitar directamente `http://localhost:3000/dashboard/settings` o modifica la URL manualmente en el navegador (sin usar navegación por clic).

![](https://cdn-images-1.medium.com/max/1600/1*KA7WEReFM6LnIvKe_pBetw.gif)

Pero… es que… si ya…

![](https://cdn-images-1.medium.com/max/1600/0*Y9BMJ-d3TBHgWaXR.gif)

Realmente hay una explicación…

Cuando usas múltiples slots (`@team`, `@analytics`, etc.), Next.js mantiene el estado activo de cada slot solo durante la navegación del lado cliente. Pero si haces un reload del navegador o accedes directamente vía URL (hard navigation), **Next.js necesita saber qué renderizar en los demás slots**.

Si uno de los slots no tiene una subruta que coincida, y **no existe un archivo** `default.tsx` **en ese slot**, Next.js muestra un **404** por defecto.

![](https://cdn-images-1.medium.com/max/1600/1*ByWqSZJokH8wOhxBUqAb0Q.png)

Para evitar el 404 y mantener la integridad del layout, puedes crear un archivo `default.tsx` en cada slot que:

- De una vista base cuando el slot no tiene coincidencia directa.

- Actúe como fallback cuando Next.js no puede determinar el estado previo del slot.

```ini
/app/dashboard/@analytics/default.tsx
/app/dashboard/@team/default.tsx
```

![](https://cdn-images-1.medium.com/max/1600/1*ABLpfmYsqRN86NRr9hvJRA.png)

> **Importante**: Si tienes una ruta principal (`children`), también deberás definir un `default.tsx` para ese slot implícito.

Crea la `default.tsx` dentro de `src/app/dashboard/@team/` y `src/app/dashboard/@analytics/`

```js
// src/app/dashboard/@analytics/default.tsx
export default function Default() {
  return null;
}
```

```js
// src/app/dashboard/@team/default.tsx
export default function Default() {
  return null;
}
```

Intenta nuevamente visitar directamente `http://localhost:3000/dashboard/settings` o modifica la URL manualmente en el navegador (sin usar navegación por clic).

![](https://cdn-images-1.medium.com/max/1600/1*RAzLmC3ok0Qqy-9JZjwUwg.gif)

Ahora que has agregado archivos `default.tsx`, Next.js ya **no muestra un error 404**. Sin embargo, solo se renderiza el slot que **coincide con la ruta actual**, en este caso `/dashboard/settings` (`/dashboard/@team/settings`)

Como el slot `@analytics` **no tiene una subruta activa para** `/settings`, Next.js renderiza su archivo `default.tsx`, que actúa como **fallback visual o placeholder**. Esto garantiza que el layout se mantenga consistente incluso cuando no todas las rutas están presentes en la URL.

Gracias a los `default.tsx`, los slots que no coinciden con la URL siguen mostrando contenido válido, evitando errores y mejorando la experiencia del usuario en navegaciones directas.

Podemos **generar tantas rutas anidadas como se requieran**:

Crea la `page.tsx` de **otros settings** **del team** dentro de `src/app/dashboard/@team/settings/other/page.tsx`:

```js
// src/app/dashboard/@team/settings/other/page.tsx
export default function OtherPage() {
  return (
    <div className="flex-1 border-2 border-orange-600 rounded-md p-4 bg-orange-900/30">
      <h1>Team Other Settings</h1>
    </div>
  );
}
```

Actualiza `page.tsx` el **settings del team** dentro de `/app/dashboard/@team/settings/page.tsx`, agregando el `Link` a `/dashboard/settings/other`:

```js
//src/app/dashboard/@team/settings/page.tsx
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="flex-1 border-2 border-green-600 rounded-md p-4 bg-green-900/30">
      <h1>Team Settings</h1>
      <Link href="/dashboard/settings/other" className="text-orange-600">
        Other Settings
      </Link>
    </div>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*_-kTVzy-6GrI7f9EKSXCOg.png)

Al iniciar el servidor con `npm run dev`, podrás acceder a esta página visitando `http://localhost:3000`, da clic en “Dashboard”, posteriormente da clic en “Settings” y finalmente da clic en “Other settings”

![](https://cdn-images-1.medium.com/max/1600/1*7yfwsRnc1PySkrP6KeU3Ww.gif)

#### Ejemplo 5: Rutas condicionales

Las **Parallel Routes** no solo sirven para mostrar múltiples vistas simultáneas, también pueden utilizarse para **controlar qué ruta se renderiza** dentro de un layout en función de **condiciones dinámicas**.

Supongamos que quieres condicionar la visualización de un nuevo panel llamado Admin, es decir, mostrarlo únicamente si el usuario tiene el rol de **admin**, y ocultarlo completamente si el usuario es un usuario común.

Crea una función para simular el rol del usuario en `src/lib/auth.ts` :

```js
// src/lib/auth.ts
export function checkUserRole(): 'admin' | 'user' {
  // Simulamos el rol manualmente
  return 'admin';
}
```

Crea la `page.tsx` de **admin** dentro de `src/app/dashboard/@admin/`:

```js
//src/app/dashboard/@admin/page.tsx
export default function AdminPage() {
  return (
    <div className="w-full flex flex-1 p-4 space-x-4">
      <div className="flex-1 border-2 border-amber-600 rounded-md p-4 bg-amber-900/30">
        <h1>Admin page</h1>
      </div>
    </div>
  );
}
```

Crea la `default.tsx` de **admin** dentro de `src/app/dashboard/@admin/`:

```js
// src/app/dashboard/@admin/default.tsx
export default function Default() {
  return null;
}
```

> **No olvides definir** `default.tsx` **para evitar errores en rutas incompletas.**

Actualiza el `layout.tsx` del **Dashboard** para controlar el renderizado:

```js
// src/app/dashboard/layout.tsx
import { checkUserRole } from '@/lib/auth';

export default function Layout({
  analytics,
  admin,
  team,
}: {
  analytics: React.ReactNode,
  team: React.ReactNode,
  admin: React.ReactNode,
}) {
  const role = checkUserRole();

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar navigation */}
      <aside className="w-20 bg-gray-900 flex flex-col items-center py-4 space-y-4">
        <div className="w-8 h-8 rounded-full bg-gray-700" />
        <div className="w-10 h-4 bg-gray-700 rounded" />
        <div className="w-10 h-4 bg-gray-700 rounded" />
        <div className="w-10 h-4 bg-gray-700 rounded" />
      </aside>
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header and main content */}
        <header className="h-12 bg-gray-800 flex items-center px-4">
          <div className="w-3/4 h-4 bg-gray-600 rounded" />
        </header>
        {/* Admin section, only visible to admin users */}
        {role === 'admin' ? admin : null}
        <main className="w-full flex flex-1 p-4 space-x-4">
          {/* Team and Analytics sections */}
          {team}
          {/* Analytics section */}
          {analytics}
        </main>
      </div>
    </div>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*KwfYcJ6ZYKSs5P9zozcxZQ.png)

Al iniciar el servidor con `npm run dev`, podrás acceder a esta página visitando `http://localhost:3000`, da clic en “Dashboard”

Cuando el rol es **admin**:

![](https://cdn-images-1.medium.com/max/1600/1*rOFsGHlOX8LRGz0m_iXbvg.gif)

Cuando el rol es **user**:

![](https://cdn-images-1.medium.com/max/1600/1*ee2IjE9xFLq2I0afxOlZBw.gif)

### ¿Qué pasa si el usuario no tiene permisos para un slot y accede a la URL?

Imagina que necesitamos que el slot `@team` solo sea accesible para usuarios con rol **admin**. Esto incluye todas sus rutas: `/dashboard` (si `@team` tiene contenido allí), `/dashboard/settings`, e incluso rutas más profundas como `/dashboard/settings/other`.

#### Durante navegación normal (desde dentro de la app)

Si usas `<Link href="/dashboard/settings" />` o `<Link href="/dashboard/settings/other" />` pero el usuario **no tiene rol de admin**, entonces el slot `@team` **no será renderizado por el layout**, ya que la lógica lo omite. Como consecuencia, **ni la ruta principal ni sus subrutas serán montadas**.

En este caso, Next.js devolverá un **error 404**, porque no encuentra un slot activo donde renderizar el contenido solicitado.

![](https://cdn-images-1.medium.com/max/1600/1*lP1MBYHWCMem0-oBO_k1Ig.gif)

> **Recuerda**: Si no montas el slot en el layout, sus subrutas tampoco se montan.

#### Durante navegación directa (pegada o reload del navegador)

Aquí entra el comportamiento natural de Parallel Routes + slots condicionales:

- Next.js intentará resolver todos los slots especificados por la URL.

- Pero si tu layout **omite completamente el render de** `@team`, ese slot **simplemente no aparece en la interfaz**.

- Si no hay un slot que lo reciba, el contenido no se renderiza.
- **No hay error**, pero tampoco se muestra nada.

> **Next.js no impide que la ruta sea accesible desde el URL, pero no hay un lugar en el layout donde montarla, por lo tanto el usuario no ve nada.**

![](https://cdn-images-1.medium.com/max/1600/1*R9Dm2Irxy5ybvnip45RnFQ.gif)

Aunque ocultar slots condicionalmente en el layout **evita que el contenido se renderice, no es una medida de seguridad completa**.

Para asegurar que el usuario **no pueda acceder a rutas hijas de** `@team` **incluso si manipula la URL**, lo ideal es:

- **Protección local en el Server Component** (`page.tsx`).

- **Protección** anticipada a nivel de **request** (`middleware.ts`).
- **Route Handlers** (`route.ts`) con lógica de autorización (si fuera una API o SSR).

![](https://cdn-images-1.medium.com/max/1600/1*oJTz_oxcDzzQMUv0N1dgLA.png)

### A considerar

- Usa slots nombrados (`@chat`, `@modal`, `@sidebar`) con semántica clara.

- Usa `default.tsx` para slots opcionales: Cuando un slot no siempre tiene contenido asociado (como `@preview`), agrega un `default.tsx` para evitar errores o pantallas vacías.
- Acompaña cada slot con su propio `default.tsx`,`loading.tsx`, `error.tsx`.
- No abuses con demasiados slots en un mismo layout.
- Aprovecha para modularizar vistas secundarias.
- Si necesitas slots dinámicos, considera usar rutas interceptadas en conjunto.
- Los `@slots` no forman parte del path de la URL. Son _representaciones paralelas_ del contenido, no segmentos anidados.
- No puedes tener `@folder` fuera de un `layout.tsx` que los declare.
- Úsalos cuando la UI se beneficie de navegación paralela (dashboard, modales, split views).

---

**Hasta este punto…** Has explorado a profundidad las **Parallel Routes** de Next.js, comprendiendo su poder para componer vistas independientes dentro de un mismo layout. Aprendiste cómo se estructuran, cómo funcionan internamente, sus ventajas arquitectónicas y cómo aplicarlas en casos reales.

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
git checkout parallel-routes
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
