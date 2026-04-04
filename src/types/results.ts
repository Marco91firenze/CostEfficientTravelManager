import type { RouteEstimate, TransportMode } from './estimation'

export interface CityRanking {
  cityId: string
  cityName: string
  country: string
  totalCost: number
  averageCostPerPerson: number
  bestDate: string
  routeBreakdown: RouteEstimate[]
  hasIncompleteData: boolean
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
  bookingLink: string
  fallbackSearchLink: string
  carrier: string
  stops: number
  isRealPrice: boolean
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
  routesQueried: number
  savingsVsBudget: number
  travelBudget: number
}
