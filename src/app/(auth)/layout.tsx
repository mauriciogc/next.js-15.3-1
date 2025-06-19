// src/app/(auth)/layout.tsx

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container">
      <header className="title">Área de autenticación</header>
      <main>{children}</main>
    </section>
  );
}
