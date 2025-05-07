// src/app/person/layout.tsx

export default function PersonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 min-h-screen bg-slate-200 text-slate-800">
      <div className="p-2">
        <h1 className="text-3xl font-bold">Personas destacadas</h1>
        <p className="text-sm text-gray-400 mt-1">
          Descubre actores, directores y figuras del cine y TV
        </p>
        <div className="p-2 border-b border-slate-400"></div>
      </div>
      <section className="flex-grow p-2">{children}</section>
    </div>
  );
}
