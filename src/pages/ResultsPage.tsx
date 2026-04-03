import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, TrendingDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ResultsSummary } from '../components/results/ResultsSummary'
import { CityRankingTable } from '../components/results/CityRankingTable'
import { CostBreakdown } from '../components/results/CostBreakdown'
import { BookingTable } from '../components/results/BookingTable'
import { BlurOverlay } from '../components/results/BlurOverlay'
import { Button } from '../components/ui/Button'
import type { OptimizationResult } from '../types/results'

export function ResultsPage() {
  const { id } = useParams<{ id: string }>()
  const [result, setResult] = useState<OptimizationResult | null>(null)
  const [isPaid, setIsPaid] = useState(false)

  useEffect(() => {
    if (!id) return
    const stored = sessionStorage.getItem(`result-${id}`)
    if (stored) {
      setResult(JSON.parse(stored))
    }
    const paid = sessionStorage.getItem(`paid-${id}`)
    if (paid === 'true') {
      setIsPaid(true)
    }
  }, [id])

  const handleUnlock = () => {
    // In production, this would redirect to Stripe Checkout.
    // For MVP demo, simulate payment.
    if (id) {
      sessionStorage.setItem(`paid-${id}`, 'true')
      setIsPaid(true)
    }
  }

  if (!result) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 mb-4">Project not found or results expired.</p>
        <Link to="/app/projects/new">
          <Button>Create New Project</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            to="/app/dashboard"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Optimization Results</h1>
          <p className="text-slate-600 flex items-center gap-2 mt-1">
            <TrendingDown className="h-4 w-4 text-green-600" />
            {result.combinationsEvaluated.toLocaleString()} combinations evaluated
          </p>
        </div>
        {isPaid && (
          <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
            Full Access Unlocked
          </div>
        )}
      </div>

      <ResultsSummary result={result} isPaid={isPaid} />

      {!isPaid && <BlurOverlay savingsVsWorst={result.savingsVsWorst} onUnlock={handleUnlock} />}

      <CityRankingTable rankings={result.cityRankings} isPaid={isPaid} />

      <CostBreakdown routes={result.bestCity.routeBreakdown} isPaid={isPaid} />

      <BookingTable bookings={result.bookingRecommendations} isPaid={isPaid} />
    </div>
  )
}
