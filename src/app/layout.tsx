import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/app/ClientLayout';

const font = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${font.className}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}