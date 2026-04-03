import { Hero } from '../components/landing/Hero'
import { HowItWorks } from '../components/landing/HowItWorks'
import { Features } from '../components/landing/Features'
import { Pricing } from '../components/landing/Pricing'
import { Footer } from '../components/landing/Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <Footer />
    </div>
  )
}
