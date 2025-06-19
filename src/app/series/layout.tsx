// src/app/series/layout.tsx
export default function SeriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container">
      <h1 className="title">Series</h1>
      {children}
    </div>
  );
}
