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

> **Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-b7b4cc4c4974)**]**

A continuación, se detallan las principales ramas y los temas que cubren:

### Fundamentos

---

| Título                         | Descripción                                                                               | Artículo                                                                  | Rama                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Fundamentos básicos de Next.js | <ul><li>¿Qué es Next.js?</li><li>Crear un proyecto</li><li>Ejecutar el proyecto</li></ul> | [Medium](https://medium.com/@mauriciogc/next-js-fundamentos-2cee80e16778) | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/create-project) |

### Páginas, Rutas: estáticas, dinámicas, Renderizado.

---

| Título                                                                                                                                                                                                              | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Artículo                                                                                                                                       | Rama                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Proyecto base                                                                                                                                                                                                       | Proyecto base que se utiliza para los ejemplos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project)                                      |
| Páginas                                                                                                                                                                                                             | <ul><li>¿Qué son?</li><li>Crear una página</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | [Medium](https://mauriciogc.medium.com/next-js-p%C3%A1ginas-rutas-est%C3%A1ticas-din%C3%A1micas-y-anidadas-e0f6f8ccf051)                       | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/simple-page)                                       |
| Rutas estáticas                                                                                                                                                                                                     | <ul><li>Rutas estáticas<ul><li>Ventajas</li><li>¿Cómo se crean?</li><li>¿Cómo funcionan?</li><li>Ejemplo</li></ul></li><li>Rutas estáticas anidadas<ul><li>Ventajas</li><li>¿Cómo se crean?</li><li>¿Cómo funcionan?</li><li>Ejemplo</li></ul></li></ul>                                                                                                                                                                                                                                                                                                                                         | [Medium](https://mauriciogc.medium.com/next-js-p%C3%A1ginas-rutas-est%C3%A1ticas-din%C3%A1micas-y-anidadas-e0f6f8ccf051)                       | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/static-routes)                                     |
| Rutas dinámicas `[folder]`                                                                                                                                                                                          | <ul><li>Rutas dinámicas<ul><li>Ventajas</li><li>¿Cómo se crean?</li><li>¿Cómo funcionan?</li><li>Ejemplo</li></ul></li><li>Rutas dinámicas anidadas<ul><li>Ventajas</li><li>¿Cómo se crean?</li><li>¿Cómo funcionan?</li><li>Ejemplo</li></ul></li></ul>                                                                                                                                                                                                                                                                                                                                         | [Medium](https://mauriciogc.medium.com/next-js-p%C3%A1ginas-rutas-est%C3%A1ticas-din%C3%A1micas-y-anidadas-e0f6f8ccf051)                       | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/dynamic-routes)                                    |
| Renderizado híbrido                                                                                                                                                                                                 | <ul><li>Renderizado híbrido</li><li>**CSR** (Client-Side Rendering)<ul><li>Enfoque</li><li>Es útil cuando...</li><li>Funcionamiento</li><li>Ejemplo</li></ul></li><li>**SSR** (Server Side Rendering)<ul><li>Enfoque</li><li>Es útil cuando...</li><li>Funcionamiento</li><li>Ejemplo</li></ul></li><li>**SSG** (Static Site Generation)<ul><li>Enfoque</li><li>Es útil cuando...</li><li>Funcionamiento</li><li>Ejemplo</li></ul></li><li>¿CSR (Client Side Rendering) o SSR (Server Side Rendering)?</li><li>CSR, SSR, SSG. ¿Cuál es la mejor opción?</li></ul>                                | [Medium](https://mauriciogc.medium.com/next-js-renderizado-h%C3%ADbrido-crs-ssr-ssg-dd17865e386f)                                              | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/hybrid-rendering)                                  |
| Rutas dinámicas avanzadas `[slug]`, `[...slug]` y `[[...slug]]`                                                                                                                                                     | <ul><li>Rutas dinámica `[slug]`, `[…slug]` y `[[...slug]]`<ul><li>`[slug]` Slug simple<ul><li>¿Cómo se crean?</li><li>Ejemplo</li><li>¿Cómo funcionan?</li><li>¿Rutas dinámicas o segmento dinámico slug?</li></ul></li></ul></li><ul><li>`[...slug]` Catch-all Slug (todos los segmentos)<ul><li>¿Cómo se crean</li><li>Ejemplo</li><li>¿Cómo funcionan?</li><li>¿Cuándo usar `[...slug]`?</li></ul></li></ul></li><ul><li>`[[...slug]]` — Optional Catch-all<ul><li>¿Cómo se crean?</li><li>Ejemplo</li><li>¿Cómo funcionan?</li><li>¿Cuándo usar `[[...slug]]`?</li></ul></li></ul></li></ul> | [Medium](https://mauriciogc.medium.com/next-js-rutas-din%C3%A1micas-avanzadas-slug-slug-y-slug-95f4cd0a982e)                                   | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/advanced-dynamic-routes)                           |
| Renderizado híbrido (**CSR**, **SSR**, **SSG**) con rutas dinámicas avanzadas (`[slug]`, `[...slug]`, `[[...slug]]`)<br/><br/>_**Nota**: Revisar en funciones `useParams`,`generateStaticParams` y `dynamicParams`_ | <ul><li>**CSR** (Client Side Rendering)<ul><li>Ejemplo con `[slug]`</li><li>Ejemplo con `[...slug]`</li><li>Ejemplo con `[[...slug]]`</li></ul></li><li>**SSR** (Server Side Rendering)<ul><li>Ejemplo con `[slug]`</li><li>Ejemplo con `[...slug]`</li><li>Ejemplo con `[[...slug]]`</li></ul></li><li>**SSG** (Static Site Generation)<ul><li>Ejemplo con `[slug]`</li><li>Ejemplo con `[...slug]`</li><li>Ejemplo con `[[...slug]]`</li></ul></li></ul>                                                                                                                                       | [Medium](https://mauriciogc.medium.com/next-js-renderizado-h%C3%ADbrido-csr-ssr-ssg-con-rutas-din%C3%A1micas-avanzadas-slug-slug-3c4e312c0201) | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/examples-advanced-dynamic-routes-hybrid-rendering) |

### Archivos de alto nivel (Top-level files)

---

| Título                                                          | Descripción                                                                                                                                                                                                                                                                                                                                                                                                  | Artículo | Rama                                                                         |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------- |
| Fundamentos básicos de Archivos de alto nivel (Top-level files) | <ul><li>¿Qué son?</li><li>`next.config.js`, `package.json`, `instrumentation.ts`, `middleware.ts`, `.env`, `.env.*`, `.eslintrc.json`</li><li>¿Dónde se colocan?</li><li>¿Por qué son importantes?</li></ul>                                                                                                                                                                                                 | Medium   | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/top-level-files)  |
| `next.config.js`<br/> (parte I)                                 | <ul><li>¿Qué es `next.config.js`?</li><li>Principales características</li><li>Ventajas</li><li>¿Cómo se crea o implementa?</li><li>¿Cómo funciona?</li><li>¿Cuándo se ejecuta?</li><li>Configuraciones</li><li>Buenas prácticas</li></ul>                                                                                                                                                                    | Medium   | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/next-config)      |
| `next.config.js`<br/> (parte II)                                | <ul><li>Configuraciones básicas y de entorno<ul><li>`reactStrictMode`, `compress`, `basePath`, `poweredByHeader`, `assetPrefix`, `distDir`, `pageExtensions`, `output`</li></ul></li><li>Configuraciones avanzadas<ul><li>`allowedDevOrigins`, `headers`, `rewrites`, `redirects`, `trailingSlash`, `generateEtags`, `generateBuildId`, `onDemandEntries`, `devIndicators`, `expireTime`</li></ul></li></ul> | Medium   | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/next-config-pII)  |
| `next.config.js`<br/> (parte III)                               | <ul><li>Optimización de recursos y caché<ul><li>`images`, `cacheHandler`, `httpAgentOptions`, `productionBrowserSourceMaps`, `htmlLimitedBots`</li></ul></li><li>Ecosistema, herramientas y compiladores<ul><li>`webpack`, `typescript`, `eslint`, `turbopack`, `optimizePackageImports`, `transpilePackages`, `serverExternalPackages`</li></ul></li></ul>                                                  | Medium   | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/next-config-pIII) |
| `next.config.js`<br/> (parte IV)                                | <ul><li>serverActions</li></ul>                                                                                                                                                                                                                                                                                                                                                                              | Medium   | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/next-config-pIV)  |
| `instrumentation.ts`                                            | <ul><li>¿Qué es?</li><li>Principales características</li><li>Ventajas</li><li>¿Cómo se crea o implementa?</li><li>¿Cómo funciona?</li><li>Casos de uso</li><li>Ejemplos</li><li>¿Se puede usar con layouts, loading o templates?</li><li>A considerar</li></ul>                                                                                                                                              | Medium   | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/instrumentation)  |

### Archivos de enrutamiento (App Router)

---

| Título                                                            | Descripción                                                                                                                                                                                                              | Artículo                                                                                         | Rama                                                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Fundamentos básicos de Archivos de enrutamiento (App Router)      | <ul><li>¿Qué son los archivos de enrutamiento?</li><ul><li>Básicos</li><li>Mejora UX y manejo de errores</li><li>Comportamientos específicos</li></ul><li>¿Dónde se colocan?</li><li>¿Por qué son importantes?</li></ul> | [Medium](https://mauriciogc.medium.com/next-js-archivos-de-enrutamiento-app-router-f148fd9b270d) | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/routing-files) |
| Archivo `layout.tsx`<br/>_**Nota**: Revisar el componente `Link`_ | <ul><li>¿Qué es `layout.tsx`?</li><li>Principales características</li><li>Ventajas</li><li>¿Cómo se crea o implementa?</li><li>¿Cómo funciona?</li><li>Ejemplos</li><li>A considerar</li></ul>                           | Medium                                                                                           | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/layout)        |

### Route Groups & Private Folders

---

| Título                                                | Descripción                                                                                                                                          | Artículo | Rama                                                                                     |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| Fundamentos básicos de Route Groups & Private Folders | <ul><li>¿Qué son?</li><li> Route Groups `(folder)`, Private Folders `_folder`</li><li>¿Dónde se colocan?</li><li>¿Por qué son importantes?</li></ul> | Medium   | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/route-groups-private-folders) |

### Funciones, hooks, componentes y otros...

---

| Título                                                       | Descripción                                                                                                                                                                                                                                                                                                                                                                                                  | Artículo                                                                                          | Rama                                                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Hook `useParams` para App Router                             | <ul><li>¿Qué es useParams?</li><li>¿Por qué se usa?</li><li>Ventajas</li><li>¿Cómo funciona?</li><li>Ejemplos</li><li>A considerar</li><li>Diferencia entre `params` como propiedad y `useParams`</li></ul>                                                                                                                                                                                                  | [Medium](https://mauriciogc.medium.com/nexts-js-hook-useparams-c1abbb32f996)                      | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/examples-useParams)            |
| Función `generateStaticParams` y la variable `dynamicParams` | <ul><li>`generateStaticParams`<ul><li>¿Qué es `generateStaticParams`?</li><li>¿Por qué se usa?</li><li>Ventajas que tiene `generateStaticParams`</li><li>¿Cómo funciona?</li><li>Ejemplos</li><li>A considerar</li></ul></li><li>`dynamicParams`<ul><li>¿Qué es `dynamicParams`?</li><li>Ventajas que tiene `dynamicParams`</li><li>¿Cómo funciona?</li<li>Ejemplos</li><li>A considerar</li></ul></li></ul> | [Medium](https://mauriciogc.medium.com/next-js-generatestaticparams-y-dynamicparams-3e616ba53f31) | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/examples-generateStaticParams) |
| Componente `Link`                                            | <ul><li>¿Qué es `Link`?</li><li>Características</li><li>Ventajas</li><li>¿Cómo se crea o implementa?</li><li>¿Cómo funciona?</li><li>Opciones disponibles</li><ul><li>`herf`</li><li>`Replace`</li><li>`prefetch`</li><li>`scroll`</li><li>`onNavigate`</li></ul><li>Ejemplos</li><li>A considerar</li><li>¿Es compatible usar `Link` dentro de `Layouts`?</li><li>Comparación con `a` tradicional</li></ul> | [Medium](https://medium.com/@mauriciogc/next-js-componente-link-d0b60a91e0b8)                     | [Github](https://github.com/mauriciogc/next.js-15.3-1/tree/layout)                        |

> Este repositorio **se actualizará continuamente** con nuevos temas y ejemplos.

---

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
