export type TransportMode = 'flight' | 'train'

export interface RouteEstimate {
  originCityId: string
  originCityName: string
  destinationCityId: string
  destinationCityName: string
  distanceKm: number
  recommendedMode: TransportMode
  estimatedCostPerPerson: number
  estimatedDurationMinutes: number
  participantCount: number
  totalCostForRoute: number
  bookingLink: string
  fallbackSearchLink: string
  carrier: string
  stops: number
  departureDate: string
  returnDate: string
  isRealPrice: boolean
}
