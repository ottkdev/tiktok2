import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Education from '@/components/Education'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg">
      <Header />
      <Hero />
      <Features />
      <Education />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}

