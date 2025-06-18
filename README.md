# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Archivos de enrutamiento

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

### ¿Qué son los archivos de enrutamiento?

Los **archivos de enrutamiento** son **archivos** con **nombres** **reservados** que tienen un **propósito** estructural dentro del **sistema** de **rutas**. Estos permiten **controlar** el **comportamiento** de navegación, renderizado, manejo de errores, carga, etc.

#### Básicos —

##### `page.tsx`

- **Qué es** — Página principal de una ruta\*\* (obligatorias para que la carpeta sea considerada como una ruta).

- **Funcionamiento** — Se renderiza cuando el usuario **accede** a una **ruta**.
- **Cuándo usar** — **Siempre que requieras que una **carpeta** sea **accesible** desde la **URL\*\*.

##### `layout.tsx`

- **Qué es** —Define una estructura **persistente** y compartida entre varias páginas hijas (headers, sidebars, etc).

- **Funcionamiento** — Se **comparte** entre **TODAS** las **páginas** **descendientes** y se **monta** **una** sola **vez**.
- **Cuándo usar** — Ideal si tienes **más de una página que comparten** una **estructura visual** o navegación (header, footer, provider, etc).

#### Mejora UX y manejo de errores —

##### `loading.tsx`

- **Qué es** — Componente que se **muestra mientras la página** (SSR o SCR) o **layout** se está **cargando** de forma asíncrona.

- **Funcionamiento** — Se **activa automáticamente** si hay `await/fetch` en **layouts** o **páginas**.
- **Cuándo usar** — Ideal para **mejorar la experiencia** en páginas que dependan de datos.

##### `error.tsx`

- **Qué es** — Componente para **manejar** **errores** de renderizado, fetch, etc.

- **Funcionamiento** — Se **activa** en **errores** **no controlados** `throw, await, fetch`.
- **Cuándo usar** — Ideal cuando estás **utilizando SSR/SSG** con fetch críticos.

##### `not-found.tsx`

- **Qué es** — Componente que se **muestra si no se encuentra la ruta** (**error** **404**).

- **Funcionamiento** — Se **renderiza** **automáticamente** si la **URL no existe** o llamas a `**notfound()**`.
- **Cuándo usar** — Ideal en **rutas dinámicas** para validar su el **recurso** **existe**.

##### `global-error.tsx`

- **Qué es** — Error **global** de toda la **app**.

- **Funcionamiento** — Se monta en la **raíz** si hay **un error que no se atrapó** en **layouts** o **páginas**.
- **Cuándo usar** — Ideal para **fallback global de errores** y no se encuentra el archivo `error.tsx`.

#### Comportamientos específicos —

##### `template.tsx`

- **Qué es** —Similar a `layout.tsx`, pero **no se comparte entre páginas**.
- **Funcionamiento** — Se **renderiza** **siempre** en cada **cambio** de **ruta**, incluso si comparten el template.

- **Cuándo usar** — Ideal cuando **no requieres compartir el layout** entre páginas **hermanas**.

##### `route.tsx`

- **Qué es**— **Permite manejar directamente peticiones HTTP** en **rutas** tipo **API**.

- **Funcionamiento**— **Reemplaza** `pages/api` con handlers `GET, POST, etc`.
- **Cuándo usar** — Ideal si estás creando **rutas tipo REST** o **endpoints de datos**.

##### `default.tsx`

- **Qué es** — Componente por **defecto** en **rutas** **paralelas**.

- **Funcionamiento** — Se **renderiza si no hay segmento** seleccionado dentro del slot.
- **Cuándo usar** — **Ideal en rutas paralelas** como layouts de múltiples paneles.

### ¿Dónde se colocan?

Dentro del directorio `/app`, en las rutas que quieras controlar. Pueden convivir dentro de la misma carpeta.

![](https://cdn-images-1.medium.com/max/1600/1*D7W3BW9FmpcZRXZ5aPJ1gQ.png)

### ¿Por qué son importantes?

- **Organización automática** del árbol de navegación.

- **Composición modular**: layouts y templates permiten reutilizar vistas.
- **Mejor experiencia de usuario**: `loading.tsx` permite UI inmediata.
- **Control fino de errores**: cada ruta puede tener su propio `error.tsx`.

---

Hasta este punto, has entendido de **forma general qué son los archivos de enrutamiento del App Router en Next.js**, y el propósito básico de cada uno dentro de la estructura de una ruta.
