# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Intercepting Routes

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-3)**] (branch: base-project-3).** Este proyecto incluye actualización visual y estructural de estilos utilizando TailwindCSS v4.

### ¿Qué son?

**Intercepting Routes** es una funcionalidad del App Router de Next.js 15+ que permite **renderizar rutas específicas sin romper el contexto visual actual**, interceptando el comportamiento natural de navegación.

Su propósito principal es **mejorar la experiencia del usuario** al permitir cosas como:

- Mostrar el detalle de una imagen sin salir del feed.

- Ver un mensaje en un modal sin salir de la bandeja de entrada.
- Autenticación (login/signup) sin abandonar la vista actual.
- Vista previa de una película o episodio sin desmontar el layout.
- Formularios, settings, onboarding paso a paso sin romper la navegación previa.

En lugar de que el router navegue completamente a `/login`, puedes interceptar esa navegación y **mostrar** `/login` **como overlay mientras sigues en** `/about`.

### Principales características

- **Intercepción no destructiva:** no rompe la navegación base.

- **Contextualización dinámica:** puedes mostrar una ruta desde un contexto distinto.
- **Ideal para modales, drawers, popovers, overlays.**
- Se usa en **conjunto** con **Parallel** **Routes** (`@slot`) para inyectar la vista interceptada.
- **Compatible** con `loading.tsx`, `error.tsx`, `not-found.tsx` por slot.
- **Fallback automático**: si accedes directamente, se renderiza la ruta completa.
- Utiliza prefijos como `(.)`, `(..)`, `(...)` para navegar desde layouts relativos.

### Tipos de Intercepted Routes (segmento relativo)

![](https://cdn-images-1.medium.com/max/1600/1*_flnE1Op8wLJulFvb_NrOQ.png)

Estas rutas **no modifican la URL** de forma diferente: modifican **dónde se renderiza** el contenido interceptado, manteniendo la jerarquía del layout base.

### Ventajas

- **Mejora la UX** sin sacrificar accesibilidad ni enlaces profundos.

- **Mantiene el layout actual intacto** al abrir vistas paralelas.
- **Permite composición modular avanzada** con navegación declarativa.
- **Evita doble renderizado o hacks con modales manuales.**
- **Mejora** el **rendimiento** **evitando** **recargas** **innecesarias**.
- **Reemplaza soluciones client-only:** Evita `useState` y `router.back()` para manejar modales, y en su lugar usa rutas reales, navegables y deep-linkeables con `Link` o `router.push`.
- **Ideal para diseño tipo Instagram, Twitter, Gmail, Spotify, etc.**

### ¿Cómo se crea o implementa?

Define una ruta interceptada usando el prefijo `(` y `)`

#### `(.)segment` — Interceptar en el mismo nivel

- **Ruta real:** `/gallery/photos/[id]`

- **Ruta interceptada desde:** `/gallery`
- **¿Qué hace?** Intercepta la ruta `/gallery/photos/[id]` en el mismo nivel sin desmontar `gallery/page.tsx`
- **Ideal** para modales tipo “mostrar detalles” sin salir del perfil principal.

![](https://cdn-images-1.medium.com/max/1600/1*yfzDST8eBLGMr0K1adnDNA.png)

![](https://cdn-images-1.medium.com/max/1600/1*2cTPcKy3RgUEZlxlauEG0g.png)

#### `(..)segment` — Interceptar un nivel arriba

- **Ruta real**: `/p/[reelId]`

- **Ruta interceptada desde:** `/reels`
- **¿Qué hace?** Intercepta la ruta `/p/[reelId]` en el mismo nivel sin desmontar `/reels/page.tsx`
- **Ideal** en flujos como “ver mensaje” + “responder en overlay”.

![](https://cdn-images-1.medium.com/max/1600/1*0WWh4fJOvOWjHKcJkcTKpw.png)

![](https://cdn-images-1.medium.com/max/1600/1*amecZNnGUzhpx1V8OBmJrw.png)

#### `(..)(..)segment` — Interceptar dos niveles arriba

- **Ruta real**: `/tasks/[tasksId]`

- **Ruta interceptada desde**: `/projects/[projectId]`
- **¿Qué hace?** Intercepta la ruta `/taks/[tasksId]` en el mismo nivel sin desmontar `/projects/[projectId]/page.tsx`
- **Ideal** para contextos de edición o configuración avanzada desde vistas internas.

![](https://cdn-images-1.medium.com/max/1600/1*vdqOO80l66CJN3s8Eec5eg.png)

![](https://cdn-images-1.medium.com/max/1600/1*7q25lW8VL5Nt-OkD3ex4nQ.png)

#### `(...)segment` — Interceptar desde la raíz del proyecto

- **Ruta real:** `/login`

- **Ruta interceptada desde**: `/reels`, `/projects`, `/projects/abc/task/123`
- **¿Qué hace?** Renderiza el login **como modal global** sobre cualquier layout.
- **Ideal** para flujos de auth persistente sin romper navegación actual.

![](https://cdn-images-1.medium.com/max/1600/1*3zJnk49nVagHhz3ruVfG9A.png)

![](https://cdn-images-1.medium.com/max/1600/1*p24hmHlp869iP3QwhHTRqA.png)

### ¿Cómo funciona?

Cuando defines una ruta interceptada como:

```bash
/app/reels/(..)reel/[reelId]/page.tsx
```

Estás indicando al sistema de routing de Next.js que:

Cuando el usuario esté en `/reels` y navegue a `/p/[reelId]`, no se debe desmontar el layout actual. En cambio, **intercepta** esa navegación y **renderiza** el contenido de `/p/[reelId]` **dentro del layout activo** de `/reels`.

![](https://cdn-images-1.medium.com/max/1600/1*hTkDOqH-KH37CTYL_jyleQ.png)

Este comportamiento es posible gracias a tres elementos clave del App Router:

#### Segment Matching Tree

Next.js construye un árbol interno de rutas, donde cada nivel representa una carpeta (`segment`). Cuando encuentra una ruta interceptada cómo `(..)p`, **resuelve la ruta “real”** (`/p/[reelId]`) pero la inyecta dentro del slot actual, usando el layout donde fue definida.

####  Slot Matching Context

El slot donde se renderiza la ruta interceptada **depende del layout activo** y del archivo `layout.tsx` de donde se intercepta.

Esto es importante:

- La ruta original (`/p/[reelId]`) **no se monta como nueva vista.**

- El layout actual **permanece montado.**
- El contenido interceptado se **inyecta en el mismo layout**, como si fuera un slot más.

En el DOM y la navegación del usuario, eso se percibe como **un modal, panel lateral o superposición**, sin perder el contexto.

####  Route Resolution Layer

Next.js internamente:

- Detecta que el segmento interceptado tiene prefijos especiales `(.)`, `(..)`, `(...)`.
- Calcula la **ruta base de resolución** según la profundidad.

- Determina la ruta “real” que se intercepta (`(..)p/[reelId]` = `/p/abc123`).
- Renderiza `(..)p/[reelId]/page.tsx` **dentro del layout que lo intercepta**.

### A considerar

- Usa `(.)`, `(..)`, `(...)` solo cuando sea necesario. Evita abusar del prefijo si no necesitas mantener el layout activo. Si la navegación puede ir directamente, no interceptes por defecto.

- Siempre incluye un botón/cierre con `router.back()`. En modales interceptados, **no uses** `Link` **para cerrar**. Usa el historial para volver.
- Usa `default.tsx` para estados vacíos. Cuando interceptes rutas opcionales o contextuales, ten un fallback.

### Errores comunes

- **No declarar layout en la ruta interceptora**: Asegúrate de tener `layout.tsx` que renderice el slot.

- **No manejar cierre** (`router.back`): Usa historial para navegación reversible.
- **No incluir** `default.tsx` **en segmentos opcionale**s: Evita que se rompa el slot si no hay nada.
- **Tratar de compartir layouts entre intercepts**: Cada intercept debe tener su scope claro.
- **Esperar que el layout de la ruta destino se renderice**: Solo se renderiza desde el contexto original.

---

#### **Hasta este punto…**

Has entendido que **Intercepting Routes** te permite capturar una navegación y renderizarla en un layout distinto, sin afectar el contexto actual. Esta técnica permite experiencias ricas, fluidas y modernas, similares a las de apps móviles o SPAs complejas, **sin romper la arquitectura de rutas**.

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
git checkout intercepting-routes
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
