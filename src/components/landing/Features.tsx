import { MapPin, Calendar, PiggyBank, BarChart3, Users, Zap } from 'lucide-react'

const features = [
  {
    icon: MapPin,
    title: '55+ European Cities',
    description: 'Major hubs and regional destinations analyzed, from London to Athens.',
  },
  {
    icon: Calendar,
    title: 'Date Optimization',
    description: 'Day-of-week and seasonality pricing factored in to find the cheapest travel dates.',
  },
  {
    icon: PiggyBank,
    title: 'Real Cost Savings',
    description: 'Average 25-40% savings compared to picking a destination without data analysis.',
  },
  {
    icon: BarChart3,
    title: 'Full Cost Breakdown',
    description: 'See per-office, per-person costs and total budget for every candidate city.',
  },
  {
    icon: Users,
    title: 'Multi-Office Support',
    description: 'Handle teams spread across multiple cities with different participant counts.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'No waiting for quotes. Get your optimized destination in under 10 seconds.',
  },
]

export function Features() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Everything You Need to Optimize Travel Costs
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Built specifically for travel managers organizing corporate events across Europe.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
