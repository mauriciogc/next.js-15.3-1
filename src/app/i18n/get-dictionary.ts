import 'server-only';
import type { Locale } from './i18n-config';
type Dict = Record<string, any>;

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
};

export function createTranslator(dictionary: Dict) {
  return function t(path: string): string {
    const result = path.split('.').reduce((acc, key) => acc?.[key], dictionary);
    return typeof result === 'string' ? result : path;
  };
}

export const getDictionary = async (locale: Locale) => {
  const dictionary = (await dictionaries[locale]?.()) ?? dictionaries.en();
  return createTranslator(dictionary);
};
