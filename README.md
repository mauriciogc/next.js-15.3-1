# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Rutas en Next.js

En _Next.js_, cada **carpeta** dentro de `/app` **representa una ruta** de la aplicación.

### Rutas estáticas

Son páginas cuyas **rutas no cambian**, están definidas. Por ejemplo: `/, /about, /contact, /faq, /ssg, etc.`

#### Ventajas de las rutas estáticas:

- SEO: Como son conocidas, se pueden generar como HTML estático.

- Pueden ser renderizadas con SSG (build), por lo que su carga será mucho más rápida.
- Al ser estáticas no aceptan parámetros externos como las rutas dinámicas.

#### ¿Cómo se crean?

Las rutas _estáticas_ se crean exactamente igual que una página:

- Crear una carpeta con el nombre de la ruta deseada

- Dentro de esa carpeta, crea un archivo llamado `page.tsx`
- Exporta un componente de React por defecto.

#### ¿Cómo funcionan?

_Next.js_ con **App Router** analiza la carpeta `/app` y genera automáticamente las rutas, es decir al ejecutar `npm run dev`, _Next.js_ hace lo siguiente:

- Mapea todas las carpetas que estén dentro de `/app` y tengan el archivo `page.tsx` como rutas.

- Genera el HTML y JavaScript necesario.
- Decide si renderiza como **CSR** (cliente), **SSR** (tiempo real), **SSG** (build) o según como hayas escrito el código.

> **Nota**: Los tipos de renderización los vamos a revisar a fondo más adelante.

#### Ejemplo

```yaml
src/app/contact/page.tsx → /contact
```

```js
// src/app/contact/page.tsx

export default function ContactPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Contáctanos!!</h1>
      <p>
        Estamos para ayudarte :). Escríbenos si tienes alguna duda o sugerencia.
      </p>
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/contact
```

![](https://cdn-images-1.medium.com/max/1600/1*atK3bwbGnAWlbR-mwlvbGA.png)

### Rutas estáticas anidadas

Las rutas estáticas anidadas no son otra cosa que un ruta estática que se encuentra **dentro de otra carpeta estática**. Es decir, representa un **nivel jerárquico más profundo**. Ejemplo: `products/mens, products/woman, docs/getting-started, etc`.

#### Ventajas de las rutas estáticas

- Permite estructurar la app por secciones y subsecciones de forma clara y escalable.

- La URLs son predecibles y amigables para motores de búsqueda (SEO-friendly).
- Puedes tener layouts anidados para compartir diseño entre rutas relacionadas.
- Ideal para secciones grandes con multiples páginas y subsecciones (`/docs/..., /products/..., etc`)

#### ¿Cómo funcionan?

_Next.js_ con **App Router** analiza la carpeta `/app` y genera automáticamente las rutas:

- Mapea todas las carpetas y subcarpetas que estén dentro de `/app`.

- Cada carpeta representa **una parte del path en la URL**.
- Solo **considera** una carpeta como parte de una **ruta si _co-localiza_** archivos especiales, el resto las ignora.

#### Ejemplo:

```yaml
src/app/dashboard/settings/page.tsx → /dashboard/settings
```

```js
// src/app/dashboard/settings/page.tsx

export default function SettingsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Configuración</h1>
      <p>Ajusta tus preferencias...</p>
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/dashboard/settings
```

![](https://cdn-images-1.medium.com/max/1600/1*4uVWVvSwdZ8EIyhMtsnmKw.png)

Ahora intenta acceder a:

```yaml
http://localhost:3000/dashboard
```

Podrás observar el mensaje de error: `404 | This page could not be found.`

![](https://cdn-images-1.medium.com/max/1600/1*rr4jTTuIJCQ6c2jWOXJ6xA.png)

El comportamiento se le conoce como **_colocation_** [[ref](https://nextjs.org/docs/app/getting-started/project-structure#colocation)], lo que significa que **Next.js solo genera una ruta si la carpeta contiene archivos relevantes** (`page.tsx` o `route.tsx`) **para esa ruta**. Así evita que carpetas vacías generen rutas innecesarias.

Aunque la estructura está definida a través de carpetas, **una ruta no es accesible públicamente** hasta que se agrega un archivo especial.

![](https://cdn-images-1.medium.com/max/1600/1*NLVjTa2PH10Pf5VHBTmXAg.png)

La ruta se hace pública cuando devuelve una `page.tsx` o `route.tsx`

![](https://cdn-images-1.medium.com/max/1600/1*xO-91WR1XdE2ZMnqjG99Fg.png)

Si una carpeta **no contiene ninguno de los archivos especiales** que Next.js reconoce, será **ignorada automáticamente** y **no generará una ruta**.

![](https://cdn-images-1.medium.com/max/1600/1*rZXEDqrVeSy0CBD1CwnXpA.png)

Esto ayuda a evitar errores y asegura que **solo las carpetas válidas se conviertan en rutas accesibles**.

> **Nota**: Aunque es posible colocar archivos no especiales (como componentes, estilos, funciones utilitarias o peticiones API) dentro del directorio `/app`, **no se recomienda hacerlo**. Como buena práctica, se sugiere mantener estos elementos **fuera del directorio** `**/app**`, en carpetas como `/components`, `/lib`, `/styles`, etc., para mantener una estructura modular, limpia y más fácil de mantener.

---

## Ejecutar el proyecto

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
git checkout static-routes
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
