"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if popup has already been shown in this session
    if (!sessionStorage.getItem('infronix-welcome')) {
      setIsOpen(true)
      // Set the session storage to prevent showing again
      sessionStorage.setItem('infronix-welcome', 'true')
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50" onClick={handleClose} />

          {/* Modal content */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-deep-blue rounded-lg p-8 max-w-md w-full mx-4"
            >
              {/* Logo */}
              <div className="w-40 h-16 mb-6 relative rounded-[2.5rem] overflow-hidden">
                <Image
                  src="/logo.jpg"
                  alt="Infronix Logo"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Welcome Text */}
              <h2 className="text-2xl font-bold text-white mb-4">
                Welcome to Infronix
              </h2>
              <p className="text-gray-400 mb-6">
                Your premium service marketplace for an elevated lifestyle.
              </p>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-electric-blue text-white rounded-lg hover:bg-electric-blue/90 transition-colors"
              >
                Get Started
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
