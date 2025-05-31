// app/(admin)/layout.tsx
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-gray-500 text-white p-6">
        <h1>Área de Administración</h1>
      </header>
      <main>{children}</main>
    </>
  );
}
