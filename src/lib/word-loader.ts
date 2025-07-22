// src/lib/word-loader.ts
type WordModule = { words: string[] };

const wordModuleCache = new Map<string, WordModule>();

export async function getWordModule(locale: string): Promise<WordModule> {
  if (wordModuleCache.has(locale)) {
    return wordModuleCache.get(locale)!;
  }

  let module: WordModule;

  switch (locale) {
    case 'es':
      module = (await import('./words.es')).default;
      break;
    case 'en':
    default:
      module = (await import('./words.en')).default;
      break;
  }

  wordModuleCache.set(locale, module);
  return module;
}
