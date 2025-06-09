// !!- Para ver este ejemplo renombra el archivo a instrumentation.ts

// src/instrumentation.ts

//Importamos NodeSDK (SDK principal de OTel para Node.js)
import { NodeSDK } from '@opentelemetry/sdk-node';
// Importa el procesador de spans más simple de OTel.
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
// Devuelve un array de instrumentaciones automáticas
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
