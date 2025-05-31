# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-2)**] (branch: base-project-2).** Este proyecto contiene los archivos: `src/app/page.tsx` y `src/app/layout.tsx`, configurados con una estructura mínima.

---

## Route Groups & Private Folders

### ¿Qué son?

En el **App Router** de Next.js, los **Route Groups** `(folder)` y las **Private Folders** `_folder` son **convenciones de nombre de carpeta** utilizadas para **organizar el árbol de rutas sin que afecte el sistema de enrutamiento final**.

Estas carpetas **permiten estructurar, aislar o agrupar** componentes y rutas de manera lógica **sin modificar la URL** del usuario **ni** generar **segmentos** de **ruta** **adicionales**. Son herramientas clave para el diseño de aplicaciones escalables y mantenibles.

#### Route Groups `(folder)`—

- **Qué es** — Carpeta que agrupa rutas sin afectar la URL final.

- **Funcionamiento** — Permite compartir `layout.tsx`, `template.tsx`, `loading.tsx` u organizar segmentos sin que aparezca en la ruta.
- **Cuándo usar** — Cuando necesitas estructurar lógicamente tu app sin modificar las URLs visibles.

##### Ejemplo:

```yaml
app/(marketing)/home/page.tsx
```

#### Private Folders `_folder` —

- **Qué es** — Carpeta interna ignorada por el sistema de rutas de Next.js.

- **Funcionamiento** — No genera rutas ni segmentos; sirve solo para importar módulos o componentes.
- **Cuándo usar** — Para almacenar lógica interna como servicios, componentes o utilidades reutilizables.

##### Ejemplo:

```yaml
app/_components/
```

### ¿Dónde se colocan?

Estas convenciones se usan **dentro de la carpeta** `**app/**`, que es la **raíz** del sistema de rutas del **App Router**. Puedes colocarlas en cualquier nivel del árbol de rutas según la necesidad de estructura o reutilización.

![](https://cdn-images-1.medium.com/max/1600/1*Wwp8pJCS8EfXjaSPR7CeKA.png)

### ¿Por qué son importantes?

- **Organización sin acoplamiento en URLs**— `(group)` permite organizar tu código por contexto (auth, marketing, dashboard) sin introducir segmentos innecesarios en la URL.

- **Claridad semántica** — Rutas como `/login`, `/register` se ven limpias, pero internamente pueden pertenecer a un grupo `(auth)` con su propio layout.
- **Reutilización de layouts** — Puedes usar `layout.tsx` dentro de `(group)` para aplicar estructuras comunes a todas las páginas de ese grupo, sin repetir código ni alterar la URL.
- **No solo es organización visual**— Aunque `(group)` no aparece en la URL, puede contener layouts, templates y componentes contextuales, afectando directamente la composición de la UI.
- **Separación de responsabilidades** — `_folder` facilita mantener el código limpio, evitando mezclar lógica interna con archivos de rutas.
- **No solo es igual a una carpeta fuera de `/app`** — `_folder` se encuentra dentro del sistema del App Router, pero no forma parte de la compilación de rutas.

---

Hasta este punto, comprendes qué son los **Route Groups** `(folder)` y las **Private Folders** `_folder` dentro del App Router de Next.js. También sabes **dónde se colocan** dentro del árbol de archivos y por qué son clave para mantener una estructura de proyecto **modular, limpia y escalable**.
