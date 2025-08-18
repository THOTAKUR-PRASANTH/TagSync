"use client";

import { Inter } from 'next/font/google';
import './globals.css';
import ScrollToTop from './components/scroll-to-top';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { useState, useEffect } from 'react';
import PreLoader from './components/shared/PreLoader';
import { usePathname } from "next/navigation";

const font = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const noLayoutRoutes = [
    '/verify-email',
    '/not-found',      
  ];

  const showLayout = !noLayoutRoutes.includes(pathname) && !pathname.startsWith("/Server");


  useEffect(() => {
    const hideLoader = () => {
      setLoading(false);
    };

    if (document.readyState === "interactive" || document.readyState === "complete") {
      hideLoader();
    } else {
      document.addEventListener(
        "DOMContentLoaded",
        hideLoader,
        {
          once: true,
        }
      );
    }
  }, []);

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${font.className}`}>
        {loading ? (
          <PreLoader />
        ) : (
          <>
            {showLayout && <Header />}
            {children}
            {showLayout && <Footer />}
          </>
        )}
        <ScrollToTop />
      </body>
    </html>
  );
}