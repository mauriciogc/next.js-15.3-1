//src/app/layout.tsx

import './globals.css';

import { DM_Sans } from 'next/font/google';

const geist = DM_Sans({
  weight: '300',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
