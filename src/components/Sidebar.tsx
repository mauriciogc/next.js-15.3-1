// src/components/Sidebar.tsx

'use client';

import { useState } from 'react';
import { Menu, Home, Settings, ChartLine, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`transition-all duration-300 ease-in-out bg-gray-800 text-white h-full ${
          open ? 'w-64' : 'w-14'
        }`}
      >
        <div className="flex justify-center items-center h-14 border-b border-gray-700">
          <button onClick={() => setOpen(!open)} className="p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {open && (
          <nav className="mt-4 space-y-2 px-4">
            <Link
              href="/"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <ChartLine className="w-4 h-4" />
              <span>Analíticas</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <Settings className="w-4 h-4" />
              <span>Ajustes</span>
            </Link>
          </nav>
        )}
      </div>

      <main
        className={`transition-all duration-300 ease-in-out flex-1 ${
          open ? 'pl-0' : 'pl-0'
        }`}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
