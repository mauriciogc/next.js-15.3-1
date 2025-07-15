//src/app/layout.tsx

import './globals.css';
import { DM_Sans } from 'next/font/google';
import { Metadata } from 'next';

const dmSans = DM_Sans({
  weight: '300',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'MyApp',
    template: '%s | MyApp',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  applicationName: 'MyAppName',
  alternates: {
    canonical: 'http://localhost:3000/', //Poner la url productiva
    languages: {
      'es-MX': '/es',
      'en-US': '/en',
      'fr-FR': '/fr',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
