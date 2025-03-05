"use client"

import { useState } from 'react'

export default function ClientValidation() {
  const testimonials = [
    {
      name: "John Smith",
      company: "Tech Solutions Inc.",
      text: "Infronix has transformed our business operations. Their services are unmatched in quality and efficiency.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      company: "Global Ventures",
      text: "Working with Infronix has been a game-changer for our company. Their innovative solutions have helped us stay ahead of the competition.",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "Digital Innovations",
      text: "The level of professionalism and expertise at Infronix is outstanding. They've consistently delivered beyond our expectations.",
      rating: 5
    }
  ]

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-white mb-16">
        Trusted by Industry Leaders
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-electric-blue/10 flex items-center justify-center">
                <span className="text-2xl text-electric-blue font-bold">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {testimonial.name}
                </h3>
                <p className="text-electric-blue">
                  {testimonial.company}
                </p>
              </div>
            </div>
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed">
              {testimonial.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold text-white mb-8">
          Our Valued Partners
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'].map((partner, i) => (
            <div
              key={i}
              className="w-32 h-16 bg-white/5 backdrop-blur-lg rounded-lg flex items-center justify-center transform hover:scale-110 transition-all duration-300"
            >
              <span className="text-electric-blue font-semibold">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
