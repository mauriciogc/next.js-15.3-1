// src/app/movies/layout.tsx

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-xl font-semibold p-2">
        Bienvenido a la sección de Películas
      </h2>
      <section className="flex-grow p-2 bg-white">{children}</section>
    </div>
  );
}
