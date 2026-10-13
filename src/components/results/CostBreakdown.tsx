import { Plane, ExternalLink } from 'lucide-react'
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
        <p className="text-sm text-slate-500">Real-time travel costs from each origin office</p>
      </div>
      <div className={`${!isPaid ? 'blur-md select-none pointer-events-none' : ''}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">From</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Mode</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Carrier</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Per Person</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">People</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Subtotal</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Book</th>
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
                      <Plane className="h-3.5 w-3.5" />
                      Flight
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {route.carrier}
                    {route.stops > 0 && (
                      <span className="text-xs text-slate-400 ml-1">
                        ({route.stops} stop{route.stops > 1 ? 's' : ''})
                      </span>
                    )}
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
                  <td className="px-4 py-3 text-sm">
                    {route.bookingLink ? (
                      <a
                        href={route.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700"
                      >
                        Book <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : route.fallbackSearchLink ? (
                      <a
                        href={route.fallbackSearchLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-700"
                      >
                        Search <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
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
