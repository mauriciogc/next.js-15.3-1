# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-15%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

Este proyecto está diseñado para ofrecer una estética moderna, minimalista y adaptable a modo claro y oscuro. Priorizando accesibilidad visual, consistencia tipográfica y una base sólida para componentes reutilizables.

## Estilos de tema actualizados (`globals.css`)

Se definieron variables CSS personalizadas para ambos temas:

- `--color-background`
- `--color-foreground`
- `--color-primary`
- `--color-secondary`
- `--color-muted`
- `--color-border`
- `--color-highlight`
- `--color-overlay`

### Componentes Base

- `.container`: Contenedor centralizado y responsivo.
- `.title`: Título principal.
- `.subtitle`: Subtítulo.
- `.paragraph`: Texto de cuerpo con ritmo vertical claro.
- `.highlight`: Color destacado.

### Botones

| Clase               | Descripción                                                  |
| ------------------- | ------------------------------------------------------------ |
| `.button-primary`   | Fondo `--primary`, texto claro.                              |
| `.button-secondary` | Fondo `--secondary`, texto claro.                            |
| `.button-muted`     | Fondo gris claro (o gris oscuro en dark mode), texto normal. |
| `.button-ghost`     | Fondo transparente, solo texto.                              |
| `.button-disabled`  | Opacidad reducida, cursor no interactivo.                    |

### Botones con íconos

| Clase                         | Descripción                                |
| ----------------------------- | ------------------------------------------ |
| `.icon-button` + `.button-**` | Botón redondeado y adaptado para un icono. |

> Nota: El sistema usa íconos vectoriales **[@phosphor-icons/react](https://phosphoricons.com/)**.

### Tooltip

| Clase              | Descripción                                 |
| ------------------ | ------------------------------------------- |
| `.tooltip-primary` | Texto `--primary` + fondo semitransparente. |
| `.tooltip-muted`   | Fondo `--muted`, texto normal.              |

### Otros

| Clase      | Descripción                           |
| ---------- | ------------------------------------- |
| `.cards`   | Fondo `--muted`, un borde `--border`. |
| `.Overlay` | Fondo semitransparente `--overlay`.   |

> Estos estilos permiten adaptar la UI automáticamente a `prefers-color-scheme: dark`.

## Iconos

El sistema usa íconos vectoriales modernos de Phosphor:

```bash
npm install @phosphor-icons/react
```

Optimización en la configuración de Next.js `next.config.ts`:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
};

export default nextConfig;
```

Uso básico:

```ts
import { DownloadSimple } from '@phosphor-icons/react/ssr';

<DownloadSimple />;
```

> Para aprovechar al máximo su uso, te recomiendo consultar la documentación oficial de **[phosphor-icons/react](https://github.com/phosphor-icons/react)**. Ahí encontrarás ejemplos, variantes y buenas prácticas para integrar los íconos en tus componentes.

## Ejemplos

### Página simple

```html
<main className="container py-20 space-y-5">
  <h1 className="title">Página principal</h1>
  <h2 className="subtitle">Lorem ipsum dolor sit amet consectetur.</h2>
  <p className="paragraph">
    Maiores pariatur iste reprehenderit iure. Modi vero, rem animi aliquam,
    distinctio tempora autem quae recusandae beatae debitis blanditiis quasi,
    esse quia totam.
  </p>
  <p>
    Lorem ipsum dolor sit amet
    <span className="highlight"> consectetur</span>, adipisicing elit.
  </p>
</main>
```

![](https://cdn-images-1.medium.com/max/800/1*Mbts4SOISoSyyVyOVw9G2g.png)

### Botones

```html
<main className="container py-20 space-y-10">
  <section className="flex flex-wrap gap-4">
    <button className="button button-primary">Primary</button>
    <button className="button button-secondary">Secondary</button>
    <button className="button button-muted">Muted</button>
    <button className="button button-ghost">Ghost</button>
    <button className="button button-primary button-disabled" disabled>
      Disabled
    </button>
  </section>

  <section className="flex flex-wrap gap-4">
    <button className="button button-primary">
      <FolderSimpleIcon /> Primary
    </button>
    <button className="button button-secondary">
      <FunnelIcon />
    </button>
    <button className="button button-muted">
      <MapPinIcon />
      Muted
    </button>
    <button className="button button-ghost">
      <MagnifyingGlassIcon weight="light" />
      Ghost
    </button>
    <button className="button button-primary button-disabled" disabled>
      <ThumbsUpIcon />
    </button>
  </section>

  <section className="flex gap-4">
    <button className=" icon-button button-primary">
      <ArrowRightIcon />
    </button>
    <button className="icon-button button-secondary">
      <DotsSixVerticalIcon />
    </button>
    <button className="icon-button button-muted">
      <ChatTextIcon />
    </button>
    <button className="icon-button button-ghost">
      <FadersHorizontalIcon />
    </button>
    <button className="icon-button button-primary button-disabled" disabled>
      <DownloadSimpleIcon />
    </button>
  </section>
</main>
```

![](https://cdn-images-1.medium.com/max/800/1*kOGHR-wiMrVFMsmA0AFz6A.png)

### Tooltip y cards

```html
<main className="container py-20 space-y-10">
  <section className="flex gap-4">
    <span className="tooltip tooltip-primary ">01 - Lorem</span>
    <span className="tooltip tooltip-muted">ipsa velit</span>
    <span className="tooltip bg-pink-900/20 text-pink-400">Colored</span>
  </section>

  <section className="flex gap-4">
    <div className="card space-y-2">
      <div className="subtitle highlight">01.</div>
      <h3 className="font-bold text-lg">Lorem ipsum dolor sit amet.</h3>
      <p className="paragraph text-(--color-foreground)">
        Eligendi ipsa velit reiciendis perferendis harum illo animi laboriosam
        aliquid natus.
      </p>
      <p className="flex justify-end items-center">
        <button className="icon-button button-ghost">
          <ArrowRightIcon />
        </button>
      </p>
    </div>
  </section>
</main>
```

![](https://cdn-images-1.medium.com/max/800/1*_CUg1qDzF4R1PRihiErbKw.png)

### Fuente DM Sans integrada (Google Fonts)

Se integró la fuente DM Sans usando `next/font/google` y se aplicó globalmente al layout principal:

```tsx
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  weight: '300',
  subsets: ['latin'],
});

<html lang="en" className={dmSans.className}>

```

---

## Ejecutar el proyecto

Para correr o ejecutar el proyecto **[[ref]](https://nextjs.org/docs/app/getting-started/installation#run-the-development-server)**:

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
git checkout base-project-4
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
