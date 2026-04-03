import type { CandidateCity } from '../types/city'

export const CITIES: CandidateCity[] = [
  // Tier 1 - Major European Hubs
  { id: 'london', name: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, airportCode: 'LHR', hasHighSpeedRail: true, conferenceScore: 10, timezone: 'Europe/London' },
  { id: 'paris', name: 'Paris', country: 'France', countryCode: 'FR', lat: 48.8566, lng: 2.3522, airportCode: 'CDG', hasHighSpeedRail: true, conferenceScore: 10, timezone: 'Europe/Paris' },
  { id: 'frankfurt', name: 'Frankfurt', country: 'Germany', countryCode: 'DE', lat: 50.1109, lng: 8.6821, airportCode: 'FRA', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Berlin' },
  { id: 'amsterdam', name: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', lat: 52.3676, lng: 4.9041, airportCode: 'AMS', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Amsterdam' },
  { id: 'madrid', name: 'Madrid', country: 'Spain', countryCode: 'ES', lat: 40.4168, lng: -3.7038, airportCode: 'MAD', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Madrid' },
  { id: 'barcelona', name: 'Barcelona', country: 'Spain', countryCode: 'ES', lat: 41.3874, lng: 2.1686, airportCode: 'BCN', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Madrid' },
  { id: 'rome', name: 'Rome', country: 'Italy', countryCode: 'IT', lat: 41.9028, lng: 12.4964, airportCode: 'FCO', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Rome' },
  { id: 'milan', name: 'Milan', country: 'Italy', countryCode: 'IT', lat: 45.4642, lng: 9.1900, airportCode: 'MXP', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Rome' },
  { id: 'munich', name: 'Munich', country: 'Germany', countryCode: 'DE', lat: 48.1351, lng: 11.5820, airportCode: 'MUC', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Berlin' },
  { id: 'berlin', name: 'Berlin', country: 'Germany', countryCode: 'DE', lat: 52.5200, lng: 13.4050, airportCode: 'BER', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Berlin' },
  { id: 'vienna', name: 'Vienna', country: 'Austria', countryCode: 'AT', lat: 48.2082, lng: 16.3738, airportCode: 'VIE', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Vienna' },
  { id: 'zurich', name: 'Zurich', country: 'Switzerland', countryCode: 'CH', lat: 47.3769, lng: 8.5417, airportCode: 'ZRH', hasHighSpeedRail: true, conferenceScore: 8, timezone: 'Europe/Zurich' },
  { id: 'brussels', name: 'Brussels', country: 'Belgium', countryCode: 'BE', lat: 50.8503, lng: 4.3517, airportCode: 'BRU', hasHighSpeedRail: true, conferenceScore: 8, timezone: 'Europe/Brussels' },
  { id: 'dublin', name: 'Dublin', country: 'Ireland', countryCode: 'IE', lat: 53.3498, lng: -6.2603, airportCode: 'DUB', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'Europe/Dublin' },
  { id: 'copenhagen', name: 'Copenhagen', country: 'Denmark', countryCode: 'DK', lat: 55.6761, lng: 12.5683, airportCode: 'CPH', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'Europe/Copenhagen' },
  { id: 'stockholm', name: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, airportCode: 'ARN', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'Europe/Stockholm' },
  { id: 'lisbon', name: 'Lisbon', country: 'Portugal', countryCode: 'PT', lat: 38.7223, lng: -9.1393, airportCode: 'LIS', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'Europe/Lisbon' },
  { id: 'prague', name: 'Prague', country: 'Czech Republic', countryCode: 'CZ', lat: 50.0755, lng: 14.4378, airportCode: 'PRG', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'Europe/Prague' },
  { id: 'warsaw', name: 'Warsaw', country: 'Poland', countryCode: 'PL', lat: 52.2297, lng: 21.0122, airportCode: 'WAW', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Europe/Warsaw' },
  { id: 'budapest', name: 'Budapest', country: 'Hungary', countryCode: 'HU', lat: 47.4979, lng: 19.0402, airportCode: 'BUD', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Europe/Budapest' },

  // Tier 2 - Strong Regional Cities
  { id: 'hamburg', name: 'Hamburg', country: 'Germany', countryCode: 'DE', lat: 53.5511, lng: 9.9937, airportCode: 'HAM', hasHighSpeedRail: true, conferenceScore: 7, timezone: 'Europe/Berlin' },
  { id: 'dusseldorf', name: 'Dusseldorf', country: 'Germany', countryCode: 'DE', lat: 51.2277, lng: 6.7735, airportCode: 'DUS', hasHighSpeedRail: true, conferenceScore: 7, timezone: 'Europe/Berlin' },
  { id: 'cologne', name: 'Cologne', country: 'Germany', countryCode: 'DE', lat: 50.9375, lng: 6.9603, airportCode: 'CGN', hasHighSpeedRail: true, conferenceScore: 7, timezone: 'Europe/Berlin' },
  { id: 'lyon', name: 'Lyon', country: 'France', countryCode: 'FR', lat: 45.7640, lng: 4.8357, airportCode: 'LYS', hasHighSpeedRail: true, conferenceScore: 7, timezone: 'Europe/Paris' },
  { id: 'marseille', name: 'Marseille', country: 'France', countryCode: 'FR', lat: 43.2965, lng: 5.3698, airportCode: 'MRS', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Paris' },
  { id: 'nice', name: 'Nice', country: 'France', countryCode: 'FR', lat: 43.7102, lng: 7.2620, airportCode: 'NCE', hasHighSpeedRail: true, conferenceScore: 7, timezone: 'Europe/Paris' },
  { id: 'geneva', name: 'Geneva', country: 'Switzerland', countryCode: 'CH', lat: 46.2044, lng: 6.1432, airportCode: 'GVA', hasHighSpeedRail: true, conferenceScore: 8, timezone: 'Europe/Zurich' },
  { id: 'turin', name: 'Turin', country: 'Italy', countryCode: 'IT', lat: 45.0703, lng: 7.6869, airportCode: 'TRN', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Rome' },
  { id: 'bologna', name: 'Bologna', country: 'Italy', countryCode: 'IT', lat: 44.4949, lng: 11.3426, airportCode: 'BLQ', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Rome' },
  { id: 'florence', name: 'Florence', country: 'Italy', countryCode: 'IT', lat: 43.7696, lng: 11.2558, airportCode: 'FLR', hasHighSpeedRail: true, conferenceScore: 7, timezone: 'Europe/Rome' },
  { id: 'naples', name: 'Naples', country: 'Italy', countryCode: 'IT', lat: 40.8518, lng: 14.2681, airportCode: 'NAP', hasHighSpeedRail: true, conferenceScore: 5, timezone: 'Europe/Rome' },
  { id: 'seville', name: 'Seville', country: 'Spain', countryCode: 'ES', lat: 37.3891, lng: -5.9845, airportCode: 'SVQ', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Madrid' },
  { id: 'valencia', name: 'Valencia', country: 'Spain', countryCode: 'ES', lat: 39.4699, lng: -0.3763, airportCode: 'VLC', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Madrid' },
  { id: 'bilbao', name: 'Bilbao', country: 'Spain', countryCode: 'ES', lat: 43.2630, lng: -2.9350, airportCode: 'BIO', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Europe/Madrid' },
  { id: 'porto', name: 'Porto', country: 'Portugal', countryCode: 'PT', lat: 41.1579, lng: -8.6291, airportCode: 'OPO', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Europe/Lisbon' },
  { id: 'malaga', name: 'Malaga', country: 'Spain', countryCode: 'ES', lat: 36.7213, lng: -4.4217, airportCode: 'AGP', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Madrid' },
  { id: 'edinburgh', name: 'Edinburgh', country: 'United Kingdom', countryCode: 'GB', lat: 55.9533, lng: -3.1883, airportCode: 'EDI', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Europe/London' },
  { id: 'manchester', name: 'Manchester', country: 'United Kingdom', countryCode: 'GB', lat: 53.4808, lng: -2.2426, airportCode: 'MAN', hasHighSpeedRail: true, conferenceScore: 7, timezone: 'Europe/London' },
  { id: 'oslo', name: 'Oslo', country: 'Norway', countryCode: 'NO', lat: 59.9139, lng: 10.7522, airportCode: 'OSL', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Europe/Oslo' },
  { id: 'helsinki', name: 'Helsinki', country: 'Finland', countryCode: 'FI', lat: 60.1699, lng: 24.9384, airportCode: 'HEL', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Europe/Helsinki' },
  { id: 'krakow', name: 'Krakow', country: 'Poland', countryCode: 'PL', lat: 50.0647, lng: 19.9450, airportCode: 'KRK', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Europe/Warsaw' },
  { id: 'bucharest', name: 'Bucharest', country: 'Romania', countryCode: 'RO', lat: 44.4268, lng: 26.1025, airportCode: 'OTP', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Bucharest' },
  { id: 'athens', name: 'Athens', country: 'Greece', countryCode: 'GR', lat: 37.9838, lng: 23.7275, airportCode: 'ATH', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Europe/Athens' },

  // Tier 3 - Smaller but well-connected
  { id: 'tallinn', name: 'Tallinn', country: 'Estonia', countryCode: 'EE', lat: 59.4370, lng: 24.7536, airportCode: 'TLL', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Tallinn' },
  { id: 'riga', name: 'Riga', country: 'Latvia', countryCode: 'LV', lat: 56.9496, lng: 24.1052, airportCode: 'RIX', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Riga' },
  { id: 'vilnius', name: 'Vilnius', country: 'Lithuania', countryCode: 'LT', lat: 54.6872, lng: 25.2797, airportCode: 'VNO', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Vilnius' },
  { id: 'ljubljana', name: 'Ljubljana', country: 'Slovenia', countryCode: 'SI', lat: 46.0569, lng: 14.5058, airportCode: 'LJU', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Ljubljana' },
  { id: 'zagreb', name: 'Zagreb', country: 'Croatia', countryCode: 'HR', lat: 45.8150, lng: 15.9819, airportCode: 'ZAG', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Zagreb' },
  { id: 'dubrovnik', name: 'Dubrovnik', country: 'Croatia', countryCode: 'HR', lat: 42.6507, lng: 18.0944, airportCode: 'DBV', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Zagreb' },
  { id: 'bratislava', name: 'Bratislava', country: 'Slovakia', countryCode: 'SK', lat: 48.1486, lng: 17.1077, airportCode: 'BTS', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Bratislava' },
  { id: 'luxembourg', name: 'Luxembourg', country: 'Luxembourg', countryCode: 'LU', lat: 49.6116, lng: 6.1319, airportCode: 'LUX', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Luxembourg' },
  { id: 'palma', name: 'Palma de Mallorca', country: 'Spain', countryCode: 'ES', lat: 39.5696, lng: 2.6502, airportCode: 'PMI', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Europe/Madrid' },
  { id: 'sofia', name: 'Sofia', country: 'Bulgaria', countryCode: 'BG', lat: 42.6977, lng: 23.3219, airportCode: 'SOF', hasHighSpeedRail: false, conferenceScore: 4, timezone: 'Europe/Sofia' },
  { id: 'gothenburg', name: 'Gothenburg', country: 'Sweden', countryCode: 'SE', lat: 57.7089, lng: 11.9746, airportCode: 'GOT', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Stockholm' },
  { id: 'thessaloniki', name: 'Thessaloniki', country: 'Greece', countryCode: 'GR', lat: 40.6401, lng: 22.9444, airportCode: 'SKG', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Athens' },
]

export function getCityById(id: string): CandidateCity | undefined {
  return CITIES.find(c => c.id === id)
}

export function searchCities(query: string): CandidateCity[] {
  const q = query.toLowerCase().trim()
  if (!q) return CITIES
  return CITIES.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.country.toLowerCase().includes(q) ||
    c.airportCode.toLowerCase().includes(q)
  )
}
