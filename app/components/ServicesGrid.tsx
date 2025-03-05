"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

const services = [
  {
    name: "Home Services",
    image: "/images/services/home.jpg",
    logo: "/images/logos/home-logo.jpg",
    description: "Premium home maintenance and improvement",
    link: "/services/home",
  },
  {
    name: "Travel & Transport",
    image: "/images/services/travel.jpg",
    logo: "/images/logos/travel-logo.jpg",
    description: "Luxury travel and transportation solutions",
    link: "/services/travel",
  },
  {
    name: "Food & Catering",
    image: "/images/services/food.jpg",
    logo: "/images/logos/food-logo.jpg",
    description: "Exquisite dining and event catering",
    link: "/services/food",
  },
  {
    name: "Fashion & Styling",
    image: "/images/services/fashion.jpg",
    logo: "/images/logos/fashion-logo.jpg",
    description: "Personal styling and custom fashion",
    link: "/services/fashion",
  },
  {
    name: "Education & Training",
    image: "/images/services/education.jpg",
    logo: "/images/logos/education-logo.jpg",
    description: "Expert tutoring and professional development",
    link: "/services/education",
  },
  {
    name: "Logistics & Moving",
    image: "/images/services/logistics.jpg",
    logo: "/images/logos/logistics-logo.jpg",
    description: "Seamless relocation and logistics services",
    link: "/services/logistics",
  },
  {
    name: "Health & Wellness",
    image: "/images/services/health.jpg",
    logo: "/images/logos/health-logo.jpg",
    description: "Personalized health and wellness programs",
    link: "/services/health",
  },
  {
    name: "Business Development Digital Services",
    image: "/images/services/business.jpg",
    logo: "/images/logos/business-logo.jpg",
    description: "Cutting-edge digital solutions",
    link: "/services/business-development",
  },
  {
    name: "Business Consulting",
    image: "/images/services/consulting.jpg",
    logo: "/images/logos/consulting-logo.jpg",
    description: "Strategic business advisory services",
    link: "/services/consulting",
  },
  {
    name: "Games for Kids",
    image: "/images/services/games.jpg",
    logo: "/images/logos/games-logo.jpg",
    description: "Online games and entertainment for children",
    link: "/services/games",
  },
]

export default function ServicesGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="services-section" className="py-16 bg-deep-blue">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-electric-blue">Our Premium Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={service.image}
                alt={service.name}
                width={800}
                height={600}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/images/services/default.jpg" // fallback image
                }}
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
                <Image
                  src={service.logo}
                  alt={`${service.name} logo`}
                  width={60}
                  height={60}
                  className="absolute top-4 left-4 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = "/images/logos/default-logo.jpg" // fallback logo
                  }}
                />
                <h3 className="text-2xl font-semibold mb-2 text-white">{service.name}</h3>
                <p
                  className={`text-gray-300 transition-all duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`}
                >
                  {service.description}
                </p>
                <Link href={service.link} passHref>
                  <button
                    className={`mt-4 bg-electric-blue text-black px-4 py-2 rounded-full transition-all duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`}
                  >
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
