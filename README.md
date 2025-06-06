# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## next.config.js

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-2)**] (branch: base-project-2).** Este proyecto contiene los archivos: `src/app/page.tsx` y `src/app/layout.tsx`, configurados con una estructura mínima.

### ¿Qué es next.config.js?

`next.config.js` es el **archivo de configuración principal de una aplicación Next.js**. Permite personalizar el comportamiento del framework durante la construcción (`build`), desarrollo (`dev`) y ejecución (`runtime`) de la aplicación, controlando el comportamiento de compilación, ejecución, enrutamiento, rendimiento, seguridad, herramientas de desarrollo y más.

Funciona como un punto central de definición para ajustes de rendimiento, build, manejo de assets, rutas, soporte de frameworks, y más.

### Principales características

- Es un archivo JavaScript o TypeScript ubicado en la raíz del proyecto (`./next.config.js` o `./next.config.mjs`).

- Configuración de rutas(`basepath`,`rewrites`, `redirects`).
- Seguridad (`headers`, `poweredByHeader`, `crossOrigin`).
- Ajusta parámetros de compilación (`webpack`, `typescript`, `turbopack`).
- Control de entornos y devtools (`allowedDevOrigins`, `devIndicators`, `productionBrowserSourceMaps`)
- Modifica comportamiento de CDN, imágenes, y paths (`assetPrefix`, `images`, `basePath`).
- Compatible con middleware, Edge Runtime y Server Actions.
- Puede retornar un objeto de configuración o una función async para cargar configuraciones dinámicamente.
- Se puede extender con múltiples fases (`PHASE_DEVELOPMENT_SERVER`, etc.).

### Ventajas

- **Centralización**: Permite definir de forma declarativa y en un solo archivo toda la lógica de build/runtime.

- **Flexibilidad por entorno**: Se puede modificar según el entorno (`dev`, `prod`, `test`, etc.).
- **Personalización profunda**: Acceso directo a Webpack, TypeScript, ESLint, entre otros.
- **Integración moderna**: Compatible con App Router, Middleware, Edge y Server Actions.
- **Extensibilidad**: Permite envolver con otras librerías.

### ¿Cómo se crea o implementa?

Versión básica:

```js
// next.config.js
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

Versión con ESM (si usas `.mjs` o `"type": “module"`):

```js
// next.config.mjs
export default {
  output: 'standalone',
  compress: false,
};
```

### ¿Cómo funciona?

- El CLI de Next.js carga este archivo usando `require()` o `import()` si usas `.mjs`.

- Se inyecta en tiempo de construcción (`next build`) para generar el plan de optimización (Webpack/Turbopack).
- Las configuraciones como `headers`, `rewrites`, `images`, etc., se transforman internamente en **handlers del servidor HTTP o del Edge Runtime**.
- Algunas propiedades afectan el árbol de rutas directamente (como `pageExtensions`, `basePath`, etc.).
- Next.js genera una representación serializada de este archivo que se replica también en `.next/` para uso en producción.

### ¿Cuándo se ejecuta?

![](https://cdn-images-1.medium.com/max/1600/1*ARbO_tbsp92ueO__gvFY8A.png)

### Buenas prácticas

- Documenta cualquier cambio en `basePath` si haces despliegues en subrutas.

- Usa `pageExtensions` para evitar que archivos `.spec.tsx` sean tratados como páginas
- Usa `output: 'standalone'` en apps Dockerizadas o con servidor Node embebido.
- Si usas CDN, asegúrate de que el `assetPrefix` tenga CORS correcto.
- No cambies `distDir` sin una necesidad real; puede romper scripts automáticos.
- Combínalo con `rewrites` o `headers` si haces rutas internas más complejas.
- Usa `rewrites` para ocultar rutas internas y evitar CORS.
- Desactiva `poweredByHeader` en producción por seguridad.
- Usa `generateBuildId` si haces despliegues canary o compartidos.
- Define `headers` de seguridad desde el servidor si no usas Vercel.
- Evita crear bucles de redirección (Next no los detecta automáticamente).
- No abuses de `trailingSlash: true` sin revisar tus enlaces actuales.
- Siempre define dominios explícitos en `images.domains` si usas `<Image src="...">`.
- Usa `httpAgentOptions.keepAlive = true` en producción para evitar sobrecarga por conexión.
- Habilita `productionBrowserSourceMaps` solo si los subirás a una plataforma segura.
- `htmlLimitedBots` puede ayudarte a reducir recursos en apps atacadas por scrapers.
- No uses `minimumCacheTTL` muy alto sin revisar invalidaciones necesarias.
- Usa `transpilePackages` solo cuando el paquete lo requiera.
- Usa `optimizePackageImports` para librerías conocidas por su tamaño.
- Activa Turbopack en producción si necesitas performance agresiva.
- Usa `tsconfigPath` para builds diferenciados entre dev/prod.
- No pongas `ignoreBuildErrors: true` en producción sin validación de tipado.
- Revisa la compatibilidad real de plugins de Webpack si usas Turbopack (no todos aplican).
- Usa `serverActions` para simplificar lógica CRUD básica sin crear endpoints.
- Agrupa acciones en archivos tipo `actions.ts` y usa colocalización semántica.
- Usa `formAction={action}` directamente en `<form>` si quieres Server-Only submit.

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
git checkout next-config
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
