"use client";

import PrivateLayout from "../layouts/PrivateLayout";
import SecuredLayout from "../components/layout/SecuredLayout";


export default function SecureLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateLayout>
      <SecuredLayout>
        {children}
      </SecuredLayout>
    </PrivateLayout>
  );
}


