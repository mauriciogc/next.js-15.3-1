// app/loading.tsx

export default function LoadingRoot() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center animate-pulse space-y-4">
        <div className="text-3xl font-semibold">Cargando contenido...</div>
        <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
}
