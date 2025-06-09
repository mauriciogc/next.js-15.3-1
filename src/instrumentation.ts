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
