// app/(admin)/(settings)/layout.tsx
export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="border border-orange-400 p-6 space-y-1">
      <h2 className=" bg-orange-300 text-orange-800">Configuraciones</h2>
      {children}
    </section>
  );
}
