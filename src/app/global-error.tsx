// src/app/global-error.tsx
'use client';

import './globals.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { startTransition } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Enviar a un servicio externo como Sentry, LogRocket, etc.
    console.error('Error en series:', error);
  }, [error]);

  return (
    <html>
      <body>
        <main className="flex flex-col items-center font-serif justify-center min-h-screen text-center px-4 bg-white text-gray-800">
          <h1 className="text-3xl md:text-5xl mb-6">
            Se suponía que este error nunca debía de ocurrir.
          </h1>
          <p className="text-base md:text-lg font-serif  max-w-xl mb-8">
            No tenemos un nombre especial para este sitio. Algunos lo llaman
            página cuatro-cero-cuatro, pero nosotros preferimos decir que es el
            lugar donde descansa el alma de Tim Berners-Lee.
          </p>
          <button
            className="inline-flex items-center px-12 py-2 border border-blue-500 font-light text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition cursor-pointer"
            onClick={() => {
              startTransition(() => {
                router.refresh();
                reset();
              });
            }}
          >
            Reintentar
          </button>
        </main>
      </body>
    </html>
  );
}
