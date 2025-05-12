// src/app/blog/tech/loading.tsx

export default function TechLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-100 text-gray-800">
      <div className="w-8 h-8 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin mx-auto" />
      <p className="text-2xl font-bold">Soy el cargando exclusivo del Tech.</p>
    </div>
  );
}
