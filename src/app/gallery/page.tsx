//src/app/gallery/page.tsx
import PhotoCard from '@/components/photo-card';

export default function Page() {
  const photos = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {/* Aunque el modal se renderiza dentro de @modal, la navegación ocurre sobre la ruta real /gallery/photos/[id] */}
      {photos.map((id) => (
        <PhotoCard key={id} id={id.toString()} url={`/gallery/photos/${id}`} />
      ))}
    </div>
  );
}
