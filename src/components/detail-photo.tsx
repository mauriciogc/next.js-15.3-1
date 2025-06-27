//src/components/detail-photo.tsx

export default function DetailPhoto({ id }: { id: string }) {
  return (
    <div className="bg-(--color-background) text-(--color-foreground) rounded-xl overflow-hidden">
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-(--color-muted) flex items-center justify-center">
            {id}
          </div>
          <div className="w-32 h-4 rounded bg-(--color-border)" />
        </div>
      </div>

      <div className="w-[100vw] h-80 bg-(--color-muted)" />

      <div className="p-4 space-y-3">
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="h-8 w-20 bg-(--color-muted) rounded-full" />
          <div className="h-8 w-20 bg-(--color-muted) rounded-full" />
          <div className="h-8 w-28 bg-(--color-muted) rounded-full" />
          <div className="h-8 w-32 bg-(--color-primary) rounded-full" />
        </div>

        <div className="h-3 w-1/2 bg-(--color-border) rounded" />
        <div className="h-3 w-3/4 bg-(--color-muted) rounded" />
        <div className="h-3 w-1/4 bg-(--color-muted) rounded" />

        <div className="flex gap-2 mt-4">
          <div className="h-8 w-28 bg-(--color-muted) rounded-full" />
          <div className="h-8 w-32 bg-(--color-muted) rounded-full" />
        </div>
      </div>
    </div>
  );
}
