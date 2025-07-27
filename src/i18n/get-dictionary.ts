// src/i18n/get-dictionary.ts

import 'server-only';
import type { Dict, Locale } from './i18n-config';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return (await dictionaries[locale]?.()) ?? dictionaries.en();
};

export const getTranslator = async (locale: Locale) => {
  const dictionary = await getDictionary(locale);
  return createTranslator(dictionary);
};

function createTranslator(dictionary: Dict) {
  return function t(path: string): string {
    const result = path
      .split('.')
      .reduce((acc, key) => acc?.[key] as Dict, dictionary);
    return typeof result === 'string' ? result : path;
  };
}
