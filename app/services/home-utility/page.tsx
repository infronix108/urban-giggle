"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function HomeUtilityPage() {
  return (
    <div className="min-h-screen bg-deep-blue">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            24/7 Home Utility Services
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            Your trusted partner for all home maintenance needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {/* Electric */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Electric
            </h3>
            <p className="text-gray-400">
              Professional electrical services for home and office
            </p>
          </motion.div>

          {/* Carpentry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Carpentry
            </h3>
            <p className="text-gray-400">
              Expert woodwork and furniture repair services
            </p>
          </motion.div>

          {/* Plumbing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Plumbing
            </h3>
            <p className="text-gray-400">
              24/7 emergency plumbing services and repairs
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
              Get Your Home Running Smoothly
            </h2>
            <p className="text-gray-400 mb-8">
              Schedule a service call today
            </p>
            <button 
             className="px-8 py-3 bg-electric-blue text-white rounded-2xl hover:bg-electric-blue/90 transition-all duration-300 hover:shadow-lg">
              Schedule Service
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
