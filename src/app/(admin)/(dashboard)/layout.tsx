// app/(admin)/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="border border-blue-500 border-dashed p-6 space-y-1">
      <h2 className=" bg-blue-300 text-blue-800">Dashboard Interno</h2>
      {children}
    </section>
  );
}
