"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDownIcon, SparklesIcon } from "@heroicons/react/24/outline"

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
    description: "Electric, Carpentry, Plumbing (24x7)"
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
    title: "Infronix AI",
    slug: "ai-one-stop",
    description: "Ask anything, 3 free consults"
  },
  {
    title: "Career Support (Free)",
    slug: "career-support",
    description: "Free career discussion for students"
  }
]

export default function FloatingServiceMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredService, setHoveredService] = useState<string | null>(null)
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
        className="flex items-center gap-2 text-white hover:text-electric-blue transition-colors"
      >
        <span className="flex items-center gap-1">
          <SparklesIcon className="w-4 h-4" />
          Our Latest Launches
        </span>
        <ChevronDownIcon className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-[300px] bg-white dark:bg-deep-blue rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 z-50"
          >
            <div className="space-y-1">
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex items-center justify-between w-full px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="font-medium">{service.title}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {hoveredService === service.title ? service.description : ""}
                    </span>
                  </Link>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: hoveredService === service.title ? "auto" : 0,
                      transition: { duration: 0.2 }
                    }}
                    className="absolute left-0 right-0 bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400 px-4 py-2 overflow-hidden"
                  >
                    {service.description}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
