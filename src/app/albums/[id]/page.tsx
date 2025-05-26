// src/app/albums/[id]/page.tsx

import { AlbumCard } from '@/components/AlbumCard';
import { fetchAlbumById } from '@/services/spotifyService';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AlbumDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Llama al servicio para obtener los detalles del álbum
  const album = await fetchAlbumById(id);

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8">
      {album.images?.[0]?.url && (
        <AlbumCard
          key={album.id}
          id={album.id}
          name={album.name}
          artist={album.artists[0]?.name}
          imageUrl={album.images?.[0]?.url}
        />
      )}
      <div>
        <h1 className="text-[1.8em] font-bold">{album.name}</h1>
        <p className="text-[1.1em] text-gray-600">
          {album.artists.map((a: any) => a.name).join(', ')}
        </p>
        <p className="text-[0.9em] text-gray-500 mt-2">
          Lanzado: {album.release_date}
        </p>
        <p className="text-[0.9em] text-gray-500">
          Total de canciones: {album.total_tracks}
        </p>
        <h2 className="text-xl font-semibold mb-2">Pistas</h2>
        <ul className="space-y-1">
          {album.tracks.items.map((track: any, i: number) => (
            <li key={track.id} className="text-[0.9em] text-gray-400">
              {i + 1}. {track.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
