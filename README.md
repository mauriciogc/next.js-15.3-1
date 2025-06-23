# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

##  Parallel and Intercepted Routes

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-3)**] (branch: base-project-3).** Este proyecto incluye actualización visual y estructural de estilos utilizando TailwindCSS v4.

### ¿Qué son?

**Parallel Routes** y **Intercepted Routes** son capacidades avanzadas del sistema de enrutamiento de Next.js (App Router), que permiten tener múltiples rutas renderizadas de forma simultánea desde distintos niveles de la jerarquía del árbol de archivos.

- **Parallel Routes (**`@slot`**)**: Permiten renderizar múltiples rutas hijas al mismo tiempo dentro de un mismo layout padre, ideales para experiencias tipo dashboard, inbox o navegación dividida.

- **Intercepted Routes (**`(.)`**,** `(..)`**,** `(...)`**)**: permiten renderizar rutas desde otros niveles de la jerarquía de rutas, sin alterar la URL del usuario, lo cual es útil para modales, drawers o contenidos inyectados en layouts.

### Parallel routes

`@folder`** — Named Slot (Parallel Route)**

- **Qué es**: Una carpeta con prefijo `@` que define un `slot` en tu layout para mostrar contenido paralelo a otras rutas.

- **Funcionamiento**: el layout principal importa múltiples segmentos desde distintas rutas simultáneamente.
- **Cuándo usar**: Dashboards, bandejas de entrada, vistas divididas, split views.

### Intercepted routes

#### `(.)folder` — Intercepted Same Level

- **Qué es**: Intercepta una ruta del **mismo nivel** jerárquico.

- **Funcionamiento**: Renderiza el contenido como si fuera parte de la ruta actual, sin cambiar la URL.
- **Cuándo usar**: Abrir modales desde una lista.

#### `(..)folder` — Intercepted One Level Above

- **Qué es**: Intercepta una ruta del **nivel superior inmediato**.

- **Funcionamiento**: Permite renderizar una ruta fuera del segmento actual sin alterar la URL.
- **Cuándo usar**: Mostrar contenido desde una ruta superior mientras se mantiene el contexto.

#### `(..)(..)folder` — Intercepted Two Levels Above

- **Qué es**: Intercepta rutas desde dos niveles superiores.

- **Funcionamiento**: Útil cuando una ruta necesita renderizar un modal desde una sección muy distante.
- **Cuándo usar**: Overlay de contenido global desde una ruta profundamente anidada.

#### `(...)folder` — Intercept from Root

- **Qué es**: Intercepta desde la raíz del proyecto (como si lo sacaras de cualquier parte del árbol).

- **Funcionamiento**: Permite renderizar rutas globales desde cualquier contexto.
- **Cuándo usar**: Overlays globales, rutas tipo login, drawers flotantes, settings globales.

### ¿Por qué son importantes?

- Permiten construir interfaces **más dinámicas y modulares**.

- Facilitan la **experiencia fluida** sin navegación completa.
- **Separan responsabilidades visuales** (modal vs contenido principal).
- Reutilizan layouts con contenido flexible y múltiples slots simultáneos.
- Soportan **experiencias modernas tipo SPA** con lógica desacoplada.

### A considerar

- Usa `@slot` para vistas paralelas como inbox/feed o editor/preview.

- Usa `(.)`, `(..)` o `(...)` para inyectar rutas tipo modal sin alterar navegación.
- Organiza tus intercept routes cerca de donde serán montadas.
- Siempre separa tus layouts `layout.tsx` de vistas `page.tsx`.

---

**Hasta este punto…** hemos explorado las Parallel e Intercepted Routes de Next.js, comprendiendo cómo permiten construir interfaces dinámicas, inyectar vistas desde distintos niveles y controlar múltiples rutas simultáneamente sin romper la estructura del layout.
