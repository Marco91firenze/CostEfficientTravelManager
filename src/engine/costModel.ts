import type { CandidateCity } from '../types/city'
import type { TransportMode } from '../types/estimation'
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
  TRAIN_BASE_COST,
  TRAIN_COST_PER_KM,
  TRAIN_REGIONAL_DISCOUNT,
  TRAIN_REGIONAL_THRESHOLD,
  TRAIN_MAX_DISTANCE,
  TRAIN_ALWAYS_PREFERRED_DISTANCE,
  TRAIN_SPEED_KMH,
  DAY_OF_WEEK_MULTIPLIERS,
  SEASONALITY_MULTIPLIERS,
  getAdvanceBookingMultiplier,
} from './constants'

interface CostResult {
  mode: TransportMode
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

function estimateTrainCost(distanceKm: number): number {
  let cost = TRAIN_BASE_COST + distanceKm * TRAIN_COST_PER_KM
  if (distanceKm < TRAIN_REGIONAL_THRESHOLD) {
    cost *= TRAIN_REGIONAL_DISCOUNT
  }
  return cost
}

function estimateFlightDuration(distanceKm: number): number {
  return Math.round((distanceKm / FLIGHT_SPEED_KMH) * 60 + FLIGHT_OVERHEAD_MINUTES)
}

function estimateTrainDuration(distanceKm: number): number {
  return Math.round((distanceKm / TRAIN_SPEED_KMH) * 60)
}

export function estimateRouteCost(
  origin: CandidateCity,
  destination: CandidateCity,
  travelDate: Date
): CostResult {
  if (origin.id === destination.id) {
    return { mode: 'train', costPerPerson: 0, durationMinutes: 0, distanceKm: 0 }
  }

  const distanceKm = haversineDistance(origin.lat, origin.lng, destination.lat, destination.lng)

  const canTrain =
    distanceKm <= TRAIN_MAX_DISTANCE &&
    origin.hasHighSpeedRail &&
    destination.hasHighSpeedRail

  let mode: TransportMode
  let baseCost: number
  let durationMinutes: number

  if (canTrain && distanceKm <= TRAIN_ALWAYS_PREFERRED_DISTANCE) {
    mode = 'train'
    baseCost = estimateTrainCost(distanceKm)
    durationMinutes = estimateTrainDuration(distanceKm)
  } else if (canTrain) {
    const trainCost = estimateTrainCost(distanceKm)
    const flightCost = estimateFlightCost(distanceKm)
    if (trainCost <= flightCost) {
      mode = 'train'
      baseCost = trainCost
      durationMinutes = estimateTrainDuration(distanceKm)
    } else {
      mode = 'flight'
      baseCost = flightCost
      durationMinutes = estimateFlightDuration(distanceKm)
    }
  } else {
    mode = 'flight'
    baseCost = estimateFlightCost(distanceKm)
    durationMinutes = estimateFlightDuration(distanceKm)
  }

  // Apply temporal multipliers
  const dayMultiplier = DAY_OF_WEEK_MULTIPLIERS[travelDate.getDay()]
  const monthMultiplier = SEASONALITY_MULTIPLIERS[travelDate.getMonth()]

  const now = new Date()
  const daysInAdvance = Math.max(0, Math.floor((travelDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
  const advanceMultiplier = getAdvanceBookingMultiplier(daysInAdvance)

  const finalCost = Math.round(baseCost * dayMultiplier * monthMultiplier * advanceMultiplier)

  return {
    mode,
    costPerPerson: finalCost,
    durationMinutes,
    distanceKm,
  }
}
