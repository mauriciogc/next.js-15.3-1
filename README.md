# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-2)**] (branch: base-project-2).** Este proyecto contiene los archivos: `_src/app/page.tsx_` y `_src/app/layout.tsx_`, configurados con una estructura mínima.

---

## Archivos de alto nivel (Top-level files)

### ¿Que son?

Son archivos ubicados en la raíz del proyecto Next.js (`/`) que **configuran comportamientos críticos del entorno de ejecución, compilación, análisis estático, instrumentación, seguridad, y más**. Aunque no participan directamente en el árbol de rutas, **impactan cómo se comporta toda tu aplicación**.

#### `next.config.js`— 

- **Qué es**: Archivo de configuración central de Next.js.

- **Funcionamiento**: Define settings como headers, redirects, rewrites, output mode, imágenes remotas, transpilers, y más.
- **Cuándo usar**: _Siempre_. Se recomienda crear uno incluso si estás usando opciones por defecto, para tener control total de la app.

#### `package.json`— 

- **Qué es**: Archivo de metadatos y dependencias del proyecto.

- **Funcionamiento**: Define scripts (`dev`, `build`, `lint`), versiones de librerías, engines y configuración de herramientas.
- **Cuándo usar**: _Siempre_. Es obligatorio en cualquier proyecto Node.js.

#### `instrumentation.ts` — 

- **Qué es**: Archivo de instrumentación de rendimiento con OpenTelemetry.

- **Funcionamiento**: Define tracing y observabilidad personalizada para requests, render, middleware o API routes.
- **Cuándo usar**: En apps que _requieren_ _monitoring profundo_ (DevOps, observabilidad, SRE).

#### `middleware.ts` — 

- **Qué es**: Middleware global ejecutado antes de renderizar una ruta.

- **Funcionamiento**: Se ejecuta en Edge Runtime, ideal para auth, rewrites, geolocalización, headers, etc.
- **Cuándo usar**: Para _lógica transversal_ a nivel de ruta, como protección de páginas o personalización dinámica.

#### `.env`, `.env.*` —

- **Qué son**: Archivos de variables de entorno.

- **Funcionamiento**: Se cargan al proceso en tiempo de build o runtime usando `process.env`.
- **Cuándo usar**:

  - `.env`: Variables compartidas para todos los entornos.

  - `.env.local`: Config específica de desarrollo local (no se sube al repo).
  - `.env.production`: Solo en entorno productivo.
  - `.env.development`: Exclusivo para desarrollo.

#### `.eslintrc.json` — 

- **Qué es**: Configuración del linter ESLint.

- **Funcionamiento**: Define reglas para detectar errores y mejorar calidad del código.
- **Cuándo usar**: Siempre que quieras mantener estándares de calidad de forma automática.

### ¿Dónde se colocan?

Todos los **Top-Level Files** van directamente en la raíz del proyecto:

![](https://cdn-images-1.medium.com/max/1600/1*AqdoXOZuNjWIhy095ZtXaw.png)

### ¿Por qué son importantes?

- **Controlan el comportamiento global** sin ensuciar el árbol de rutas.

- **Habilitan seguridad**, logging y trazabilidad a nivel de infraestructura.
- **Permiten optimizaciones y ajustes de rendimiento** (imágenes, cache, minificación).
- **Enlazan con herramientas externas**: linters, analizadores, tracer de OpenTelemetry, etc.

### Comparativa rápida de funciones

![](https://cdn-images-1.medium.com/max/1600/1*JY3DUhl1vh9AaE_ewWW-gA.png)

---

Hasta este punto, hemos explorado los **Top-Level Files** de Next.js, entendiendo que no forman parte del árbol de rutas, pero **sí impactan profundamente en el comportamiento global de nuestra aplicación**.

> **En resumen**: si el `app/` define el “qué se muestra”, los Top-Level Files definen **el cómo se comporta tu app**.
