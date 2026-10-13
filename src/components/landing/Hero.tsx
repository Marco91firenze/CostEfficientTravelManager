import { Plane, TrendingDown } from 'lucide-react'
import { Button } from '../ui/Button'
import { useNavigate } from 'react-router-dom'

export function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
              <TrendingDown className="h-4 w-4" />
              <span>Save up to 40% on corporate travel</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Find the cheapest city for your{' '}
            <span className="text-blue-200">corporate event</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl">
            Our AI analyzes thousands of flight combinations to find the
            destination where your team's total travel costs are lowest. Insert your
            offices, get the optimal city and date.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 focus:ring-white"
              onClick={() => navigate('/signup')}
            >
              <Plane className="h-5 w-5 mr-2" />
              Start Free Analysis
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See How It Works
            </Button>
          </div>
          <p className="mt-4 text-sm text-blue-200">
            Free cost estimate. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}
