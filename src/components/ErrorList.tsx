// src/components/ErrorList.tsx
'use client';

import { FallbackProps } from 'react-error-boundary';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export default function ErrorList({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const router = useRouter();
  return (
    <div className="p-2 flex items-center gap-4 bg-slate-600 rounded-md">
      <div className="text">¡Algo salió mal!</div>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            resetErrorBoundary();
          });
        }}
        className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-sm cursor-pointer"
      >
        Reintentar
      </button>
    </div>
  );
}
