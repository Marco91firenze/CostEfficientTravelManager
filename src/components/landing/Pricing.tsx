import { Check } from 'lucide-react'
import { Button } from '../ui/Button'
import { useNavigate } from 'react-router-dom'

const plans = [
  {
    name: 'Free Preview',
    price: '0',
    description: 'See a blurred cost estimate to understand the potential savings.',
    features: [
      'Unlimited projects',
      'Total cost estimate (blurred)',
      'Top 3 cities preview',
      'Basic cost breakdown',
    ],
    cta: 'Start Free',
    variant: 'outline' as const,
  },
  {
    name: 'Full Report',
    price: null,
    description: 'Unlock complete results with exact booking recommendations.',
    features: [
      'Everything in Free',
      'Exact optimal city revealed',
      'Best travel date',
      'Per-person booking recommendations',
      'Full city ranking with booking links',
      'Direct booking links for every route',
    ],
    cta: 'Start Free, Pay Later',
    variant: 'primary' as const,
    popular: true,
  },
]

export function Pricing() {
  const navigate = useNavigate()

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Start for free. Only pay when you're ready to see the full results.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border-2 ${
                plan.popular
                  ? 'border-blue-600 shadow-lg relative'
                  : 'border-slate-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <div className="mb-4">
                {plan.price !== null ? (
                  <span className="text-4xl font-bold text-slate-900">&euro;{plan.price}</span>
                ) : (
                  <>
                    <span className="text-4xl font-bold text-slate-900">Pay-per-savings</span>
                  </>
                )}
              </div>
              <p className="text-slate-600 mb-6">{plan.description}</p>
              <Button
                variant={plan.variant}
                className="w-full mb-6"
                size="lg"
                onClick={() => navigate('/signup')}
              >
                {plan.cta}
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
