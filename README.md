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

## next.config.js (parte III)

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

### Optimización de recursos y caché

#### `images` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/images)]

**¿Qué es?**
Permite **definir un cargador de imágenes personalizado** mediante la opción `loader: 'custom'` y especificando un archivo `loaderFile`.

Este enfoque reemplaza el comportamiento de optimización de imágenes interno de Next.js cuando necesitas integrarlo con un CDN externo (como Cloudinary, Imgix, Akamai, etc.).

**¿Cuándo usarlo?**

- Cuando necesitas imágenes optimizadas desde un CDN externo (Cloudinary, Akamai, Imgix, Fastly, etc.)
- Cuando el optimizador interno no satisface tus necesidades
- Cuando usas `<Image>`en proyectos App Router y quieres control total sobre el `src`.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './image/image-loader.js',
  },
};
```

```hs
// image/image-loader.js
'use client';

export default function myImageLoader({ src }) {
  return `https://image.tmdb.org/t/p/w400/${src}`
}
```

```js
// src/app/page.tsx
// En alguna página, layout o componente
// Nota: El src es relativo y no necesitas incluir la URL del CDN.
// Esa parte la agrega automáticamente el loader.
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <Image
        src="7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg"
        alt="Ohana"
        width={400}
        height={225}
      />
    </main>
  );
}
```

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000`.

![](https://cdn-images-1.medium.com/max/1600/1*Knkq3FDQK40nm17p4dz7vw.png)

> **Descarga los ejemplos [**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/next-config)**] (branch: next-config)**

**Consideraciones:**

- `loaderFile` **es obligatorio** cuando usas `loader: 'custom'`.
- No puedes usar `domains`, `formats`, `deviceSizes`, etc., como en versiones anteriores.
- Este sistema es compatible con aplicaciones en **modo App Router** (`app/`) y con `<Image />` de `next/image`.

> Para saber la configuración adecuada del proveedor en la nube (akamai, aws cloudFront, Cloudinary, etc) revisa la configuración[[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/images#example-loader-configuration)]

#### `cacheHandler` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/incrementalCacheHandlerPath)]

**¿Qué es?**
Permite **personalizar completamente la lógica de almacenamiento en caché** utilizada por Next.js para datos prerenderizados y páginas. Esto incluye `fetch`, Server Components, rutas dinámicas y Server Actions.

**¿Cuándo usarlo?**

- Necesitas caché compartida entre múltiples instancias de servidores.
- Quieres manejar el TTL, invalidación o estructuras de clave/valor tú mismo.
- Estás implementando un **sistema de CDN o prerendering a medida**.
- Quieres hacer persistencia en disco, S3, Redis, etc., en lugar de memoria local.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  cacheHandler: require.resolve('./lib/InMemoryCacheHandler.js'),
  cacheMaxMemorySize: 0,
};
```

```js
// lib/InMemoryCacheHandler.js
const cache = new Map();

module.exports = class InMemoryCacheHandler {
  constructor(options) {
    this.options = options;
    // Inicializa cacheHandler personalizado
  }

  // Devuelve contenido cacheado, si existe.
  async get(key) {
    const item = cache.get(key);
    if (!item) {
      // Cuando no encuentra el contenido
      return null;
    }

    // Retorna el contenido cacheable
    return item;
  }

  // Guarda el HTML generado para una ruta específica.
  async set(key, data, ctx) {
    cache.set(key, {
      value: data,
      lastModified: Date.now(),
      tags: ctx.tags,
    });
  }

  // (Opcional) para invalidar por etiquetas.
  async revalidateTag() {
    // Implementación vacía si no se usa `revalidateTag`
  }
};
```

Crea una página cacheable:

```js
// src/app/page.tsx
export const revalidate = 60; // 1 minuto de caché

export default function Home() {
  const now = new Date().toISOString();
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold">Página principal</h1>
      <p>Generada en: {now}</p>
    </main>
  );
}
```

Al iniciar el servidor `npm run build && npm run start`, acceder a `http://localhost:3000`.

![](https://cdn-images-1.medium.com/max/1600/1*69DVmI_qZBsGTreLqEDTMA.png)

> **Descarga los ejemplos [**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/next-config)**] (branch: next-config)**

Mientras la página se encuentre dentro del intervalo de caché (1 minuto con `revalidate = 60`), cualquier navegación o recarga mostrará la misma versión renderizada (incluyendo la fecha original), ya que se sirve desde la caché en lugar de regenerarse.

**Consideraciones:**

- El comportamiento del `cacheHandler` **solo es visible en producción**. Durante el desarrollo (`npm run dev`), Next.js **no utiliza caché de páginas** para garantizar una experiencia de desarrollo en tiempo real.

#### `httpAgentOptions` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/httpAgentOptions)]

**¿Qué es?**  
En las versiones de Node.js anteriores a la 18, Next.js rellena automáticamente `fetch()` con undici y activa HTTP Keep-Alive [[ref](https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Headers/Keep-Alive)] por defecto. Permite al remitente indicar cómo será la forma de conexión.

**¿Cuándo usarlo?**  
Para todas las llamadas `fetch()` en el lado del servidor.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  httpAgentOptions: {
    keepAlive: true,
  },
};
```

#### `productionBrowserSourceMaps` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/productionBrowserSourceMaps)]

**¿Qué es?**  
Controla si se generan o no archivos `.map` de JavaScript en producción.

**¿Cuándo usar?**
Cuando necesitas depurar errores en producción.

**Ejemplo**

```js
// next.config.js
module.exports = {
  productionBrowserSourceMaps: true,
};
```

**Consideraciones:**

- No lo deshabilites si no tienes una estrategia de protección/obfuscación.
- No dejar habilitado si los `.map` estarán expuestos públicamente.

#### `htmlLimitedBots` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/htmlLimitedBots)]

**¿Qué es?**  
Es una configuración que te permite especificar una lista personalizada de agentes de usuario que deberían recibir una versión limitada del HTML.

**¿Cuándo usarlo?**

- En sitios que sufren de scraping agresivo.
- Para reducir el costo de renderizado por bots que no necesitas indexar.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  htmlLimitedBots: /MySpecialBot|MyAnotherSpecialBot|SimpleCrawler/,
};
```

En este ejemplo, cualquier agente de usuario que coincida con las expresiones regulares proporcionadas recibirá la versión limitada del HTML.

> Lista predeterminada de bots limitados en HTML [[ref](https://github.com/vercel/next.js/blob/canary/packages/next/src/shared/lib/router/utils/html-bots.ts)].

**Consideraciones:**

- Next.js analiza el `User-Agent` y, si no pertenece a bots legítimos (Googlebot, Bing, etc.), **sirve una versión limitada del HTML**.
- No afecta al usuario final ni a buscadores reales.

### Ecosistema, herramientas y compiladores

#### `webpack` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/webpack)]

**¿Qué es?**  
Permite **extender o modificar la configuración de Webpack** que Next.js usa internamente, solo si estás usando el modo Webpack (no Turbopack).

> A partir de Next.js 15, Turbopack es el valor por defecto en desarrollo, pero **Webpack sigue siendo el compilador para producción en SSR** a menos que se configure Turbopack para ambos.

Antes de continuar añadiendo configuración webpack personalizada a tu aplicación asegúrate de que Next.js no soporta ya tu caso de uso:

- Importaciones CSS [[ref](https://nextjs.org/docs/app/getting-started/css)]
- Módulos CSS [[ref](https://nextjs.org/docs/app/getting-started/css#css-modules)]
- Importaciones de Sass/SCSS [[ref](https://nextjs.org/docs/app/guides/sass)]
- Módulos Sass/SCSS [[ref](https://nextjs.org/docs/app/guides/sass)]

**¿Cuándo usarlo?**

- Si necesitas polyfills o alias específicos.
- Para integrar plugins personalizados.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: pluginOptions.options,
        },
      ],
    });
    return config;
  },
};
```

El ejemplo sirve para añadir un cargador que depende de `babel-loader`.

#### `typescript` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/typescript)]

**¿Qué es?**  
Permite personalizar el comportamiento del analizador de TypeScript dentro de Next.js, incluyendo si debe fallar al compilar o permitir errores.

**¿Cuando usarlo?**  
Si quieres que Next.js produzca código de producción incluso cuando tu aplicación tiene errores, puedes deshabilitar el paso de comprobación de tipos incorporado.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
};
```

**Consideraciones:**

- Si lo desactivas, asegurate de que está ejecutando comprobaciones de tipo como parte de su proceso de construcción o despliegue, de lo contrario esto puede ser muy peligroso.

#### `eslint` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/eslint)]

**¿Qué es?**  
Controla si Next.js ejecuta `eslint` durante el build y cómo manejar errores.

**¿Cuándo usar?**

- Si quieres que Next.js produzca código de producción incluso cuando tu aplicación tiene errores de ESLint.

**Ejemplo:**

```
// next.config.js
module.exports = {
  eslint: {
    ignoreDuringBuilds: true
  },
}
```

**Consideraciones:**  
No se recomienda a menos que ya tengas ESLint configurado para ejecutarse en una parte separada de tu flujo de trabajo.

#### `turbopack` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack)]

**¿Qué es?**  
Permite personalizar Turbopack para transformar diferentes archivos y cambiar la forma en que se resuelven los módulos.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  turbopack: {
    root: path.join(__dirname),
    resolveAlias: {
      lodash: 'lodash-es',
    },
    resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};
```

Donde:

- `root`— Establece la raíz del proyecto.
- `resolveAlias` — Mapea imports (como `lodash → lodash-es`).
- `resolveExtensions`— Extensiones que Turbopack debe resolver.
- `rules`— Mapea patrones a loaders compatibles (ej: `svg → svgr`).

**Consideraciones:**

- Loaders soportados por Turbopack [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack#supported-loaders)]

#### `optimizePackageImports`— [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports)]

**¿Qué es?**  
Permite optimizar **importaciones de paquetes grandes**, extrayendo solo lo que se usa (tree shaking agresivo).

**Ejemplo:**

```js
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['package-name'],
  },
};
```

**¿Cuándo usarlo?**

- Cuando quieres evitar importar librerías enteras por error.
- Cargar los módulos que estés usando.
- Cuando necesitas controlar explícitamente qué funciones de terceros se empaquetan.

Las siguientes bibliotecas están optimizadas por default:  
`lucide-react`, `date-fns`, `lodash-es`, `ramda`, `antd`, `react-bootstrap`, `ahooks`, `@ant-design/icons`, `@headlessui/react`, `@headlessui-float/react`, `@heroicons/react/20/solid`, `@heroicons/react/24/solid`, `@heroicons/react/24/outline`, `@visx/visx`, `@tremor/react`, `rxjs`, `@mui/material`, `@mui/icons-material`, `recharts`, `react-use`, `@material-ui/core`, `@material-ui/icons`, `@tabler/icons-react`, `mui-core`, `react-icons/*`.

#### `transpilePackages` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/transpilePackages)]

**¿Qué es?**  
Transpila y agrupa automáticamente dependencias de paquetes locales (monorepos) o de dependencias externas (`node_modules`).

**¿Cuándo usarlo?**

- Monorepos con paquetes compartidos.
- Librerías no transpiled que rompen el build en navegadores antiguos.
- Integraciones con Storybook, MDX, etc.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  transpilePackages: ['package-name'],
};
```

#### `serverExternalPackages`— [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages)]

**¿Qué es?**  
Permite excluir explícitamente paquetes del proceso de bundle en Server Components o Route Handlers en Next.js.

**¿Cuándo usarlo?**

- Al trabajar con paquetes nativos que no funcionan bien con el empaquetado (ej. `pg`, `sharp`, `bcrypt`, `canvas`).
- Para optimizar el tamaño del bundle y acelerar builds de producción.
- Si usas monorepos o dependencias compartidas sin compilación previa.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  serverExternalPackages: ['sharp', 'pg'],
};
```

Next.js incluye la siguiente lista [[ref](https://github.com/vercel/next.js/blob/canary/packages/next/src/lib/server-external-packages.json)] de paquetes que actualmente están trabajando en la compatibilidad.
