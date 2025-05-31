// src/app/(auth)/layout.tsx

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen p-6 bg-gray-800 auth-layout">
      <header className="max-w-7xl mx-auto text-pink-400 text-3xl py-4">
        Área de autenticación
      </header>
      <main className="max-w-7xl mx-auto mb-4 space-x-2">{children}</main>
    </section>
  );
}
