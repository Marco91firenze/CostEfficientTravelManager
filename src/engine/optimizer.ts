import type { Office } from '../types/project'
import type { CityRanking, BookingRecommendation, OptimizationResult } from '../types/results'
import type { RouteEstimate } from '../types/estimation'
import { CITIES, getCityById } from './cities'
import { estimateRouteCost } from './costModel'

function generateDateRange(start: string, end: string): Date[] {
  const dates: Date[] = []
  const current = new Date(start)
  const endDate = new Date(end)
  while (current <= endDate) {
    dates.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  return dates
}

function formatDateISO(d: Date): string {
  return d.toISOString().split('T')[0]
}

export function runOptimization(
  projectId: string,
  offices: Office[],
  dateRangeStart: string,
  dateRangeEnd: string
): OptimizationResult {
  const originCityIds = new Set(offices.map(o => o.cityId))
  const candidateCities = CITIES.filter(c => !originCityIds.has(c.id))
  const dates = generateDateRange(dateRangeStart, dateRangeEnd)

  if (dates.length === 0) {
    dates.push(new Date(dateRangeStart))
  }

  const totalParticipants = offices.reduce((sum, o) => sum + o.participantCount, 0)
  let combinationsEvaluated = 0

  const cityRankings: CityRanking[] = candidateCities.map(destCity => {
    let bestDateCost = Infinity
    let bestDate = dates[0]
    let bestRouteBreakdown: RouteEstimate[] = []

    for (const date of dates) {
      let totalCostForDate = 0
      const routeBreakdown: RouteEstimate[] = []

      for (const office of offices) {
        const originCity = getCityById(office.cityId)
        if (!originCity) continue

        const result = estimateRouteCost(originCity, destCity, date)
        const totalForRoute = result.costPerPerson * office.participantCount

        routeBreakdown.push({
          originCityId: office.cityId,
          originCityName: office.cityName,
          destinationCityId: destCity.id,
          destinationCityName: destCity.name,
          distanceKm: result.distanceKm,
          recommendedMode: result.mode,
          estimatedCostPerPerson: result.costPerPerson,
          estimatedDurationMinutes: result.durationMinutes,
          participantCount: office.participantCount,
          totalCostForRoute: totalForRoute,
        })

        totalCostForDate += totalForRoute
        combinationsEvaluated++
      }

      if (totalCostForDate < bestDateCost) {
        bestDateCost = totalCostForDate
        bestDate = date
        bestRouteBreakdown = routeBreakdown
      }
    }

    return {
      cityId: destCity.id,
      cityName: destCity.name,
      country: destCity.country,
      totalCost: bestDateCost,
      averageCostPerPerson: totalParticipants > 0 ? Math.round(bestDateCost / totalParticipants) : 0,
      bestDate: formatDateISO(bestDate),
      routeBreakdown: bestRouteBreakdown,
    }
  })

  cityRankings.sort((a, b) => a.totalCost - b.totalCost)

  const bestCity = cityRankings[0]
  const worstCity = cityRankings[cityRankings.length - 1]

  const bookingRecommendations: BookingRecommendation[] = bestCity.routeBreakdown.map(route => {
    const departDate = new Date(bestCity.bestDate)
    departDate.setDate(departDate.getDate() - 1)
    const returnDate = new Date(bestCity.bestDate)
    returnDate.setDate(returnDate.getDate() + 1)

    return {
      officeCityId: route.originCityId,
      officeCityName: route.originCityName,
      destinationCityName: bestCity.cityName,
      participantCount: route.participantCount,
      mode: route.recommendedMode,
      estimatedCostPerPerson: route.estimatedCostPerPerson,
      totalCostForOffice: route.totalCostForRoute,
      suggestedDeparture: formatDateISO(departDate),
      suggestedReturn: formatDateISO(returnDate),
    }
  })

  return {
    projectId,
    bestCity,
    bestDate: bestCity.bestDate,
    totalCost: bestCity.totalCost,
    totalParticipants,
    averageCostPerPerson: bestCity.averageCostPerPerson,
    cityRankings,
    bookingRecommendations,
    computedAt: new Date().toISOString(),
    combinationsEvaluated,
    savingsVsWorst: worstCity.totalCost - bestCity.totalCost,
  }
}
