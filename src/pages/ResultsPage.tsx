import { useParams, Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, TrendingDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ResultsSummary } from '../components/results/ResultsSummary'
import { CityRankingTable } from '../components/results/CityRankingTable'
import { CostBreakdown } from '../components/results/CostBreakdown'
import { BookingTable } from '../components/results/BookingTable'
import { BlurOverlay } from '../components/results/BlurOverlay'
import { Button } from '../components/ui/Button'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { OptimizationResult } from '../types/results'

const API_BASE = import.meta.env.VITE_API_URL ?? ''

export function ResultsPage() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const [result, setResult] = useState<OptimizationResult | null>(null)
  const [isPaid, setIsPaid] = useState(false)
  const [savingsVsBudget, setSavingsVsBudget] = useState(0)
  const [unlocking, setUnlocking] = useState(false)

  useEffect(() => {
    if (!id) return

    const load = async () => {
      // Try Supabase first
      if (user) {
        const { data } = await supabase
          .from('results')
          .select('data, is_paid, savings_vs_budget')
          .eq('id', id)
          .single()

        if (data) {
          setResult(data.data as OptimizationResult)
          setIsPaid(data.is_paid)
          setSavingsVsBudget(data.savings_vs_budget ?? 0)
          // If returning from Stripe with ?paid=true, re-check DB
          if (searchParams.get('paid') === 'true' && !data.is_paid) {
            // Webhook may still be processing; poll once after 2s
            setTimeout(async () => {
              const { data: refreshed } = await supabase
                .from('results')
                .select('is_paid')
                .eq('id', id)
                .single()
              if (refreshed?.is_paid) setIsPaid(true)
            }, 2000)
          }
          return
        }
      }

      // Fallback to sessionStorage
      const stored = sessionStorage.getItem(`result-${id}`)
      if (stored) {
        const parsed = JSON.parse(stored) as OptimizationResult
        setResult(parsed)
        const projectStored = sessionStorage.getItem(`project-${id}`)
        if (projectStored) {
          const project = JSON.parse(projectStored)
          setSavingsVsBudget(Math.max(0, (project.travelBudget || 0) - parsed.totalCost))
        }
        if (sessionStorage.getItem(`paid-${id}`) === 'true') setIsPaid(true)
      }
    }

    load()
  }, [id, user, searchParams])

  const handleUnlock = async () => {
    if (!id || unlocking) return
    setUnlocking(true)

    // If Stripe not configured, use mock unlock for local dev
    const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? ''
    if (!stripeKey || stripeKey === 'pk_test_placeholder') {
      sessionStorage.setItem(`paid-${id}`, 'true')
      setIsPaid(true)
      setUnlocking(false)
      return
    }

    try {
      const res = await fetch(`${API_BASE}/api/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: id,
          savingsAmount: savingsVsBudget,
          userEmail: user?.email,
        }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch (err) {
      console.error('Checkout error:', err)
      setUnlocking(false)
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

  const unlockPrice = Math.round(savingsVsBudget * 0.33)

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
            {result.routesQueried.toLocaleString()} routes queried with live pricing
          </p>
        </div>
        {isPaid && (
          <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
            Full Access Unlocked
          </div>
        )}
      </div>

      <ResultsSummary result={result} isPaid={isPaid} />

      {!isPaid && (
        <BlurOverlay
          savingsVsBudget={savingsVsBudget}
          unlockPrice={unlockPrice}
          onUnlock={handleUnlock}
          loading={unlocking}
        />
      )}

      <CityRankingTable rankings={result.cityRankings} isPaid={isPaid} />

      <CostBreakdown routes={result.bestCity.routeBreakdown} isPaid={isPaid} />

      <BookingTable bookings={result.bookingRecommendations} isPaid={isPaid} />
    </div>
  )
}
