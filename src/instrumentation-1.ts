// !!- Para ver este ejemplo renombra el archivo a instrumentation.ts

// src/instrumentation.ts

//Importamos NodeSDK (SDK principal de OTel para Node.js)
import { NodeSDK } from '@opentelemetry/sdk-node';
// Es un exportador que imprime trazas (spans) en la consola
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
// Devuelve un array de instrumentaciones automáticas
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(), //A donde se van a enviar los spans
  instrumentations: [getNodeAutoInstrumentations()], // Blibliotecas a instrumentar
});

//funci´on que Next.js ejecuta
export function register() {
  console.log('Instrumentación activada');

  // Inicializa OTel
  Promise.resolve(sdk.start())
    .then(() => console.log('OpenTelemetry inicializado'))
    .catch((err) => console.error('Error al iniciar OTel', err));
}
