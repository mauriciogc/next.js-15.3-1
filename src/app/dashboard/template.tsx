// src/app/dashboard/template.tsx
// Si cambias el nombre del archivo a layout.tsx se va persistir el estado del Sidebar

'use client';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar>{children}</Sidebar>;
}
