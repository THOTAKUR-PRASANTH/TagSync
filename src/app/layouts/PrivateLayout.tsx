"use client";

import { AuthProvider } from "../Server/context/AuthProvider";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
