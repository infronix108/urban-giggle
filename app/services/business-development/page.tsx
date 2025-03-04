import ServicePageLayout from "@/app/components/ServicePageLayout"

export default function BusinessDevelopmentPage() {
  return (
    <ServicePageLayout
      name="Business Development Digital Services"
      description="Accelerate your business growth with our cutting-edge digital solutions and business development services. We help organizations leverage technology and innovation to achieve their business objectives. From digital transformation to market expansion strategies, our comprehensive services empower businesses to thrive in the digital age."
      process={[
        "Business needs analysis and digital assessment",
        "Strategy development and technology roadmap",
        "Implementation of digital solutions",
        "Staff training and system integration",
        "Continuous optimization and support",
      ]}
      image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600"
      sites={[
        {
          name: "Development NextGen",
          url: "https://devnx.odoo.com/",
          rating: 4.9,
          verified: true,
        },
        
      ]}
    />
  )
}
