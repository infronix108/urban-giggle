"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import LoginModal from "../../components/LoginModal"

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const router = useRouter();
  const [redirectPath, setRedirectPath] = useState<string>("");

  useEffect(() => {
    // Session is valid if both email and token exist
    const checkSession = () => {
      const email = localStorage.getItem("infronix_email");
      const token = localStorage.getItem("infronix_token");
      const validSession = !!email && !!token;
      if (!validSession) {
        setRedirectPath(window.location.pathname + window.location.search);
        setIsLoginModalOpen(true);
      } else {
        setIsLoginModalOpen(false);
      }
    };
    checkSession();
    window.addEventListener('storage', checkSession);
    return () => window.removeEventListener('storage', checkSession);
  }, [router]);



  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    router.refresh();
  };

  return (
    <>
      {children}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          router.push("/");
        }}
        onLoginSuccess={handleLoginSuccess}
        redirectPath={redirectPath}
      />
    </>
  );
}
