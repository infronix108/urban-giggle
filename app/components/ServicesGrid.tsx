"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

const services = [
  {
    name: "Home Services",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800&h=600",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=100&h=100",
    description: "Premium home maintenance and improvement",
    link: "/services/home",
  },
  {
    name: "Travel & Transport",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800&h=600",
    logo: "https://images.unsplash.com/photo-1596561260970-66b794b3888c?auto=format&fit=crop&q=80&w=100&h=100",
    description: "Luxury travel and transportation solutions",
    link: "/services/travel",
  },
  {
    name: "Food & Catering",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800&h=600",
    logo: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=100&h=100",
    description: "Exquisite dining and event catering",
    link: "/services/food",
  },
  {
    name: "Fashion & Styling",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800&h=600",
    logo: "https://images.unsplash.com/photo-1508742345712-0656a285ac31?auto=format&fit=crop&q=80&w=100&h=100",
    description: "Personal styling and custom fashion",
    link: "/services/fashion",
  },
  {
    name: "Education & Training",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800&h=600",
    logo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=100&h=100",
    description: "Expert tutoring and professional development",
    link: "/services/education",
  },
  {
    name: "Logistics & Moving",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800&h=600",
    logo: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=100&h=100",
    description: "Seamless relocation and logistics services",
    link: "/services/logistics",
  },
  {
    name: "Health & Wellness",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800&h=600",
    logo: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&q=80&w=100&h=100",
    description: "Personalized health and wellness programs",
    link: "/services/health",
  },
  {
    name: "Digital Services",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=600",
    logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=100&h=100",
    description: "Cutting-edge digital solutions",
    link: "/services/digital",
  },
  {
    name: "Business Consulting",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=800&h=600",
    logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=100&h=100",
    description: "Strategic business advisory services",
    link: "/services/business",
  },
  {
    name: "Games for Kids",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=800&h=600",
    logo: "https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&q=80&w=100&h=100",
    description: "Online games and entertainment for children",
    link: "https://www.crazygames.com/",
  },
]

export default function ServicesGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-16 bg-deep-blue">
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
                src={service.image || "/placeholder.svg"}
                alt={service.name}
                width={800}
                height={600}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=600" // fallback image
                }}
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
                <Image
                  src={service.logo || "/placeholder.svg"}
                  alt={`${service.name} logo`}
                  width={60}
                  height={60}
                  className="absolute top-4 left-4 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=100&h=100" // fallback logo
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

