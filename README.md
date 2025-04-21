# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

### 03.hybrid-pages

> Esta rama contiene ejemplos prácticos y explicaciones de las distintas estrategias de renderizado que ofrece Next.js:

- **CSR (Client Side Rendering)**  
  Contenido renderizado exclusivamente en el navegador usando `useEffect`.

- **SSR (Server Side Rendering)**  
  El contenido es generado en el servidor en cada request.

- **SSG (Static Site Generation)**  
  El contenido se genera una vez en tiempo de build.

Cada estrategia tiene su propia página en:

```yaml
/csr /ssr /ssg
```

Para estos ejemplos se utiliza la API pública [`https://jsonplaceholder.typicode.com/posts?_limit=5`](https://jsonplaceholder.typicode.com/posts?_limit=5) para simular carga de contenido real.

---

## Cómo ejecutar el proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/mauriciogc/next.js-15.3-1
cd next.js-15.3-1
```

Cambia a la rama:

```bash
git checkout 03.hybrid-pages
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

Prueba:

```yaml
http://localhost:3000/csr
http://localhost:3000/ssr
http://localhost:3000/ssg
```
