// src/app/wordle/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getWordModule } from '@/lib/word-loader';

export default function WordlePage() {
  const [locale, setLocale] = useState<'en' | 'es'>('en');
  const [words, setWords] = useState<string[] | null>(null);

  useEffect(() => {
    setWords(null);
    (async () => {
      const mod = await getWordModule(locale);
      setWords(mod.words);
    })();
  }, [locale]);

  return (
    <main className="p-6 max-w-3xl mx-auto text-(--color-foreground)">
      <h1 className="title">
        Word List <span className="subTitle">({locale.toUpperCase()})</span>
      </h1>

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => setLocale('en')}
          className={`pill-button ${
            locale === 'en' ? 'pill-button-active' : 'pill-button-default'
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLocale('es')}
          className={`pill-button ${
            locale === 'es' ? 'pill-button-active' : 'pill-button-default'
          }`}
        >
          Español
        </button>
      </div>

      {words ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {words.map((word, i) => (
            <li
              key={i}
              className="bg-(--color-muted) text-sm rounded px-3 py-2 text-(--color-foreground)"
            >
              {word}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-(--color-muted)">Cargando palabras...</div>
      )}
    </main>
  );
}
