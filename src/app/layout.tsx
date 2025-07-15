//src/app/layout.tsx

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
      <body className="antialiased min-h-screen flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
