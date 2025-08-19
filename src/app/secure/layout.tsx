"use client";

import PrivateLayout from "../layouts/PrivateLayout";

export default function SecureLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateLayout>
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-pink-500 to-red-400 text-white">
        {children}
      </div>
    </PrivateLayout>
  );
}


