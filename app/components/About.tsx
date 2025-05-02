"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from "react"

interface FormData {
  name: string
  number: string
  company: string
}

export default function About() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    number: "",
    company: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const values = [
    {
      title: 'Innovation',
      description: 'We constantly push boundaries to deliver cutting-edge solutions.',
      icon: '🚀'
    },
    {
      title: 'Excellence',
      description: 'Quality is at the heart of everything we do.',
      icon: '⭐'
    },
    {
      title: 'Integrity',
      description: 'We build trust through transparency and honesty.',
      icon: '🤝'
    },
    {
      title: 'Client Focus',
      description: 'Your success is our priority.',
      icon: '🎯'
    }
  ]

  const team = [
    {
      name: 'Alex Thompson',
      role: 'CEO & Founder',
      image: '/team/alex.jpg',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Emily Chen',
      role: 'Head of Innovation',
      image: '/team/emily.jpg',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'David Kim',
      role: 'Technical Director',
      image: '/team/david.jpg',
      linkedin: 'https://linkedin.com'
    }
  ]

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/
    return phoneRegex.test(phone)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ type: "", text: "" })

    // Validate fields
    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "Please enter your name" })
      return
    }

    if (!validatePhone(formData.number)) {
      setMessage({ type: "error", text: "Please enter a valid 10-digit phone number" })
      return
    }

    if (!formData.company.trim()) {
      setMessage({ type: "error", text: "Please enter your company name" })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/save-customer-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          number: formData.number,
          company: formData.company,
          sourceComponent: 'About'
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.status === 'success') {
        setMessage({ type: "success", text: "Thank you! We will contact you back soon." })
        setFormData({ name: "", number: "", company: "" })
        setTimeout(() => setShowForm(false), 3000)
      } else {
        throw new Error(data.error || 'Failed to submit')
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to submit. Please check your data and try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-white mb-16">
        About Infronix
      </h2>

      {/* Mission Statement */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h3 className="text-2xl font-semibold text-electric-blue mb-4">
          Our Mission
        </h3>
        <p className="text-gray-300 text-lg leading-relaxed">
          At Infronix, we're dedicated to transforming businesses through innovative digital solutions. 
          Our mission is to empower organizations with cutting-edge technology while maintaining the 
          highest standards of quality and client satisfaction.
        </p>
      </div>

      {/* Company Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300"
          >
            <div className="text-4xl mb-4">
              {value.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {value.title}
            </h3>
            <p className="text-gray-400">
              {value.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Leadership Team */}
      <div className="mb-20">
        <h3 className="text-2xl font-semibold text-center text-white mb-12">
          Our Leadership Team
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h4 className="text-xl font-semibold text-white mb-1">
                {member.name}
              </h4>
              <p className="text-electric-blue mb-4">
                {member.role}
              </p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-electric-blue/20 to-deep-blue rounded-xl p-8">
        <h3 className="text-2xl font-semibold text-white mb-4">
          Ready to Transform Your Business?
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Join the hundreds of businesses that have already partnered with Infronix 
          to achieve their digital transformation goals.
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-electric-blue text-black px-8 py-3 rounded-lg font-semibold hover:bg-electric-blue/90 transition-colors"
        >
          Get Started
        </button>
      </div>

      {/* Lead Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-deep-blue p-8 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-semibold text-white mb-6">Get Started with Infronix</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric-blue"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.number}
                  onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric-blue"
                  placeholder="Enter 10-digit number"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric-blue"
                  placeholder="Enter company name"
                />
              </div>

              {message.text && (
                <p className={`text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
                  {message.text}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-electric-blue text-black py-3 rounded-lg font-semibold hover:bg-electric-blue/90 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
