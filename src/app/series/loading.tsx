// src/app/series/loading.tsx
export default function SeriesLoading() {
  return (
    <div className="flex animate-pulse justify-start items-start space-x-4">
      <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin" />
      <div>Cargando contenido...</div>
    </div>
  );
}
