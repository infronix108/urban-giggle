"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AiOneStopPage() {
  return (
    <div className="min-h-screen bg-deep-blue">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Infronix AI - Professional Support
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            Get expert answers with 3 free consults
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {/* Business Consultation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Business Consultation
            </h3>
            <p className="text-gray-400">
              Expert business advice and strategy planning
            </p>
          </motion.div>

          {/* Technical Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Technical Support
            </h3>
            <p className="text-gray-400">
              24/7 technical assistance and problem solving
            </p>
          </motion.div>

          {/* Market Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Market Analysis
            </h3>
            <p className="text-gray-400">
              Detailed market research and competitive analysis
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
              Get Expert Answers
            </h2>
            <p className="text-gray-400 mb-8">
              Start your free consultation now
            </p>
            <button className="px-8 py-3 bg-electric-blue text-white rounded-2xl hover:bg-electric-blue/90 transition-all duration-300 hover:shadow-lg">
              Start Consultation
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
