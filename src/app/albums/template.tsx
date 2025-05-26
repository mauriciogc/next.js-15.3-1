// src/app/albums/layout.tsx

// Si cambias el nombre del archivo a layout.tsx se va persistir el tamaño de letra

'use client';
import { useState } from 'react';

export default function AlbumsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Estado para controlar el tamaño de la fuente
  const [scale, setScale] = useState(1);

  return (
    <div className="min-h-screen p-6 bg-gray-800">
      <div className="max-w-7xl mx-auto mb-4 space-x-2">
        {/* Título de la página con un ícono */}
        <h1 className="flex items-center text-4xl text-green-400 mb-6 gap-3 font-semibold">
          <img src="/images/spotify.png" className="w-12 h-12" />
          Spotify
        </h1>

        {/* Controles para ajustar el tamaño de la fuente */}
        <span>Font Size:</span>
        {/* Reduce fuente con un mínimo de 0.75 */}
        <button
          onClick={() => setScale((s) => Math.max(0.75, s - 0.1))}
          className="underline text-sm cursor-pointer"
        >
          A-
        </button>
        {/* Restaura al valor predeterminado (1) */}
        <button
          onClick={() => setScale(1)}
          className="underline text-sm cursor-pointer"
        >
          A
        </button>
        {/* Aumenta fuente con un máximo de 1.5 */}
        <button
          onClick={() => setScale((s) => Math.min(1.5, s + 0.1))}
          className="underline text-sm cursor-pointer"
        >
          A+
        </button>
      </div>

      {/* Contenedor para los hijos (children) con el tamaño de fuente ajustable */}
      <div className="max-w-7xl mx-auto" style={{ fontSize: `${scale}rem` }}>
        {children}
      </div>
    </div>
  );
}
