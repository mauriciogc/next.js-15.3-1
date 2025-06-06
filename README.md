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

## next.config.js (parte IV)

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

### Server Actions

#### `serverActions` — [[ref](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions)]

**¿Qué es?**  
Permite configurar **acciones ejecutadas directamente en el servidor** mediante funciones marcadas con `"use server"` y llamadas desde componentes React o formularios con `formAction`. Esta configuración controla aspectos clave de su **seguridad, rendimiento y comportamiento interno**.

> Las Server Actions están habilitadas por defecto desde Next.js 14. La configuración te permite ajustar el comportamiento según tus necesidades.

**Configuraciones:**

- `allowedOrigins`— **Restringe qué orígenes (domains)** pueden invocar una Server Action. Esto es **clave para prevenir ataques CSRF**, especialmente si usas proxies, middleware externo o UIs embebidas. Por defecto, **solo el mismo origen (`same-origin`).**
- `boduSizeLimit` — Define el **tamaño máximo del body que puede enviarse a una Server Action**. Su objetivo es mitigar abuso por payloads excesivos o ataques DoS. Por defecto: `1MB`.

**Ejemplo:**

```js
// next.config.js

module.exports = {
  experimental: {
    serverActions: {
      allowedOrigins: ['http://localhost:3000'], // Imaginando que usas un frontend externo
      bodySizeLimit: '2mb',
    },
  },
};
```

```js
// app/contact/actions.ts
'use server';

export async function handleContact(formData: FormData) {
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();
  const message = formData.get('message')?.toString();

  if (!name || !email || !message) {
    throw new Error('Todos los campos son obligatorios');
  }

  // Simulación de un guardado o llamado a base de datos
  console.log('Nuevo mensaje de contacto:', { name, email, message });

  // Podrías agregar aquí lógica para enviar correo o guardar en DB
}
```

```js
// app/contact/page.tsx

import { handleContact } from './actions';

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contacto</h1>
      <form action={handleContact} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            name="name"
            type="text"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Correo</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Mensaje</label>
          <textarea
            name="message"
            rows={4}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
```

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000/contact`.

![](https://cdn-images-1.medium.com/max/1600/1*SDwcGA_jP9KxvCcT2ENxlg.png)

> **Descarga los ejemplos [**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/next-config)**] (branch: next-config)**

Al darle al botón “Enviar”, en el servidor verás lo siguiente:

![](https://cdn-images-1.medium.com/max/1600/1*45BovH-vNPxPEpJWuEXrvQ.png)

- El formulario se procesa **directamente en el servidor**, sin JS extra.

- No necesitas `fetch`, `useEffect`, ni `API routes`.
- Todo se maneja con HTML + Server Actions puras.
- Puedes combinar con redirección, feedback UI o estado compartido.

**Ejemplo 2 — Validación de formulario con `zod` y `useActionState`**

```js
// lib/zod-schemas.ts

import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(2, 'Nombre demasiado corto'),
  email: z.string().email('Correo no válido'),
  message: z.string().min(10, 'Mensaje demasiado corto'),
});

export type ContactInput = z.infer<typeof ContactSchema>;
```

```js
// app/other-contact/types.ts

export type ContactState = {
  success: boolean,
  errors: {
    name?: string[],
    email?: string[],
    message?: string[],
  },
  fields: {
    name: string,
    email: string,
    message: string,
  },
};
```

```js
// app/other-contact/actions.ts

'use server';

import { ContactSchema } from '@/../lib/zod-schemas';
import type { ContactState } from './types';
//import { prisma } from '@/lib/prisma';

export async function submitContact(
  prevState: any,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get('name')?.toString() || '',
    email: formData.get('email')?.toString() || '',
    message: formData.get('message')?.toString() || '',
  };

  const result = ContactSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      fields: raw,
    };
  }

  const { name, email, message } = result.data;
  console.log('Nuevo mensaje de contacto:', { name, email, message });

  // Podrías agregar aquí lógica para enviar correo o guardar en DB
  /*  
  await prisma.contactMessage.create({  
    data: { name, email, message },  
  });  
  */

  return {
    success: true,
    errors: {},
    fields: {
      name: '',
      email: '',
      message: '',
    },
  };
}
```

```js
// app/other-contact/page.tsx
'use client';

import { useActionState } from 'react';

import { submitContact } from './actions';
import type { ContactState } from './types';

const initialState: ContactState = {
  success: false,
  errors: {},
  fields: {
    name: '',
    email: '',
    message: '',
  },
};

export default function ContactPage() {
  const [state, formAction] = useActionState(submitContact, initialState);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contáctanos</h1>

      {state.success && (
        <div className="p-3 bg-green-100 text-green-800 rounded mb-4">
          Mensaje enviado correctamente
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            name="name"
            className="w-full border px-3 py-2 rounded"
            defaultValue={state.fields.name}
          />
          {state.errors?.name && (
            <p className="text-red-600 text-sm mt-1">{state.errors.name}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Correo</label>
          <input
            name="email"
            type="email"
            className="w-full border px-3 py-2 rounded"
            defaultValue={state.fields.email}
          />
          {state.errors?.email && (
            <p className="text-red-600 text-sm mt-1">{state.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Mensaje</label>
          <textarea
            name="message"
            rows={4}
            className="w-full border px-3 py-2 rounded"
            defaultValue={state.fields.message}
          />
          {state.errors?.message && (
            <p className="text-red-600 text-sm mt-1">{state.errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
```

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000/other-contact`.

![](https://cdn-images-1.medium.com/max/1600/1*0NzC0OdX4SwbygN7ucLs6A.gif)

> **Descarga los ejemplos [**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/next-config)**] (branch: next-config)**
