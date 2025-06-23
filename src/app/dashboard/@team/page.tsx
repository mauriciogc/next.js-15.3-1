// src/app/dashboard/@team/page.tsx

import Link from 'next/link';

export default function TeamPage() {
  return (
    <div className="flex-1 border-2 border-blue-600 rounded-md p-4 bg-blue-900/30">
      <h1>Team page</h1>
      <Link href="/dashboard/settings" className="text-green-600">
        Settings
      </Link>
    </div>
  );
}
