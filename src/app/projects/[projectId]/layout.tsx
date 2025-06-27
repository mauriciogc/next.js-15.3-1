//src/app/projects/[projectId]/layout.tsx
export default function ProjectLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="title">Project View</h1>
      {children}
      {modal}
    </div>
  );
}
