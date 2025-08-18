"use client";

import PrivateLayout from "../layouts/PrivateLayout";

export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateLayout>
      {children}
    </PrivateLayout>
  );
}
