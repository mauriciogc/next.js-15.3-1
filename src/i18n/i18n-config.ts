// src/i18n/i18n-config.ts

export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'es', 'fr'],
} as const;

export type Dict = Record<string, object | string | number | boolean>;
export type Locale = (typeof i18n)['locales'][number];
