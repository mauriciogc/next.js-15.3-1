//src/app/reels/page.tsx
export default function ReelsPage() {
  return (
    <div className="bg-(--color-background) text-(--color-foreground) space-y-5 p-6 max-w-6xl mx-auto">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          className="w-full max-w-[380px] h-[640px] bg-(--color-background) rounded-lg overflow-hidden relative flex flex-col border border-(--color-border)"
          key={i}
        >
          <div className="flex items-center gap-3 p-4 border-b border-(--color-border)">
            <div className="w-10 h-10 bg-(--color-muted) rounded-full" />
            <div className="flex flex-col gap-1">
              <div className="w-24 h-3 bg-(--color-muted) rounded-full" />
              <div className="w-16 h-2 bg-(--color-muted) rounded-full" />
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center px-6 text-center">
            <div className="space-y-2">
              <div className="w-3/4 h-4 bg-(--color-muted) rounded" />
              <div className="w-2/4 h-4 bg-(--color-muted) rounded" />
            </div>
          </div>

          <div className="px-4 py-3 space-y-2 border-t border-(--color-border)">
            <div className="flex space-x-2">
              <div className="w-10 h-10 bg-(--color-muted) rounded-full" />
              <div className="w-10 h-10 bg-(--color-muted) rounded-full" />
            </div>
            <div className="w-full h-3 bg-(--color-muted) rounded-full" />
            <div className="w-3/5 h-3 bg-(--color-muted) rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
