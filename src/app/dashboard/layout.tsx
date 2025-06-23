// src/app/dashboard/layout.tsx
import { checkUserRole } from '@/lib/auth';

export default function Layout({
  analytics,
  admin,
  team,
}: {
  analytics: React.ReactNode;
  team: React.ReactNode;
  admin: React.ReactNode;
}) {
  const role = checkUserRole();

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar navigation */}
      <aside className="w-20 bg-gray-900 flex flex-col items-center py-4 space-y-4">
        <div className="w-8 h-8 rounded-full bg-gray-700" />
        <div className="w-10 h-4 bg-gray-700 rounded" />
        <div className="w-10 h-4 bg-gray-700 rounded" />
        <div className="w-10 h-4 bg-gray-700 rounded" />
      </aside>
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header and main content */}
        <header className="h-12 bg-gray-800 flex items-center px-4">
          <div className="w-3/4 h-4 bg-gray-600 rounded" />
        </header>
        {/* Admin section, only visible to admin users */}
        {role === 'admin' ? admin : null}
        <main className="w-full flex flex-1 p-4 space-x-4">
          {/* Team and Analytics sections */}
          {team}
          {/* Analytics section */}
          {analytics}
        </main>
      </div>
    </div>
  );
}
