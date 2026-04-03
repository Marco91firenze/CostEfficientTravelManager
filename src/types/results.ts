import type { RouteEstimate, TransportMode } from './estimation'

export interface CityRanking {
  cityId: string
  cityName: string
  country: string
  totalCost: number
  averageCostPerPerson: number
  bestDate: string
  routeBreakdown: RouteEstimate[]
}

export interface BookingRecommendation {
  officeCityId: string
  officeCityName: string
  destinationCityName: string
  participantCount: number
  mode: TransportMode
  estimatedCostPerPerson: number
  totalCostForOffice: number
  suggestedDeparture: string
  suggestedReturn: string
}

export interface OptimizationResult {
  projectId: string
  bestCity: CityRanking
  bestDate: string
  totalCost: number
  totalParticipants: number
  averageCostPerPerson: number
  cityRankings: CityRanking[]
  bookingRecommendations: BookingRecommendation[]
  computedAt: string
  combinationsEvaluated: number
  savingsVsWorst: number
}
