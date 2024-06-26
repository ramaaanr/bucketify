import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Poppins } from 'next/font/google'; // Menggunakan Poppins sebagai pengganti Inter
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kadobu: Kado dan Buket Hadiah',
  description: 'Web Application for selling bouquet',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} overflow-x-hidden pb-32`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
