import ServicePageLayout from "@/app/components/ServicePageLayout"
import AuthGuard from "../authGuard";

export default function EducationServicesPage() {
  return (
    <AuthGuard>
      <ServicePageLayout
      name="Education & Training"
      description="Access premium educational services and professional development programs tailored to your learning goals. Our expert tutors and trainers provide personalized instruction across various subjects and skill sets. Whether you're a student seeking academic excellence or a professional looking to advance your career, our comprehensive educational solutions help you achieve your learning objectives."
      process={[
        "Initial assessment of learning needs and goals",
        "Creation of personalized learning plan",
        "One-on-one sessions with expert tutors",
        "Regular progress tracking and adjustments",
        "Final evaluation and future learning recommendations",
      ]}
      image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1600"
      sites={[
        {
          name: "Coursera",
          url: "https://www.coursera.org",
          rating: 4.9,
          verified: true,
        },
        {
          name: "Udemy",
          url: "https://www.udemy.com",
          rating: 4.5,
          verified: true,
        },
        {
          name: "Chegg Tutors",
          url: "https://www.chegg.com/tutors",
          rating: 4.2,
          verified: false,
        },
      ]}
    />
    </AuthGuard>
  )
}
