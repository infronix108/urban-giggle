import Header from './components/Header'
import Hero from './components/Hero'
import ServicesGrid from './components/ServicesGrid'
import ClientValidation from './components/ClientValidation'
import Awards from './components/Awards'
import About from './components/About'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-deep-blue">
      <Header />
      <Hero />
      
      {/* Client Validation Section */}
      <section id="validation" className="py-20">
        <ClientValidation />
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <ServicesGrid />
      </section>

      {/* Accolades Section */}
      <section id="accolades" className="py-20">
        <Awards />
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <About />
      </section>

      <Footer />
    </main>
  )
}
