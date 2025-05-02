"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Emily Thompson",
    role: "CEO, TechInnovate",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    quote:
      "Infronix has transformed our business operations. Their digital services are unparalleled in quality and innovation.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, GourmetEats",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
    quote:
      "The catering services provided by Infronix elevated our corporate events to a whole new level of sophistication.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Lifestyle Blogger",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
    quote:
      "Infronix's personal styling service has completely revamped my wardrobe. I've never felt more confident and stylish.",
  },
]

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-electric-blue">What Our Clients Say</h2>
        <div className="relative h-64">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute top-0 left-0 w-full transition-opacity duration-1000 ${
                index === currentTestimonial ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="rounded-full mb-4"
                />
                <p className="text-lg text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

