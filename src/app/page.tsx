// src/app/page.tsx

import { Suspense } from 'react';
import DummyComponent from '@/components/DummyComponent';
import CardSkeleton from '@/components/CardSkeleton';

export default function Home() {
  return (
    <main className="flex min-h-screen p-4">
      <div className="w-full space-y-4">
        <h1 className="text-3xl font-bold">Página principal</h1>

        <Suspense fallback={<p>Cargando componente...</p>}>
          <DummyComponent />
        </Suspense>

        <Suspense fallback={<CardSkeleton />}>
          <DummyComponent />
        </Suspense>
      </div>
    </main>
  );
}
