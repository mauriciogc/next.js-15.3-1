// src/app/p/[reelId]/
import ReelDetail from '@/components/reel-detail';

export default async function ReelPage({
  params,
}: {
  params: Promise<{ reelId: string }>;
}) {
  const { reelId } = await params;
  return (
    <div className="flex flex-col items-center justify-center ">
      <ReelDetail id={reelId} />
      <div className="w-full max-w-5xl mt-12 pt-12 border-t-1 border-(--color-border)">
        <div className="w-1/2 h-6 bg-(--color-muted) rounded-full"></div>
      </div>
      <div className="w-full max-w-5xl mx-auto grid grid-cols-3 gap-1 py-6 ">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="w-full aspect-[3/4] rounded-lg bg-(--color-muted) border border-(--color-border) flex items-center justify-center"
          />
        ))}
      </div>
    </div>
  );
}
