import { Building2, Brain, MapPin } from 'lucide-react'

const steps = [
  {
    icon: Building2,
    title: '1. Map Your Offices',
    description: 'Enter which cities your participants are traveling from and how many people from each office.',
  },
  {
    icon: Brain,
    title: '2. AI Optimizes',
    description: 'Our algorithm queries real-time prices across 150+ cities worldwide to find the destination with the lowest total travel cost.',
  },
  {
    icon: MapPin,
    title: '3. Get Your Results',
    description: 'Receive the optimal city, best travel date, and specific flight/train booking recommendations for every participant.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Three simple steps to find the most cost-efficient destination for your corporate event.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <step.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-slate-300" />
            <div className="h-2 w-2 rounded-full bg-blue-600" />
            <div className="h-px w-16 bg-slate-300" />
            <div className="h-2 w-2 rounded-full bg-blue-600" />
            <div className="h-px w-16 bg-slate-300" />
          </div>
        </div>
      </div>
    </section>
  )
}
