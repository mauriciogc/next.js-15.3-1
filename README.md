# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Páginas con Next.js

_Next.js_ utiliza **enrutamiento** **basado** en el **sistema** de **archivos** , lo que significa que puedes usar **carpetas y archivos para definir rutas**.

Una **página** en _Next.js_ representa una interfaz de usuario que se renderiza en una ruta específica del sitio [[ref](https://nextjs.org/docs/app/getting-started/layouts-and-pages#creating-a-page)].

Para crear una página, debes agregar un archivo `page.tsx` dentro del directorio `/app` y exportar un componente de React.

```js
export default function ExamplePage() {
  return <h1>Esta es una página de ejemplo en Next.js!</h1>;
}
```

> **Nota**: El proyecto genera una página por default en `_/app_`

### Crear una página

Para crear una página nueva en Next.js, debes tener en cuenta los siguientes pasos:

- Crear una carpeta con el nombre de la ruta deseada
- Dentro de esa carpeta, crea un archivo llamado `page.tsx`
- Exporta un componente de React por defecto.

Vamos a crear una página que va a estar disponible desde la ruta [http://localhost:3000/about](http://localhost:3000/about)

Crea la carpeta y el archivo:

```yaml
src/app/about/page.tsx
```

Dentro de `page.tsx` :

```js
// src/app/about/page.tsx

export default function AboutPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Acerca de Nosotros</h1>
      <p>Esta es la página de información general.</p>
    </div>
  );
}
```

Al iniciar el servidor (`npm run dev`), podrás acceder a esta página visitando:

```yaml
http://localhost:3000/about
```

![](https://cdn-images-1.medium.com/max/1600/1*O2FBWZvHALauz18iAvqxBA.png)

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
git checkout simple-page
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
