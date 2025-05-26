// src/components/AlbumCard.tsx

'use client';

import Link from 'next/link';

// Propiedades que acepta el componente AlbumCard
interface AlbumCardProps {
  id: string;
  name: string;
  artist: string;
  imageUrl?: string;
  withLink?: boolean;
}

export function AlbumCard({
  id,
  name,
  artist,
  imageUrl,
  withLink = false,
}: AlbumCardProps) {
  return (
    <div className="relative group flex flex-col items-center text-center text-white bg-gray-900 p-4 rounded-lg">
      <div className=" w-36 h-36 mb-4">
        {imageUrl && (
          <img src={imageUrl} alt={name} className="rounded-lg object-cover" />
        )}
      </div>

      <div className="text-[0.85em] font-semibold">{name}</div>
      <p className="text-[0.85em] text-gray-400">by {artist}</p>

      {/* Enlace opcional que envuelve todo el componente */}
      {withLink && (
        <Link
          href={`/albums/${id}`}
          className=" absolute inset-0 flex items-center justify-center 
                      opacity-0 group-hover:opacity-100 transition duration-300 
                    bg-black/40 rounded-lg cursor-pointer"
        ></Link>
      )}
    </div>
  );
}
