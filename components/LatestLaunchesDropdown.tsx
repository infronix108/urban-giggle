"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"

interface Service {
  title: string
  slug: string
  description: string
}

const services: Service[] = [
  {
    title: "Brokerage",
    slug: "brokerage",
    description: "Residential, Commercial, Lease"
  },
  {
    title: "Home Utility & Services",
    slug: "home-utility",
    description: "Electric, Carpentry, Plumbing (24×7)"
  },
  {
    title: "Government Licenses",
    slug: "govt-licenses",
    description: "GST, FSSAI, Trade License"
  },
  {
    title: "Business Essentials",
    slug: "business-essentials",
    description: "Architecture, Event Management, Decoration"
  },
  {
    title: "Infronix One Stop AI",
    slug: "ai-one-stop",
    description: "Expert support for all your needs"
  }
]

export default function LatestLaunchesDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-white hover:text-electric-blue transition-colors cursor-pointer"
      >
        <span className="text-sm">✨</span>
        <span>Our Latest Launches</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-[300px] bg-deep-blue rounded-xl shadow-lg border border-gray-800 z-50"
          >
            <ul className="space-y-1">
              {services.map((service) => (
                <li key={service.title}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex flex-col w-full px-4 py-3 text-white hover:bg-gray-800 transition-colors rounded-lg hover:rounded-lg"
                  >
                    <span className="font-medium">{service.title}</span>
                    <motion.span
                      initial={{ opacity: 0, height: 0 }}
                      whileHover={{ opacity: 1, height: "auto" }}
                      className="text-sm text-gray-400 mt-1 overflow-hidden"
                    >
                      {service.description}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
