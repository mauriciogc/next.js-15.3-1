// src/app/error-handling-ex/error.tsx
'use client';

import { useEffect } from 'react';

export default function RootError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error capturado en error.tsx: ', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-3xl font-semibold text-red-700 mb-4">
        ¡Oops! Algo salió mal
      </h2>
      <p className="text-gray-700 mb-2">
        {error.message || 'Error desconocido'}
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Reintentar
      </button>
    </div>
  );
}
