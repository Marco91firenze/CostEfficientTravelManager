import type { CandidateCity } from '../types/city'

export const CITIES: CandidateCity[] = [
  // ===== EUROPE =====
  // Western Europe - Major Hubs
  { id: 'london', name: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, airportCode: 'LHR', hasHighSpeedRail: true, conferenceScore: 10, timezone: 'Europe/London' },
  { id: 'paris', name: 'Paris', country: 'France', countryCode: 'FR', lat: 48.8566, lng: 2.3522, airportCode: 'CDG', hasHighSpeedRail: true, conferenceScore: 10, timezone: 'Europe/Paris' },
  { id: 'amsterdam', name: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', lat: 52.3676, lng: 4.9041, airportCode: 'AMS', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Amsterdam' },
  { id: 'brussels', name: 'Brussels', country: 'Belgium', countryCode: 'BE', lat: 50.8503, lng: 4.3517, airportCode: 'BRU', hasHighSpeedRail: true, conferenceScore: 8, timezone: 'Europe/Brussels' },
  { id: 'dublin', name: 'Dublin', country: 'Ireland', countryCode: 'IE', lat: 53.3498, lng: -6.2603, airportCode: 'DUB', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'Europe/Dublin' },
  { id: 'luxembourg', name: 'Luxembourg', country: 'Luxembourg', countryCode: 'LU', lat: 49.6116, lng: 6.1319, airportCode: 'LUX', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Luxembourg' },

  // UK & Ireland
  { id: 'manchester', name: 'Manchester', country: 'United Kingdom', countryCode: 'GB', lat: 53.4808, lng: -2.2426, airportCode: 'MAN', hasHighSpeedRail: true, conferenceScore: 7, timezone: 'Europe/London' },
  { id: 'edinburgh', name: 'Edinburgh', country: 'United Kingdom', countryCode: 'GB', lat: 55.9533, lng: -3.1883, airportCode: 'EDI', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Europe/London' },
  { id: 'birmingham', name: 'Birmingham', country: 'United Kingdom', countryCode: 'GB', lat: 52.4862, lng: -1.8904, airportCode: 'BHX', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/London' },
  { id: 'glasgow', name: 'Glasgow', country: 'United Kingdom', countryCode: 'GB', lat: 55.8642, lng: -4.2518, airportCode: 'GLA', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Europe/London' },
  { id: 'bristol', name: 'Bristol', country: 'United Kingdom', countryCode: 'GB', lat: 51.4545, lng: -2.5879, airportCode: 'BRS', hasHighSpeedRail: true, conferenceScore: 5, timezone: 'Europe/London' },
  { id: 'cork', name: 'Cork', country: 'Ireland', countryCode: 'IE', lat: 51.8985, lng: -8.4756, airportCode: 'ORK', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Dublin' },

  // Germany
  { id: 'frankfurt', name: 'Frankfurt', country: 'Germany', countryCode: 'DE', lat: 50.1109, lng: 8.6821, airportCode: 'FRA', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Berlin' },
  { id: 'munich', name: 'Munich', country: 'Germany', countryCode: 'DE', lat: 48.1351, lng: 11.5820, airportCode: 'MUC', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Berlin' },
  { id: 'berlin', name: 'Berlin', country: 'Germany', countryCode: 'DE', lat: 52.5200, lng: 13.4050, airportCode: 'BER', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Berlin' },
  { id: 'hamburg', name: 'Hamburg', country: 'Germany', countryCode: 'DE', lat: 53.5511, lng: 9.9937, airportCode: 'HAM', hasHighSpeedRail: true, conferenceScore: 7, timezone: 'Europe/Berlin' },
  { id: 'dusseldorf', name: 'Dusseldorf', country: 'Germany', countryCode: 'DE', lat: 51.2277, lng: 6.7735, airportCode: 'DUS', hasHighSpeedRail: true, conferenceScore: 7, timezone: 'Europe/Berlin' },
  { id: 'cologne', name: 'Cologne', country: 'Germany', countryCode: 'DE', lat: 50.9375, lng: 6.9603, airportCode: 'CGN', hasHighSpeedRail: true, conferenceScore: 7, timezone: 'Europe/Berlin' },
  { id: 'stuttgart', name: 'Stuttgart', country: 'Germany', countryCode: 'DE', lat: 48.7758, lng: 9.1829, airportCode: 'STR', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Berlin' },
  { id: 'hanover', name: 'Hanover', country: 'Germany', countryCode: 'DE', lat: 52.3759, lng: 9.7320, airportCode: 'HAJ', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Berlin' },
  { id: 'nuremberg', name: 'Nuremberg', country: 'Germany', countryCode: 'DE', lat: 49.4521, lng: 11.0767, airportCode: 'NUE', hasHighSpeedRail: true, conferenceScore: 5, timezone: 'Europe/Berlin' },
  { id: 'leipzig', name: 'Leipzig', country: 'Germany', countryCode: 'DE', lat: 51.3397, lng: 12.3731, airportCode: 'LEJ', hasHighSpeedRail: true, conferenceScore: 5, timezone: 'Europe/Berlin' },
  { id: 'dresden', name: 'Dresden', country: 'Germany', countryCode: 'DE', lat: 51.0504, lng: 13.7373, airportCode: 'DRS', hasHighSpeedRail: true, conferenceScore: 5, timezone: 'Europe/Berlin' },

  // France
  { id: 'lyon', name: 'Lyon', country: 'France', countryCode: 'FR', lat: 45.7640, lng: 4.8357, airportCode: 'LYS', hasHighSpeedRail: true, conferenceScore: 7, timezone: 'Europe/Paris' },
  { id: 'marseille', name: 'Marseille', country: 'France', countryCode: 'FR', lat: 43.2965, lng: 5.3698, airportCode: 'MRS', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Paris' },
  { id: 'nice', name: 'Nice', country: 'France', countryCode: 'FR', lat: 43.7102, lng: 7.2620, airportCode: 'NCE', hasHighSpeedRail: true, conferenceScore: 7, timezone: 'Europe/Paris' },
  { id: 'toulouse', name: 'Toulouse', country: 'France', countryCode: 'FR', lat: 43.6047, lng: 1.4442, airportCode: 'TLS', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Paris' },
  { id: 'bordeaux', name: 'Bordeaux', country: 'France', countryCode: 'FR', lat: 44.8378, lng: -0.5792, airportCode: 'BOD', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Paris' },
  { id: 'strasbourg', name: 'Strasbourg', country: 'France', countryCode: 'FR', lat: 48.5734, lng: 7.7521, airportCode: 'SXB', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Paris' },
  { id: 'nantes', name: 'Nantes', country: 'France', countryCode: 'FR', lat: 47.2184, lng: -1.5536, airportCode: 'NTE', hasHighSpeedRail: true, conferenceScore: 5, timezone: 'Europe/Paris' },
  { id: 'lille', name: 'Lille', country: 'France', countryCode: 'FR', lat: 50.6292, lng: 3.0573, airportCode: 'LIL', hasHighSpeedRail: true, conferenceScore: 5, timezone: 'Europe/Paris' },

  // Italy
  { id: 'rome', name: 'Rome', country: 'Italy', countryCode: 'IT', lat: 41.9028, lng: 12.4964, airportCode: 'FCO', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Rome' },
  { id: 'milan', name: 'Milan', country: 'Italy', countryCode: 'IT', lat: 45.4642, lng: 9.1900, airportCode: 'MXP', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Rome' },
  { id: 'florence', name: 'Florence', country: 'Italy', countryCode: 'IT', lat: 43.7696, lng: 11.2558, airportCode: 'FLR', hasHighSpeedRail: true, conferenceScore: 7, timezone: 'Europe/Rome' },
  { id: 'naples', name: 'Naples', country: 'Italy', countryCode: 'IT', lat: 40.8518, lng: 14.2681, airportCode: 'NAP', hasHighSpeedRail: true, conferenceScore: 5, timezone: 'Europe/Rome' },
  { id: 'bologna', name: 'Bologna', country: 'Italy', countryCode: 'IT', lat: 44.4949, lng: 11.3426, airportCode: 'BLQ', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Rome' },
  { id: 'turin', name: 'Turin', country: 'Italy', countryCode: 'IT', lat: 45.0703, lng: 7.6869, airportCode: 'TRN', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Rome' },
  { id: 'venice', name: 'Venice', country: 'Italy', countryCode: 'IT', lat: 45.4408, lng: 12.3155, airportCode: 'VCE', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Rome' },
  { id: 'palermo', name: 'Palermo', country: 'Italy', countryCode: 'IT', lat: 38.1157, lng: 13.3615, airportCode: 'PMO', hasHighSpeedRail: false, conferenceScore: 4, timezone: 'Europe/Rome' },
  { id: 'catania', name: 'Catania', country: 'Italy', countryCode: 'IT', lat: 37.5079, lng: 15.0830, airportCode: 'CTA', hasHighSpeedRail: false, conferenceScore: 4, timezone: 'Europe/Rome' },
  { id: 'bari', name: 'Bari', country: 'Italy', countryCode: 'IT', lat: 41.1171, lng: 16.8719, airportCode: 'BRI', hasHighSpeedRail: false, conferenceScore: 4, timezone: 'Europe/Rome' },
  { id: 'genoa', name: 'Genoa', country: 'Italy', countryCode: 'IT', lat: 44.4056, lng: 8.9463, airportCode: 'GOA', hasHighSpeedRail: true, conferenceScore: 5, timezone: 'Europe/Rome' },
  { id: 'verona', name: 'Verona', country: 'Italy', countryCode: 'IT', lat: 45.4384, lng: 10.9917, airportCode: 'VRN', hasHighSpeedRail: true, conferenceScore: 5, timezone: 'Europe/Rome' },
  { id: 'pisa', name: 'Pisa', country: 'Italy', countryCode: 'IT', lat: 43.7228, lng: 10.4017, airportCode: 'PSA', hasHighSpeedRail: true, conferenceScore: 4, timezone: 'Europe/Rome' },
  { id: 'cagliari', name: 'Cagliari', country: 'Italy', countryCode: 'IT', lat: 39.2238, lng: 9.1217, airportCode: 'CAG', hasHighSpeedRail: false, conferenceScore: 4, timezone: 'Europe/Rome' },

  // Spain
  { id: 'madrid', name: 'Madrid', country: 'Spain', countryCode: 'ES', lat: 40.4168, lng: -3.7038, airportCode: 'MAD', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Madrid' },
  { id: 'barcelona', name: 'Barcelona', country: 'Spain', countryCode: 'ES', lat: 41.3874, lng: 2.1686, airportCode: 'BCN', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Madrid' },
  { id: 'seville', name: 'Seville', country: 'Spain', countryCode: 'ES', lat: 37.3891, lng: -5.9845, airportCode: 'SVQ', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Madrid' },
  { id: 'valencia', name: 'Valencia', country: 'Spain', countryCode: 'ES', lat: 39.4699, lng: -0.3763, airportCode: 'VLC', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Madrid' },
  { id: 'bilbao', name: 'Bilbao', country: 'Spain', countryCode: 'ES', lat: 43.2630, lng: -2.9350, airportCode: 'BIO', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Europe/Madrid' },
  { id: 'malaga', name: 'Malaga', country: 'Spain', countryCode: 'ES', lat: 36.7213, lng: -4.4217, airportCode: 'AGP', hasHighSpeedRail: true, conferenceScore: 6, timezone: 'Europe/Madrid' },
  { id: 'palma', name: 'Palma de Mallorca', country: 'Spain', countryCode: 'ES', lat: 39.5696, lng: 2.6502, airportCode: 'PMI', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Europe/Madrid' },
  { id: 'alicante', name: 'Alicante', country: 'Spain', countryCode: 'ES', lat: 38.3452, lng: -0.4810, airportCode: 'ALC', hasHighSpeedRail: true, conferenceScore: 5, timezone: 'Europe/Madrid' },
  { id: 'tenerife', name: 'Tenerife', country: 'Spain', countryCode: 'ES', lat: 28.2916, lng: -16.6291, airportCode: 'TFS', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Atlantic/Canary' },

  // Portugal
  { id: 'lisbon', name: 'Lisbon', country: 'Portugal', countryCode: 'PT', lat: 38.7223, lng: -9.1393, airportCode: 'LIS', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'Europe/Lisbon' },
  { id: 'porto', name: 'Porto', country: 'Portugal', countryCode: 'PT', lat: 41.1579, lng: -8.6291, airportCode: 'OPO', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Europe/Lisbon' },
  { id: 'faro', name: 'Faro', country: 'Portugal', countryCode: 'PT', lat: 37.0194, lng: -7.9322, airportCode: 'FAO', hasHighSpeedRail: false, conferenceScore: 4, timezone: 'Europe/Lisbon' },

  // Switzerland & Austria
  { id: 'zurich', name: 'Zurich', country: 'Switzerland', countryCode: 'CH', lat: 47.3769, lng: 8.5417, airportCode: 'ZRH', hasHighSpeedRail: true, conferenceScore: 8, timezone: 'Europe/Zurich' },
  { id: 'geneva', name: 'Geneva', country: 'Switzerland', countryCode: 'CH', lat: 46.2044, lng: 6.1432, airportCode: 'GVA', hasHighSpeedRail: true, conferenceScore: 8, timezone: 'Europe/Zurich' },
  { id: 'vienna', name: 'Vienna', country: 'Austria', countryCode: 'AT', lat: 48.2082, lng: 16.3738, airportCode: 'VIE', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Europe/Vienna' },
  { id: 'salzburg', name: 'Salzburg', country: 'Austria', countryCode: 'AT', lat: 47.8095, lng: 13.0550, airportCode: 'SZG', hasHighSpeedRail: true, conferenceScore: 5, timezone: 'Europe/Vienna' },
  { id: 'innsbruck', name: 'Innsbruck', country: 'Austria', countryCode: 'AT', lat: 47.2692, lng: 11.4041, airportCode: 'INN', hasHighSpeedRail: true, conferenceScore: 5, timezone: 'Europe/Vienna' },

  // Scandinavia
  { id: 'copenhagen', name: 'Copenhagen', country: 'Denmark', countryCode: 'DK', lat: 55.6761, lng: 12.5683, airportCode: 'CPH', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'Europe/Copenhagen' },
  { id: 'stockholm', name: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, airportCode: 'ARN', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'Europe/Stockholm' },
  { id: 'oslo', name: 'Oslo', country: 'Norway', countryCode: 'NO', lat: 59.9139, lng: 10.7522, airportCode: 'OSL', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Europe/Oslo' },
  { id: 'helsinki', name: 'Helsinki', country: 'Finland', countryCode: 'FI', lat: 60.1699, lng: 24.9384, airportCode: 'HEL', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Europe/Helsinki' },
  { id: 'gothenburg', name: 'Gothenburg', country: 'Sweden', countryCode: 'SE', lat: 57.7089, lng: 11.9746, airportCode: 'GOT', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Stockholm' },
  { id: 'malmo', name: 'Malmo', country: 'Sweden', countryCode: 'SE', lat: 55.6049, lng: 13.0038, airportCode: 'MMX', hasHighSpeedRail: false, conferenceScore: 4, timezone: 'Europe/Stockholm' },
  { id: 'reykjavik', name: 'Reykjavik', country: 'Iceland', countryCode: 'IS', lat: 64.1466, lng: -21.9426, airportCode: 'KEF', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Atlantic/Reykjavik' },

  // Central & Eastern Europe
  { id: 'prague', name: 'Prague', country: 'Czech Republic', countryCode: 'CZ', lat: 50.0755, lng: 14.4378, airportCode: 'PRG', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'Europe/Prague' },
  { id: 'warsaw', name: 'Warsaw', country: 'Poland', countryCode: 'PL', lat: 52.2297, lng: 21.0122, airportCode: 'WAW', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Europe/Warsaw' },
  { id: 'krakow', name: 'Krakow', country: 'Poland', countryCode: 'PL', lat: 50.0647, lng: 19.9450, airportCode: 'KRK', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Europe/Warsaw' },
  { id: 'budapest', name: 'Budapest', country: 'Hungary', countryCode: 'HU', lat: 47.4979, lng: 19.0402, airportCode: 'BUD', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Europe/Budapest' },
  { id: 'bratislava', name: 'Bratislava', country: 'Slovakia', countryCode: 'SK', lat: 48.1486, lng: 17.1077, airportCode: 'BTS', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Bratislava' },
  { id: 'bucharest', name: 'Bucharest', country: 'Romania', countryCode: 'RO', lat: 44.4268, lng: 26.1025, airportCode: 'OTP', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Bucharest' },
  { id: 'sofia', name: 'Sofia', country: 'Bulgaria', countryCode: 'BG', lat: 42.6977, lng: 23.3219, airportCode: 'SOF', hasHighSpeedRail: false, conferenceScore: 4, timezone: 'Europe/Sofia' },

  // Balkans & Adriatic
  { id: 'ljubljana', name: 'Ljubljana', country: 'Slovenia', countryCode: 'SI', lat: 46.0569, lng: 14.5058, airportCode: 'LJU', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Ljubljana' },
  { id: 'zagreb', name: 'Zagreb', country: 'Croatia', countryCode: 'HR', lat: 45.8150, lng: 15.9819, airportCode: 'ZAG', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Zagreb' },
  { id: 'dubrovnik', name: 'Dubrovnik', country: 'Croatia', countryCode: 'HR', lat: 42.6507, lng: 18.0944, airportCode: 'DBV', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Zagreb' },
  { id: 'split', name: 'Split', country: 'Croatia', countryCode: 'HR', lat: 43.5081, lng: 16.4402, airportCode: 'SPU', hasHighSpeedRail: false, conferenceScore: 4, timezone: 'Europe/Zagreb' },
  { id: 'belgrade', name: 'Belgrade', country: 'Serbia', countryCode: 'RS', lat: 44.7866, lng: 20.4489, airportCode: 'BEG', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Belgrade' },

  // Baltics
  { id: 'tallinn', name: 'Tallinn', country: 'Estonia', countryCode: 'EE', lat: 59.4370, lng: 24.7536, airportCode: 'TLL', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Tallinn' },
  { id: 'riga', name: 'Riga', country: 'Latvia', countryCode: 'LV', lat: 56.9496, lng: 24.1052, airportCode: 'RIX', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Riga' },
  { id: 'vilnius', name: 'Vilnius', country: 'Lithuania', countryCode: 'LT', lat: 54.6872, lng: 25.2797, airportCode: 'VNO', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Vilnius' },

  // Greece & Cyprus & Malta
  { id: 'athens', name: 'Athens', country: 'Greece', countryCode: 'GR', lat: 37.9838, lng: 23.7275, airportCode: 'ATH', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Europe/Athens' },
  { id: 'thessaloniki', name: 'Thessaloniki', country: 'Greece', countryCode: 'GR', lat: 40.6401, lng: 22.9444, airportCode: 'SKG', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Athens' },
  { id: 'larnaca', name: 'Larnaca', country: 'Cyprus', countryCode: 'CY', lat: 34.9229, lng: 33.6233, airportCode: 'LCA', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Asia/Nicosia' },
  { id: 'malta', name: 'Valletta', country: 'Malta', countryCode: 'MT', lat: 35.8997, lng: 14.5147, airportCode: 'MLA', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Malta' },

  // Turkey
  { id: 'istanbul', name: 'Istanbul', country: 'Turkey', countryCode: 'TR', lat: 41.0082, lng: 28.9784, airportCode: 'IST', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'Europe/Istanbul' },
  { id: 'ankara', name: 'Ankara', country: 'Turkey', countryCode: 'TR', lat: 39.9334, lng: 32.8597, airportCode: 'ESB', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Istanbul' },
  { id: 'antalya', name: 'Antalya', country: 'Turkey', countryCode: 'TR', lat: 36.8969, lng: 30.7133, airportCode: 'AYT', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Europe/Istanbul' },

  // ===== NORTH AMERICA =====
  { id: 'new-york', name: 'New York', country: 'United States', countryCode: 'US', lat: 40.7128, lng: -74.0060, airportCode: 'JFK', hasHighSpeedRail: false, conferenceScore: 10, timezone: 'America/New_York' },
  { id: 'los-angeles', name: 'Los Angeles', country: 'United States', countryCode: 'US', lat: 34.0522, lng: -118.2437, airportCode: 'LAX', hasHighSpeedRail: false, conferenceScore: 9, timezone: 'America/Los_Angeles' },
  { id: 'chicago', name: 'Chicago', country: 'United States', countryCode: 'US', lat: 41.8781, lng: -87.6298, airportCode: 'ORD', hasHighSpeedRail: false, conferenceScore: 9, timezone: 'America/Chicago' },
  { id: 'san-francisco', name: 'San Francisco', country: 'United States', countryCode: 'US', lat: 37.7749, lng: -122.4194, airportCode: 'SFO', hasHighSpeedRail: false, conferenceScore: 9, timezone: 'America/Los_Angeles' },
  { id: 'miami', name: 'Miami', country: 'United States', countryCode: 'US', lat: 25.7617, lng: -80.1918, airportCode: 'MIA', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'America/New_York' },
  { id: 'boston', name: 'Boston', country: 'United States', countryCode: 'US', lat: 42.3601, lng: -71.0589, airportCode: 'BOS', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'America/New_York' },
  { id: 'washington-dc', name: 'Washington D.C.', country: 'United States', countryCode: 'US', lat: 38.9072, lng: -77.0369, airportCode: 'IAD', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'America/New_York' },
  { id: 'seattle', name: 'Seattle', country: 'United States', countryCode: 'US', lat: 47.6062, lng: -122.3321, airportCode: 'SEA', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'America/Los_Angeles' },
  { id: 'dallas', name: 'Dallas', country: 'United States', countryCode: 'US', lat: 32.7767, lng: -96.7970, airportCode: 'DFW', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'America/Chicago' },
  { id: 'atlanta', name: 'Atlanta', country: 'United States', countryCode: 'US', lat: 33.7490, lng: -84.3880, airportCode: 'ATL', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'America/New_York' },
  { id: 'denver', name: 'Denver', country: 'United States', countryCode: 'US', lat: 39.7392, lng: -104.9903, airportCode: 'DEN', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'America/Denver' },
  { id: 'austin', name: 'Austin', country: 'United States', countryCode: 'US', lat: 30.2672, lng: -97.7431, airportCode: 'AUS', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'America/Chicago' },
  { id: 'las-vegas', name: 'Las Vegas', country: 'United States', countryCode: 'US', lat: 36.1699, lng: -115.1398, airportCode: 'LAS', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'America/Los_Angeles' },
  { id: 'orlando', name: 'Orlando', country: 'United States', countryCode: 'US', lat: 28.5383, lng: -81.3792, airportCode: 'MCO', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'America/New_York' },
  { id: 'nashville', name: 'Nashville', country: 'United States', countryCode: 'US', lat: 36.1627, lng: -86.7816, airportCode: 'BNA', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'America/Chicago' },
  { id: 'honolulu', name: 'Honolulu', country: 'United States', countryCode: 'US', lat: 21.3069, lng: -157.8583, airportCode: 'HNL', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Pacific/Honolulu' },
  { id: 'toronto', name: 'Toronto', country: 'Canada', countryCode: 'CA', lat: 43.6532, lng: -79.3832, airportCode: 'YYZ', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'America/Toronto' },
  { id: 'vancouver', name: 'Vancouver', country: 'Canada', countryCode: 'CA', lat: 49.2827, lng: -123.1207, airportCode: 'YVR', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'America/Vancouver' },
  { id: 'montreal', name: 'Montreal', country: 'Canada', countryCode: 'CA', lat: 45.5017, lng: -73.5673, airportCode: 'YUL', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'America/Toronto' },
  { id: 'mexico-city', name: 'Mexico City', country: 'Mexico', countryCode: 'MX', lat: 19.4326, lng: -99.1332, airportCode: 'MEX', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'America/Mexico_City' },
  { id: 'cancun', name: 'Cancun', country: 'Mexico', countryCode: 'MX', lat: 21.1619, lng: -86.8515, airportCode: 'CUN', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'America/Cancun' },

  // ===== SOUTH AMERICA =====
  { id: 'sao-paulo', name: 'Sao Paulo', country: 'Brazil', countryCode: 'BR', lat: -23.5505, lng: -46.6333, airportCode: 'GRU', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'America/Sao_Paulo' },
  { id: 'rio-de-janeiro', name: 'Rio de Janeiro', country: 'Brazil', countryCode: 'BR', lat: -22.9068, lng: -43.1729, airportCode: 'GIG', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'America/Sao_Paulo' },
  { id: 'buenos-aires', name: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', lat: -34.6037, lng: -58.3816, airportCode: 'EZE', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'America/Argentina/Buenos_Aires' },
  { id: 'bogota', name: 'Bogota', country: 'Colombia', countryCode: 'CO', lat: 4.7110, lng: -74.0721, airportCode: 'BOG', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'America/Bogota' },
  { id: 'lima', name: 'Lima', country: 'Peru', countryCode: 'PE', lat: -12.0464, lng: -77.0428, airportCode: 'LIM', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'America/Lima' },
  { id: 'santiago', name: 'Santiago', country: 'Chile', countryCode: 'CL', lat: -33.4489, lng: -70.6693, airportCode: 'SCL', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'America/Santiago' },
  { id: 'medellin', name: 'Medellin', country: 'Colombia', countryCode: 'CO', lat: 6.2442, lng: -75.5812, airportCode: 'MDE', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'America/Bogota' },

  // ===== MIDDLE EAST =====
  { id: 'dubai', name: 'Dubai', country: 'UAE', countryCode: 'AE', lat: 25.2048, lng: 55.2708, airportCode: 'DXB', hasHighSpeedRail: false, conferenceScore: 9, timezone: 'Asia/Dubai' },
  { id: 'abu-dhabi', name: 'Abu Dhabi', country: 'UAE', countryCode: 'AE', lat: 24.4539, lng: 54.3773, airportCode: 'AUH', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'Asia/Dubai' },
  { id: 'doha', name: 'Doha', country: 'Qatar', countryCode: 'QA', lat: 25.2854, lng: 51.5310, airportCode: 'DOH', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'Asia/Qatar' },
  { id: 'riyadh', name: 'Riyadh', country: 'Saudi Arabia', countryCode: 'SA', lat: 24.7136, lng: 46.6753, airportCode: 'RUH', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Asia/Riyadh' },
  { id: 'tel-aviv', name: 'Tel Aviv', country: 'Israel', countryCode: 'IL', lat: 32.0853, lng: 34.7818, airportCode: 'TLV', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Asia/Jerusalem' },
  { id: 'amman', name: 'Amman', country: 'Jordan', countryCode: 'JO', lat: 31.9454, lng: 35.9284, airportCode: 'AMM', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Asia/Amman' },
  { id: 'muscat', name: 'Muscat', country: 'Oman', countryCode: 'OM', lat: 23.5880, lng: 58.3829, airportCode: 'MCT', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Asia/Muscat' },
  { id: 'bahrain', name: 'Manama', country: 'Bahrain', countryCode: 'BH', lat: 26.2285, lng: 50.5860, airportCode: 'BAH', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Asia/Bahrain' },

  // ===== ASIA-PACIFIC =====
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', countryCode: 'JP', lat: 35.6762, lng: 139.6503, airportCode: 'NRT', hasHighSpeedRail: true, conferenceScore: 10, timezone: 'Asia/Tokyo' },
  { id: 'osaka', name: 'Osaka', country: 'Japan', countryCode: 'JP', lat: 34.6937, lng: 135.5023, airportCode: 'KIX', hasHighSpeedRail: true, conferenceScore: 7, timezone: 'Asia/Tokyo' },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', countryCode: 'SG', lat: 1.3521, lng: 103.8198, airportCode: 'SIN', hasHighSpeedRail: false, conferenceScore: 10, timezone: 'Asia/Singapore' },
  { id: 'hong-kong', name: 'Hong Kong', country: 'Hong Kong', countryCode: 'HK', lat: 22.3193, lng: 114.1694, airportCode: 'HKG', hasHighSpeedRail: true, conferenceScore: 9, timezone: 'Asia/Hong_Kong' },
  { id: 'seoul', name: 'Seoul', country: 'South Korea', countryCode: 'KR', lat: 37.5665, lng: 126.9780, airportCode: 'ICN', hasHighSpeedRail: true, conferenceScore: 8, timezone: 'Asia/Seoul' },
  { id: 'beijing', name: 'Beijing', country: 'China', countryCode: 'CN', lat: 39.9042, lng: 116.4074, airportCode: 'PEK', hasHighSpeedRail: true, conferenceScore: 8, timezone: 'Asia/Shanghai' },
  { id: 'shanghai', name: 'Shanghai', country: 'China', countryCode: 'CN', lat: 31.2304, lng: 121.4737, airportCode: 'PVG', hasHighSpeedRail: true, conferenceScore: 8, timezone: 'Asia/Shanghai' },
  { id: 'bangkok', name: 'Bangkok', country: 'Thailand', countryCode: 'TH', lat: 13.7563, lng: 100.5018, airportCode: 'BKK', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'Asia/Bangkok' },
  { id: 'kuala-lumpur', name: 'Kuala Lumpur', country: 'Malaysia', countryCode: 'MY', lat: 3.1390, lng: 101.6869, airportCode: 'KUL', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Asia/Kuala_Lumpur' },
  { id: 'mumbai', name: 'Mumbai', country: 'India', countryCode: 'IN', lat: 19.0760, lng: 72.8777, airportCode: 'BOM', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Asia/Kolkata' },
  { id: 'new-delhi', name: 'New Delhi', country: 'India', countryCode: 'IN', lat: 28.6139, lng: 77.2090, airportCode: 'DEL', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Asia/Kolkata' },
  { id: 'bangalore', name: 'Bangalore', country: 'India', countryCode: 'IN', lat: 12.9716, lng: 77.5946, airportCode: 'BLR', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Asia/Kolkata' },
  { id: 'taipei', name: 'Taipei', country: 'Taiwan', countryCode: 'TW', lat: 25.0330, lng: 121.5654, airportCode: 'TPE', hasHighSpeedRail: true, conferenceScore: 7, timezone: 'Asia/Taipei' },
  { id: 'jakarta', name: 'Jakarta', country: 'Indonesia', countryCode: 'ID', lat: -6.2088, lng: 106.8456, airportCode: 'CGK', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Asia/Jakarta' },
  { id: 'bali', name: 'Bali (Denpasar)', country: 'Indonesia', countryCode: 'ID', lat: -8.6705, lng: 115.2126, airportCode: 'DPS', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Asia/Makassar' },
  { id: 'manila', name: 'Manila', country: 'Philippines', countryCode: 'PH', lat: 14.5995, lng: 120.9842, airportCode: 'MNL', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Asia/Manila' },
  { id: 'ho-chi-minh', name: 'Ho Chi Minh City', country: 'Vietnam', countryCode: 'VN', lat: 10.8231, lng: 106.6297, airportCode: 'SGN', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Asia/Ho_Chi_Minh' },
  { id: 'hanoi', name: 'Hanoi', country: 'Vietnam', countryCode: 'VN', lat: 21.0285, lng: 105.8542, airportCode: 'HAN', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Asia/Ho_Chi_Minh' },

  // ===== OCEANIA =====
  { id: 'sydney', name: 'Sydney', country: 'Australia', countryCode: 'AU', lat: -33.8688, lng: 151.2093, airportCode: 'SYD', hasHighSpeedRail: false, conferenceScore: 9, timezone: 'Australia/Sydney' },
  { id: 'melbourne', name: 'Melbourne', country: 'Australia', countryCode: 'AU', lat: -37.8136, lng: 144.9631, airportCode: 'MEL', hasHighSpeedRail: false, conferenceScore: 8, timezone: 'Australia/Melbourne' },
  { id: 'brisbane', name: 'Brisbane', country: 'Australia', countryCode: 'AU', lat: -27.4698, lng: 153.0251, airportCode: 'BNE', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Australia/Brisbane' },
  { id: 'auckland', name: 'Auckland', country: 'New Zealand', countryCode: 'NZ', lat: -36.8485, lng: 174.7633, airportCode: 'AKL', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Pacific/Auckland' },

  // ===== AFRICA =====
  { id: 'cape-town', name: 'Cape Town', country: 'South Africa', countryCode: 'ZA', lat: -33.9249, lng: 18.4241, airportCode: 'CPT', hasHighSpeedRail: false, conferenceScore: 7, timezone: 'Africa/Johannesburg' },
  { id: 'johannesburg', name: 'Johannesburg', country: 'South Africa', countryCode: 'ZA', lat: -26.2041, lng: 28.0473, airportCode: 'JNB', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Africa/Johannesburg' },
  { id: 'cairo', name: 'Cairo', country: 'Egypt', countryCode: 'EG', lat: 30.0444, lng: 31.2357, airportCode: 'CAI', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Africa/Cairo' },
  { id: 'marrakech', name: 'Marrakech', country: 'Morocco', countryCode: 'MA', lat: 31.6295, lng: -7.9811, airportCode: 'RAK', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Africa/Casablanca' },
  { id: 'casablanca', name: 'Casablanca', country: 'Morocco', countryCode: 'MA', lat: 33.5731, lng: -7.5898, airportCode: 'CMN', hasHighSpeedRail: true, conferenceScore: 5, timezone: 'Africa/Casablanca' },
  { id: 'nairobi', name: 'Nairobi', country: 'Kenya', countryCode: 'KE', lat: -1.2921, lng: 36.8219, airportCode: 'NBO', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Africa/Nairobi' },
  { id: 'lagos', name: 'Lagos', country: 'Nigeria', countryCode: 'NG', lat: 6.5244, lng: 3.3792, airportCode: 'LOS', hasHighSpeedRail: false, conferenceScore: 5, timezone: 'Africa/Lagos' },
  { id: 'mauritius', name: 'Port Louis', country: 'Mauritius', countryCode: 'MU', lat: -20.1609, lng: 57.5012, airportCode: 'MRU', hasHighSpeedRail: false, conferenceScore: 6, timezone: 'Indian/Mauritius' },
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
