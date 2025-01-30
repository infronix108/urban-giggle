"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1920&h=1080"
        alt="Luxury background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center">
        <h1
          className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Discover Premium Services
        </h1>
        <p
          className={`text-xl md:text-2xl mb-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Elevate your lifestyle with Infronix
        </p>
        <div
          className={`relative max-w-md mx-auto transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <input
            type="text"
            placeholder="Find a Service"
            className="w-full px-4 py-3 rounded-full bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
        </div>
      </div>
    </div>
  )
}

