import ServicePageLayout from "@/app/components/ServicePageLayout"
import AuthGuard from "../authGuard";

export default function TravelServicesPage() {
  return (
    <AuthGuard>
      <ServicePageLayout
      name="Travel & Transport"
      description="Experience luxury travel and transportation solutions designed for the discerning traveler. From private car services to customized travel itineraries, we ensure every journey is comfortable, reliable, and memorable. Our premium transportation services cater to both business and leisure travelers, providing seamless door-to-door experiences with attention to every detail."
      process={[
        "Discuss your travel requirements and preferences with our travel consultants",
        "Receive a customized travel plan with transportation arrangements",
        "Confirm your booking with our secure reservation system",
        "Get real-time updates and tracking for your transportation",
        "Enjoy your premium travel experience with 24/7 support",
      ]}
      image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1600"
      sites={[
        {
          name: "Uber Premium",
          url: "https://www.uber.com/premium",
          rating: 4.7,
          verified: true,
        },
        {
          name: "Blacklane",
          url: "https://www.blacklane.com",
          rating: 4.4,
          verified: true,
        },
        {
          name: "Sixt Luxury Cars",
          url: "https://www.sixt.com",
          rating: 4.1,
          verified: false,
        },
      ]}
    />
    </AuthGuard>
  )
}
