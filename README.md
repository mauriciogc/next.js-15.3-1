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

| Link                                                                                                        | Rama                                                | Descripción                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Link](https://github.com/mauriciogc/next.js-15.3-1/tree/create-project)                                    | `create-project`                                    | Proyecto base creado con `create-next-app` usando App Router, TypeScript y Tailwind CSS.                                                               |
| [Link](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project)                                      | `base-project`                                      | Limpieza de la página inicial (`/`) para dejar una base personalizada desde la cual construir.                                                         |
| [Link](https://github.com/mauriciogc/next.js-15.3-1/tree/simple-page)                                       | `simple-page`                                       | Ejemplo básico de cómo crear una página estática simple (`/about`).                                                                                    |
| [Link](https://github.com/mauriciogc/next.js-15.3-1/tree/static-routes)                                     | `static-routes`                                     | Explicación y ejemplos de rutas estáticas y rutas estáticas anidadas.                                                                                  |
| [Link](https://github.com/mauriciogc/next.js-15.3-1/tree/dynamic-routes)                                    | `dynamic-routes`                                    | Explicación y ejemplos de rutas dinámicas (`[id]`) y rutas dinámicas anidadas (`/blog/[category]/[name]`).                                             |
| [Link](https://github.com/mauriciogc/next.js-15.3-1/tree/hybrid-rendering)                                  | `hybrid-rendering`                                  | Explicación y ejemplos de los diferentes tipos de renderizado (CSR (Client-Side Rendering), SSR (Server-Side Rendering), SSG (Static Site Generation)) |
| [Link](https://github.com/mauriciogc/next.js-15.3-1/tree/advanced-dynamic-routes)                           | `advanced-dynamic-routes`                           | Explicación y ejemplos de rutas dinámicas avanzadas: `[slug]`, `[...slug]`, `[[...slug]]`.                                                             |
| [Link](https://github.com/mauriciogc/next.js-15.3-1/tree/examples-useParams)                                | `examples-useParams`                                | Explicación y ejemplos del hook : `useParams`.                                                                                                         |
| [Link](https://github.com/mauriciogc/next.js-15.3-1/tree/examples-generateStaticParams)                     | `examples-generateStaticParams`                     | Explicación y ejemplos de las función : `generateStaticParams` y la variable `dynamicParams`.                                                          |
| [Link](https://github.com/mauriciogc/next.js-15.3-1/tree/examples-advanced-dynamic-routes-hybrid-rendering) | `examples-advanced-dynamic-routes-hybrid-rendering` | Rutas dinámicas avanzadas con renderizado híbrido (CRS, SSR, SSG).                                                                                     |
| [Link](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-2)                                    | `base-project-2`                                    | Limpieza de la página y layout inicial, dejando una base personalizada para los ejemplos de Archivos de enrutamiento.                                  |
| [Link](https://github.com/mauriciogc/next.js-15.3-1/tree/link)                                              | `link`                                              | Explicación y ejemplos del componente : `Link`.                                                                                                        |
| [Link](https://github.com/mauriciogc/next.js-15.3-1/tree/layout)                                            | `layout`                                            | Explicación y ejemplos del archivo : `layout.tsx`.                                                                                                     |
| [Link](https://github.com/mauriciogc/next.js-15.3-1/tree/loading)                                           | `loading`                                           | Explicación y ejemplos del archivo : `loading.tsx`.                                                                                                    |
| [Link](https://github.com/mauriciogc/next.js-15.3-1/tree/suspense)                                          | `suspense`                                          | Explicación y ejemplos del componente de React : `<Suspense>`.                                                                                         |
| [Link](https://github.com/mauriciogc/next.js-15.3-1/tree/error)                                             | `error`                                             | Explicación y ejemplos del archivo : `error.tsx`.                                                                                                      |

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
