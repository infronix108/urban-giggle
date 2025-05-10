import ServicePageLayout from "@/app/components/ServicePageLayout"
import AuthGuard from "@/components/authGuard";

export default function FoodServicesPage() {
  return (
    <AuthGuard>
      <ServicePageLayout
      name="Food & Catering"
      description="Elevate your events with our exquisite dining and catering services. Our expert culinary team crafts memorable dining experiences using the finest ingredients and innovative presentation techniques. Whether it's an intimate dinner party or a grand corporate event, we deliver exceptional food service that delights your guests and exceeds expectations."
      process={[
        "Initial consultation to understand your event and dietary requirements",
        "Customized menu planning and tasting session",
        "Detailed event planning including staffing and equipment needs",
        "Professional execution with on-site culinary team",
        "Post-event cleanup and feedback collection",
      ]}
      image="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1600"
      sites={[
        {
          name: "Charlie's Dragon",
          url: "https://www.charliesdragon.in/",
          rating: 4.8,
          verified: true,
        },
        {
          name: "Chinatown Restaurant",
          url: "https://www.chinatowncda.com",
          rating: 4.5,
          verified: false,
        },
      ]}
    />
    </AuthGuard>
  )
}
