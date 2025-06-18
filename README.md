# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

Este proyecto incluye una actualización visual y estructural de estilos utilizando TailwindCSS v4 con soporte para temas `light` y `dark`, inspirado en interfaces modernas.

### Estilos de tema actualizados (`globals.css`)

Se definieron variables CSS personalizadas para ambos temas:

- `--color-background`
- `--color-foreground`
- `--color-primary`
- `--color-muted`
- `--color-border`
- `--color-overlay`

Además, se agregaron estilos base con `@layer base` y componentes reutilizables como:

- `.container`
- `.title`
- `.subTitle`
- `.pill-button`, `.pill-default`, `.pill-active`
- `.pill-badge`

> Estos estilos permiten adaptar la UI automáticamente a `prefers-color-scheme: dark`.

### Página simple

```html
<main className="container">
  <h1 className="title">Página principal</h1>
</main>
```

![](https://cdn-images-1.medium.com/max/1600/1*HHj94VlLCrrr7NO0vnAxLQ.png)

### Botones

```html
<div className="flex gap-3 flex-wrap items-center px-4 py-3 rounded-xl">
  <button className="pill-button pill-button-default">Primary</button>

  <button className="pill-button pill-button-active flex items-center">
    Secondary
  </button>

  <button className="pill-button pill-button-default flex items-center">
    Primary
    <span className="pill-badge">01</span>
  </button>

  <button className="pill-button pill-button-active flex items-center">
    Secondary
    <span className="pill-badge">02</span>
  </button>
</div>
```

- `.pill-button-default`: Fondo gris claro, borde suave.

- `.pill-button-active`: Fondo negro/blanco según tema.

- `.pill-badge`: Número pequeño con fondo coral.

![](https://cdn-images-1.medium.com/max/1600/1*g6WY3h5L_EDIFmrSwuhbyw.png)

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
