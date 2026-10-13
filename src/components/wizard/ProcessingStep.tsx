import { Brain, Route, MapPin, AlertTriangle, TrendingDown } from 'lucide-react'

interface ProcessingStepProps {
  completedRoutes: number
  totalRoutes: number
  currentCity: string
  status: 'searching' | 'complete' | 'error'
  error?: string
  bestSavingsPct?: number
  travelBudget?: number
}

export function ProcessingStep({ completedRoutes, totalRoutes, currentCity, status, error, bestSavingsPct, travelBudget }: ProcessingStepProps) {
  const progress = totalRoutes > 0 ? Math.round((completedRoutes / totalRoutes) * 100) : 0
  const hasSavings = bestSavingsPct !== undefined && travelBudget !== undefined && travelBudget > 0

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="mb-8">
        <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
          status === 'error' ? 'bg-red-100' : 'bg-blue-100 animate-pulse'
        }`}>
          {status === 'error' && <AlertTriangle className="h-10 w-10 text-red-600" />}
          {status === 'searching' && progress < 80 && <Route className="h-10 w-10 text-blue-600" />}
          {status === 'searching' && progress >= 80 && <Brain className="h-10 w-10 text-blue-600" />}
          {status === 'complete' && <MapPin className="h-10 w-10 text-blue-600" />}
        </div>

        {status === 'error' ? (
          <>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Configuration Error</h2>
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
          </>
        ) : status === 'complete' ? (
          <>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Optimization Complete!</h2>
            <p className="text-slate-600">Your results are ready.</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Fetching Real-Time Prices...
            </h2>
            <p className="text-slate-600">
              Querying live flight prices for every route.
            </p>
            {currentCity && (
              <p className="text-sm text-blue-600 mt-2 font-medium">
                Checking routes to {currentCity}...
              </p>
            )}
          </>
        )}
      </div>

      {status !== 'error' && (
        <>
          <div className="mb-4">
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <p className="text-sm text-slate-500 mb-4">
            <span className="font-mono font-semibold text-blue-600">
              {completedRoutes.toLocaleString()}
            </span>{' '}
            / {totalRoutes.toLocaleString()} routes queried with live pricing
          </p>

          {hasSavings && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Best city found so far</p>
                <p className="text-lg font-bold text-green-700">
                  Saves {bestSavingsPct}% of your €{travelBudget!.toLocaleString()} budget
                </p>
                <p className="text-xs text-green-600">
                  ≈ €{Math.round(travelBudget! * bestSavingsPct! / 100).toLocaleString()} saved vs. budget
                </p>
              </div>
            </div>
          )}

          {!hasSavings && status === 'searching' && completedRoutes > 0 && (
            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-500">
              Analyzing first complete city destinations...
            </div>
          )}
        </>
      )}
    </div>
  )
}
