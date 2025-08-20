"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import PreLoader from './components/shared/PreLoader';
import ScrollToTop from './components/scroll-to-top';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const noLayoutRoutes = [
    '/verify-email',
    '/not-found',
  ];

  const showLayout = !noLayoutRoutes.includes(pathname) && !pathname.startsWith('/dashboard') 
  && !pathname.startsWith('/secure');

  useEffect(() => {
    const hideLoader = () => {
      setLoading(false);
    };

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      hideLoader();
    } else {
      document.addEventListener('DOMContentLoaded', hideLoader, { once: true });
    }
  }, []);

  return (
    <>
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
    </>
  );
}


