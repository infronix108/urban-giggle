"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function CareerSupportPage() {
  return (
    <div className="min-h-screen bg-deep-blue">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Infronix AI - Career Support
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            Free career guidance for students
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {/* Career Guidance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Career Guidance
            </h3>
            <p className="text-gray-400">
              Personalized career path recommendations
            </p>
          </motion.div>

          {/* Interview Prep */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Interview Preparation
            </h3>
            <p className="text-gray-400">
              Mock interviews and feedback sessions
            </p>
          </motion.div>

          {/* Skill Development */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Skill Development
            </h3>
            <p className="text-gray-400">
              Learning path recommendations and resources
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
              Free Career Support
            </h2>
            <p className="text-gray-400 mb-8">
              Get personalized career advice today
            </p>
            <button className="px-8 py-3 bg-electric-blue text-white rounded-2xl hover:bg-electric-blue/90 transition-all duration-300 hover:shadow-lg">
              Start Free Consultation
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
