import type { Office } from '../types/project'
import type { CityRanking, BookingRecommendation, OptimizationResult } from '../types/results'
import type { RouteEstimate } from '../types/estimation'
import { CITIES, getCityById } from './cities'
import { haversineDistance } from './haversine'
import { searchRouteBatch, generateGoogleFlightsLink, throttledMap } from '../lib/amadeus'

// Only consider cities within this radius of the offices centroid
const MAX_CANDIDATE_DISTANCE_KM = 4000

// Max routes per claude CLI call (fits safely within --max-turns 12)
const MAX_BATCH_SIZE = 5

function computeCentroid(offices: Office[]): { lat: number; lng: number } {
  const totalParticipants = offices.reduce((s, o) => s + o.participantCount, 0)
  if (totalParticipants === 0) {
    const n = offices.length
    return {
      lat: offices.reduce((s, o) => s + (getCityById(o.cityId)?.lat ?? 0), 0) / n,
      lng: offices.reduce((s, o) => s + (getCityById(o.cityId)?.lng ?? 0), 0) / n,
    }
  }
  return {
    lat: offices.reduce((s, o) => s + (getCityById(o.cityId)?.lat ?? 0) * o.participantCount, 0) / totalParticipants,
    lng: offices.reduce((s, o) => s + (getCityById(o.cityId)?.lng ?? 0) * o.participantCount, 0) / totalParticipants,
  }
}

interface OfficeRoute {
  office: Office
  distanceKm: number
  googleLink: string
  flyFrom: string
  flyTo: string
}

interface CityBatch {
  destCityId: string
  destCityName: string
  destCountry: string
  officeRoutes: OfficeRoute[]
}

export async function runOptimization(
  projectId: string,
  offices: Office[],
  dateRangeStart: string,
  dateRangeEnd: string,
  travelBudget: number,
  onProgress?: (completed: number, total: number, currentCity: string) => void
): Promise<OptimizationResult> {
  const originCityIds = new Set(offices.map(o => o.cityId))
  const totalParticipants = offices.reduce((sum, o) => sum + o.participantCount, 0)

  // Geo pre-filter: only cities within 4000km of the weighted centroid of offices
  const centroid = computeCentroid(offices)
  const candidateCities = CITIES.filter(c =>
    !originCityIds.has(c.id) &&
    haversineDistance(centroid.lat, centroid.lng, c.lat, c.lng) <= MAX_CANDIDATE_DISTANCE_KM
  )

  const totalCities = candidateCities.length

  // Build city-level batch entries (all office routes to each destination city)
  const cityBatches: CityBatch[] = candidateCities.map(destCity => {
    const officeRoutes: OfficeRoute[] = offices.flatMap(office => {
      const originCity = getCityById(office.cityId)
      if (!originCity) return []
      return [{
        office,
        distanceKm: haversineDistance(originCity.lat, originCity.lng, destCity.lat, destCity.lng),
        googleLink: generateGoogleFlightsLink(originCity.airportCode, destCity.airportCode, dateRangeStart, dateRangeEnd),
        flyFrom: originCity.airportCode,
        flyTo: destCity.airportCode,
      }]
    })
    return { destCityId: destCity.id, destCityName: destCity.name, destCountry: destCity.country, officeRoutes }
  })

  let completedCities = 0

  // Process city batches concurrently (12 concurrent subprocess calls)
  const cityRankings: CityRanking[] = await throttledMap(
    cityBatches,
    async (batch) => {
      // Split into sub-batches of MAX_BATCH_SIZE if more offices than limit
      const routes = batch.officeRoutes.map(r => ({
        flyFrom: r.flyFrom,
        flyTo: r.flyTo,
        dateFrom: dateRangeStart,
        dateTo: dateRangeEnd,
      }))

      let allApiResults: (Awaited<ReturnType<typeof searchRouteBatch>>[number])[] = []
      for (let i = 0; i < routes.length; i += MAX_BATCH_SIZE) {
        const sub = await searchRouteBatch(routes.slice(i, i + MAX_BATCH_SIZE))
        allApiResults = allApiResults.concat(sub)
      }

      completedCities++
      onProgress?.(
        completedCities * offices.length,
        totalCities * offices.length,
        batch.destCityName
      )

      // Build RouteEstimate array for this city
      const routeBreakdown: RouteEstimate[] = []
      let hasIncomplete = false

      for (let i = 0; i < batch.officeRoutes.length; i++) {
        const or = batch.officeRoutes[i]
        const api = allApiResults[i]

        if (api && typeof api.price === 'number') {
          routeBreakdown.push({
            originCityId: or.office.cityId,
            originCityName: or.office.cityName,
            destinationCityId: batch.destCityId,
            destinationCityName: batch.destCityName,
            distanceKm: or.distanceKm,
            recommendedMode: 'flight',
            estimatedCostPerPerson: api.price,
            estimatedDurationMinutes: api.durationMinutes,
            participantCount: or.office.participantCount,
            totalCostForRoute: api.price * or.office.participantCount,
            bookingLink: api.bookingLink ?? '',
            fallbackSearchLink: or.googleLink,
            carrier: api.carrier ?? 'N/A',
            stops: api.stops ?? 0,
            departureDate: api.departureDate ?? dateRangeStart,
            returnDate: api.returnDate ?? dateRangeEnd,
            isRealPrice: true,
          })
        } else {
          hasIncomplete = true
          routeBreakdown.push({
            originCityId: or.office.cityId,
            originCityName: or.office.cityName,
            destinationCityId: batch.destCityId,
            destinationCityName: batch.destCityName,
            distanceKm: or.distanceKm,
            recommendedMode: 'flight',
            estimatedCostPerPerson: 0,
            estimatedDurationMinutes: 0,
            participantCount: or.office.participantCount,
            totalCostForRoute: 0,
            bookingLink: '',
            fallbackSearchLink: or.googleLink,
            carrier: 'N/A',
            stops: 0,
            departureDate: dateRangeStart,
            returnDate: dateRangeEnd,
            isRealPrice: false,
          })
        }
      }

      const totalCost = routeBreakdown.reduce((s, r) => s + r.totalCostForRoute, 0)

      // Best departure date = most common date weighted by participant count
      const dateCounts = new Map<string, number>()
      for (const r of routeBreakdown) {
        if (r.isRealPrice) {
          dateCounts.set(r.departureDate, (dateCounts.get(r.departureDate) ?? 0) + r.participantCount)
        }
      }
      let bestDate = dateRangeStart
      let bestCount = 0
      for (const [date, count] of dateCounts) {
        if (count > bestCount) { bestCount = count; bestDate = date }
      }

      return {
        cityId: batch.destCityId,
        cityName: batch.destCityName,
        country: batch.destCountry,
        totalCost,
        averageCostPerPerson: totalParticipants > 0 ? Math.round(totalCost / totalParticipants) : 0,
        bestDate,
        routeBreakdown,
        hasIncompleteData: hasIncomplete,
      }
    },
    12
  )

  // Sort: complete data first by cost, then incomplete by cost
  cityRankings.sort((a, b) => {
    if (a.hasIncompleteData !== b.hasIncompleteData) return a.hasIncompleteData ? 1 : -1
    return a.totalCost - b.totalCost
  })

  const bestCity = cityRankings[0]
  const totalRoutes = totalCities * offices.length

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
