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
      <head>
      <meta name="google-site-verification" content="dE1mr2SEo7uTdID_QNbUyYmpW5_1Ufa0FWbuQLGS8fM" />
      </head>
      <body className={`${font.className}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}