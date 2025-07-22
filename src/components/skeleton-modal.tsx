// src/components/skeleton-modal.tsx
'use client';

export default function SkeletonModal() {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="bg-(--color-background) text-(--color-foreground) rounded-xl w-full max-w-md p-6 shadow-xl overflow-y-auto max-h-[90vh] space-y-4">
        <div className="w-full aspect-[4/3] rounded-lg bg-(--color-muted) animate-pulse" />

        <div className="flex items-center gap-2 justify-center animate-pulse">
          <div className="w-4 h-4 rounded-full bg-(--color-muted)" />
          <div className="w-10 h-3 rounded bg-(--color-muted)" />
          <div className="w-12 h-2 rounded bg-(--color-muted)" />
        </div>

        <div className="h-5 rounded bg-(--color-muted) w-3/4 mx-auto animate-pulse" />

        <div className="space-y-2 text-sm animate-pulse">
          <div className="h-3 rounded bg-(--color-muted) w-full" />
          <div className="h-3 rounded bg-(--color-muted) w-5/6" />
          <div className="h-3 rounded bg-(--color-muted) w-2/3" />
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-(--color-border) animate-pulse">
          <div className="h-6 w-16 bg-(--color-muted) rounded" />
          <div className="h-8 w-24 bg-(--color-muted) rounded" />
        </div>
      </div>
    </div>
  );
}
