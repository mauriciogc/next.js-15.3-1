# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Actualiza la página principal

Vamos a simplificar la página principal. Abre el archivo src/app/page.tsx y sustituye el código generado, por el siguiente:

```Typescript
// src/app/page.tsx

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold">
        ¡Hola Mundo desde Next.js + Tailwind!
      </h1>
    </main>
  );
}
```

Donde:

- `export default function Home()`  -  Es un componente como React, en este caso una página (`/`)

- Se usa Tailwind para estilos `items-center`, `min-h-screen`, etc.

- Al llamarse `page.tsx`, Next.js hace una página automáticamente.

---

## Ejecutar el proyecto

Para correr o ejecutar el proyecto [[ref]](https://nextjs.org/docs/app/getting-started/installation#run-the-development-server):

```bash
npm run dev
```

Abre en tu navegador:

```bash
http://localhost:3000
```

---

## Cómo ejecutar el proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/mauriciogc/next.js-15.3-1
cd next.js-15.3-1
```

Cambia a la rama:

```bash
git checkout 02.home
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

---

### Cambios

En esta rama se realizaron los siguientes cambios:

- Se eliminó el contenido de la carpeta `public/` innecesario.
- Se actualizó el archivo `src/app/page.tsx` para mostrar una página principal personalizada (`Home`).
- Estructura limpia para comenzar a trabajar.
