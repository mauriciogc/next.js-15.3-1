//src/components/task-card.tsx
export default function TaskCard() {
  return (
    <div className="flex justify-between items-center bg-(--color-background) border border-(--color-border) rounded-lg p-4 transition-colors duration-300 ease-in-out">
      {/* Info de proyecto */}
      <div className="space-y-1">
        <div className="h-4 w-32 bg-(--color-border) rounded" />
        <div className="h-3 w-24 bg-(--color-muted) rounded" />
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-(--color-muted)" />
        <div className="h-3 w-20 bg-(--color-border) rounded" />
      </div>

      {/* Avatares */}
      <div className="flex gap-2">
        <div className="-ml-5 w-7 h-7 rounded-full bg-(--color-border) border border-(--color-muted)" />
        <div className="-ml-5 w-7 h-7 rounded-full bg-(--color-border) border border-(--color-muted)" />
        <div className="-ml-5 w-7 h-7 rounded-full bg-(--color-border) border border-(--color-muted)" />
        <div className="-ml-5 w-7 h-7 rounded-full bg-(--color-muted) text-xs text-center text-(--color-foreground) flex items-center justify-center">
          +2
        </div>
      </div>
    </div>
  );
}
