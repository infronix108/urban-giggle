"use client"

import { useState } from "react"
import Image from "next/image"

export default function Awards() {
  const awards = [
    {
      id: 1,
      name: "Best Luxury Service Provider 2023",
      image: "/awards/award1.jpg",
      organization: "Global Luxury Awards",
    },
    {
      id: 2,
      name: "Innovation in Digital Services 2023",
      image: "/awards/award2.jpg",
      organization: "Tech Excellence Awards",
    },
    {
      id: 3,
      name: "Customer Satisfaction Leader 2023",
      image: "/awards/award3.jpg",
      organization: "Consumer Choice Awards",
    },
  ]

  return (
    <section className="py-16 bg-deep-blue">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-electric-blue">Our Accolades</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award) => (
            <div key={award.id} className="flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-lg rounded-xl transform hover:scale-105 transition-all duration-300">
              <div className="w-24 h-24 rounded-full bg-electric-blue/10 mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{award.name}</h3>
              <p className="text-sm text-gray-400">{award.organization}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
