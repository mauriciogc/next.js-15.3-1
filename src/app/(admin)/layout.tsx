// src/app/(admin)/layout.tsx
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container">
      <header className="title">Área de administración</header>
      <main className="w-full">{children}</main>
    </section>
  );
}
