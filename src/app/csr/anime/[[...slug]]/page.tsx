// src/app/csr/anime/[[...slug]]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const API_URL = 'https://animeschedule.net/api/v3/anime';
const IMAGE_URL = 'https://img.animeschedule.net/production/assets/public/img';

// Definimos la interfaz para el objeto Anime
interface Anime {
  id: number;
  title: string;
  year: number;
  imageVersionRoute: string;
}

interface AnimeAPIResponse {
  anime: Anime[];
}

// Este componente se encarga de mostrar la información de los animes
// según los parámetros de búsqueda que se pasen en la URL.
// Por ejemplo: anime/2023/tv/action/kikansha-no-mahou
export default function AnimePage() {
  // Obtenemos el slug de la URL
  const params = useParams<{ slug?: string[] }>();
  // Definimos el estado para almacenar los animes
  const [anime, setAnime] = useState<Anime[] | null>(null);
  // Definimos el estado para almacenar el error
  const [error, setError] = useState<string | null>(null);

  const slugArray = params.slug || [];

  // Efecto para obtener los animes de la API cuando el slug cambia
  // y almacenarlos en el estado
  useEffect(() => {
    const [year, type, genre, title] = slugArray;
    const queryParams = new URLSearchParams();
    if (title) queryParams.append('q', title.split('-').join(' '));
    if (genre) queryParams.append('genres', genre);
    if (type) queryParams.append('media-types', type);
    if (year) queryParams.append('years', year);

    fetch(`${API_URL}?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data: AnimeAPIResponse) => setAnime(data.anime))
      .catch(setError);
  }, [slugArray]);

  if (error)
    return <p className="p-4 text-red-500">Error al cargar los datos</p>;

  if (!anime) {
    return <p className="p-4">Cargando...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Resultados de búsqueda</h1>
      <ul>
        {anime.map((an) => (
          <li key={an.id}>
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
}
