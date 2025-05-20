# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Next.js — Fundamentos

### ¿Qué es Next.js?

**_Next.js_ es un framework de React** para **crear** **aplicaciones** **web** integrales. Se utilizan **componentes** de **React** para crear **interfaces** de usuario y **_Next.js_** para **funciones** y **optimizaciones** adicionales [[ref](https://nextjs.org/docs)].

Entre sus principales características destacan:

- **Sistema de rutas automático**: Utiliza la estructura de carpetas para generar rutas automáticamente, lo que elimina la necesidad de configurar un enrutador manualmente.

- **Renderizado híbrido**: Permite combinar distintos tipos de renderizado en una misma aplicación:

  - **SSR (Server-Side Rendering)**: Genera el HTML en cada solicitud.
  - **SSG (Static Site Generation)**: Genera páginas estáticas en tiempo de build.
  - **CSR (Client-Side Rendering)**: Para secciones que se actualizan desde el cliente.

> **Nota**: Los tipos de renderización los vamos a revisar a fondo más adelante.

- **API Routes integradas**: Puedes crear endpoints (backend) directamente dentro del proyecto, sin necesidad de un servidor externo. Esto te va a permitir manejar lógica de servidor como autenticación, conexión a bases de datos o procesamiento de formularios desde el mismo entorno de _Next.js_.

- **Optimización automática para SEO y rendimiento**: Soporte para metadatos, open graph y otros elementos importantes para SEO; optimización de imágenes y fuentes.
- **App Router moderno**: El nuevo sistema de rutas mejora la modularidad, permitiendo layouts anidados, manejo de errores por ruta y más, todo aprovechando las capacidades de React Server Components.
- **Soporte nativo para TypeScript**, **ESLint, Tailwind**, e integraciones modernas, facilitando un entorno de desarrollo robusto desde el inicio.

---

### Crear un proyecto

> **Nota**: Para poder configurar un nuevo proyecto en Next.js, asegurate de que tengas instalado Node.js +18.18 [[ref](https://nextjs.org/docs/app/getting-started/installation#system-requirements)]

Vamos a ejecutar en consola lo siguiente :

```bash
npx create-next-app@latest my-project
```

Responde lo siguiente:

![](https://cdn-images-1.medium.com/max/1600/1*sM2YOD_YHLOAcKJSPXZGkQ.png)

- **TypeScript [yes]** — Añade tipado estático a JS, lo que ayuda a detectar errores en tiempo de desarrollo. Mejora el autocompletado, navegación de código y documentación en editores modernos.
- **ESLint [yes]**— Herramienta que analiza el código para encontrar errores y aplicar buenas prácticas automáticamente. Ayuda a mantener un código limpio, consistente y libre de errores comunes.
- **Tailwind CSS [yes]** — Framework de utilidades para CSS, permite construir interfaces modernas rápidamente. Altamente personalizable y escalable.
- **`scr/` directory [yes]** —Colocar el código dentro de la carpeta `src/`, permite tener una convención más clara y escalable. Ayuda a separar el código fuente del restro del proyecto (configuración, archivos estáticos, etc).
- **App Router [yes]** — Es el nuevo sistema de enrutamiento de _Next.js_ (+v13) usando la carpeta `/app`. Permite tener Layouts anidados, React Server Components (RSC), `loading/Error` por ruta y mejor rendimiento.
- **Turbopack [yes]** — El nuevo bundler que tiene como objetivo reemplazar a Webpack. Mucho más rápido para el desarrollo y escalable (_Aunque aún está en desarrollo, su integración con Next.js es prometedora y vale la pena probarlo, especialmente en nuevos proyectos._)

- **Import alias [no]** — Cuando es un proyecto pequeño se puede dejar la opción `No` y agregarla más adelante cuando el proyecto crezca. Lo que hace es que evita tener imports largos y confusos, muchas veces los equipos prefieren configurar los alias manualmente en `tsconfig.json` para un mayor control.

#### :: Estructura del proyecto

Nos genera una estructura como la siguiente [[ref](https://nextjs.org/docs/app/getting-started/project-structure)]:

![](https://cdn-images-1.medium.com/max/1600/1*-3hyD5jWzjY84j6gY6Pqrg.png)

Donde:

- `**public/**` — Carpeta donde colocas archivos estáticos accesibles directamente desde el navegador. (Ej. una imagen `logo.png`, será accesible desde `[https://tusitio.com/logo.png](https://tusitio.com/logo.png.)`).
- `**src/**`— Carpeta principal para organizar el código fuente.
- `**src/app/**`— Sistema basado en carpetas (App Router). Cada subcarpeta representa una ruta. Aqui se definen páginas, layouts, templates y componentes relacionados con las rutas.
- `**src/app/page.tsx**`— Archivo obligatorio que representa una página, en este caso la ruta raíz (`/`).

- `**src/app/layout.tsx**`— Define la estructura general que se aplica a la ruta y subrutas. Es como un `App.tsx` pero más estructurado. Útil para definir cabeceras, barras laterales, pies de página, etc..
  > **Importante** saber que se ejecuta del lado del servidor.
- `**src/app/globals.css**`— Archivo CSS global donde Tailwind importa sus estilos base. Aquí puedes agregar estilos globales personalizados.

- `**eslint.config.mjs**`— Configuración de ESLint, encargado de analizar el código estático.
- `**next-env.d.ts**`— Archivo generado automáticamente para que TypeScript entienda los tipos específicos de _Next.js_ (No editar).
- `**next.config.ts**`— Archivo de configuración de _Next.js_ . Puedes modificar comportamientos globales (rutas personalizadas, redirecciones, headers, etc).
- `**postcss.config.mjs**`— Configuración para PostCSS, que Tailwind utiliza internamente para procesar CSS.
- `**tsconfig.json**`— Configuración de TypeScript. Define reglas de compilación, rutas, alias y compatibilidad del proyecto.

#### :: Actualiza la página principal

Vamos a simplificar la página principal. Abre el archivo `src/app/page.tsx` y sustituye el código generado, por el siguiente:

```js
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

- `export default function Home()` — Es un componente como React, en este caso una página (`/`)

- Se usa Tailwind para estilos `items-center, min-h-screen, etc.`

- Al llamarse `page.tsx`, _Next.js_ hace una página automáticamente.

---

### Ejecutar el proyecto

Para correr o ejecutar el proyecto [[ref](https://nextjs.org/docs/app/getting-started/installation#run-the-development-server)]:

```bash
npm run dev
```

Abre en tu navegador:

```bash
http://localhost:3000
```

Si todo está correcto, deberás ver lo siguiente:

![](https://cdn-images-1.medium.com/max/1600/1*sVSmadBJnDmn00BleAUgfg.png)

> **Nota**: Cada vez que haces un cambio en un archivo, Next.js refrescará automáticamente el contenido.

---

Bien, hasta este punto sabes **qué es Next.js**, cómo **iniciar** y **ejecutar** un **proyecto**, **reconoces** la función de cada **archivo** y **carpeta** **generada**.
