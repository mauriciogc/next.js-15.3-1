// src/app/_utils/formatDate.ts
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-MX', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
