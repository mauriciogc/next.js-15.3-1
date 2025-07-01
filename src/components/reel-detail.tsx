// src/components/reel-detail.tsx
export default function ReelDetail({ id }: { id: string }) {
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-3xl h-auto lg:h-[80vh] bg-(--color-background) border border-(--color-border) rounded-lg overflow-hidden">
      {/* Video (arriba en mobile, izquierda en desktop) */}
      <div className="w-full lg:flex-1 bg-black flex items-center justify-center">
        <div className="w-[280px] h-[500px] bg-(--color-muted)" />
      </div>

      <div className="w-full lg:w-[350px] flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-(--color-border)">
        <div className="p-4 space-y-3 border-b border-(--color-border)">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-(--color-muted)" />
            <div className="w-32 h-3 bg-(--color-muted) rounded-full" />
          </div>
          <div className="w-4/5 h-2 bg-(--color-muted) rounded-full" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px] lg:max-h-none">
          <p className="text-xs text-muted-foreground">{id}</p>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="w-24 h-2 bg-(--color-muted) rounded-full" />
              <div className="w-full h-2 bg-(--color-muted) rounded-full" />
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-(--color-border)">
          <div className="w-full h-10 bg-(--color-muted) rounded-full" />
        </div>
      </div>
    </div>
  );
}
