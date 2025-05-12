// src/app/blog/loading.tsx

export default function BlogLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 text-gray-800">
      <div className="w-8 h-8 border-4 border-t-transparent border-yellow-400 rounded-full animate-spin mx-auto" />
      <p className="text-2xl font-bold">Soy el cargando del blog.</p>
    </div>
  );
}
