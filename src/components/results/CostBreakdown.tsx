import { Plane, Train } from 'lucide-react'
import { Card } from '../ui/Card'
import { formatCurrency } from '../../utils/formatCurrency'
import type { RouteEstimate } from '../../types/estimation'

interface CostBreakdownProps {
  routes: RouteEstimate[]
  isPaid: boolean
}

export function CostBreakdown({ routes, isPaid }: CostBreakdownProps) {
  return (
    <Card className="overflow-hidden mb-6">
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Cost Breakdown by Office</h3>
        <p className="text-sm text-slate-500">Travel costs from each origin office</p>
      </div>
      <div className={`${!isPaid ? 'blur-md select-none pointer-events-none' : ''}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">From</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Mode</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Distance</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Per Person</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">People</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route.originCityId} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">
                    {route.originCityName}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    <span className="inline-flex items-center gap-1">
                      {route.recommendedMode === 'flight' ? (
                        <Plane className="h-3.5 w-3.5" />
                      ) : (
                        <Train className="h-3.5 w-3.5" />
                      )}
                      {route.recommendedMode === 'flight' ? 'Flight' : 'Train'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {route.distanceKm.toLocaleString()} km
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {formatCurrency(route.estimatedCostPerPerson)}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {route.participantCount}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                    {formatCurrency(route.totalCostForRoute)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
}
