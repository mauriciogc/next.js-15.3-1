// src/app/projects/page.tsx
import ProjectCard from '@/components/project-card';

export default function ProjectsPage() {
  const projects = Array.from({ length: 6 }, () => crypto.randomUUID());

  return (
    <>
      <h1 className="title">Projects</h1>
      <div className="w-full grid grid-cols-1 gap-6 p-6">
        {projects.map((id) => (
          <ProjectCard url={`/projects/${id}`} key={id} id={id.toString()} />
        ))}
      </div>
    </>
  );
}
