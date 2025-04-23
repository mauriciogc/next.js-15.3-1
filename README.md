# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

Este repositorio contiene una colección organizada de **proyectos, ejemplos prácticos y conceptos clave de Next.js**, agrupados por ramas temáticas.

Cada rama aborda un aspecto específico del framework desde la creación de un proyecto, hasta la implementación de rutas dinámicas avanzadas, manejo de errores, estilos, y estrategias de renderizado como CSR, SSR y SSG.

La idea es que puedas explorar **casos reales y progresivos**, entender cómo se implementan y aplicar estos conceptos en tus propios proyectos.

---

## Temas y ramas disponibles

A continuación, se detallan las principales ramas y los temas que cubren:

| Rama                                                                                                         | Descripción                                                                                    |
| ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `create-project` [[ref](https://github.com/mauriciogc/next.js-15.3-1/tree/create-project)]                   | Proyecto base creado con `create-next-app` usando App Router, TypeScript y Tailwind CSS.       |
| `base-project` [[ref](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project)]                       | Limpieza de la página inicial (`/`) para dejar una base personalizada desde la cual construir. |
| `simple-page` [[ref](https://github.com/mauriciogc/next.js-15.3-1/tree/simple-page)]                         | Ejemplo básico de cómo crear una página estática simple (`/about`).                            |
| `static-routes` [[ref](https://github.com/mauriciogc/next.js-15.3-1/tree/static-routes)]                     | Explicación y ejemplos de rutas estáticas y rutas estáticas anidadas.                          |
| `dynamic-routes` [[ref](https://github.com/mauriciogc/next.js-15.3-1/tree/dynamic-routes)]                   | Ejemplos de rutas dinámicas (`[id]`) y rutas dinámicas anidadas (`/blog/[category]/[slug]`).   |
| `advanced-dynamic-routes` [[ref](https://github.com/mauriciogc/next.js-15.3-1/tree/advanced-dynamic-routes)] | Demostración de rutas dinámicas avanzadas: `[slug]`, `[...slug]`, `[[...slug]]`.               |

> Este repositorio **se actualizará continuamente** con nuevos temas y ejemplos.

---

## ¿Buscas las explicaciones detalladas?

Cada rama está acompañada de explicaciones paso a paso en [mi blog de Medium](https://mauriciogc.medium.com/).

---

## Cómo clonar y ejecutar el proyecto

Clona el repositorio:

```bash
git clone https://github.com/mauriciogc/next.js-15.3-1.git
cd next.js-15.3-1
```

Cambia a la rama que deseas explorar:

```bash
git checkout dynamic-routes
```

Instala las dependencias:

```bash
npm install
```

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre tu navegador en:

```yaml
http://localhost:3000
```

> No olvides revisar el README de cada rama!!
