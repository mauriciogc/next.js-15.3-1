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

## next.config.js

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

### Configuraciones básicas y de entorno

#### `reactStrictMode` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/reactStrictMode)**]**

**¿Qué es?**
**Activa el modo estricto de React durante el desarrollo**, permitiendo **detectar problemas potenciales** como efectos secundarios innecesarios o ciclos dobles en `useEffect`.

**¿Cuándo usarlo?**  
**Siempre** durante **desarrollo**. Recomendado dejarlo activado salvo casos muy específicos de incompatibilidad.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  reactStrictMode: true,
};
```

**Consideraciones:**

- React renderiza cada componente dos veces (solo en dev) para detectar problemas.
- No afecta producción.

#### `compress` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/compress)]

**¿Qué es?**  
Activa o desactiva la **compresión Gzip** para las respuestas HTTP estáticas y renderizadas en el servidor.

**¿Cuándo usarlo?**  
Siempre en producción, a menos que uses un proxy como Nginx que lo haga por ti.

**¿Cuándo desactivarlo?**

- En entornos donde la compresión es manejada por un CDN o reverse proxy (ej. Vercel, NGINX, Cloudflare).
- Para debug con tráfico sin comprimir.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  compress: false,
};
```

**Consideraciones:**  
Por defecto viene activado.

#### `basePath` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath)]

**¿Qué es?**  
Prefijo base para todas las rutas de tu aplicación. Muy útil cuando se despliega en un subdirectorio (ej. `/panel`, `/admin`, etc.).

**¿Cuándo usarlo?**

- Al desplegar en un subdirectorio o en GitHub Pages.
- En apps multicliente o multibrand.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  basePath: '/admin',
};
```

Esto hace que cualquier ruta como por ejemplo `/dashboard` se de como `/admin/dashboard`.

**Consideraciones**:

- También afecta rutas internas como `Link`, `Image`, `next/router`.
- No aplica para `api` routes o rewrites/redirects (estos requieren ajustes manuales).

#### `poweredByHeader` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/poweredByHeader)]

**¿Qué es?**  
Controla si se incluye la cabecera HTTP `X-Powered-By: Next.js`.

**¿Por qué desactivarlo?**

- Seguridad (oculta la tecnología usada).
- Mejor score en herramientas como Lighthouse.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  poweredByHeader: false,
};
```

#### `assetPrefix` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/assetPrefix)]

**¿Qué es?**  
Prefijo base para servir recursos estáticos (`/_next/*`), útil cuando estos archivos se entregan desde un CDN diferente.

**¿Cuándo usarlo?**

- Cuando distribuyes recursos desde un CDN externo.
- En SSR con entrega segmentada.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  assetPrefix: 'https://cdn.example.com',
};
```

**Consideraciones:**

- Afecta a los recursos de Next (`/_next/static`, etc.), no a `/public`.
- Requiere configurar CORS y headers en el CDN.

#### `distDir` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/distDir)]

**¿Qué es?**  
Permite cambiar el directorio de salida por defecto `.next` a otro nombre.

**¿Cuándo usarlo?**

- Para integraciones con CI/CD que requieren estructuras específicas.
- Para evitar conflictos si varias apps Next viven juntas.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  distDir: 'build-next',
};
```

Cuando ejecutes `next build` Next.js utilizará `build-next` en lugar de la carpeta por defecto `.next`.

#### `pageExtensions` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/pageExtensions)]

**¿Qué es?**
Define qué extensiones de archivo se consideran páginas válidas (`.tsx`, `.jsx`, `.mdx`, etc.).

**¿Cuándo usarlo?**

- Cuando usas extensiones no estándar como `.mdx`, `.page.tsx`, etc.
- Para evitar que archivos auxiliares sean tratados como rutas.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};
```

**Consideraciones:**  
Asegúrate de que todas las páginas usen las extensiones especificadas.

#### `output` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)]

**¿Qué es?**  
Define el modo de salida de la aplicación: `standalone`, `export`, o por defecto (SSR).

**Valores posibles:**

- `'standalone'` — Prepara la app para deploy en contenedor (ej. Docker).
- `'export'` — Genera una app estática con `next export`.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  output: 'standalone',
};
```

**Consideraciones:  
-** Asegúrate de que el entorno de despliegue esté configurado para usar la carpeta generada.

- Útil en entornos serverless o contenedores con Node.js embebido.

### Configuraciones avanzadas

#### `allowedDevOrigins` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins)]

**¿Qué es?**
**Permite especificar orígenes permitidos durante el desarrollo local** para habilitar el acceso desde otros dominios (útil en micro-frontends o herramientas externas).

**Funcionamiento**
Next.js valida la cabecera `Origin` en peticiones entrantes en modo desarrollo y sólo responde si el origen está en esta lista.

**¿Cuándo usarlo?**  
Cuando desarrollas en red local (LAN) o deseas permitir acceso desde dispositivos externos (ej. móviles, QA).

**Ejemplo:**

```js
// next.config.js
module.exports = {
  allowedDevOrigins: [
    'local-origin.dev',
    'https://192.168.1.100:3000',
    'http://localhost:3333',
  ],
};
```

**Consideraciones:**  
Útil para evitar errores de CORS en entornos de desarrollo con múltiples dominios.

#### `headers` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers)]

**¿Qué es?**
Permite definir **cabeceras personalizadas para rutas específicas**. Muy útil para políticas de seguridad (`CSP`, `X-Frame-Options`), `CORS`, o control de caching.

**¿Cuándo usarlo?**  
Para mejorar la seguridad, control de caché o políticas de CORS.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

// Por ruta:
/*  
module.exports = {  
  async headers() {  
    return [  
      {  
        source: '/about',  
        headers: [  
          {  
            key: 'x-custom-header',  
            value: 'my custom header value',  
          },  
          {  
            key: 'x-another-custom-header',  
            value: 'my other custom header value',  
          },  
        ],  
      },  
    ]  
  },  
}  
*/
```

Donde:

- `source` — Es el patrón de ruta de la petición entrante.
- `headers` es un array de objetos de cabecera de respuesta, con propiedades `key` y `value`.
- `basePath`: `false` o `undefined` — Si es `false` el `basePath` no se incluirá al hacer la coincidencia, sólo puede usarse para reescrituras externas.
- `locale`: `false` o `undefined` — Si es `false` no se incluirá el local al hacer coincidencias.
- `has` — Es una matriz de objetos [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers#header-cookie-and-query-matching)].
- `missing` — Es una matriz de objetos [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers#header-cookie-and-query-matching)].

**Consideraciones:**

- `source` acepta glob patterns.
- Las cabeceras definidas aplican sobre rutas renderizadas (SSR, SSG, etc.).
- Asegúrate de que los encabezados no interfieran con el funcionamiento de la aplicación.

#### `rewrites` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites)]

**¿Qué es?**
Permite mapear una URL visible a una ruta **interna o externa**, sin cambiar la URL del navegador.

**¿Cuándo usarlo?**

- Para consumir APIs externas sin exponer URL reales.
- Para migraciones progresivas de rutas.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        // Cuando se consume la ruta /api/movies, internamente consume a "destination"
        source: '/api/movies',
        destination: 'https://api.themoviedb.org/3/movie/popular',
      },
      {
        //Otro ejemplo: Cuando se consume la ruta /about, internamente consume "/new-about"
        source: '/about',
        destination: '/new-about',
      },
    ];
  },
};
```

Donde:

- `source`— Es el patrón de ruta de la petición entrante.
- `destination`— Es la ruta a la que desea dirigir.

**Consideraciones:**

- Ideal para proxys internos o SSR personalizado.
- Similar a un proxy inverso, pero manteniendo la URL original del cliente.

#### `redirects` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects)]

**¿Qué es?**
Redirecciona al usuario desde una ruta hacia otra, **modificando la URL visible**. Puede ser temporal (`307`) o permanente (`308`/`301`).

**¿Cuándo usarlo?**
Para SEO, mantenimiento, migraciones de rutas, o alias de endpoints.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true,
      },
    ];
  },
};
```

Donde:

- `source`— Es el patrón de ruta de la petición entrante.
- `destination`— Es la ruta a la que desea redirigir.
- `permantent` — Si es `true` usará el código de estado 308 que indica a los clientes/motores de búsqueda que almacenen en caché la redirección para siempre, si es `false` usará el código de estado 307 que es temporal y no se almacena en caché.

**Consideraciones:**

- Afecta `statusCode` y SEO (cuando `permanent: true`).
- Puede usarse para versionado, rutas obsoletas, A/B testing, etc.
- Soporta variables dinámicas (ej: `/blog/:slug`).

#### `trailingSlash` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/trailingSlash)]

**¿Qué es?**  
Agrega o remueve la `/` final en las URLs generadas por Next.js.

**¿Cuándo usarlo?**

- Cuando tu servidor backend/CDN requiere consistencia con rutas con o sin slash.
- Para SEO o convenciones de plataforma.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  trailingSlash: true, // todas las rutas serán /ruta/
};
```

**Consideraciones:**  
Afecta cómo se construyen los paths de las rutas estáticas y dinámicas.

#### `generateEtags` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/generateEtags)]

**¿Qué es?**
Controla si Next.js debe generar encabezados `ETag` para recursos renderizados, ayudando al navegador a hacer caching condicional.

**¿Cuándo usarlo?**  
Siempre que no tengas un proxy o CDN que gestione sus propias ETags.

**Cuándo desactivarlo:**  
Cuando estás detrás de un CDN que gestiona su propio sistema de validación.

**Ejemplo**:

```js
// next.config.js
module.exports = {
  generateEtags: false, // desactiva ETags (útil si el CDN los gestiona)
};
```

#### `generateBuildId` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/generateBuildId)]

**¿Qué es?**
Permite definir manualmente el `buildId` de la app, útil para entornos donde múltiples instancias deben compartir una misma ID.

**¿Cuándo usarlo?**
Cuando integras sistemas externos de caché, despliegues progresivos o versionado de bundles.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  generateBuildId: async () => {
    return 'v1.20240515'; // o usa commit hash dinámico
  },
};
```

**Consideraciones:**

- El Valor debe ser de tipo `string`.
- Si se omite, Next.js genera un UUID.

#### `onDemandEntries` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/onDemandEntries)]

**¿Qué es?**
Controla cómo se cargan las páginas bajo demanda en desarrollo (`next dev`). Puedes ajustar cuánto tiempo se mantiene un módulo activo sin acceso.

**¿Cuándo usarlo?**
En proyectos grandes donde abrir muchas rutas en `dev` empieza a ser lento o causa memory leaks.

**Cuándo modificarlo:**

- En grandes proyectos donde el HMR consume demasiados recursos.
- Si experimentas lentitud al recargar muchas páginas.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  onDemandEntries: {
    maxInactiveAge: 25 * 1000, //25 segundos - Tiempo máximo de inactividad.
    pagesBufferLength: 5, // Cuántas páginas mantener activas.
  },
};
```

#### `devIndicators` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/devIndicators)]

**¿Qué es?**
Permite habilitar o deshabilitar el indicador visual en desarrollo (la “N” que esta en la parte inferior izquierda).

**¿Cuándo usarlo?**
Para desactivar visuales molestos en QA, demo interna, o desarrollo embebido.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  devIndicators: false,
};

/*  
// Se puede mover de lugar  
module.exports = {  
  devIndicators: {position: "bottom-right"}  
};  
*/
```

Donde:

- `position` — `bottom-right`, `bottom-left`, `top-right`, `top-left`

![](https://cdn-images-1.medium.com/max/1600/1*UVu5lBGt8YnKEC8IBvWLFA.png)

> **Descarga los ejemplos [**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/next-config)**] (branch: next-config)**

#### `expireTime`— [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/expireTime)]

**¿Qué es?**
Permite controlar cuánto tiempo Next.js debe mantener activos los segmentos de rutas del App Router en memoria en producción.

**¿Cuándo usarlo?**  
Cuando tienes muchas rutas dinámicas y deseas liberar memoria de segmentos no usados frecuentemente.

**Ejemplo:**

```js
// next.config.js
module.exports = {
  expireTime: 3600, // 1hr en segundos
};
```

**Consideraciones:**

- Solo aplica en producción.
- No tiene impacto directo en el entorno de desarrollo (`next dev`).
- No afecta rutas estáticas (`export`, `SSG`).
- Se complementa bien con `revalidate`, `cache: 'no-store'` y `dynamic: 'force-dynamic'`.
