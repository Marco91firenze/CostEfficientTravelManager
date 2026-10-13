import type { Office } from '../types/project'
import type { CityRanking, BookingRecommendation, OptimizationResult } from '../types/results'
import type { RouteEstimate } from '../types/estimation'
import { CITIES, getCityById } from './cities'
import { haversineDistance } from './haversine'
import { searchRoute, generateGoogleFlightsLink, throttledMap } from '../lib/amadeus'

interface RouteQuery {
  office: Office
  destCityId: string
  destCityName: string
  destCountry: string
  destAirportCode: string
  originAirportCode: string
  dateFrom: string
  dateTo: string
}

export async function runOptimization(
  projectId: string,
  offices: Office[],
  dateRangeStart: string,
  dateRangeEnd: string,
  travelBudget: number,
  onProgress?: (completed: number, total: number, currentCity: string, bestSavingsPct?: number) => void
): Promise<OptimizationResult> {
  const originCityIds = new Set(offices.map(o => o.cityId))
  const totalParticipants = offices.reduce((sum, o) => sum + o.participantCount, 0)
  const officeCount = offices.length

  const candidateCities = CITIES.filter(c => !originCityIds.has(c.id))

  // Build all route queries
  const routeQueries: RouteQuery[] = []
  for (const destCity of candidateCities) {
    for (const office of offices) {
      const originCity = getCityById(office.cityId)
      if (!originCity) continue
      routeQueries.push({
        office,
        destCityId: destCity.id,
        destCityName: destCity.name,
        destCountry: destCity.country,
        destAirportCode: destCity.airportCode,
        originAirportCode: originCity.airportCode,
        dateFrom: dateRangeStart,
        dateTo: dateRangeEnd,
      })
    }
  }

  const totalRoutes = routeQueries.length

  // Track per-city partial costs for live savings display
  const cityProgress = new Map<string, { costSum: number; routeCount: number }>()
  let bestCompleteCost = Infinity

  // Query routes with concurrency 12
  const routeResults = await throttledMap(
    routeQueries,
    async (query) => {
      const originCity = getCityById(query.office.cityId)!
      const destCity = CITIES.find(c => c.id === query.destCityId)!
      const distanceKm = haversineDistance(originCity.lat, originCity.lng, destCity.lat, destCity.lng)
      const googleLink = generateGoogleFlightsLink(
        query.originAirportCode,
        query.destAirportCode,
        query.dateFrom,
        query.dateTo
      )

      const trackCity = (totalCostForRoute: number) => {
        const prev = cityProgress.get(query.destCityId) ?? { costSum: 0, routeCount: 0 }
        const updated = { costSum: prev.costSum + totalCostForRoute, routeCount: prev.routeCount + 1 }
        cityProgress.set(query.destCityId, updated)
        if (updated.routeCount === officeCount && updated.costSum < bestCompleteCost) {
          bestCompleteCost = updated.costSum
        }
      }

      try {
        const result = await searchRoute(
          query.originAirportCode,
          query.destAirportCode,
          query.dateFrom,
          query.dateTo
        )
        if (result) {
          const routeCost = result.price * query.office.participantCount
          trackCity(routeCost)
          return {
            query,
            route: {
              originCityId: query.office.cityId,
              originCityName: query.office.cityName,
              destinationCityId: query.destCityId,
              destinationCityName: query.destCityName,
              distanceKm,
              recommendedMode: 'flight' as const,
              estimatedCostPerPerson: result.price,
              estimatedDurationMinutes: result.durationMinutes,
              participantCount: query.office.participantCount,
              totalCostForRoute: routeCost,
              bookingLink: result.bookingLink,
              fallbackSearchLink: googleLink,
              carrier: result.carrier,
              stops: result.stops,
              departureDate: result.departureDate,
              returnDate: result.returnDate,
              isRealPrice: result.price > 0,
            } satisfies RouteEstimate,
            found: true,
          }
        }
      } catch { /* fall through */ }

      trackCity(0)
      return {
        query,
        route: {
          originCityId: query.office.cityId,
          originCityName: query.office.cityName,
          destinationCityId: query.destCityId,
          destinationCityName: query.destCityName,
          distanceKm,
          recommendedMode: 'flight' as const,
          estimatedCostPerPerson: 0,
          estimatedDurationMinutes: 0,
          participantCount: query.office.participantCount,
          totalCostForRoute: 0,
          bookingLink: '',
          fallbackSearchLink: googleLink,
          carrier: 'N/A',
          stops: 0,
          departureDate: query.dateFrom,
          returnDate: query.dateTo,
          isRealPrice: false,
        } satisfies RouteEstimate,
        found: false,
      }
    },
    12,
    (completed) => {
      const currentQuery = routeQueries[Math.min(completed, routeQueries.length - 1)]
      const savingsPct = bestCompleteCost < Infinity && travelBudget > 0
        ? Math.max(0, Math.round((1 - bestCompleteCost / travelBudget) * 100))
        : undefined
      onProgress?.(completed, totalRoutes, currentQuery?.destCityName || '', savingsPct)
    }
  )

  // Group routes by destination city
  const cityRouteMap = new Map<string, { routes: RouteEstimate[]; hasIncomplete: boolean }>()
  for (const result of routeResults) {
    const key = result.query.destCityId
    if (!cityRouteMap.has(key)) {
      cityRouteMap.set(key, { routes: [], hasIncomplete: false })
    }
    const entry = cityRouteMap.get(key)!
    entry.routes.push(result.route)
    if (!result.found) entry.hasIncomplete = true
  }

  // Build city rankings
  const cityRankings: CityRanking[] = []
  for (const [cityId, { routes, hasIncomplete }] of cityRouteMap) {
    const destCity = CITIES.find(c => c.id === cityId)!
    const totalCost = routes.reduce((sum, r) => sum + r.totalCostForRoute, 0)

    const dateCounts = new Map<string, number>()
    for (const r of routes) {
      if (r.isRealPrice) {
        dateCounts.set(r.departureDate, (dateCounts.get(r.departureDate) || 0) + r.participantCount)
      }
    }
    let bestDate = dateRangeStart
    let bestDateCount = 0
    for (const [date, count] of dateCounts) {
      if (count > bestDateCount) { bestDateCount = count; bestDate = date }
    }

    cityRankings.push({
      cityId,
      cityName: destCity.name,
      country: destCity.country,
      totalCost,
      averageCostPerPerson: totalParticipants > 0 ? Math.round(totalCost / totalParticipants) : 0,
      bestDate,
      routeBreakdown: routes,
      hasIncompleteData: hasIncomplete,
    })
  }

  cityRankings.sort((a, b) => {
    if (a.hasIncompleteData !== b.hasIncompleteData) return a.hasIncompleteData ? 1 : -1
    return a.totalCost - b.totalCost
  })

  const bestCity = cityRankings[0]

  const bookingRecommendations: BookingRecommendation[] = bestCity.routeBreakdown.map(route => ({
    officeCityId: route.originCityId,
    officeCityName: route.originCityName,
    destinationCityName: bestCity.cityName,
    participantCount: route.participantCount,
    mode: route.recommendedMode,
    estimatedCostPerPerson: route.estimatedCostPerPerson,
    totalCostForOffice: route.totalCostForRoute,
    suggestedDeparture: route.departureDate,
    suggestedReturn: route.returnDate,
    bookingLink: route.bookingLink,
    fallbackSearchLink: route.fallbackSearchLink,
    carrier: route.carrier,
    stops: route.stops,
    isRealPrice: route.isRealPrice,
  }))

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
    routesQueried: totalRoutes,
    savingsVsBudget: Math.max(0, travelBudget - bestCity.totalCost),
    travelBudget,
  }
}
