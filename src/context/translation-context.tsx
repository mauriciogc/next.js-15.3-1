// src/context/translation-context.tsx
'use client';

import { createContext, useContext, useCallback, type ReactNode } from 'react';
import type { Dict, Locale } from '@/i18n/i18n-config';

type TranslationContextValue = {
  t: (path: string) => string;
  lang: string;
};

const TranslationContext = createContext<TranslationContextValue | null>(null);

type Props = {
  children: ReactNode;
  dictionary: Dict;
  lang: Locale;
};

export function TranslationProvider({ children, dictionary, lang }: Props) {
  const t = useCallback(
    (path: string): string => {
      const result = path
        .split('.')
        .reduce((acc, key) => acc?.[key] as Dict, dictionary);
      return typeof result === 'string' ? result : path;
    },
    [dictionary]
  );

  return (
    <TranslationContext.Provider value={{ t, lang }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      'useTranslation must be used inside <TranslationProvider>.'
    );
  }
  return context;
}
