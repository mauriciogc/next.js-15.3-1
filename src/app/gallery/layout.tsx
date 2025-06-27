// src/app/gallery/layout.tsx
export default function GalleryLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="title">Gallery</h1>
      {children}
      {modal}
    </div>
  );
}
