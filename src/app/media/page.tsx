// src/app/media/page.tsx

import { Suspense } from 'react';
import SkeletonList from '@/components/SkeletonList';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorList from '@/components/ErrorList';
import WrapperList from '@/components/WrapperList';

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-slate-800 p-4 space-y-5">
      <h1 className="text-4xl font-bold text-pink-400">
        Películas y Series Top
      </h1>

      <h2 className="text-2xl font-bold text-pink-600">Series Top</h2>
      <ErrorBoundary FallbackComponent={ErrorList}>
        <Suspense fallback={<SkeletonList repeat={4} />}>
          <WrapperList />
        </Suspense>
      </ErrorBoundary>

      <h2 className="text-2xl font-bold text-pink-600">Películas Top</h2>
      <ErrorBoundary FallbackComponent={ErrorList}>
        <Suspense fallback={<SkeletonList repeat={4} />}>
          <WrapperList type="movie" />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
