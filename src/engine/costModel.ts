import type { CandidateCity } from '../types/city'
import { haversineDistance } from './haversine'
import {
  FLIGHT_BASE_COST,
  FLIGHT_COST_PER_KM,
  FLIGHT_SHORT_HAUL_PREMIUM,
  FLIGHT_LONG_HAUL_DISCOUNT,
  FLIGHT_SHORT_HAUL_THRESHOLD,
  FLIGHT_LONG_HAUL_THRESHOLD,
  FLIGHT_SPEED_KMH,
  FLIGHT_OVERHEAD_MINUTES,
  DAY_OF_WEEK_MULTIPLIERS,
  SEASONALITY_MULTIPLIERS,
  getAdvanceBookingMultiplier,
} from './constants'

interface CostResult {
  mode: 'flight'
  costPerPerson: number
  durationMinutes: number
  distanceKm: number
}

function estimateFlightCost(distanceKm: number): number {
  let cost = FLIGHT_BASE_COST + distanceKm * FLIGHT_COST_PER_KM
  if (distanceKm < FLIGHT_SHORT_HAUL_THRESHOLD) {
    cost *= FLIGHT_SHORT_HAUL_PREMIUM
  } else if (distanceKm > FLIGHT_LONG_HAUL_THRESHOLD) {
    cost *= FLIGHT_LONG_HAUL_DISCOUNT
  }
  return cost
}

function estimateFlightDuration(distanceKm: number): number {
  return Math.round((distanceKm / FLIGHT_SPEED_KMH) * 60 + FLIGHT_OVERHEAD_MINUTES)
}

export function estimateRouteCost(
  origin: CandidateCity,
  destination: CandidateCity,
  travelDate: Date
): CostResult {
  if (origin.id === destination.id) {
    return { mode: 'flight', costPerPerson: 0, durationMinutes: 0, distanceKm: 0 }
  }

  const distanceKm = haversineDistance(origin.lat, origin.lng, destination.lat, destination.lng)
  const baseCost = estimateFlightCost(distanceKm)
  const durationMinutes = estimateFlightDuration(distanceKm)

  const dayMultiplier = DAY_OF_WEEK_MULTIPLIERS[travelDate.getDay()]
  const monthMultiplier = SEASONALITY_MULTIPLIERS[travelDate.getMonth()]

  const now = new Date()
  const daysInAdvance = Math.max(0, Math.floor((travelDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
  const advanceMultiplier = getAdvanceBookingMultiplier(daysInAdvance)

  const finalCost = Math.round(baseCost * dayMultiplier * monthMultiplier * advanceMultiplier)

  return {
    mode: 'flight',
    costPerPerson: finalCost,
    durationMinutes,
    distanceKm,
  }
}
