export default function DetailTask({ id }: { id: string }) {
  return (
    <div className="max-w-3xl p-6 bg-(--color-background) text-(--color-foreground) border border-(--color-border) rounded-xl space-y-6">
      <div className="bg-(--color-border) text-(--color-primary) rounded">
        {id}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-(--color-muted)" />
          <div className="h-3 w-24 bg-(--color-border) rounded" />
        </div>

        <div className="h-3 w-32 bg-(--color-muted) rounded" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-(--color-muted)" />
          <div className="w-24 h-3 bg-(--color-border) rounded" />
          <div className="w-8 h-8 rounded-full bg-(--color-muted)" />
          <div className="w-24 h-3 bg-(--color-border) rounded" />
        </div>

        <div className="flex gap-2">
          <div className="px-4 py-1 rounded-full bg-(--color-muted) w-20 h-6" />
          <div className="px-4 py-1 rounded-full bg-(--color-muted) w-20 h-6" />
        </div>
      </div>

      <div className="p-4 border border-(--color-border) rounded-md bg-(--color-muted)/20 space-y-2">
        <div className="h-3 w-full bg-(--color-border) rounded" />
        <div className="h-3 w-2/3 bg-(--color-border) rounded" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-32 bg-(--color-muted) rounded" />
        <div className="flex gap-4">
          <div className="w-36 h-16 bg-(--color-muted) rounded" />
          <div className="w-36 h-16 bg-(--color-muted) rounded" />
          <div className="w-12 h-16 bg-(--color-muted) rounded flex items-center justify-center"></div>
        </div>
      </div>

      <div className="flex gap-6 border-b border-(--color-border) pb-2">
        <div className="h-4 w-16 bg-(--color-border) rounded" />
        <div className="h-4 w-20 bg-(--color-border) rounded" />
        <div className="h-4 w-24 bg-(--color-border) rounded" />
      </div>

      <div className="space-y-4">
        <div className="h-3 w-1/2 bg-(--color-border) rounded" />

        <div className="flex items-start gap-2 p-3 bg-(--color-muted)/20 rounded-lg">
          <div className="w-5 h-5 rounded-full bg-(--color-muted)" />
          <div className="space-y-2">
            <div className="h-3 w-60 bg-(--color-border) rounded line-through" />
            <div className="h-3 w-80 bg-(--color-muted) rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
