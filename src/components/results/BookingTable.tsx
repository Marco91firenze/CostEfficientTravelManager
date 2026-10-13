import { Plane, Calendar, ExternalLink } from 'lucide-react'
import { Card } from '../ui/Card'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import type { BookingRecommendation } from '../../types/results'

interface BookingTableProps {
  bookings: BookingRecommendation[]
  isPaid: boolean
}

export function BookingTable({ bookings, isPaid }: BookingTableProps) {
  if (!isPaid) return null

  return (
    <Card className="overflow-hidden mb-6">
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Booking Recommendations</h3>
        <p className="text-sm text-slate-500">
          Tell each office to book these specific trips. Prices are live and may change.
        </p>
      </div>
      <div className="divide-y divide-slate-100">
        {bookings.map((b) => (
          <div key={b.officeCityId} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-slate-900">
                  {b.officeCityName} → {b.destinationCityName}
                </p>
                <p className="text-sm text-slate-500">
                  {b.participantCount} participant{b.participantCount !== 1 ? 's' : ''}
                  {b.carrier !== 'N/A' && ` · ${b.carrier}`}
                  {b.stops > 0 && ` · ${b.stops} stop${b.stops > 1 ? 's' : ''}`}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">{formatCurrency(b.totalCostForOffice)}</p>
                <p className="text-xs text-slate-500">
                  {formatCurrency(b.estimatedCostPerPerson)} / person
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1">
                <Plane className="h-3.5 w-3.5" />
                Flight
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Depart: {formatDate(b.suggestedDeparture)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Return: {formatDate(b.suggestedReturn)}
              </span>
              <div className="flex-1" />
              {b.bookingLink ? (
                <a
                  href={b.bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
                >
                  Book Now
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : b.fallbackSearchLink ? (
                <a
                  href={b.fallbackSearchLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 border border-slate-300 text-slate-600 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-slate-100 transition-colors"
                >
                  Search Flights
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
