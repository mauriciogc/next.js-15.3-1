// !!- Para ver este ejemplo renombra el archivo a instrumentation.ts

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
// Esta clase exportará los spans terminados a través de un `console.log` legible.
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
