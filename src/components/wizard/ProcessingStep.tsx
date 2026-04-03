import { useEffect, useState } from 'react'
import { Brain, Route, MapPin } from 'lucide-react'

interface ProcessingStepProps {
  totalCombinations: number
  onComplete: () => void
}

export function ProcessingStep({ totalCombinations, onComplete }: ProcessingStepProps) {
  const [progress, setProgress] = useState(0)
  const [currentCount, setCurrentCount] = useState(0)
  const [phase, setPhase] = useState<'routes' | 'optimizing' | 'complete'>('routes')

  useEffect(() => {
    const duration = 4000
    const interval = 50
    const steps = duration / interval
    let step = 0

    const timer = setInterval(() => {
      step++
      const pct = Math.min((step / steps) * 100, 100)
      setProgress(pct)
      setCurrentCount(Math.floor((pct / 100) * totalCombinations))

      if (pct < 40) {
        setPhase('routes')
      } else if (pct < 90) {
        setPhase('optimizing')
      } else {
        setPhase('complete')
      }

      if (pct >= 100) {
        clearInterval(timer)
        setTimeout(onComplete, 500)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [totalCombinations, onComplete])

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="mb-8">
        <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
          {phase === 'routes' && <Route className="h-10 w-10 text-blue-600" />}
          {phase === 'optimizing' && <Brain className="h-10 w-10 text-blue-600" />}
          {phase === 'complete' && <MapPin className="h-10 w-10 text-blue-600" />}
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {phase === 'routes' && 'Calculating Routes...'}
          {phase === 'optimizing' && 'AI Optimizing...'}
          {phase === 'complete' && 'Optimization Complete!'}
        </h2>
        <p className="text-slate-600">
          {phase === 'routes' && 'Computing distances and transport costs for every route.'}
          {phase === 'optimizing' && 'Finding the perfect city and date combination.'}
          {phase === 'complete' && 'Your results are ready.'}
        </p>
      </div>

      <div className="mb-4">
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-slate-500">
        <span className="font-mono font-semibold text-blue-600">
          {currentCount.toLocaleString()}
        </span>{' '}
        / {totalCombinations.toLocaleString()} combinations evaluated
      </p>
    </div>
  )
}
