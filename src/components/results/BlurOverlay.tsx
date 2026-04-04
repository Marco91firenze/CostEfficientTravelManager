import { Lock, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'
import { formatCurrency } from '../../utils/formatCurrency'

interface BlurOverlayProps {
  savingsVsBudget: number
  onUnlock: () => void
}

export function BlurOverlay({ savingsVsBudget, onUnlock }: BlurOverlayProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-8 text-white text-center mb-6">
      <div className="mx-auto w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
        <Lock className="h-8 w-8" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Unlock Full Results</h3>
      <p className="text-blue-100 mb-4 max-w-md mx-auto">
        Our analysis found potential savings of up to{' '}
        <span className="font-bold text-white">{formatCurrency(savingsVsBudget)}</span>{' '}
        compared to your budget. Unlock to see the optimal city, date and booking recommendations.
      </p>
      <Button
        size="lg"
        className="bg-white text-blue-700 hover:bg-blue-50 focus:ring-white"
        onClick={onUnlock}
      >
        <Sparkles className="h-5 w-5 mr-2" />
        Unlock for &euro;49
      </Button>
      <p className="text-xs text-blue-200 mt-3">
        One-time payment. No subscription. Instant access.
      </p>
    </div>
  )
}
