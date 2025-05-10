import ServicePageLayout from "@/app/components/ServicePageLayout"
import AuthGuard from "@/components/authGuard";

export default function ConsultingServicesPage() {
  return (
    <AuthGuard>
      <ServicePageLayout
      name="Business Consulting"
      description="Transform your business with our strategic consulting services. Our experienced consultants provide expert guidance across various business domains, helping organizations optimize operations, increase efficiency, and drive growth. From strategy development to implementation support, we partner with you to achieve sustainable business success."
      process={[
        "Initial business assessment and goal setting",
        "Comprehensive analysis and strategy development",
        "Implementation planning and resource allocation",
        "Execution support and change management",
        "Performance monitoring and strategy refinement",
      ]}
      image="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=1600"
      sites={[
        {
          name: "McKinsey & Company",
          url: "https://www.mckinsey.com",
          rating: 4.9,
          verified: true,
        },
        {
          name: "Boston Consulting Group",
          url: "https://www.bcg.com",
          rating: 4.8,
          verified: true,
        },
        {
          name: "Bain & Company",
          url: "https://www.bain.com",
          rating: 4.7,
          verified: false,
        },
      ]}
    />
    </AuthGuard>
  )
}
