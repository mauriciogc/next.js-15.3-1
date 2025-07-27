# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-15%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Internacionalización (i18n)

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-4)**] (branch: base-project-4).** Este proyecto incluye actualización visual y estructural de estilos utilizando TailwindCSS v4.

### ¿Qué es?

Es una funcionalidad del App Router que permite construir aplicaciones multilenguaje, adaptando dinámicamente rutas, contenido, metadatos y recursos según el idioma seleccionado o detectado.

Desde la versión 13 y mejorado en la 15+, el sistema `i18n` se integra profundamente con el enrutamiento del App Router usando **segmentos dinámicos** (`[locale]`), soportando generación estática `SSG`, redirecciones automáticas vía `middleware`, y control completo sobre la carga de mensajes, rutas y metadatos por idioma.

### ¿Por qué es relevante?

- **SEO internacional moderno** exige rutas separadas por idioma (y no solo traducción in-place).

- La **UX globalizada** necesita contenido adaptado a cada mercado sin duplicar código.
- Next.js 15+ lo **integra profundamente sin librerías externas obligatorias** (aunque se pueden usar).
- **Herramientas como Vercel**, Cloudflare o Netlify permiten despliegue multiregión, y esto encaja perfectamente con un sistema i18n eficiente.

### ¿Cómo se crea o implementa?

Lo que se busca es **mantener la fuente de traducción centralizada, pero accesible tanto desde el servidor como desde el cliente, sin duplicar lógica ni romper la separación de entornos.**

#### Principios clave

- Separación de responsabilidades (middleware, servidor, cliente).

- Locales definidos explícitamente en un solo punto (`i18n-config.ts`).
- Traducciones cargadas por servidor o por contexto, según el caso.
- Navegación persistente con idioma en la URL (`/es`, `/en`, etc.).
- Middleware inteligente para detectar y redireccionar idioma inicial.

#### Estructura y responsabilidades

#####  — `/middleware.ts`

Se busca que intercepte la primera petición sin idioma (`/`), inspeccione cabeceras (`Accept-Language`) y otros factores, para redirigir a un `locale` válido (`/es`, `/en`, etc.).

Con esto se busca garantizar que toda navegación inicie con un `pathname` segmentado por idioma, lo cual permite a los componentes servidor leer `params.lang` de forma consistente.

#####  —`src/i18n/dictionaries/`

Almacena los archivos de traducción por idioma (`en.json`, `es.json`, etc).

#####  —`src/i18n/get-dictionary.ts`

Función **de servidor** para obtener el diccionario por idioma. También incluye un _translator factory_ que permite `t('home.title')` en componentes servidor.

#####  —`src/i18n/i18n-config.ts`

Define los idiomas a soportar (`locales`) y el idioma por default (`defaultLocale`).

#####  —`src/context/translation-context.tsx`

Define un `React Context` que mantiene en memoria:

- Idioma actual.

- Diccionario correspondiente.
- Función `t()` para traducir.

> **Importante:** este contexto **sólo está disponible en el cliente**.

#### Flujo de configuración

![](https://cdn-images-1.medium.com/max/1280/1*sIqWEMUJjekmxkmrKP-img.png)

Antes de renderizar cualquier contenido, el archivo `middleware.ts` intercepta las rutas. Su objetivo principal es detectar el idioma del usuario, ya sea desde el `pathname` o cabeceras `Accept-Language`, para redirigir la solicitud a la ruta adecuada (`/es`, `/en`, etc.).

Una vez redirigido, el archivo `layout.tsx` correspondiente a cada idioma (`src/app/[lang]/layout.tsx`) entra en acción. Este layout:

- Recibe el parámetro `lang` desde los `params`.

- Llama al helper `getDictionary(lang)` en el servidor, que carga el archivo de traducción correcto (`es.json`, `en.json`, etc.).
- Inicializa el `<TranslationProvider>` en cliente, inyectando el idioma activo y su diccionario al contexto para su posterior uso en componentes interactivos de tipo cliente.

En las páginas servidoras (`page.tsx` bajo `app/[lang]`), también se recibe `params.lang`. Pero en lugar de usar el contexto del cliente, estas páginas aprovechan `getDictionary()` directamente en el servidor para traducir contenido en RSC (React Server Components). Esto evita hidratar más de lo necesario en cliente, mejorando el rendimiento.

Finalmente, los componentes de cliente (`Navbar`, `Card`, o `LocaleSwitcher`, etc.) acceden a las traducciones mediante el hook `useTranslation()`. Este hook extrae tanto el idioma como el traductor (`t`) desde el `TranslationContext` previamente configurado en el layout.

Componentes como `LocaleSwitcher` pueden disparar redirecciones al cambiar el idioma, lo cual vuelve a ser interceptado por el `middleware` para asegurar coherencia.

Este diseño desacopla el acceso a las traducciones en servidor y cliente, optimizando la carga y manteniendo.

### Configuración inicial

#### Estructura mínima

Antes de comenzar, así será nuestro punto de llegada básico:

![](https://cdn-images-1.medium.com/max/1280/1*QIAfkZrf2vFqfHnlM_n71w.png)

Crea la configuración de `i18n` en `src/i18n/i18n-config.ts` :

```js
// src/i18n/i18n-config.ts

// Incluye los locales soportados y el tipo de diccionario utilizado.
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'es', 'fr'],
} as const;

// El tipo de diccionario es un objeto que puede contener cadenas, números, booleanos u otros objetos.
export type Dict = Record<string, object | string | number | boolean>;

// El tipo de Locale es uno de los locales definidos en la configuración de i18n.
export type Locale = (typeof i18n)['locales'][number];
```

Esto habilita el soporte de rutas como `/en`, `/es`, `/fr`, etc.

Crea los mensajes (diccionario) de `i18n` en `src/i18n/dictionaries` :

- En español `src/i18n/dictionaries/es.json`:

```json
{
  "locale-switcher": {
    "en": "Inglés",
    "es": "Español",
    "fr": "Frances"
  },
  "home": {
    "title": "Bienvenido",
    "description": "Esta página está configurada con soporte para múltiples idiomas gracias a la internacionalización (i18n) de Next.js. Actualmente estás visualizando el contenido en",
    "instructions": "Explora los botones disponibles para navegar por las diferentes secciones de la aplicación."
  }
}
```

- En inglés `src/i18n/dictionaries/en.json`:

```json
{
  "locale-switcher": {
    "en": "English",
    "es": "Spanish",
    "fr": "French"
  },
  "home": {
    "title": "Welcome",
    "description": "This page is configured with support for multiple languages thanks to the internationalization (i18n) of Next.js. You are currently viewing content in",
    "instructions": "Explore the available buttons to navigate through the different sections of the application."
  }
}
```

- En francés `src/i18n/dictionaries/fr.json`:

```json
{
  "locale-switcher": {
    "en": "Anglais",
    "es": "Espagnol",
    "fr": "Français"
  },
  "home": {
    "title": "Bienvenue",
    "description": "Cette page est configurée pour prendre en charge plusieurs langues grâce à l'internationalisation (i18n) de Next.js. Vous visualisez actuellement le contenu en",
    "instructions": "Explorez les boutons disponibles pour naviguer dans les différentes sections de l'application."
  }
}
```

Crea la sistema de traducción de `i18n` en `src/i18n/get-dictionary.ts`:

```js
// src/i18n/get-dictionary.ts

import 'server-only';
import type { Dict, Locale } from './i18n-config';

// Utiliza importaciones dinámicas para cargar los archivos JSON de los diccionarios
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
};

// Esta función obtiene el diccionario correspondiente al locale especificado.
// Si el locale no está disponible, retorna el diccionario por defecto (inglés).
export const getDictionary = async (locale: Locale) => {
  return (await dictionaries[locale]?.()) ?? dictionaries.en();
};

// Esta función retorna un traductor a partir del diccionario proporcionado.
export const getTranslator = async (locale: Locale) => {
  const dictionary = await getDictionary(locale);
  return createTranslator(dictionary);
};

// Esta función crea un traductor que permite acceder a las traducciones del diccionario.
// Utiliza una función interna que toma una ruta de clave y devuelve el valor correspondiente del diccionario.
// Si el valor no es una cadena, devuelve la ruta original.
function createTranslator(dictionary: Dict) {
  return function t(path: string): string {
    const result = path
      .split('.')
      .reduce((acc, key) => acc?.[key] as Dict, dictionary);
    return typeof result === 'string' ? result : path;
  };
}
```

Crea el `middleware` encargado de detectar y redirige el idioma en `src/middleware.ts`:

```js
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { i18n, type Locale } from '@/i18n/i18n-config';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const locales = i18n.locales;
  const defaultLocale = i18n.defaultLocale as Locale;
  const { pathname } = req.nextUrl;

  // Ignora archivos públicos y rutas que si tengan en el path el idioma
  if (
    PUBLIC_FILE.test(pathname) ||
    locales.some((loc) => pathname.startsWith(`/${loc}`))
  ) {
    return;
  }

  // Detecta el idioma del header y valida
  const acceptLang = req.headers.get('accept-language') || '';
  const preferred = acceptLang.split(',')[0].split('-')[0];
  const locale = locales.includes(preferred as Locale)
    ? preferred
    : defaultLocale;

  // Redirige a la ruta con el idioma detectado
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
}

// Configuración del middleware para que se aplique a todas las rutas excepto a
// las de la API y archivos estáticos
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
```

Crea el sistema de traducción para los client component en `src/context/translation-context.tsx`:

```js
// src/context/translation-context.tsx
'use client';

import { createContext, useContext, useCallback, type ReactNode } from 'react';
import type { Dict, Locale } from '@/i18n/i18n-config';

type TranslationContextValue = {
  t: (path: string) => string;
  lang: string;
};

const TranslationContext = createContext<TranslationContextValue | null>(null);

type Props = {
  children: ReactNode;
  dictionary: Dict;
  lang: Locale;
};

// Componente que provee el contexto de traducción
// Recibe el diccionario y el idioma actual como props
export function TranslationProvider({ children, dictionary, lang }: Props) {
  // Función para traducir un path usando el diccionario
  // Utiliza useCallback para evitar recrear la función en cada renderizado
  const t = useCallback(
    (path: string): string => {
      const result = path
        .split('.')
        .reduce((acc, key) => acc?.[key] as Dict, dictionary);
      return typeof result === 'string' ? result : path;
    },
    [dictionary]
  );

  // Provee el contexto con la función de traducción y el idioma actual
  // Esto permite que los componentes hijos puedan acceder a la función de traducción y al idioma
  // sin necesidad de pasar props manualmente
  return (
    <TranslationContext.Provider value={{ t, lang }}>
      {children}
    </TranslationContext.Provider>
  );
}

// Hook para acceder al contexto de traducción
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      'useTranslation must be used inside <TranslationProvider>.'
    );
  }
  return context;
}
```

Crea el segmento dinámico `[lang]` en `/src/app/[lang]`.

Dentro, crea el `layout.tsx` y `page.tsx` :

```js
//src/app/layout.tsx
import '../globals.css';

import { TranslationProvider } from '@/context/translation-context';
import { i18n, type Locale } from '@/i18n/i18n-config';
import { getDictionary } from '@/i18n/get-dictionary';

import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  weight: '300',
  subsets: ['latin'],
});

export const metadata = {
  title: 'i18n within app router',
  description: 'How to do i18n in Next.js 15 within app router',
};

// Esta función genera los parámetros estáticos para las rutas de idiomas
// Permite que Next.js genere rutas estáticas para cada idioma definido en i18n.locales
// Esto es útil para la generación de páginas estáticas y SEO
// Cada ruta tendrá el formato /[lang] donde lang es uno de los idiomas definidos
// Por ejemplo, si i18n.locales es ['en', 'es', 'fr'], se generarán las rutas /en, /es, /fr
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{ lang: Locale }>,
}>) {
  // Obtiene el idioma de los parámetros
  const { lang } = await params;
  // Carga el diccionario correspondiente al idioma
  const dictionary = await getDictionary(lang);

  // Renderiza el layout con el contexto de traducción y el navbar
  // El contexto de traducción provee la función de traducción y el idioma actual
  return (
    <html lang={lang} className={dmSans.className}>
      <body className="antialiased">
        <TranslationProvider dictionary={dictionary} lang={lang}>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
```

```js
// app/[lang]/page.tsx
import { getTranslator } from '@/i18n/get-dictionary';
import { Locale } from '@/i18n/i18n-config';

export default async function HomePage(props: {
  params: Promise<{ lang: Locale }>,
}) {
  // Obtiene el idioma de los parámetros
  const { lang } = await props.params;
  // Utiliza getTranslator para obtener la función de traducción que se basa en el diccionario del idioma
  const t = await getTranslator(lang);

  // Utiliza la función de traducción para obtener los textos correspondientes al idioma actual
  return (
    <main>
      <div className="container py-20 space-y-10">
        <h1 className="title">{t('home.title')}</h1>
        <p>
          {t('home.description')}
          <span className="highlight"> {lang} </span>
        </p>
        <p className="highlight">{t('home.instructions')}</p>
      </div>
    </main>
  );
}
```

Elimina el `layout.tsx` y `page.tsx` de raíz (`src/app`), ya que toda la aplicación estará dentro de `src/app/[lang]`.

Al iniciar el servidor con `npm run dev`, podrás acceder a la aplicación visitando `http://localhost:3000`

![](https://cdn-images-1.medium.com/max/1280/1*HfiZ8OmhHdxCv1K7M6ZIZw.gif)

Cuando un usuario accede a `http://localhost:3000` sin especificar un idioma, el `middleware.ts` intercepta la solicitud y automáticamente redirige al idioma preferido del navegador (por ejemplo, `es` si el idioma del navegador es español). Este comportamiento se basa en la lógica interna del middleware, que evalúa el header `Accept-Language` y valida que el idioma esté dentro de los permitidos (`en`, `es`, `fr`, etc.).

Los idiomas disponibles están previamente definidos en la configuración (`i18n-config.ts`). Si el idioma detectado está dentro de esta lista, la redirección se ejecuta correctamente: por ejemplo, `/` se convierte en `/es`, `/en` o `/fr`.

Sin embargo, si el usuario intenta acceder a un idioma que **no está registrado**, como `/it`, Next.js **no lo trata como un código de idioma válido**. En su lugar, asume que `it` es un **segmento dinámico** dentro de la ruta `[lang]`. Es decir, el el `middleware.ts` intercepta la solicitud y automáticamente redirige al idioma encontrado (navegador o header) en este caso a: `[lang]/it/page.tsx`.

#### Ejemplo con client components + página

Crea el componente que permita cambiar el idioma en `src/components/locale-switcher.tsx`:

```js
// src/components/locale-switcher.tsx
'use client';

import { TranslateIcon } from '@phosphor-icons/react/ssr';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { i18n, type Locale } from '@/i18n/i18n-config';
import { useTranslation } from '@/context/translation-context';

export default function LocaleSwitcher() {
  // Utiliza el hook useTranslation para obtener la función de traducción y el idioma actual
  // Esto permite acceder a la función de traducción y al idioma sin necesidad de pasarlos
  // como props manualmente a este componente
  const { t, lang } = useTranslation();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  // Utiliza el hook usePathname para obtener la ruta actual
  const pathname = usePathname();

  // Función para redirigir a la ruta con el idioma seleccionado
  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  // Maneja el clic fuera del dropdown para cerrarlo
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="icon-button button-ghost"
      >
        <TranslateIcon />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-48 card z-50 p-2">
          {i18n.locales.map((locale) => (
            <Link
              key={locale}
              className={`w-full button button-ghost justify-start ${
                lang === locale && 'font-bold text-(--color-primary)'
              }`}
              href={redirectedPathname(locale)}
            >
              {t(`locale-switcher.${locale}`)} ({locale})
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

> Recuerda que para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-4)**] (branch: base-project-4).** Este proyecto incluye actualización visual y estructural de estilos utilizando TailwindCSS v4.

Actualiza el `layout.tsx` principal de `/src/app/[lang]` agregando el componente `LocaleSwitcher` :

```js
//src/app/layout.tsx
import '../globals.css';

import { TranslationProvider } from '@/context/translation-context';
import { i18n, type Locale } from '@/i18n/i18n-config';
import { getDictionary } from '@/i18n/get-dictionary';
import LocaleSwitcher from '@/components/locale-switcher';

//...

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{ lang: Locale }>,
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} className={dmSans.className}>
      <body className="antialiased">
        <TranslationProvider dictionary={dictionary} lang={lang}>
          <div className="container flex justify-end pt-6">
            <LocaleSwitcher />
          </div>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
```

Al iniciar el servidor con `npm run dev`, podrás acceder a la aplicación visitando `http://localhost:3000` y cambia de idioma desde el componente `LocaleSwitcher`:

![](https://cdn-images-1.medium.com/max/1280/1*7bjyAaOp1f7xvbI4Pqd5vA.gif)

Crea el componente que para navegar a otras páginas en `src/components/navbar.tsx` , agrega la navegación a home `/[lang]`, about `/[lang]/about` y el componente `LocaleSwitcher`:

```js
// src/components/navbar.tsx
'use client';

import Link from 'next/link';
import LocaleSwitcher from './locale-switcher';
// Al ser un componente de cliente, se importa el contexto de traducción y no el de servidor.
import { useTranslation } from '@/context/translation-context';

export default function Navbar() {
  // Usa el hook de traducción para obtener el idioma actual y las funciones de traducción
  const { t, lang } = useTranslation();
  return (
    <header className="fixed top-2 left-1/2 -translate-x-1/2 z-50 min-w-md">
      <nav className="navbar">
        {/* Enlaces de navegación con idioma seleccionado */}
        <Link href={`/${lang}`} className="button button-ghost px-4">
          {t('navbar.home')}
        </Link>
        <Link href={`/${lang}/about`} className="button button-ghost px-4">
          {t('navbar.about')}
        </Link>
        <LocaleSwitcher />
      </nav>
    </header>
  );
}
```

Crea la página “Sobre nosotros” en `/src/app/[lang]/about/page.tsx`:

```js
// src/app/[lang]/about/page.tsx
import { getTranslator } from '@/i18n/get-dictionary';
import { Locale } from '@/i18n/i18n-config';

export default async function AboutPage(props: {
  params: Promise<{ lang: Locale }>,
}) {
  const { lang } = await props.params;
  const t = await getTranslator(lang);

  return (
    <main>
      <div className="container py-20 space-y-10">
        <h1 className="title">{t('about.title')}</h1>
        <h2 className="subtitle">{t('about.description')}</h2>
      </div>
    </main>
  );
}
```

Agrega los mensajes de traducción en cada archivo de idioma (`es.json`, `en.json`, etc.)

```json
{
  "navbar": {
    "about": "Sobre nosotros",
    "home": "Inicio"
  },
  "locale-switcher": {
    "en": "Inglés",
    "es": "Español",
    "fr": "Frances"
  },
  "home": {
    "title": "Bienvenido",
    "description": "Esta página está configurada con soporte para múltiples idiomas gracias a la internacionalización (i18n) de Next.js. Actualmente estás visualizando el contenido en",
    "instructions": "Explora los botones disponibles para navegar por las diferentes secciones de la aplicación."
  },
  "about": {
    "title": "Sobre nosotros",
    "description": "Transparencia, integridad y profesionalidad son los pilares de nuestra filosofía empresarial. Damos prioridad a la comunicación clara y el asesoramiento honesto, asegurando que usted está facultado para tomar decisiones informadas durante todo el proceso de compra o venta."
  }
}
```

Actualiza el `layout.tsx` principal de `/src/app/[lang]` eliminando el componente `LocaleSwitcher` y agregando el componente `Navbar` :

```js
//src/app/layout.tsx
import '../globals.css';

import { TranslationProvider } from '@/context/translation-context';
import { i18n, type Locale } from '@/i18n/i18n-config';
import { getDictionary } from '@/i18n/get-dictionary';
import Navbar from '@/components/navbar';

//...

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{ lang: Locale }>,
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} className={dmSans.className}>
      <body className="antialiased">
        <TranslationProvider dictionary={dictionary} lang={lang}>
          <Navbar />
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
```

Al iniciar el servidor con `npm run dev`, podrás acceder a la aplicación visitando `http://localhost:3000` , navega a través del menú y cambia de idioma:

![](https://cdn-images-1.medium.com/max/1280/1*Hw6zoQpHxeuPx66RTykPbA.gif)

#### Ejemplo de persistencia con cookie

Crea la librería para guardar la cookie en `/src/lib/i18n-cookie.ts`

```js
// src/lib/i18n-cookie.ts
'use server';
import { cookies } from 'next/headers';
import { i18n, type Locale } from '@/i18n/i18n-config';
const COOKIE_NAME = 'NEXT_LOCALE';

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
```

Actualiza el componente `locale-switcher.tsx` para guardar el idioma en la cookie:

```js
// src/components/locale-switcher.tsx
'use client';

import { TranslateIcon } from '@phosphor-icons/react/ssr';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { i18n, type Locale } from '@/i18n/i18n-config';
import { useTranslation } from '@/context/translation-context';
import { setUserLocale } from '@/app/lib/i18n-cookie';

export default function LocaleSwitcher() {
  const { t, lang } = useTranslation();

  const dropdownRef = useRef < HTMLDivElement > null;
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const redirectedPathname = (locale: Locale) => {
    // ...
  };

  useEffect(() => {
    //...
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="icon-button button-ghost"
      >
        <TranslateIcon />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-48 card z-50 p-2">
          {i18n.locales.map((locale) => (
            // Cambiamos el componente Link por un botón para manejar la lógica de redirección
            <button
              key={locale}
              className={`w-full button button-ghost justify-start ${
                lang === locale && 'font-bold text-(--color-primary)'
              }`}
              // Setea el locale del usuario y redirige a la ruta correspondiente
              onClick={async () => {
                await setUserLocale(locale);
                router.push(redirectedPathname(locale));
              }}
            >
              {t(`locale-switcher.${locale}`)} ({locale})
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

Actualiza el `middleware` para validar si tiene un valor la cookie:

```js
// sec/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { i18n, type Locale } from '@/i18n/i18n-config';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const locales = i18n.locales;
  const defaultLocale = i18n.defaultLocale as Locale;
  const { pathname } = req.nextUrl;

  if (
    PUBLIC_FILE.test(pathname) ||
    locales.some((loc) => pathname.startsWith(`/${loc}`))
  ) {
    return NextResponse.next();
  }

  // Valida el locale del usuario desde la cookie o el encabezado 'accept-language'
  // Si no hay cookie, usa el encabezado 'accept-language' para determinar el locale
  // Si el locale no es válido, redirige al locale por defecto
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;
  const acceptLang = req.headers.get('accept-language') || '';
  const preferred = acceptLang.split(',')[0].split('-')[0];

  const lang = cookieLocale || preferred;
  const locale = locales.includes(lang as Locale) ? lang : defaultLocale;

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
```

Al iniciar el servidor con `npm run dev`, podrás acceder a la aplicación visitando `http://localhost:3000` y cambia de idioma desde el menú:

![](https://cdn-images-1.medium.com/max/1280/1*CMjLa1RqUED6xMWGonbzgQ.gif)

Cuando un usuario cambia el idioma desde el menú, el valor seleccionado se guardará automáticamente en una cookie (`NEXT_LOCALE`).

Posteriormente, si el usuario navega por otras páginas de la aplicación, refresca la página, o incluso abre una nueva pestaña o ventana del navegador, el middleware intercepta la solicitud entrante _antes_ de que se renderice cualquier contenido, y **lee el valor de** `NEXT_LOCALE` **desde las cookies del navegador**. Si encuentra ese valor, lo utiliza para redirigir la ruta a la versión localizada correspondiente (`/es`, `/en`, etc.), manteniendo así la experiencia en el idioma preferido.

Gracias a este enfoque:

- El idioma **no se pierde entre sesiones**.

- El middleware **prioriza la cookie sobre el idioma del navegador** (cabecera `accept-language`), respetando la elección previa del usuario.
- No se requiere reconfiguración manual o almacenamiento adicional.

Este mecanismo permite una **experiencia multilenguaje fluida y consistente.**

#### Ejemplo con metadata dinámica

Actualiza el `layout.tsx` principal de `/src/app/[lang]` importando `Metadata` y agregando la función `generateMetadata`

```js
//src/app/layout.tsx
import '../globals.css';

import { TranslationProvider } from '@/context/translation-context';
import { i18n, type Locale } from '@/i18n/i18n-config';
import { getDictionary, getTranslator } from '@/i18n/get-dictionary';
import Navbar from '@/components/navbar';

import { DM_Sans } from 'next/font/google';
import type { Metadata } from 'next';

const dmSans = DM_Sans({
  weight: '300',
  subsets: ['latin'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>,
}): Promise<Metadata> {
  const { lang } = params;
  const t = await getTranslator(lang);
  const title = t('metadata.title');
  const description = t('metadata.description');

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: i18n.locales.reduce(
        (acc, locale) => ({
          ...acc,
          [locale]: `/${locale}`,
        }),
        {}
      ),
    },
    openGraph: {
      title,
      description,
      locale: lang,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{ lang: Locale }>,
}>) {
  // ...
}
```

> **Recuerda**: `generateMetadata()` solo se puede usar dentro de layouts y es la forma recomendada en Next.js 15+.

Agrega los mensajes de traducción en cada archivo de idioma (`es.json`, `en.json`, etc.)

```json
{
  "metadata": {
    "title": "i18n dentro del app router",
    "description": "Cómo realizar i18n en Next.js 15 dentro del app router"
  },
  "navbar": {
    "about": "Sobre nosotros",
    "home": "Inicio"
  },
  "locale-switcher": {
    "en": "Inglés",
    "es": "Español",
    "fr": "Frances"
  },
  "home": {
    "title": "Bienvenido",
    "description": "Esta página está configurada con soporte para múltiples idiomas gracias a la internacionalización (i18n) de Next.js. Actualmente estás visualizando el contenido en",
    "instructions": "Explora los botones disponibles para navegar por las diferentes secciones de la aplicación."
  },
  "about": {
    "title": "Sobre nosotros",
    "description": "Transparencia, integridad y profesionalidad son los pilares de nuestra filosofía empresarial. Damos prioridad a la comunicación clara y el asesoramiento honesto, asegurando que usted está facultado para tomar decisiones informadas durante todo el proceso de compra o venta."
  }
}
```

> Puedes mejorar el metadata agregando correctamente los parámetros a cada página.

Al iniciar el servidor `npm run dev`, acceder a `http://localhost:3000` . Cuando se renderiza la página, el HTML generado incluirá:

![](https://cdn-images-1.medium.com/max/1280/1*urG8KR_EOXE9tJNorE1Eew.png)

Con esta implementación, logramos que cada página de la aplicación esté enriquecida con **metadata dinámica localizada por idioma**, lo cual no solo mejora la experiencia del usuario, sino que también refuerza nuestra presencia en motores de búsqueda.

### Casos reales

**Tienda internacional**

Una tienda con rutas como `/es/productos/zapatos` y `/en/products/shoes`, donde el backend también respeta el `locale`. Todo el contenido estático se pre renderiza por idioma.

**Blog multilingüe**

Blog con contenido estático y traducciones en MDX, usando rutas `/en/blog/`, `/fr/blog/`, con metadata y `alternate` links para SEO.

**App tipo dashboard**

Dashboard donde solo el contenido cambia, pero las rutas son las mismas (`/dashboard`), manejando el idioma por cookie y render dinámico (`generateMetadata`).

---

### Hasta este punto…

Has aprendido a implementar y dominar la internacionalización en Next.js 15+ utilizando el soporte nativo del App Router.

Descubriste cómo configurar `middleware.ts` para redirecciones inteligentes, cómo estructurar los archivos por idioma, cómo usar `generateMetadata` para SEO, y cómo escalar a proyectos reales multilingües con buenas prácticas.

Esta solución moderna evita dependencias innecesarias, aprovecha el edge rendering y permite una base sólida para expandir tu aplicación a múltiples mercados globales. Si entiendes bien este modelo, puedes construir cualquier app multilenguaje profesional, desde un simple portafolio hasta un e-commerce internacional.

---

## Ejecutar el proyecto

Para correr o ejecutar el proyecto **[[ref]](https://nextjs.org/docs/app/getting-started/installation#run-the-development-server)**:

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
git checkout i18n-routing
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
