// app/error-handling-example/page.tsx

'use client';

import { useState } from 'react';

export default function ErrorExamplePage() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    // Este error será capturado por error.tsx
    throw new Error('Simulación de error manual');
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-blue-400 p-6">
      <h1 className="text-2xl font-bold mb-4">Manejo de errores en Next.js</h1>
      <p className="mb-2">Haz clic en el botón para lanzar un error.</p>
      <button
        onClick={() => setShouldThrow(true)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded cursor-pointer"
      >
        Lanzar error
      </button>
    </main>
  );
}
