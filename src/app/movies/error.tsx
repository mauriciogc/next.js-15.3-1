// src/app/movies/error.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { startTransition } from 'react';

export default function Error({
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800 text-gray-100">
      <h2 className="text-3xl font-semibold">¡Algo salió mal!</h2>
      <p className="mt-2 text-sm italic text-slate-500">{error.message}</p>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer"
      >
        Reintentar
      </button>
    </div>
  );
}
