"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const email = typeof window !== "undefined" ? localStorage.getItem("infronix_email") : null;
    const token = typeof window !== "undefined" ? localStorage.getItem("infronix_token") : null;
    if (!email || !token) {
      localStorage.removeItem("infronix_email");
      localStorage.removeItem("infronix_token");
      router.replace("/");
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-deep-blue">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue"></div>
      </div>
    );
  }

  return <>{children}</>;
}
