// src/app/series/loading.tsx

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800 text-gray-100">
      <div className="text-center animate-pulse space-y-2">
        <div className="text-xl font-semibold">Cargando series...</div>
        <div className="w-8 h-8 border-4 border-t-transparent border-emerald-400 rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
}
