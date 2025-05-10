import ServicePageLayout from "@/app/components/ServicePageLayout"
import AuthGuard from "@/components/authGuard";

export default function LogisticsServicesPage() {
  return (
    <AuthGuard>
      <ServicePageLayout
      name="Logistics & Moving"
      description="Experience stress-free relocation and logistics services with our professional moving solutions. From residential moves to commercial logistics, we handle every aspect of your moving needs with precision and care. Our experienced team ensures your belongings are safely packed, transported, and delivered to your destination, making your move as smooth as possible."
      process={[
        "Free consultation and detailed moving assessment",
        "Customized moving plan and cost estimation",
        "Professional packing and inventory management",
        "Secure transportation with real-time tracking",
        "Unpacking and setup at destination",
      ]}
      image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600"
      sites={[
        {
          name: "PODS",
          url: "https://www.pods.com",
          rating: 4.7,
          verified: true,
        },
        {
          name: "U-Haul",
          url: "https://www.uhaul.com",
          rating: 4.3,
          verified: true,
        },
        {
          name: "Two Men and a Truck",
          url: "https://www.twomenandatruck.com",
          rating: 4.0,
          verified: false,
        },
      ]}
    />
    </AuthGuard>
  )
}
