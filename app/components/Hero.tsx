"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToServices = () => {
    const servicesSection = document.querySelector('#services-section')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setError(null)

    if (query.trim().length < 2) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/suggest-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()
      
      if (data.status === 'success' && data.data.suggestions.length > 0) {
        // Get the most relevant service
        const topSuggestion = data.data.suggestions[0]
        // Navigate to the service page
        router.push(`/services/${topSuggestion.service}`)
      } else {
        // If no results found, scroll to services section
        setError('No matching services found. Browse all our services below.')
        setTimeout(scrollToServices, 100) // Small delay to ensure error message is visible
      }
    } catch (err) {
      setError('Failed to search for services')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchQuery)
  }

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-bg.jpg"
        alt="Luxury background"
        fill
        className="object-cover"
        priority
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
        <form 
          onSubmit={handleSubmit}
          className={`relative max-w-md mx-auto transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <input
            type="text"
            placeholder="What service are you looking for? (e.g., 'home repair')"
            className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue pr-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Search size={20} />
            )}
          </button>
        </form>
        {error && (
          <p className="text-red-500 mt-2">{error}</p>
        )}
      </div>
    </div>
  )
}
