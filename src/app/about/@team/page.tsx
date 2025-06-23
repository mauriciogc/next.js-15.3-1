// src/app/about/@team/page.tsx
import Link from 'next/link';

// Lista de miembros del equipo
const teamMembers = [
  { id: 1, name: 'Angie' },
  { id: 2, name: 'Peter' },
  { id: 3, name: 'Mau' },
];

export default function TeamPage() {
  return (
    <div className="w-full flex-1 border border-blue-600 rounded-md p-4 bg-blue-900/30">
      <div className="grid grid-cols-3 gap-3">
        {/* Card de cada miembro del equipo */}
        {teamMembers.map((member) => (
          <Link
            key={member.id}
            href={`/about/${member.name.toLocaleLowerCase()}`}
            className="rounded-xl flex flex-col items-start space-y-2 hover:opacity-80 "
          >
            <div className="w-full h-36 bg-gray-700 rounded-xl" />
            <div className="w-3/4 h-4 bg-gray-600 rounded" />
            <div className="w-1/2 h-3 bg-gray-500 rounded" />
          </Link>
        ))}
      </div>
    </div>
  );
}
