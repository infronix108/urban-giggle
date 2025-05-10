"use client"

import { motion } from "framer-motion"
import Image from "next/image"

import AuthGuard from "@/components/authGuard";

export default function BrokeragePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-deep-blue">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Premium Brokerage Services
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            Your trusted partner for residential, commercial, and lease properties
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {/* Residential */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Residential
            </h3>
            <p className="text-gray-400">
              Expert assistance for buying, selling, and renting residential properties
            </p>
          </motion.div>

          {/* Commercial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Commercial
            </h3>
            <p className="text-gray-400">
              Comprehensive services for office spaces, retail, and industrial properties
            </p>
          </motion.div>

          {/* Lease */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Lease
            </h3>
            <p className="text-gray-400">
              Professional lease management and negotiation services
            </p>
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 mb-8">
              Contact us today to schedule a consultation
            </p>
            <button 
              className="px-8 py-3 bg-electric-blue text-white rounded-2xl hover:bg-electric-blue/90 transition-all duration-300 hover:shadow-lg">
              Contact Us
            </button>
          </motion.div>
        </div>
      </div>
    </div>
    </AuthGuard>
  )
}
