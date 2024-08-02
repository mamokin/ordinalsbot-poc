import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Loader from './components/loader/Loader';
import './globals.css';
import { DEFAULT_METADATA } from './lib/constants/metadata';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  ...DEFAULT_METADATA
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />

        <main>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </main>

        <Footer />
      </body>
    </html>
  );
}
