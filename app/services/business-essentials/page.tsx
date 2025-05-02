"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function BusinessEssentialsPage() {
  return (
    <div className="min-h-screen bg-deep-blue">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Business Essentials
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            Professional services for business growth and success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {/* Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Architecture
            </h3>
            <p className="text-gray-400">
              Professional architectural design and consultation
            </p>
          </motion.div>

          {/* Event Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Event Management
            </h3>
            <p className="text-gray-400">
              Full-service event planning and execution
            </p>
          </motion.div>

          {/* Decoration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Interior Decoration
            </h3>
            <p className="text-gray-400">
              Professional interior design and decoration services
            </p>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Transform Your Business
            </h2>
            <p className="text-gray-400 mb-8">
              Get professional business services today
            </p>
            <button className="px-8 py-3 bg-electric-blue text-white rounded-2xl hover:bg-electric-blue/90 transition-all duration-300 hover:shadow-lg">
              Contact Us
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
