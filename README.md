# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Route Groups (folder)

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-3)**] (branch: base-project-3).** Este proyecto incluye actualización visual y estructural de estilos utilizando TailwindCSS v4.

### ¿Qué es?

Un **Route Group** en Next.js es una convención de carpetas que **organiza rutas sin impactar la URL final**. Se implementa mediante nombres de carpeta entre paréntesis, como `(admin)` o `(public)`. Esta funcionalidad permite **agrupar lógicamente segmentos de rutas**, sin que estos se reflejen en el path visible del navegador.

Es una técnica de organización interna del App Router para mejorar la arquitectura y mantener escalabilidad permitiendo a los desarrolladores **organizar el código, aplicar layouts compartidos, templates o loading/error boundaries**, **sin afectar** la experiencia del **usuario** final y el comportamiento del **enrutamiento**.

### Principales características

- **No afecta la URL** visible ni el path del navegador

- **No genera un segmento dinámico**.
- Se puede usar para **encapsular** layouts o compartir archivos como `layout.tsx`, `loading.tsx`, `error.tsx`, etc.
- Funciona igual que cualquier otra carpeta, solo que es **invisible** para el **routing** **final**.
- Ideal para **dividir áreas lógicas sin cambiar rutas**.
- **Soporta** **nesting** y múltiples **grupos** **paralelos**.
- **No interfiere con parámetros dinámicos** (`[slug]`), `config.ts`, ni otras convenciones.

### Ventajas

- **Claridad y organización**: facilita el mantenimiento en grandes proyectos con múltiples dominios funcionales (ej. `(admin)`, `(marketing)`, `(auth)`).

- **Control jerárquico de layouts**: puedes aislar layouts específicos por grupo.
- **Mayor escalabilidad**: evita estructuras planas y difíciles de escalar.
- **Separación de rutas privadas/públicas** sin crear prefijos en la URL.
- **Reducción de colisiones de dependencias**: ideal para micro-frontends internos.
- **Sin impacto en la URL:** No modifica la experiencia del usuario o la estructura SEO.

### ¿Cómo se crea o implementa?

- Dentro de `src/app`, crea una carpeta con paréntesis.

- Coloca dentro de ella otras rutas o componentes como lo harías normalmente.
- Cualquier archivo dentro del grupo **no se verá afectado en la URL final**.

![](https://cdn-images-1.medium.com/max/800/1*YeyqZanYwE1HRCB6m0VHAA.png)

### ¿Cómo funciona?

- Durante el proceso de compilación, el compilador de rutas de Next.js **omite las carpetas entre paréntesis** en el análisis de los segmentos que construyen la URL. **No se interpreta como un segmento ni parámetro dinámico**.

- Agrupa `layout.tsx`, `error.tsx`, `template.tsx`, etc. Aplica metadata o middleware y route segment config `segment.config.ts`.
- Al compilar, se genera una estructura de rutas donde los grupos se comportan como capas lógicas, no como paths.

### Ejemplos

#### Ejemplo 1 — Agrupando `/login` y `/register`

Crea el grupo `(auth)` dentro de `/app`.

Crea la `page.tsx` de **Inicio de sesión** en `src/app/(auth)/login`

```ts
// src/app/(auth)/login/page.tsx
export default function LoginPage() {
  return (
    <div>
      <h1 className="subTitle">Página de Login</h1>
    </div>
  );
}
```

Crea la `page.tsx` del **Registro** en `src/app/(auth)/register`

```ts
// src/app/(auth)/register/page.tsx
export default function RegisterPage() {
  return (
    <div>
      <h1 className="subTitle">Página de Registro</h1>
    </div>
  );
}
```

Agrega el `Link` hacia `/login` y `/register` en `src/app/page.tsx`

```ts
// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-y-4">
      <h1 className="text-3xl font-bold">Página principal</h1>

      <Link href="/login" className="text-blue-500 hover:underline ">
        Iniciar sesión
      </Link>
      <Link href="/register" className="text-blue-500 hover:underline ">
        Registrarse
      </Link>
    </main>
  );
}
```

![](https://cdn-images-1.medium.com/max/800/1*gHkW-ybCku0DC1LPa2rsXQ.png)

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000` y navegar a `/login` y `/register`.

![](https://cdn-images-1.medium.com/max/800/1*kURMl05U1fhdJMgkt0Rf4A.gif)

Donde:

- Las URLs finales: `/login`, `/register`.

- `(auth)` no aparece, pero permite agrupar login y registro.

#### Ejemplo 2— layout compartido

Crea el `layout.tsx` en `src/app/(auth)/` :

```js
// src/app/(auth)/layout.tsx

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <section className="container">
      <header className="title">Área de autenticación</header>
      <main>{children}</main>
    </section>
  );
}
```

![](https://cdn-images-1.medium.com/max/800/1*IZumJzu1g1xsiFuFYjaCXw.png)

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000` y navegar a `/login` y `/register`.

![](https://cdn-images-1.medium.com/max/800/1*EiqMYk2z9WoN07JlvVO9pw.gif)

Todas las rutas dentro de `(auth)` comparten el mismo `layout.tsx`, sin afectar la URL de `/login` y `/register`.

### Router group anidado

Es simplemente una carpeta `(folder)` dentro de otra carpeta `(folder)`:

![](https://cdn-images-1.medium.com/max/800/1*euV4AnnqKE-BOBp2AVkFyQ.png)

Ninguno de los nombres entre paréntesis aparece en la URL, por lo que:

- `/app/(admin)/(dashboard)/analytics/page.tsx` — `/analytics`
- `/app/(admin)/(settings)/preferences/page.tsx` — `/preferences`

#### Ejemplo — Ruta de grupos anidados

Crea una estructura de rutas bajo el siguiente escenario:

- Grupo principal `(admin)`, que agrupa toda la parte administrativa.

- Dentro de `(admin)` hay dos subgrupos funcionales `(dashboard)` y `(settings)`, además existe la ruta adicional `users`.
- Dentro de `(dashboard)` incluye las rutas `overview` y `analytics`.
- Dentro de `(settings)` incluye las rutas `profile` y `preferences`.
- Cada grupo debe tener su propio `layout.tsx` para diferenciar las secciones.

Primero, crea los `layout.tsx`:

```ts
// src/app/(admin)/layout.tsx
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container">
      <header className="title">Área de administración</header>
      <main className="w-full">{children}</main>
    </section>
  );
}
```

```ts
// app/(admin)/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="border border-(--color-primary) p-4">
      <h2 className="subTitle bg-(--color-primary)">Dashboard</h2>
      {children}
    </section>
  );
}
```

```ts
// app/(admin)/(settings)/layout.tsx
export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="border border-(--color-muted) p-4">
      <h2 className="subTitle bg-(--color-muted)">Settings</h2>
      {children}
    </section>
  );
}
```

Crea los `page.tsx`:

```ts
// app/(admin)/(dashboard)/analytics/page.tsx
export default function AnalyticsPage() {
  return <p>Estadísticas de tráfico y uso</p>;
}
```

```ts
// app/(admin)/(dashboard)/overview/page.tsx
export default function OverviewPage() {
  return <p>Panel general de métricas del sistema</p>;
}
```

```ts
// app/(admin)/(settings)/preferences/page.tsx
export default function PreferencesSettings() {
  return <p>Preferencias de interfaz y notificaciones</p>;
}
```

```ts
// app/(admin)/(settings)/profile/page.tsx
export default function ProfileSettings() {
  return <p>Editar perfil de administrador</p>;
}
```

```ts
// app/(admin)/users/page.tsx
export default function UsersPage() {
  return <p>Gestión de usuarios registrados</p>;
}
```

Agrega el `Link` hacia `/analytics`, `/overview`, `/preferences`, `/profile`, `/users`, en `src/app/page.tsx`

```ts
// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container">
      <h1 className="title">Página principal</h1>
      <div className="flex gap-3 flex-wrap items-center px-4 py-3 rounded-xl">
        <Link href="/login" className="pill-button pill-button-default">
          Iniciar sesión
        </Link>
        <Link href="/register" className="pill-button pill-button-default">
          Registrarse
        </Link>
      </div>

      <p>Admin</p>
      <div className="flex gap-3 flex-wrap items-center px-4 py-3 rounded-xl">
        <Link href="/users" className="pill-button pill-button-default">
          Usuarios
        </Link>
      </div>

      <p>Dashboard</p>
      <div className="flex gap-3 flex-wrap items-center px-4 py-3 rounded-xl">
        <Link href="/overview" className="pill-button pill-button-default">
          Overview
        </Link>

        <Link href="/analytics" className="pill-button pill-button-default">
          Analytics
        </Link>
      </div>

      <p>Settings</p>
      <div className="flex gap-3 flex-wrap items-center px-4 py-3 rounded-xl">
        <Link href="/profile" className="pill-button pill-button-default">
          Profile
        </Link>

        <Link href="/preferences" className="pill-button pill-button-default">
          Preferences
        </Link>
      </div>
    </main>
  );
}
```

![](https://cdn-images-1.medium.com/max/800/1*19LAvkEGIwxwCmIiYiYmIg.png)

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000` y navegar sobre las rutas agregadas.

![](https://cdn-images-1.medium.com/max/800/1*EckGucGMbTUjgCcMxpqMRQ.gif)

- Los **Route Groups anidados son perfectamente compatibles** y útiles.

- Puedes aplicar layouts segmentados sin alterar la URL.
- Se mantiene **separación de contextos** dentro de un dominio funcional.
- Es una arquitectura muy limpia para apps con áreas como admin, marketing, store, onboarding, documentation, etc.

#### Muy útil cuando:

- Quieres separar contextos funcionales de forma clara (ej. `(marketing)/(landing)`, `(admin)/(settings)`).

- Quieres layouts, loading o error handlers específicos por subgrupo
- Manejas permisos o tipos de usuarios distintos por sección (admin, user, guest)
- Tienes secciones que se despliegan en distintos entornos (ej. `(a/b-testing-group)`)

### A considerar

- **Mantén tu estructura alineada a dominio de negocio, no a estructura de componentes**.

- **Usa grupos para dominios funcionales**: `(auth)`, `(dashboard)`, `(public)`.
- Usa `(folder)` para aislar `layout`, `loading`, `error` y metadata por área lógica.
- **No pongas lógica dinámica dentro del nombre del grupo**. `(auth-[id])` no es válido.
- **No uses grupos para ocultar rutas sensibles**: solo afecta organización, no seguridad.
- Evita anidar demasiados grupos o usar nombres ambiguos.

---

Los **Route Groups** `(folder)` son una poderosa herramienta de organización en Next.js App Router que permiten aislar comportamientos, compartir layouts, y mantener una estructura escalable **sin afectar la URL visible**. Cuando se combinan con `layout`, `middleware`, y segment configs, permiten un control absoluto sobre la arquitectura de enrutamiento.

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
