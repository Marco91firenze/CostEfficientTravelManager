import { useState } from 'react'
import { Trophy, ChevronDown, ChevronUp, ExternalLink, Plane, AlertTriangle, Lock } from 'lucide-react'
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
  const [expandedCity, setExpandedCity] = useState<string | null>(null)

  const toggleExpand = (cityId: string) => {
    if (!isPaid) return
    setExpandedCity(expandedCity === cityId ? null : cityId)
  }

  return (
    <Card className="overflow-hidden mb-6">
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          City Ranking
        </h3>
        <p className="text-sm text-slate-500">
          {rankings.length} cities evaluated with real-time pricing, sorted by total travel cost
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
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-10"></th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((city, i) => (
              <CityRow
                key={city.cityId}
                city={city}
                rank={i + 1}
                isPaid={isPaid}
                isExpanded={expandedCity === city.cityId}
                onToggle={() => toggleExpand(city.cityId)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

function CityRow({
  city,
  rank,
  isPaid,
  isExpanded,
  onToggle,
}: {
  city: CityRanking
  rank: number
  isPaid: boolean
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <>
      <tr
        className={`border-t border-slate-100 hover:bg-slate-50 ${isPaid ? 'cursor-pointer' : ''}`}
        onClick={onToggle}
      >
        <td className="px-4 py-3 text-sm">
          {rank === 1 && isPaid ? (
            <Badge variant="success">1st</Badge>
          ) : (
            <span className="text-slate-500">{rank}</span>
          )}
        </td>
        <td className="px-4 py-3 text-sm font-medium text-slate-900">
          <span className={!isPaid ? 'blur-sm select-none' : ''}>
            {city.cityName}, {city.country}
          </span>
          {city.hasIncompleteData && isPaid && (
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500 inline ml-1" />
          )}
        </td>
        <td className="px-4 py-3 text-sm text-slate-700">
          {formatCurrency(city.totalCost)}
        </td>
        <td className="px-4 py-3 text-sm text-slate-700">
          {formatCurrency(city.averageCostPerPerson)}
        </td>
        <td className="px-4 py-3 text-sm text-slate-500">
          {formatDate(city.bestDate)}
        </td>
        <td className="px-4 py-3 text-sm text-slate-400">
          {isPaid ? (
            isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
          ) : (
            <Lock className="h-3.5 w-3.5" />
          )}
        </td>
      </tr>
      {isExpanded && isPaid && (
        <tr>
          <td colSpan={6} className="bg-slate-50 px-4 py-3">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                Per-Office Breakdown for {city.cityName}
              </p>
              {city.routeBreakdown.map((route) => (
                <div
                  key={route.originCityId}
                  className="flex items-center justify-between bg-white rounded-lg border border-slate-200 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-sm text-slate-600">
                      <Plane className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {route.originCityName} → {city.cityName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {route.carrier} · {route.stops === 0 ? 'Direct' : `${route.stops} stop${route.stops > 1 ? 's' : ''}`}
                        {route.distanceKm > 0 && ` · ${route.distanceKm.toLocaleString()} km`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">
                        {formatCurrency(route.estimatedCostPerPerson)} / person
                      </p>
                      <p className="text-xs text-slate-500">
                        {route.participantCount} pax = {formatCurrency(route.totalCostForRoute)}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {route.bookingLink && (
                        <a
                          href={route.bookingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs bg-blue-600 text-white px-2.5 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Book
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {route.fallbackSearchLink && (
                        <a
                          href={route.fallbackSearchLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs border border-slate-300 text-slate-600 px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
                        >
                          Search
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
