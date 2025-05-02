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
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("infronix_user")
    if (!isAuthenticated) {
      setIsLoginModalOpen(true)
    }
  }, [])

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false)
    router.refresh()
  }

  return (
    <>
      {children}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          router.push("/")
        }}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  )
}
