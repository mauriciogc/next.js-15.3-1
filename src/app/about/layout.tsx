// src/app/about/layout.tsx
export default function AboutLayout({
  children,
  team,
}: {
  children: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div className="container pb-4">
      <h1 className="title">About</h1>
      {children}
      {team}
    </div>
  );
}
