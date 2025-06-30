export default function ReelDetail() {
  return (
    <div className="flex w-full h-[80vh] max-w-5xl bg-(--color-background) border border-(--color-border) rounded-lg overflow-hidden">
      {/* Lado izquierdo: video */}
      <div className="flex-1 bg-black flex items-center justify-center">
        <div className="w-[280px] h-[500px] bg-(--color-muted) rounded-lg" />
      </div>

      {/* Lado derecho: sección de comentarios */}
      <div className="w-[350px] flex flex-col justify-between border-l border-(--color-border)">
        {/* Header: usuario + descripción */}
        <div className="p-4 space-y-3 border-b border-(--color-border)">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-(--color-muted)" />
            <div className="w-32 h-3 bg-(--color-muted) rounded-full" />
          </div>
          <div className="w-4/5 h-2 bg-(--color-muted) rounded-full" />
        </div>

        {/* Comentarios */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="w-24 h-2 bg-(--color-muted) rounded-full" />
              <div className="w-full h-2 bg-(--color-muted) rounded-full" />
            </div>
          ))}
        </div>

        {/* Footer: input comentario */}
        <div className="p-4 border-t border-(--color-border)">
          <div className="w-full h-10 bg-(--color-muted) rounded-full" />
        </div>
      </div>
    </div>
  );
}
