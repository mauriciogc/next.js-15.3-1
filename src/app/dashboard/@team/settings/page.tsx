//src/app/dashboard/@team/settings/page.tsx
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="flex-1 border-2 border-green-600 rounded-md p-4 bg-green-900/30">
      <h1>Team Settings</h1>
      <Link href="/dashboard/settings/other" className="text-orange-600">
        Other Settings
      </Link>
    </div>
  );
}
