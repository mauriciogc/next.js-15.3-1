// app/series/[slug]/_services/tmdbServices.ts

const API_KEY = process.env.TMDB_API_KEY || '';
const BASE_URL = process.env.TMDB_BASE_URL || '';

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export interface Serie {
  id: number;
  name: string;
  overview?: string;
}

export interface SeriesResponse {
  results: Serie[];
}

/**
 * @description Obtiene una lista de series de la API de TMDB.
 * @param category - Categoría de series a obtener (default: 'top_rated')
 * @throws Error si hay un problema al obtener los datos
 * @returns  Promise<SeriesResponse>
 * @example
 * fetchSeries().then(data => console.log(data));
 * @example
 * fetchSeries('popular').then(data => console.log(data));
 */
export async function fetchSeries(
  category: string = 'top_rated'
): Promise<SeriesResponse> {
  try {
    const url = `${BASE_URL}/tv/${category}`;
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Error al obtener los datos: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error en fetchSeries:', error);
    throw error;
  }
}

/**
 *
 * @description Obtiene los detalles de una serie específica por su ID.
 * @param id - ID de la serie a obtener
 * @throws Error si hay un problema al obtener los datos
 * @returns Promise<Serie>
 * @example
 * fetchSeriesDetail('12345').then(data => console.log(data));
 */
export async function fetchSeriesDetail(id: string): Promise<Serie> {
  try {
    const url = `${BASE_URL}/tv/${id}`;
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Error al obtener los datos: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error en fetchSeries:', error);
    throw error;
  }
}
