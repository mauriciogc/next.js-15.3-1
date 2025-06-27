//src app/gallery/photos/[id]/page.tsx
import PhotoCard from '@/components/photo-card';
import DetailPhoto from '@/components/detail-photo';

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const suggestions = Array.from({ length: 6 }, (_, i) => (i + 1) ** 2);

  return (
    <div>
      <DetailPhoto id={id} />
      <hr className="border-t border-(--color-border) my-8" />

      <h2 className="subTitle">Suggestions</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {suggestions.map((id) => (
          <PhotoCard
            key={id}
            id={id.toString()}
            url={`/gallery/photos/${id}`}
          />
        ))}
      </div>
    </div>
  );
}
