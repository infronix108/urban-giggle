import ServicePageLayout from "@/app/components/ServicePageLayout"
import AuthGuard from "../authGuard";

export default function HomeServicesPage() {
  return (
    <AuthGuard>
      <ServicePageLayout
      name="Home Services"
      description="Experience premium home maintenance and improvement services tailored to your needs. Our team of skilled professionals delivers exceptional quality work for all your home service requirements, from routine maintenance to major renovations. We pride ourselves on attention to detail, reliability, and customer satisfaction, ensuring your home remains in perfect condition year-round."
      process={[
        "Schedule a consultation with our expert team to discuss your home service needs",
        "Receive a detailed proposal outlining the scope of work and timeline",
        "Our professional team executes the service with precision and care",
        "Quality inspection and client satisfaction confirmation",
        "Regular maintenance follow-ups to ensure lasting results",
      ]}
      image="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1600"
      sites={[
        {
          name: "CSB Property",
          url: "https://csbproperty.in/",
          rating: 4.5,
          verified: true,
        },
        
      ]}
    />
    </AuthGuard>
  )
}
