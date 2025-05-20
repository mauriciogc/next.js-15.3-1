# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Next.js— Renderizado híbrido (CRS, SSR, SSG)

### Renderizado híbrido

Una de las principales características de _Next.js_ es su **renderizado híbrido**, lo que significa que puedes **elegir** cómo se **renderiza** cada **página** en función del caso de uso:

- Del lado del cliente — CSR (Client Side Rendering).
- Del servidor — SSR (Server Side Rendering).
- De forma estática — SSG (Static Site Generation).

> Nota: Para los ejemplos vamos a utilizar la API **JSON Placeholder**[[ref](https://jsonplaceholder.typicode.com/)] para simular la carga de publicaciones.

#### CSR (Client Side Rendering)

##### **El enfoque es el siguiente**

- El **navegador** **solicita** la **página** y **recibe** un **HTML** **vacío**.

- El **navegador** **descarga** el **Javascript** necesario.
- **React** se encarga de **mostrar** el todo el **contenido** en el **cliente** (navegador del usuario).

##### **Es útil cuando**

- Los **datos** se **obtienen** **después** de que la **página** se ha **cargado** usando `useEffect`.
- **Cambia** **frecuentemente** el contenido.
- **El SEO no es una prioridad.**
- Se busca una experiencia dinámica o interactiva del lado del cliente.

Este enfoque es muy similar a lo que harías con la herramienta `create-react-app`, donde todo ocurre después de que el navegador carga la aplicación.

##### **Funcionamiento**

- El componente se marca como `'use client'` (**Obligatorio**).

- El contenido se genera **después** de que la app se monta en el navegador.
- No hay prerendering en el servidor.

##### **Ejemplo:**

```yaml
src/app/csr/page.tsx
```

```js
// src/app/csr/page.tsx

// ***Obligatorio: Componentes que se ejecutan en el navegador***
'use client';

import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function CSRPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamada a la API para obtener los datos
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-4">Cargando...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">CSR – Client Side Rendering</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/csr
```

![](https://cdn-images-1.medium.com/max/1600/1*GpyXRkwdTrjNyZS4ZZogaQ.gif)

#### SSR (Server Side Rendering)

##### **El enfoque es el siguiente**

- El **servidor** **genera** el **HTML completo** en cada solicitud (request).

- El **contenido** ya está **renderizado** **antes** de enviarlo al navegador.

##### **Es útil cuando**

- El **contenido** es **dinámico**, **cambia** **seguido** o **depende** del **usuario**.

- Necesitas que los **datos** estén listos **antes de mostrar la página**.
- Excelente para **SEO**, ya que el contenido está disponible desde el HTML inicial.

##### **Funcionamiento**

- La función `page.tsx` es asíncrona (`async`).

- Se ejecuta en el servidor en cada request.
- El HTML se genera en tiempo real y se envía prerenderizado.

##### **Ejemplo:**

```yaml
src/app/ssr/page.tsx
```

```js
// src/app/ssr/page.tsx

interface Post {
  id: number;
  title: string;
  body: string;
}

// Función para obtener los datos en el servidor en cada request
async function getPosts(): Promise<Post[]> {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=5'
  );
  if (!res.ok) throw new Error('Error al cargar posts');
  return res.json();
}

export default async function SSRPage() {
  try {
    const posts = await getPosts();

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">SSR - Server Side Rendering</h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error('Error al cargar los posts:', error);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>No se pudieron cargar los posts.</p>
      </div>
    );
  }
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/ssr
```

![](https://cdn-images-1.medium.com/max/1600/1*uA54JBjkEXOj8XAO_tmk6A.png)

#### SSG (Static Site Generation)

##### **El enfoque es el siguiente**

- El contenido se **genera** **una sola vez** durante el build (`npm run build`).

- El **HTML** **generado** se muestra como un **archivo** **estático** en cada visita.

##### **Es útil cuando**

- El contenido que **no cambia con frecuencia**.

- Se busca una experiencia rápida para el usuario.
- Excelente para **SEO**, ya que el contenido está disponible desde el HTML inicial.

##### **Funcionamiento**

- La función de la página es `async`.

- Se ejecuta **durante la etapa de build** y los datos se cachean.
- Se puede controlar la revalidación manualmente (`revalidate`, `cache`).

##### **Ejemplo:**

```yaml
src/app/ssg/page.tsx
```

```js
// src/app/ssg/page.tsx

interface Post {
  id: number;
  title: string;
  body: string;
}

// Función para obtener los datos en el servidor en cada request
async function getPosts(): Promise<Post[]> {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=5',
    {
      // ***Obligatorio** Asegura que se cachea la respuesta como estática
      // Ya sea que se ponga false o se agregue tiempo
      next: { revalidate: false },
    }
  );
  if (!res.ok) throw new Error('Error al cargar posts');
  return res.json();
}

export default async function SSRPage() {
  try {
    const posts = await getPosts();

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          SSG - Static Site Generation
        </h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error('Error al cargar los posts:', error);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>No se pudieron cargar los posts.</p>
      </div>
    );
  }
}
```

Al iniciar el servidor (`npm build && npm run start`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/ssg
```

Si revisas el directorio generado después del build en `/.next/server/app/`, podrás observar que Next.js ha creado un archivo llamado `ssg.html`.

Este archivo representa el contenido **generado de forma estática** durante el proceso de `npm run build`, y será cargado directamente a los usuarios en cada solicitud, sin necesidad de regenerarlo dinámicamente.

![](https://cdn-images-1.medium.com/max/1600/1*WPH0vljujm54BjLaEp-alQ.png)

![](https://cdn-images-1.medium.com/max/1600/1*dRSJmnuLAmDhGxZp3Zi6TQ.png)

---

### ¿**CSR (Client Side Rendering) o SSR (Server Side Rendering)?**

Aunque CSR y SSR pueden parecer **similares** ya que ambas **ejecutan** **código** y hacen **llamadas** a **APIs**, realmente **hay una diferencia clave**: **el momento y el lugar donde ocurre el renderizado**.

```js
// CSR
'use client';
useEffect(() => {
  fetch('https://api.com/data'); // Se ejecuta en el navegador
}, []);

// SSR
export default async function Page() {
  const res = await fetch('h...'); // Se ejecuta en el servidor
}
```

Veamos la siguiente tabla:

![](https://cdn-images-1.medium.com/max/1600/1*qSMW02kBzxhcDYR0jGnjig.png)

#### **Usa CSR cuando**

- Necesitas datos o estado del navegador `localStorage, sessionStorage, navigator`)
- Temas con el cambio de idioma, modo oscuro, autenticación local.
- El contenido cambia al interactuar con el usuario.
- No necesitas prerenderizar datos para buscadores.

#### **Usa SSR cuando**

- Quieres que el contenido esté disponible desde el principio para SEO
- Necesitas que los datos estén siempre actualizados en cada request.
- La página depende de cookies seguras o headers del request.

### **CSR, SSR, SSG. ¿Cuál es la mejor opción?**

![](https://cdn-images-1.medium.com/max/1600/1*A82EhYLOde6ZzL1zYUM8fA.png)

---

Hasta este punto, has aprendido cómo funciona el **renderizado híbrido en Next.js (CSR** , **SSR** y **SSG)**. También sabes identificar cuándo una página se está renderizando en el cliente o en el servidor.

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
git checkout hybrid-rendering
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
