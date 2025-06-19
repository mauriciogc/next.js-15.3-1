// src/app/series/page.tsx
import Link from 'next/link';

// Importa el servicio para obtener la lista de series y el type Serie
import { Serie, fetchSeries } from './_services/tmdbServices';

export default async function SeriesPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await fetchSeries(params.slug);
  return (
    <ul className="space-y-2">
      {data.results.map((serie: Serie) => (
        <li key={serie.id}>
          <Link
            href={`series/${serie.id}`}
            className="text-(--color-foreground)"
          >
            {serie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
