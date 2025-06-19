// app/(admin)/(settings)/layout.tsx
export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="border border-(--color-muted) p-4">
      <h2 className="subTitle bg-(--color-muted)">Settings</h2>
      {children}
    </section>
  );
}
