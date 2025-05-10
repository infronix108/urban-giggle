import ServicePageLayout from "@/app/components/ServicePageLayout"
import AuthGuard from "../authGuard";

export default function FashionServicesPage() {
  return (
    <AuthGuard>
      <ServicePageLayout
      name="Fashion & Styling"
      description="Transform your personal style with our expert fashion consulting and styling services. Our professional stylists work closely with you to create a wardrobe that reflects your personality, lifestyle, and aspirations. From personal shopping to closet organization, we provide comprehensive fashion solutions that help you look and feel your best every day."
      process={[
        "Style consultation and assessment of your current wardrobe",
        "Development of your personalized style profile",
        "Curated shopping experience with expert stylists",
        "Wardrobe organization and styling sessions",
        "Ongoing style maintenance and seasonal updates",
      ]}
      image="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1600"
      sites={[
        {
          name: "Stitch Fix",
          url: "https://www.stitchfix.com",
          rating: 4.6,
          verified: true,
        },
        {
          name: "Trunk Club",
          url: "https://www.trunkclub.com",
          rating: 4.4,
          verified: true,
        },
        {
          name: "Wishi",
          url: "https://www.wishi.me",
          rating: 3.9,
          verified: false,
        },
      ]}
    />
    </AuthGuard>
  )
}
