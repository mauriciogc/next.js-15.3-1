// src/services/spotifyService.ts

const BASE_URL = process.env.SPOTIFY_BASE_URL;
const API_KEY = process.env.SPOTIFY_API_KEY;

/**
 * Obtiene albumes de Spotify.
 * @param search - Término de búsqueda (por defecto 'soundtracks')
 * @returns Lista de álbumes relacionados con el término de búsqueda
 */
export async function fetchNewReleases(search = 'soundtracks') {
  const res = await fetch(`${BASE_URL}/search?q=${search}&type=album`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    next: { revalidate: 6000 },
  });

  if (!res.ok) throw new Error('Error al obtener nuevos lanzamientos');
  const data = await res.json();
  return data.albums.items;
}

/**
 * Obtiene los detalles de un álbum por su ID.
 * @param id - ID del álbum a buscar
 * @returns Detalles del álbum
 */
export async function fetchAlbumById(id: string) {
  const res = await fetch(`${BASE_URL}/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!res.ok) throw new Error('Álbum no encontrado');

  return res.json();
}
