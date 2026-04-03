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
}

export interface DateMultiplier {
  date: string
  dayOfWeek: number
  multiplier: number
  advanceBookingDays: number
}
