// Flight pricing constants
export const FLIGHT_BASE_COST = 40 // EUR - airport fees/taxes floor
export const FLIGHT_COST_PER_KM = 0.08 // EUR per km
export const FLIGHT_SHORT_HAUL_PREMIUM = 1.15 // <500km fixed costs dominate
export const FLIGHT_LONG_HAUL_DISCOUNT = 0.85 // >2500km economies of scale
export const FLIGHT_SHORT_HAUL_THRESHOLD = 500 // km
export const FLIGHT_LONG_HAUL_THRESHOLD = 2500 // km

// Speed estimates for duration calculation
export const FLIGHT_SPEED_KMH = 800
export const FLIGHT_OVERHEAD_MINUTES = 150 // check-in, boarding, taxi, baggage

// Day-of-week multipliers (0=Sunday, 6=Saturday)
export const DAY_OF_WEEK_MULTIPLIERS: Record<number, number> = {
  0: 1.10, // Sunday
  1: 1.05, // Monday
  2: 0.95, // Tuesday
  3: 0.93, // Wednesday
  4: 1.00, // Thursday
  5: 1.30, // Friday
  6: 1.15, // Saturday
}

// Month seasonality multipliers (0=January, 11=December)
export const SEASONALITY_MULTIPLIERS: Record<number, number> = {
  0: 0.85,  // January
  1: 0.85,  // February
  2: 0.90,  // March
  3: 0.95,  // April
  4: 1.00,  // May
  5: 1.10,  // June
  6: 1.15,  // July
  7: 1.05,  // August
  8: 1.05,  // September
  9: 1.00,  // October
  10: 0.90, // November
  11: 1.20, // December
}

// Advance booking discount curve
export function getAdvanceBookingMultiplier(daysInAdvance: number): number {
  if (daysInAdvance > 60) return 0.80
  if (daysInAdvance > 30) return 0.90
  if (daysInAdvance > 14) return 1.00
  if (daysInAdvance > 7) return 1.20
  return 1.50
}
