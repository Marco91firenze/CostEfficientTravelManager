const KIWI_BASE = 'https://api.tequila.kiwi.com/v2'

function getApiKey(): string {
  return import.meta.env.VITE_KIWI_API_KEY || ''
}

function toKiwiDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-')
  return `${d}/${m}/${y}`
}

export interface KiwiRouteResult {
  price: number
  bookingLink: string
  departureDate: string
  returnDate: string
  durationMinutes: number
  carrier: string
  stops: number
  transportType: 'flight' | 'train'
}

export function generateGoogleFlightsLink(
  fromIATA: string,
  toIATA: string,
  dateFrom: string,
  dateTo: string
): string {
  return `https://www.google.com/travel/flights?q=Flights+from+${fromIATA}+to+${toIATA}+on+${dateFrom}+to+${dateTo}&curr=EUR`
}

export function generateTrainLink(
  fromCity: string,
  toCity: string,
  date: string
): string {
  return `https://www.omio.com/search?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${date}`
}

export async function searchRoute(
  fromIATA: string,
  toIATA: string,
  dateFrom: string,
  dateTo: string,
  currency = 'EUR'
): Promise<KiwiRouteResult | null> {
  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error('VITE_KIWI_API_KEY is not configured. Add it to your .env file.')
  }

  if (fromIATA === toIATA) {
    return {
      price: 0,
      bookingLink: '',
      departureDate: dateFrom,
      returnDate: dateTo,
      durationMinutes: 0,
      carrier: 'Local',
      stops: 0,
      transportType: 'train',
    }
  }

  const params = new URLSearchParams({
    fly_from: fromIATA,
    fly_to: toIATA,
    date_from: toKiwiDate(dateFrom),
    date_to: toKiwiDate(dateTo),
    flight_type: 'round',
    nights_in_dst_from: '1',
    nights_in_dst_to: '3',
    curr: currency,
    adults: '1',
    limit: '1',
    sort: 'price',
    max_stopovers: '2',
  })

  const res = await fetch(`${KIWI_BASE}/search?${params}`, {
    headers: { apikey: apiKey },
  })

  if (!res.ok) {
    if (res.status === 429) {
      // Rate limited - wait and retry once
      await new Promise(r => setTimeout(r, 2000))
      const retry = await fetch(`${KIWI_BASE}/search?${params}`, {
        headers: { apikey: apiKey },
      })
      if (!retry.ok) return null
      const retryData = await retry.json()
      if (!retryData.data?.length) return null
      return parseKiwiResult(retryData.data[0], dateFrom, dateTo)
    }
    return null
  }

  const data = await res.json()
  if (!data.data?.length) return null

  return parseKiwiResult(data.data[0], dateFrom, dateTo)
}

function parseKiwiResult(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any,
  fallbackFrom: string,
  fallbackTo: string
): KiwiRouteResult {
  const outboundLegs = result.route?.filter((r: { return: number }) => r.return === 0) || []
  const returnLegs = result.route?.filter((r: { return: number }) => r.return === 1) || []

  const depDate = outboundLegs[0]?.local_departure?.split('T')[0] || fallbackFrom
  const retDate = returnLegs.length > 0
    ? returnLegs[returnLegs.length - 1]?.local_arrival?.split('T')[0]
    : fallbackTo

  const airlines: string[] = []
  for (const leg of result.route || []) {
    if (leg.airline && !airlines.includes(leg.airline)) {
      airlines.push(leg.airline)
    }
  }

  const isTrainRoute = outboundLegs.length > 0 && outboundLegs[0]?.vehicle_type === 'train'

  return {
    price: result.price,
    bookingLink: result.deep_link || '',
    departureDate: depDate,
    returnDate: retDate,
    durationMinutes: Math.round((result.duration?.departure || 0) / 60),
    carrier: airlines.join(', ') || 'Unknown',
    stops: Math.max(0, outboundLegs.length - 1),
    transportType: isTrainRoute ? 'train' : 'flight',
  }
}

// Throttled parallel execution
export async function throttledMap<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  concurrency: number,
  onProgress?: (completed: number) => void
): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let nextIndex = 0
  let completed = 0

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex++
      results[index] = await fn(items[index])
      completed++
      onProgress?.(completed)
      // Small delay between requests to avoid rate limiting
      await new Promise(r => setTimeout(r, 150))
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    () => worker()
  )
  await Promise.all(workers)
  return results
}

export function isKiwiConfigured(): boolean {
  return !!import.meta.env.VITE_KIWI_API_KEY
}
