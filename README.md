# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Rutas en Next.js

En Next.js, cada carpeta dentro de /app representa una ruta de la aplicación.

### Rutas dinámicas

Son páginas que dependen de un parámetro variable, como un ID o un nombre. Por ejemplo `/posts/1` `/users/mau`, `/products/abc123`, etc.

#### Ventajas de las rutas dinámicas:

- Flexibilidad para representar contenido variable.

- Evitar duplicar código ya que no es necesario hacer una página por ítem.

- Escalabilidad total ya que a medida que la app crece, las rutas dinámicas escalan automáticamente sin necesidad de crear archivos nuevos.

- Soporte completo para SSR (contenido cambia frecuentemente), SSG (datos que no cambian) o CSR (necesitas JS del lado del cliente).

- Libertad total para optimizar rendimiento, SEO y experiencia de usuario, según el caso.

#### ¿Cómo se crean?

Las rutas dinámicas se crean de forma muy similar a una ruta estática, con la diferencia de que la carpeta usa corchetes `[foldername]` para definir un parámetro dinámico.

- Crear una carpeta con el nombre de la ruta deseada, nombrandola entre corchetes `[foldername]`.

- Dentro de esa carpeta, crea un archivo llamado `page.tsx`.

- Exporta un componente de React por defecto.

- Accede al parámetro dinámico desde params en el componente de página.

#### ¿Cómo funcionan?

Next.js con **App Router** analiza la carpeta `/app` y genera automáticamente las rutas:

- Mapea todas las carpetas que estén dentro de `/app` y tengan el archivo `page.tsx` como rutas.

- Genera el HTML y JavaScript necesario.

- Decide si renderiza como CSR (cliente), SSR (tiempo real), SSG (build) o según como hayas escrito el código.

Cuando el usuario visita una página dinámica (`/posts/5`), Next.js hace lo siguiente:

- Detecta que `[id]` es una ruta dinámica.

- Extrae el `5` como parámetro `params.id`.

- Ejecuta la lógica dentro del componente y renderiza la página.

Ejemplo:

```yaml
src/app/posts/[id]/page.tsx → /posts/:id
```

```Typescript
// src/app/posts/[id]/page.tsx

interface PageParams {
  id: string;
}

// La propiedad params es asincrona, por lo que se debe de tratar como promesa
interface PageProps {
  params: Promise<PageParams>;
}

export default async function PostPage({ params }: PageProps) {
  // Desestructuramos el id de params, ya que es una promesa
  const { id } = await params;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{id}</h1>
    </div>
  );
}
```

> Nota: En versiones anteriores a la 14, la propiedad params es síncrona. Aunque Next.js 15 aún mantiene compatibilidad con este comportamiento, se recomienda utilizar params de forma asíncrona. Ya que el comportamiento síncrono será eliminado en futuras versiones.

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/post/uno
```

```yaml
app/posts/[id]/page.js → /posts/a → { id: 'a' }
app/posts/[id]/page.js → /posts/b → { id: 'b' }
app/posts/[id]/page.js → /posts/3 → { id: '3' }
```

### Rutas dinámicas anidadas

Next.js permite tener en una ruta diferentes niveles dinámicos. Por ejemplo: `/blog/javascript/arrays`, `/blog/css/flexbox` , `/users/mau/posts/1`

#### Ventajas de las rutas estáticas

- Permite estructurar la app por secciones y subsecciones de forma clara y escalable.

- La URLs son predecibles y amigables para motores de búsqueda (SEO-friendly).

- Puedes tener layouts anidados para compartir diseño entre rutas relacionadas.

- Ideal para secciones grandes con multiples páginas y subsecciones (`/docs/..`, `/products/...`, etc)

#### ¿Cómo funcionan?

Next.js con **App Router** analiza la carpeta `/app` y genera automáticamente las rutas:

- Son ideales cuando se tiene que representar relaciones (padre/hijo).

- Mejoran exponencialmente el contexto de la URL.

- Su mayor uso es en productos de tienda, comentarios dentro de un post.

- Permite acceder a múltiples parámetros (`params`).

#### ¿Cómo se crean?

Siguiendo la misma lógica de una ruta dinámica:

- Crear dentro de la carpeta `src/app` la estructura de carpetas correspondiente a la ruta deseada, definiendo entre `[foldername]` las carpetas necesarias que van a ser el parámetro dinámico

- Dentro de esa carpeta o de las carpetas que queremos que sean rutas públicas, se debe crear un archivo llamado `page.tsx`.

- Exporta un componente de React por defecto.

- Accede a los parámetros dinámicos desde params en el componente de página.

#### ¿Cómo funcionan?

Next.js con **App Router** analiza la carpeta `/app` y genera automáticamente las rutas:

- Mapea todas las carpetas y subcarpetas que estén dentro de `/app`.

- Cada carpeta representa una parte del path en la URL.

- Si una carpeta tiene un nombre entre corchetes ([param]), se trata como un segmento dinámico.

- Solo considera una carpeta como parte de una **ruta si co-localiza** archivos especiales, el resto las ignora.

Ejemplo:

```yaml
src/app/blog/[category]/posts/[name]/page.tsx → /blog/javascript/posts/arrays
```

```TypeScript
// src/app/dashboard/settings/page.tsx

export default function SettingsPage() {
  return (

    <div className="p-4">
      <h1 className="text-2xl font-bold">Configuración</h1>
      <p>Ajusta tus preferencias...</p>
    </div>
  )
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/blog/javascript/posts/arrays
```

```yaml
src/app/blog/[category]/posts/[name]/page.tsx
  → /blog/javascript/posts/nodejs-introduction
  → { category: 'javascript', name: 'nodejs-introduction' }

src/app/blog/[category]/posts/[name]/page.tsx
  → /blog/css/posts/flexbox
  → { category: 'javascript', name: 'flexbox' }
```

Podrás observar el mensaje de error: `404 | This page could not be found.`

> Recuerda: que si intentas acceder a `/blog` o `/blog/[category]` o `/blog/[category]/posts` saldrá el mensaje: `404 | This page could not be found.`

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
git checkout dynamic-routes
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
