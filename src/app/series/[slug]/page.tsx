// app/series/[slug]/page.tsx

// Importa el servicio para obtener el detalle de una serie y el type Serie
import { Serie, fetchSeriesDetail } from '../_services/tmdbServices';

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data: Serie = await fetchSeriesDetail(slug);
  return (
    <div>
      <h2 className="subTitle">{data.name}</h2>
      <p>{data.overview}</p>
    </div>
  );
}
