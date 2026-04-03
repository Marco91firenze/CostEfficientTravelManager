import { MapPin, Calendar, Users, PiggyBank } from 'lucide-react'
import { Card } from '../ui/Card'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import type { OptimizationResult } from '../../types/results'

interface ResultsSummaryProps {
  result: OptimizationResult
  isPaid: boolean
}

export function ResultsSummary({ result, isPaid }: ResultsSummaryProps) {
  const stats = [
    {
      icon: MapPin,
      label: 'Optimal City',
      value: isPaid ? `${result.bestCity.cityName}, ${result.bestCity.country}` : '???',
      blur: !isPaid,
    },
    {
      icon: Calendar,
      label: 'Best Travel Date',
      value: isPaid ? formatDate(result.bestDate) : '???',
      blur: !isPaid,
    },
    {
      icon: PiggyBank,
      label: 'Total Estimated Cost',
      value: formatCurrency(result.totalCost),
      blur: !isPaid,
    },
    {
      icon: Users,
      label: 'Total Participants',
      value: result.totalParticipants.toString(),
      blur: false,
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
              <stat.icon className="h-5 w-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
              <p
                className={`text-lg font-bold text-slate-900 truncate ${
                  stat.blur ? 'blur-md select-none' : ''
                }`}
              >
                {stat.value}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
