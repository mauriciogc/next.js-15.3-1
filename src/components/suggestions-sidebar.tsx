// src/componments/suggestions-sidebar.tsx
export default function SuggestionsSidebar() {
  return (
    <aside className="w-full max-w-xs space-y-6 text-(--color-foreground)">
      {/* Perfil actual */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-(--color-muted)" />
          <div className="flex flex-col gap-1">
            <div className="w-24 h-3 bg-(--color-muted) rounded-full" />
            <div className="w-20 h-2 bg-(--color-muted) rounded-full" />
          </div>
        </div>
        <div className="w-10 h-3 bg-(--color-muted) rounded-full" />
      </div>

      {/* Título sugerencias */}
      <div className="flex justify-between items-center">
        <div className="w-24 h-3 bg-(--color-muted) rounded-full" />
        <div className="w-10 h-2 bg-(--color-muted) rounded-full" />
      </div>

      {/* Lista de sugerencias */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-(--color-muted)" />
              <div className="flex flex-col gap-1">
                <div className="w-24 h-2 bg-(--color-muted) rounded-full" />
                <div className="w-32 h-2 bg-(--color-muted) rounded-full" />
              </div>
            </div>
            <div className="w-10 h-3 bg-(--color-muted) rounded-full" />
          </div>
        ))}
      </div>

      {/* Footer simulado */}
      <div className="space-y-2 pt-4 border-t border-(--color-border) text-xs text-(--color-muted)">
        <div className="w-full h-2 bg-(--color-muted) rounded-full" />
        <div className="w-4/5 h-2 bg-(--color-muted) rounded-full" />
        <div className="w-3/5 h-2 bg-(--color-muted) rounded-full" />
      </div>
    </aside>
  );
}
