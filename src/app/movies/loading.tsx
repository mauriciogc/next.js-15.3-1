// app/movies/loading.tsx

export default function MoviesLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen text-gray-800">
      <div className="text-center space-y-4 animate-pulse">
        <div className="text-xl font-bold">Cargando películas...</div>
        <div className="w-8 h-8 border-4 border-t-transparent border-blue-400 rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
}
