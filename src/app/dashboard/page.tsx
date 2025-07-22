// src/app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ChartClient = dynamic(() => import('@/components/chart-client'), {
  ssr: false,
  loading: () => <p className="text-(--color-muted)">Cargando gráfico...</p>,
});

export default function DashboardPage() {
  const [showChart, setShowChart] = useState(false);

  return (
    <main className="container">
      <h1 className="title">Dashboard</h1>
      <h1 className="subTitle">Gráficas</h1>

      {showChart ? (
        <ChartClient />
      ) : (
        <button
          onClick={() => setShowChart(true)}
          className="flex pill-button pill-button-default"
        >
          Ver gráfico
        </button>
      )}
    </main>
  );
}
