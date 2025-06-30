//src/app/layout.tsx

import Sidebar from '@/components/sidebar';
import './globals.css';

import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  weight: '300',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.className}>
      <body className="antialiased bg-(--color-background) text-(--color-foreground)">
        <Sidebar />

        <div className="pl-20 overflow-y-auto">
          <div className="flex items-center justify-between w-full h-full max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8 pt-20">
            <div className="w-full">{children}</div>
            <div id="modal-root" />
          </div>
        </div>
      </body>
    </html>
  );
}
