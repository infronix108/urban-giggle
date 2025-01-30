import Header from "./components/Header"
import Hero from "./components/Hero"
import ServicesGrid from "./components/ServicesGrid"
import Testimonials from "./components/Testimonials"
import Awards from "./components/Awards"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black to-deep-blue text-white">
      <Header />
      <main>
        <Hero />
        <ServicesGrid />
        <Testimonials />
        <Awards />
      </main>
      <Footer />
    </div>
  )
}

