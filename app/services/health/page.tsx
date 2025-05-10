import ServicePageLayout from "@/app/components/ServicePageLayout"
import AuthGuard from "../authGuard";

export default function HealthServicesPage() {
  return (
    <AuthGuard>
      <ServicePageLayout
      name="Health & Wellness"
      description="Discover comprehensive health and wellness solutions designed to enhance your physical and mental well-being. Our personalized programs combine expert guidance with modern wellness practices to help you achieve your health goals. From fitness training to nutrition planning, we provide holistic wellness services that promote a balanced and healthy lifestyle."
      process={[
        "Comprehensive health and wellness assessment",
        "Development of personalized wellness plan",
        "Regular sessions with health professionals",
        "Progress monitoring and plan adjustments",
        "Ongoing support and wellness maintenance",
      ]}
      image="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1600"
      sites={[
        {
          name: "Noom",
          url: "https://www.noom.com",
          rating: 4.8,
          verified: true,
        },
        {
          name: "MyFitnessPal",
          url: "https://www.myfitnesspal.com",
          rating: 4.6,
          verified: true,
        },
        {
          name: "Headspace",
          url: "https://www.headspace.com",
          rating: 4.4,
          verified: false,
        },
      ]}
    />
    </AuthGuard>
  )
}
