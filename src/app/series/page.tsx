// src/app/series/page.tsx

import { getSeries } from '@/services/tmdbService';
import List from '@/components/List';

export default async function SeriesPage() {
  const series = await getSeries();

  return (
    <main className="min-h-screen bg-slate-800 p-4">
      <h1 className="text-4xl font-bold text-emerald-400">Series Top</h1>
      <List list={series} />
    </main>
  );
}
