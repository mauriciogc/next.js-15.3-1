// app/(admin)/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="border border-(--color-primary) p-4">
      <h2 className="subTitle bg-(--color-primary)">Dashboard</h2>
      {children}
    </section>
  );
}
