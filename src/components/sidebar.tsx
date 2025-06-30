// src/components/sidebar.tsx
'use client';

import { PanelLeftOpen, PanelLeftClose, FolderOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const router = useRouter();

  const handleClick = async (href: string) => {
    setIsCollapsed(true);
    router.push(href);
  };

  return (
    <aside
      className={`fixed z-40 top-0 left-0 h-screen bg-(--color-background) border-r border-(--color-border) text-(--color-foreground) transition-all duration-300 flex flex-col justify-between ${
        isCollapsed ? 'w-[78px]' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="relative p-4 flex justify-between items-center">
        <div
          className="w-10 h-10 bg-gray-400 rounded-full cursor-pointer"
          onClick={() => handleClick('/')}
        />
        {!isCollapsed && (
          <div className="w-24 h-4 bg-(--color-muted) rounded-full ml-2" />
        )}
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className={`${
            isCollapsed && 'absolute -right-6'
          } pill-button p-2 bg-none `}
        >
          {!isCollapsed ? (
            <PanelLeftClose className="w-6 h-6" />
          ) : (
            <PanelLeftOpen className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-3">
        <div
          className="flex items-center gap-3 rounded-md bg-transparent px-3 py-2 text-(--color-foreground) hover:bg-(--color-overlay) transition-all duration-200 cursor-pointer"
          onClick={() => handleClick('/projects')}
        >
          <FolderOpen className="w-6 h-6" />
          {!isCollapsed && <span className="text-sm">Projects</span>}
        </div>

        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 rounded-md bg-transparent px-3 py-2 hover:bg-(--color-overlay) transition-all duration-200`}
          >
            <div className="w-6 h-6 bg-(--color-muted) rounded" />
            {!isCollapsed && (
              <div className="h-3 w-24 bg-(--color-muted) rounded-full" />
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 px-2 py-4 space-y-3 border-t border-(--color-border)">
        <div
          className={`bg-(--color-muted) rounded-md transition-all ${
            isCollapsed ? 'w-10 h-10 mx-auto' : 'h-10 w-full'
          }`}
        />
        <div
          className={`rounded-md bg-(--color-muted) flex items-center justify-between px-3 py-2 ${
            isCollapsed ? 'w-10 h-10 mx-auto' : 'w-full'
          }`}
        >
          {!isCollapsed && (
            <>
              <div className="w-16 h-3 bg-(--color-border) rounded-full" />
              <div className="w-10 h-5 bg-white rounded-full" />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
