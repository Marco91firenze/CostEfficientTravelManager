import { Brain, Route, MapPin, AlertTriangle } from 'lucide-react'

interface ProcessingStepProps {
  completedRoutes: number
  totalRoutes: number
  currentCity: string
  status: 'searching' | 'complete' | 'error'
  error?: string
}

export function ProcessingStep({ completedRoutes, totalRoutes, currentCity, status, error }: ProcessingStepProps) {
  const progress = totalRoutes > 0 ? Math.round((completedRoutes / totalRoutes) * 100) : 0

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

          <p className="text-sm text-slate-500">
            <span className="font-mono font-semibold text-blue-600">
              {completedRoutes.toLocaleString()}
            </span>{' '}
            / {totalRoutes.toLocaleString()} routes queried with live pricing
          </p>
        </>
      )}
    </div>
  )
}
