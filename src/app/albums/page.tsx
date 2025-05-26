// src/app/albums/page.tsx

import { fetchNewReleases } from '@/services/spotifyService';
import { AlbumCard } from '@/components/AlbumCard';

export default async function AlbumsPage() {
  // Llama al servicio para obtener los álbumes relacionados con el término 'soundtrack'
  const albums = await fetchNewReleases('soundtrack');

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {albums.map((album: any) => (
        <AlbumCard
          key={album.id}
          id={album.id}
          name={album.name}
          artist={album.artists[0]?.name}
          imageUrl={album.images?.[0]?.url}
          withLink={true}
        />
      ))}
    </div>
  );
}
