import ServicePageLayout from "@/app/components/ServicePageLayout"
import AuthGuard from "../authGuard";

export default function GamesServicesPage() {
  return (
    <AuthGuard>
      <ServicePageLayout
      name="Games for Kids"
      description="Discover a world of educational and entertaining games designed specifically for children. Our curated selection of online games promotes learning, creativity, and cognitive development while ensuring a safe and enjoyable gaming experience. From puzzle games to interactive learning adventures, we provide age-appropriate content that makes learning fun."
      process={[
        "Age-appropriate game selection",
        "Parental controls setup and customization",
        "Safe gaming environment configuration",
        "Regular content updates and new game additions",
        "Progress tracking and learning assessment",
      ]}
      image="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=1600"
      sites={[
        {
          name: "Pogo",
          url: "https://www.pogo.com/",
          rating: 4.9,
          verified: true,
        },
        {
          name: "Addicting Games",
          url: "https://www.addictinggames.com/",
          rating: 4.7,
          verified: true,
        },
        {
          name: "Free Online Games",
          url: "https://www.freeonlinegames.com/",
          rating: 4.4,
          verified: true,
        },
      ]}
    />
    </AuthGuard>
  )
}
