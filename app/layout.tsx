import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import Loader from './components/loader/Loader';
import './globals.css';
import { DEFAULT_METADATA } from './lib/constants/metadata';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  description: 'A simple application to interface with the Ordinals API'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </body>
    </html>
  );
}
