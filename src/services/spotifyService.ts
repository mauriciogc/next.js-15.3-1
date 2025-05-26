// src/services/spotifyService.ts

const SPOTIFY_API = 'https://api.spotify.com/v1';
const TOKEN =
  'BQDkS8HqTgt6ZA0oFsFoJSc2ExHXtekd8gF5ulIH228raAxirzZQUpjmGZN8qKKV6Cf9chH5BglZuTWQPx58iMQ8ad_ZDIXZ3h_dkiCPm7W_fUPfBb_8l6NFcIUjf04MrgiLxVE5DL8';

/**
 * Obtiene albumes de Spotify.
 * @param search - Término de búsqueda (por defecto 'soundtracks')
 * @returns Lista de álbumes relacionados con el término de búsqueda
 */
export async function fetchNewReleases(search = 'soundtracks') {
  const res = await fetch(`${SPOTIFY_API}/search?q=${search}&type=album`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
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
  const res = await fetch(`${SPOTIFY_API}/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!res.ok) throw new Error('Álbum no encontrado');

  return res.json();
}
