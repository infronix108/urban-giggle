"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import LatestLaunchesDropdown from "../../components/LatestLaunchesDropdown"
import LoginModal from "../../components/LoginModal"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('infronix_user'))
    }
    checkAuth()
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-deep-blue/90 backdrop-blur-lg" : ""}`}>
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-40 h-16 relative rounded-[2.5rem] overflow-hidden">
                <Image
                  src="/logo.jpg"
                  alt="Infronix Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Link>

            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("clientValidation")}
                className="text-white hover:text-electric-blue transition-colors"
              >
                Client Validation
              </button>
              <button
                onClick={() => scrollToSection("awards")}
                className="text-white hover:text-electric-blue transition-colors"
              >
                Our Accolades
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-white hover:text-electric-blue transition-colors"
              >
                About Us
              </button>
              <span className="text-white hover:text-electric-blue transition-colors pt-1">
                <LatestLaunchesDropdown />
              </span>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    localStorage.removeItem('infronix_user')
                    setIsAuthenticated(false)
                    window.location.href = '/'
                  }}
                  className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition-colors text-white"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-electric-blue hover:bg-electric-blue/90 transition-colors text-white"
                >
                  Login
                </button>
              )}
            </div>

            <div className="md:hidden">
              <button className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsAuthenticated(true)
          setIsLoginModalOpen(false)
        }}
      />
    </div>
  )
}
