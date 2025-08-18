"use client";

import { Inter } from 'next/font/google';
import './globals.css';
// import Aoscompo from '@/lib/utils/aos';
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
  const isPrivate = pathname.startsWith("/Server");

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
            {!isPrivate && <Header />}
            {children}
            {!isPrivate && <Footer />}
          </>
        )}
        <ScrollToTop />
      </body>
    </html>
  );
}
