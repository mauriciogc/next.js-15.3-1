//src/app/ssr/anime/[[...slug]]/page.tsx

const API_URL = 'https://animeschedule.net/api/v3/anime';
const IMAGE_URL = 'https://img.animeschedule.net/production/assets/public/img';

interface Anime {
  id: number;
  title: string;
  year: number;
  imageVersionRoute: string;
}

interface AnimeAPIResponse {
  anime: Anime[];
}

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

// Función para obtener los datos de los animes desde la API
async function fetchAnimes(slug: string[] = []): Promise<AnimeAPIResponse> {
  const [year, type, genre, title] = slug;

  const queryParams = new URLSearchParams();
  if (title) queryParams.append('q', title.split('-').join(' '));
  if (genre) queryParams.append('genres', genre);
  if (type) queryParams.append('media-types', type);
  if (year) queryParams.append('years', year);

  const res = await fetch(`${API_URL}?${queryParams.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Error al cargar los datos');
  return res.json();
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  try {
    const { anime } = await fetchAnimes(slug);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Resultados de búsqueda</h1>
        <ul>
          {anime.map((an: Anime) => (
            <li key={an.id} className="mb-4">
              <h2 className="text-lg font-semibold truncate">{an.title}</h2>
              <img
                src={`${IMAGE_URL}/${an.imageVersionRoute}`}
                alt={an.title}
                className="w-32 h-32 object-cover"
              />
              <p>Año: {an.year}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <p className="p-4 text-red-500">Error al cargar los datos</p>;
  }
}
