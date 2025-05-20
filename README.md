# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Rutas dinámica [slug], […slug] y [[…slug]]

Este tipo de rutas o **segmentos dinámicos** son útiles cuando no sabes cuántos niveles tendrá la URL o cuando quieres mostrar páginas con URLs amigables y flexibles.

Un `slug` es una parte de la URL que representa un valor único. Ejemplo: `/blog/mi-primer-post`, donde `mi-primer-post` es el `slug`.

**Tipos de slugs**

- `[slug]` — **Slug** **simple**, donde solo **un** **segmento** es **obligatorio**.

- `[...slug]` — **Catch-all slug**, donde **uno** o **más** **segmentos** son **obligatorios.**
- `[[...slug]]` — **Optional Catch-all**, donde **ninguno** o **más** **segmentos** son **opcionales.**

### `[slug]` **Slug simple**

Un `slug` es un segmento dinámico que permite capturar un valor variable desde la URL. Funciona igual que una ruta dinámica, pero su uso está enfocado en representar **nombres legibles, amigables para humanos y óptimos para SEO**. Por ejemplo: `/blog/react-introduction`, `/blog/running-shoes` , etc.

En todos los casos, `react-introduction`, `running-shoes`, son los valores que el segmento `[slug]` capturará desde la URL.

#### **¿Cómo se crean?**

La estructura es muy similar a cualquier ruta dinámica:

- Crear una carpeta con el nombre de la ruta deseada, nombrandola entre corchetes `[slug]`.

- Dentro de esa carpeta, crea un archivo llamado `page.tsx`.
- Exporta un componente de React por defecto.
- Accede al parámetro dinámico desde params en el componente de página.

**Técnicamente** **no hay una diferencia funcional entre una ruta dinámica y una ruta slug simple**. Más bien la **diferencia** radica en el **propósito** o intención del uso:

- *Ruta dinámica* — Cualquier valor que usa `[]` para capturar un valor variable.

- *Slug simple* — Un nombre amigable (legible para humanos y SEO) usado como parámetro dinámico.

#### **Ejemplo**

```yaml
src/app/blog/[slug]/page.tsx → /blog/:slug/
```

```js
// src/app/blog/[slug]/page.tsx

interface PageParams {
  slug: string;
}

// La propiedad params es asincrona, por lo que se debe de tratar como promesa
interface BlogPageProps {
  params: Promise<PageParams>;
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  // Desestructuramos el `slug` de params, ya que es una promesa
  const { slug } = await params;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Post: {slug}</h1>
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/blog/running-shoes
```

![](https://cdn-images-1.medium.com/max/1600/1*AsyTqYmHaF7ww-mrsdjWZA.gif)

```yaml
app/blog/[slug]/page.js → /blog/running-shoes → { id: 'running-shoes' }
app/blog/[slug]/page.js → /blog/react-hooks → { id: 'react-hooks' }
app/blog/[slug]/page.js → /blog/js-patterns → { id: 'js-patterns' }
```

#### **¿Cómo funcionan?**

Cuando accedes a una ruta como `/blog/running-shoes`, Next.js:

- Detecta que `[slug]` es un **segmento dinámico**.

- Extrae `running-shoes` como parámetro `params.slug`.
- Ejecuta el componente en `page.tsx`.
- Renderiza la página con el contenido basado en el slug.

> **Importante**: Solo permite un segmento dinámico. No puedes hacer `_/blog/react/hooks_`

Debes tener **cuidado** cuando uses en la misma ruta el mismo parámetro dinámico en una ruta. Por ejemplo:

```yaml
/app/product/[slug]/page.tsx
/app/product/[id]/page.tsx
```

Esto genera el error:

![](https://cdn-images-1.medium.com/max/1600/1*A0ry7MnOW0MpLl75BIU7mA.png)

```bash
You cannot use different slug names for the same dynamic path ('id' !== 'slug')
```

Next.js detecta que estás usando **el mismo nivel de carpeta** o la **misma ruta dinámica**, pero con **nombres distintos**, y eso rompe la consistencia del enrutado.

> **Tip**: Usa el mismo nombre de parámetro (`_[slug]_`, `_[id]_`, `_[categoryId]_`, etc.) en todas las partes de la ruta y no mezcles nombres en la misma rama de rutas.

> **Recuerda**: que si intentas acceder a `/blog` saldrá el mensaje: `404 | This page could not be found.`

#### **¿Rutas dinámicas o segmento dinámico** `**slug**`**?**

![](https://cdn-images-1.medium.com/max/1600/1*Aj3BrWYjLUfDAL0J-UAFuA.png)

### `[...slug]` **Catch-all Slug (todos los segmentos)**

`[...slug]` permite capturar **uno o más segmentos dinámicos** en una sola ruta. Ideal cuando no conoces cuántos niveles tendrá una URL. Por ejemplo: `/docs/javascript`,`/docs/javascript/variables`, `/docs/javascript/variables/const` , etc.

#### **¿Cómo se crean?**

La estructura es muy similar al segmento dinámico `slug`:

- Crear una carpeta con el nombre de la ruta deseada, nombrandola entre corchetes con tres puntos `[...slug]`.

- Dentro de esa carpeta, crea un archivo llamado `page.tsx`.
- Exporta un componente de React por defecto.
- Accede al parámetro dinámico desde params en el componente de página como un arreglo `string[]`.

#### **Ejemplo**

```yaml
src/app/docs/[...slug]/page.tsx → /docs/javascript
src/app/docs/[...slug]/page.tsx → /docs/javascript/variables
src/app/docs/[...slug]/page.tsx → /docs/javascript/variables/let
```

```js
// src/app/blog/[slug]/page.tsx

interface PageParams {
  slug: string[];
}

// La propiedad params es asincrona, por lo que se debe de tratar como promesa
interface BlogPageProps {
  params: Promise<PageParams>;
}

export default async function DocsPage({ params }: BlogPageProps) {
  // Desestructuramos el `slug` de params, ya que es una promesa
  const { slug } = await params;

  // Unimos los segmentos del slug para mostrarlos como una ruta
  const fullPath = slug.join('/');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Ruta: /docs/{fullPath}</h1>
      <p className="text-lg">Params: {JSON.stringify(slug, null, 2)}</p>
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/docs/javascript
http://localhost:3000/docs/javascript/variables
http://localhost:3000/docs/javascript/variables/let
```

![](https://cdn-images-1.medium.com/max/1600/1*1Sl1XlopHp8VniVQQ5in2Q.gif)

```yaml
app/docs/[...slug]/page.js
→ /docs/react
→ ['react']

app/docs/[...slug]/page.js
→ /docs/react/hooks
→ ['react','hooks']

app/docs/[...slug]/page.js
→ /docs/react/hooks/usestate
→ ['react','hooks','usestate']
```

#### **¿Cómo funcionan?**

Cuando accedes a una ruta como `/docs/react/hooks`, Next.js:

- Detecta que `[[...slug]]` es una ruta dinámica con **uno o más segmentos dinámicos**.

- Extrae `[react, hooks]` como arreglo de `params.slug`.
- Ejecuta el componente en `page.tsx`.
- Renderiza la página con el contenido basado en el slug.

> **Importante**: Debe tener al menos un segmento obligatorio. No puedes enviar rutas vacías (ej. `_/docs_`_) ya que marcará un error._ **_Utilizalo cuando sepas que siempre habrá al menos un segmento._**

#### **¿Cuándo usar** `**[...slug]**`**?**

- Cuándo esperas múltiples niveles en una ruta.

- Cuando tiene la ruta tiene al menos un segmento.
- Cuándo quieres centralizar el manejo de rutas dinámicas anidadas.
- Para páginas de documentación, menús, etc.

### `[[...slug]]` – **Optional Catch-all**

`[...slug]` permite capturar opcionalmente **cero o más segmentos dinámicos** en una sola ruta. Ideal cuando puede tener o no parámetros y además no conoces cuántos niveles tendrá una URL. Por ejemplo: `/store`, `/store/mens` , `/store/mens/shirts`, etc.

Cuando no hay segmentos, `params.slug` será `undefined`, y puedes utilizar alguna validación para manejarlo como arreglo vacío.

#### **¿Cómo se crean?**

La estructura es muy similar al segmento dinámico `slug`:

- Crear una carpeta con el nombre de la ruta deseada, nombrandola entre corchetes con tres puntos `[[...slug]]`.

- Dentro de esa carpeta, crea un archivo llamado `page.tsx`.
- Exporta un componente de React por defecto.
- Accede al parámetro dinámico desde params en el componente de página como un arreglo `string[]`

#### **Ejemplo**

```yaml
src/app/store/[[...slug]]/page.tsx → /store
src/app/store/[[...slug]]/page.tsx → /store/mens
src/app/store/[[...slug]]/page.tsx → /store/woman
src/app/store/[[...slug]]/page.tsx → /store/woman/dress
```

```js
// src/app/store/[[...slug]]/page.tsx

interface PageParams {
  slug?: string[];
}

// La propiedad params es asincrónica, por lo que se debe tratar como promesa
interface StorePageProps {
  params: Promise<PageParams>;
}

export default async function StorePage({ params }: StorePageProps) {
  // Desestructuramos el `slug` de params, ya que es una promesa
  const { slug } = await params;

  // Validamos si `slug` está definido, de lo contrario mostramos un mensaje predeterminado
  const fullPath = slug ? slug.join('/') : 'Inicio';

  if (!slug) {
    return (
      <p className="text-lg">Estás en la página principal de la tienda.</p>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Tienda: {fullPath}</h1>
      <p className="text-lg">Ruta completa: /store/{fullPath}</p>
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/store
http://localhost:3000/store/mens
http://localhost:3000/store/mens/dress
```

![](https://cdn-images-1.medium.com/max/1600/1*mpp2XSsFC1MIuVlet6qX3g.gif)

```yaml
app/store/[...slug]/page.js
→ /store
→ undefined

app/docs/[...slug]/page.js
→ /store/mens
→ ['mens']

app/docs/[...slug]/page.js
→ /store/mens/shoes
→ ['mens','shoes']
```

#### **¿Cómo funcionan?**

Cuando accedes a una ruta como `/store/mens/shoes`, Next.js:

- Detecta que `[[...slug]]` es una ruta dinámica con **ninguno**, **uno o más segmentos dinámicos**.

- Extrae en un arreglo los parámetros que tiene `params.slug`.
- Ejecuta el componente en `page.tsx`.
- Renderiza la página con el contenido basado en el slug

> **Importante**: Cuando no se manda algún segmento va a retornar `_undefined_`, así que debes validarlo. **Utilízalo cuando quieras una máxima flexibilidad y aceptar rutas vacías.**

#### **¿Cuándo usar** `**[[...slug]]**`**?**

- Cuando la ruta raíz (ej. `/store`) debe renderizar **algo por defecto.**

- Cuando quieres que la ruta y cualquier subruta usen el mismo componente (ej. `/store` o `/store/a/b/c`)
- Ideal para mostrar contenido por niveles y una vista inicial vacía o genérica.

---

> **Nota:** En los ejemplos anteriores (`[slug]`, `[...slug]`, `[[...slug]]`) utilizamos `_await params_`, lo cual **aplica para componentes que se ejecutan en el servidor** (SSR o SSG), para componentes **del lado del cliente (CSR)**, se debe utilizar el hook `_useParams_` de Next.js.

**Resumiendo…**

![](https://cdn-images-1.medium.com/max/1600/1*qMBsOrBWENQtdHVEDnEaqw.png)

---

Hasta este punto, has comprendido las **rutas avanzadas** como `[slug]`, `[...slug]` y `[[...slug]]`. También sabes identificar las diferencias entre cada una de ellas y en qué casos utilizar cada tipo según la estructura y necesidades de tu aplicación.

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
git checkout advanced-dynamic-routes
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
