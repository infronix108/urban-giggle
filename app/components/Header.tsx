"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/70 backdrop-blur-md" : ""}`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="Infronix Logo" width={150} height={50} priority />
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6">
            <Link href="#" className="text-gray-300 hover:text-electric-blue transition duration-300">
              Services
            </Link>
            <Link href="#" className="text-gray-300 hover:text-electric-blue transition duration-300">
              About
            </Link>
            <Link href="#" className="text-gray-300 hover:text-electric-blue transition duration-300">
              Contact
            </Link>
          </nav>
          <button className="bg-electric-blue text-black px-4 py-2 rounded-full hover:bg-electric-blue/80 transition duration-300">
            Login
          </button>
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="text-electric-blue" /> : <Menu className="text-electric-blue" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <nav className="flex flex-col items-center py-4 space-y-4">
            <Link href="#" className="text-gray-300 hover:text-electric-blue transition duration-300">
              Services
            </Link>
            <Link href="#" className="text-gray-300 hover:text-electric-blue transition duration-300">
              About
            </Link>
            <Link href="#" className="text-gray-300 hover:text-electric-blue transition duration-300">
              Contact
            </Link>
            <button className="bg-electric-blue text-black px-4 py-2 rounded-full hover:bg-electric-blue/80 transition duration-300">
              Login
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

