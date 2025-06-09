# 🚀 Next.js

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-blue?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## instrumentation.ts

> **Todos los ejemplos los podrás encontrar en el repositorio next.js-15.3–1[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1)**]  
> Acá puedes ver todas las stories de next.js [**[**ref**](https://mauriciogc.medium.com/list/nextjs-v15-b7b4cc4c4974)**]**

> Para todos los **ejemplos** se toma el siguiente **proyecto base[**[**ref**](https://github.com/mauriciogc/next.js-15.3-1/tree/base-project-2)**] (branch: base-project-2).** Este proyecto contiene los archivos: `_src/app/page.tsx_` y `_src/app/layout.tsx_`, configurados con una estructura mínima.

> Para simular la carga de datos en los ejemplos vamos utilizar la API **jsonplaceholder**[[ref](https://jsonplaceholder.typicode.com/)].

### ¿Qué es?

Es un archivo especial de convención en Next.js (App Router) ubicada en `src/` o `app/`, que permite configurar **trazabilidad (tracing)** mediante **OpenTelemetry (OTel)**, un estándar abierto para observabilidad distribuida.

Este archivo permite **registrar y personalizar cómo se recolectan y exportan los datos de telemetría**, como duración de requests, rendimiento de render, errores, cold starts, entre otros, tanto en entornos server como edge.

Su **propósito** es dar **visibilidad** **técnica** al funcionamiento interno de tu app, **facilitando** el **diagnóstico** y la **toma** de **decisiones** **informadas**.

### Principales características

- Se ejecuta **una sola vez** cuando el servidor inicia.

- Ejecutado automáticamente en runtime del servidor (Node.js o Edge).
- Permite inicializar OpenTelemetry y registrar spans, métricas o logs personalizados.
- Funciona fuera del flujo de rendering (`page.tsx`, `layout.tsx`)
- Se puede usar junto a `next.config.js` y `pageExtensions` para configuraciones avanzadas.

### Ventajas

- **Observabilidad avanzada**— Trazabilidad completa del ciclo de vida de la app.

- **Estándar abierto** —  Compatible con OpenTelemetry, interoperable con múltiples plataformas.
- **Cross-runtime** — Funciona en entornos Edge y Server.
- **Personalizable** — Define sampling, headers, propagators, exportadores.
- **Integración con plataformas APM**— Compatible con Datadog, New Relic, Vercel Observability, Jaeger, etc.

### ¿Cómo se crea o implementa?

- Crear el archivo `instrumentation.ts` en la raíz de tu carpeta `src/`

```yaml
/src/instrumentation.ts
```

- Exporta la función `register()` que contiene tu lógica de inicialización.

```js
// src/instrumentation.ts
export function register() {
  console.log('Instrumentación activada');
}
```

### ¿Cómo funciona?

- Al iniciar el runtime del servidor Next.js, este busca el archivo `instrumentation.ts`.

- Llama automáticamente a la función `register()` exportada.
- Desde ahí, puedes registrar instrumentaciones, exportadores, spans personalizados o incluso inicializar SDKs como `Sentry`, `Datadog`, etc.
- Este archivo **no está ligado a rendering** ni a rutas, sino al **entorno de ejecución del backend**.

Donde:

- **Spans**: representan unidades de trabajo (e.g. `GET /api/user`, `render HomePage`, etc.).

- **Tracer**: orquesta la creación, jerarquía y propagación de spans.
- **Exportadores**: envían los datos recolectados hacia una herramienta externa (Datadog, Vercel, consola, etc.).

### Casos de uso

- Aplicaciones SaaS con microservicios, donde quieres rastrear la latencia desde la petición hasta la base de datos.
- Análisis de rendimiento en entornos edge vs serverless.

- Observabilidad distribuida en pipelines de CI/CD o APIs internas.
- Diagnóstico de errores intermitentes o degradación de performance.

### Ejemplos

#### Ejemplo 1 — OpenTelemetry

Instala desde la consola los paquetes básicos:

```bash
npm install @opentelemetry/sdk-node \
            @opentelemetry/sdk-trace-base \
            @opentelemetry/auto-instrumentations-node \
            @opentelemetry/api
```

- `@opentelemetry/sdk-node` — Configuración y arranque del SDK en Node.js.

- `@opentelemetry/sdk-trace-base` — Infraestructura interna para spans y exportadores.
- `@opentelemetry/auto-instrumentations-node`\*— Conjunto de instrumentaciones automáticas para Node.js.
- `@opentelemetry/api` **[Obligatorio]**—Base de tipos y contratos (Tracer, Span, Context)

Crear el archivo `instrumentation.ts` en la raíz de tu carpeta `src/`

```js
// src/instrumentation.ts

//Importamos NodeSDK (SDK principal de OTel para Node.js)
import { NodeSDK } from '@opentelemetry/sdk-node';
// Es un exportador que imprime trazas (spans) en la consola
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
// Devuelve un array de instrumentaciones automáticas
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

const sdk = new NodeSDK({
  //A donde se van a enviar los spans
  traceExporter: new ConsoleSpanExporter(),
  // Blibliotecas a instrumentar
  instrumentations: [getNodeAutoInstrumentations()],
});

//Función que Next.js ejecuta
export function register() {
  console.log('Instrumentación activada');

  // Inicializa OTel
  Promise.resolve(sdk.start())
    .then(() => console.log('OpenTelemetry inicializado'))
    .catch((err) => console.error('Error al iniciar OTel', err));
}
```

Crea `page.tsx` para el **test** en `src/app/test`:

```js
export default async function TestPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const post = await res.json();

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
}
```

Agrega el `Link` hacia `/dashboard` en `src/app/page.tsx`

```js
// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-y-4">
      <h1 className="text-3xl font-bold">Página principal</h1>

      <Link href="/test" className="text-blue-500 hover:underline ">
        Test
      </Link>
    </main>
  );
}
```

![](https://cdn-images-1.medium.com/max/1600/1*4nbzcgRr-79Z0mymjNp_zw.png)

Al iniciar el servidor con `npm run dev`, observa que en la consola compila y ejecuta el archivo `instrumentation.ts`:

![](https://cdn-images-1.medium.com/max/1600/1*ofMB-mPo0p06ZTMaLmHfMQ.png)

Accede a `http://localhost:3000` y navega a la ruta `/test`. En la consola verás un objeto que representa la petición realizada al servicio externo `JSONPlaceholder`, incluyendo los datos de la respuesta.

![](https://cdn-images-1.medium.com/max/1600/1*Iqk7EKp7KoEphjcSrjRICg.png)

#### Ejemplo 2 — OpenTelemetry: Logger personalizado simple

Renombra el archivo actual `instrumentation.ts` por `instrumentation-1.ts` (para que lo tengas de respaldo).

Crear el archivo `instrumentation.ts` en la raíz de tu carpeta `src/`

```js
// src/instrumentation.ts

import { NodeSDK } from '@opentelemetry/sdk-node';
// Importa el procesador de spans más simple de OTel.
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

// Se define una clase personalizada llamada `SimpleLoggerExporter`
class SimpleLoggerExporter {
  // Método `export`: se invoca cuando OpenTelemetry tiene spans listos para exportar
  export(spans: any, resultCallback: any) {
    // Recorre todos los spans recibidos
    for (const span of spans) {
      // Imprime en consola el nombre del span y su duración en milisegundos
      // `span.duration[1]` representa la duración en nanosegundos (según el formato interno)
      // Se convierte a milisegundos dividiendo entre 1e6
      console.log(`📦 [${span.name}] - ${span.duration[1] / 1e6}ms`);
    }

    // Informa a OpenTelemetry que la exportación se completó exitosamente
    // `code: 0` indica éxito (según el estándar de ResultCode en OTel)
    resultCallback({ code: 0 });
  }

  // Método `shutdown`: se llama cuando el SDK se apaga (por ejemplo, al cerrar el proceso)
  // Aquí simplemente retornamos una promesa resuelta porque no hay limpieza real que hacer
  shutdown(): Promise<void> {
    return Promise.resolve();
  }
}

const sdk = new NodeSDK({
  // Aquí usamos `SimpleSpanProcessor`, que exporta cada span individualmente y de inmediato
  // le pasamos una instancia de nuestro exportador personalizado `SimpleLoggerExporter`
  spanProcessor: new SimpleSpanProcessor(new SimpleLoggerExporter()),
  instrumentations: [getNodeAutoInstrumentations()],
});

export function register() {
  Promise.resolve(sdk.start())
    .then(() => console.log('OpenTelemetry inicializado'))
    .catch((err) => console.error('Error al iniciar OTel', err));
}
```

Al iniciar el servidor con `npm run dev`, observa que en la consola compila y ejecuta el archivo `instrumentation.ts`:

![](https://cdn-images-1.medium.com/max/1600/1*n-jKgMdeLjEyu_VtfzzJuw.png)

Accede a `http://localhost:3000` y navega a la ruta `/test`. En la consola verás un objeto que representa la petición realizada al servicio externo `JSONPlaceholder`, incluyendo los datos de la respuesta.

![](https://cdn-images-1.medium.com/max/1600/1*-ND5B7ij0Tlnl7qeITHckg.png)

#### Ejemplo 3— OpenTelemetry: Logger personalizado con atributos

Renombra el archivo actual `instrumentation.ts` por `instrumentation-2.ts` (para que lo tengas de respaldo).

Crear el archivo `instrumentation.ts` en la raíz de tu carpeta `src/`:

```js
// src/instrumentation.ts

import { NodeSDK } from '@opentelemetry/sdk-node';
// `SpanExporter` es una interfaz que define cómo exportar spans a un backend (consola, OTLP, Jaeger, etc.).
// `SimpleSpanProcessor` es un procesador de spans que los exporta de inmediato tras finalizar.
import {
  SpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

// Define una clase personalizada que implementa la interfaz `SpanExporter`.
class SimpleReadableExporter implements SpanExporter {
  export(spans: any, resultCallback: any) {
    for (const span of spans) {
      // Accede a los atributos del span (headers, métodos, etc.)
      const attrs = span.attributes;

      // Extrae atributos HTTP comunes si están disponibles
      const method = attrs['http.method'] || '';
      const url =
        attrs['http.route'] || // Primero intenta obtener la ruta lógica (e.g. /api/users/[id])
        attrs['http.target'] || // Luego la URL sin host
        attrs['http.url'] || // Finalmente, la URL completa
        '';
      const status = attrs['http.status_code'] || '';
      const durationMs = `${(span.duration[1] / 1e6).toFixed(2)}ms`;

      console.log(`  
        Span:     ${span.name}  
        URL:      ${method} ${url}  
        Estado:   ${status}  
        Duración: ${durationMs} ms  
        ──────────────`);
    }

    resultCallback({ code: 0 });
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }
}

const sdk = new NodeSDK({
  spanProcessor: new SimpleSpanProcessor(new SimpleReadableExporter()),
  instrumentations: [getNodeAutoInstrumentations()],
});

export function register() {
  Promise.resolve(sdk.start())
    .then(() => console.log('OpenTelemetry inicializado'))
    .catch((err) => console.error('Error al iniciar OTel', err));
}
```

Al iniciar el servidor con `npm run dev`, accede a `http://localhost:3000` y navega a la ruta `/test`. En la consola verás un objeto que representa la petición realizada al servicio externo `JSONPlaceholder`, incluyendo los datos de la respuesta:

![](https://cdn-images-1.medium.com/max/1600/1*qMelUQjcXPK6dj6JUv-rTQ.png)

#### Ejemplo 4 — OTLP Exporter con Jaeger

Instala desde la consola los siguientes paquetes:

```bash
npm install @opentelemetry/exporter-trace-otlp-http
```

- `@opentelemetry/exporter-trace-otlp-http` — Componente encargado de enviar los spans recolectados a una herramienta de observabilidad.

Renombra el archivo actual `instrumentation.ts` por `instrumentation-3.ts` (para que lo tengas de respaldo).

Crear el archivo `instrumentation.ts` en la raíz de tu carpeta `src/`:

```js
// src/instrumentation.ts

import { NodeSDK } from '@opentelemetry/sdk-node';
// Importa un procesador de spans que los agrupa en lotes antes de exportarlos.
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

// Configura una instancia del exportador OTLP.
const otlpExporter = new OTLPTraceExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
  // Se cargan headers opcionales desde una variable de entorno
  headers: {
    ...(process.env.OTEL_EXPORTER_OTLP_HEADERS
      ? JSON.parse(process.env.OTEL_EXPORTER_OTLP_HEADERS)
      : {}),
  },
});

// Un procesador por lotes (`BatchSpanProcessor`) para exportar los spans de forma eficiente.
const sdk = new NodeSDK({
  spanProcessor: new BatchSpanProcessor(otlpExporter),
  instrumentations: [getNodeAutoInstrumentations()],
});

export function register() {
  Promise.resolve(sdk.start())
    .then(() => console.log('OpenTelemetry inicializado'))
    .catch((err) => console.error('Error al iniciar OTel', err));
}
```

Crear el archivo `.env.local` en la raíz de tu carpeta `src/`:

```bash
# Para Jaeger
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318/v1/traces
```

Ejecuta el siguiente comando para iniciar un contenedor de Jaeger en modo all-in-one:

```bash
docker run -d --name jaeger \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 16686:16686 \
  -p 4318:4318 \
  jaegertracing/all-in-one:latest
```

Donde:

- `-d`: Ejecuta el contenedor en segundo plano (modo _detached_).
- `--name jaeger`: Nombra el contenedor como `jaeger`.
- `-e COLLECTOR_OTLP_ENABLED=true`: Habilita el colector OTLP vía HTTP (puerto 4318).
- `-p 16686:16686`: Expone la interfaz web de Jaeger en `http://localhost:16686`.
- `-p 4318:4318`: Expone el puerto OTLP HTTP para recibir trazas desde tu app (configurado en `.env.local`).
- `**jaegertracing/all-in-one:latest**`: Usa la imagen oficial que incluye UI, agent, collector y storage en un solo contenedor.

Si el contenedor ya fue creado previamente, simplemente inícialo con:

```bash
docker start jaeger
```

> Esto levantará Jaeger en segundo plano con la misma configuración.

Al iniciar el servidor con `npm run dev`, accede a `http://localhost:3000` y navega a la ruta `/test`. Luego, abre `http://localhost:16686` en tu navegador para visualizar las trazas en la interfaz web de Jaeger.

![](https://cdn-images-1.medium.com/max/1600/1*kbgMUZk4YMvvq84dnGirPw.png)

Busca la traza que representa la petición realizada al servicio externo **JSONPlaceholder**. Dentro de ella podrás inspeccionar los detalles del span, incluyendo el método HTTP, la URL solicitada, el código de respuesta, y la duración de la operación.

> Para **detener** el contenedor solo ejecuta en consola: `docker stop jaeger`

### ¿Se puede usar con layouts, loading o templates?

No directamente. `instrumentation.ts` es **independiente del árbol de rutas** y **no tiene acceso a props, layouts o render**. Su propósito es técnico y de infraestructura.

Pero puede complementar los demás:

- `layout.tsx`— Estructura visual.

- `loading.tsx`— Indicadores de carga.
- `template.tsx`— Re-renderización controlada.
- `instrumentation.ts`— Observabilidad y setup de entorno.

### A considerar

- Solo corre en el servidor, por lo que nunca se envía al navegador.

- No accede a rutas ni props, por lo que no puede saber que ruta está activa.
- No puedes usar hooks de React ya que NO es parte del árbol React.
- Útil para producción o staging.

---

Has aprendido que `instrumentation.ts` es el punto de entrada perfecto para dotar tu aplicación Next.js de **visibilidad profunda, trazabilidad distribuida y control total sobre el rendimiento**. Ya sea en entornos de desarrollo, staging o producción, este archivo te permite **integrar observabilidad avanzada** mediante OpenTelemetry, sin necesidad de acoplamientos, hacks o configuraciones invasivas.

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
git checkout instrumentation
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
