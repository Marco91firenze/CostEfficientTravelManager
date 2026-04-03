import { Trophy } from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import type { CityRanking } from '../../types/results'

interface CityRankingTableProps {
  rankings: CityRanking[]
  isPaid: boolean
}

export function CityRankingTable({ rankings, isPaid }: CityRankingTableProps) {
  const visibleCount = isPaid ? rankings.length : 5
  const displayed = rankings.slice(0, visibleCount)

  return (
    <Card className="overflow-hidden mb-6">
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          City Ranking
        </h3>
        <p className="text-sm text-slate-500">
          {rankings.length} cities evaluated, sorted by total travel cost
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">#</th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">City</th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Total Cost</th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Avg / Person</th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Best Date</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((city, i) => {
              const blurRow = !isPaid && i < 3
              return (
                <tr key={city.cityId} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm">
                    {i === 0 && isPaid ? (
                      <Badge variant="success">1st</Badge>
                    ) : (
                      <span className="text-slate-500">{i + 1}</span>
                    )}
                  </td>
                  <td className={`px-4 py-3 text-sm font-medium text-slate-900 ${blurRow ? 'blur-md select-none' : ''}`}>
                    {city.cityName}, {city.country}
                  </td>
                  <td className={`px-4 py-3 text-sm text-slate-700 ${blurRow ? 'blur-md select-none' : ''}`}>
                    {formatCurrency(city.totalCost)}
                  </td>
                  <td className={`px-4 py-3 text-sm text-slate-700 ${blurRow ? 'blur-md select-none' : ''}`}>
                    {formatCurrency(city.averageCostPerPerson)}
                  </td>
                  <td className={`px-4 py-3 text-sm text-slate-500 ${blurRow ? 'blur-md select-none' : ''}`}>
                    {formatDate(city.bestDate)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {!isPaid && rankings.length > visibleCount && (
        <div className="p-4 bg-slate-50 text-center text-sm text-slate-500">
          + {rankings.length - visibleCount} more cities hidden. Unlock to see the full ranking.
        </div>
      )}
    </Card>
  )
}
