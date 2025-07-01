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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.className}>
      <body className="antialiased bg-(--color-background) text-(--color-foreground)">
        <Sidebar />

        <div className="pl-20 overflow-y-auto">
          <div className="w-full grid grid-cols-1 gap-6 p-6">
            <div className="w-full">{children}</div>
            {modal}
            <div id="modal-root" />
          </div>
        </div>
      </body>
    </html>
  );
}
