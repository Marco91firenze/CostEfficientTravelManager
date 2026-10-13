/**
 * Flight search client.
 * In development: calls the local Claude proxy on localhost:3001 (proxied via Vite).
 * In production: calls the /api/search-flight serverless function.
 * The proxy uses Anthropic API (+ optional Kiwi MCP) to provide flight estimates.
 */

export interface AmadeusRouteResult {
  price: number
  bookingLink: string
  departureDate: string
  returnDate: string
  durationMinutes: number
  carrier: string
  stops: number
  transportType: 'flight'
}

export function isAmadeusConfigured(): boolean {
  return true
}

export async function searchRoute(
  fromIATA: string,
  toIATA: string,
  dateFrom: string,
  dateTo: string,
  currency = 'EUR'
): Promise<AmadeusRouteResult | null> {
  if (fromIATA === toIATA) {
    return {
      price: 0,
      bookingLink: '',
      departureDate: dateFrom,
      returnDate: dateTo,
      durationMinutes: 0,
      carrier: 'Local',
      stops: 0,
      transportType: 'flight',
    }
  }

  try {
    const apiBase = import.meta.env.VITE_API_URL ?? ''
    const res = await fetch(`${apiBase}/api/search-flight`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ flyFrom: fromIATA, flyTo: toIATA, dateFrom, dateTo, currency }),
    })
    if (!res.ok) return null
    return res.json() as Promise<AmadeusRouteResult | null>
  } catch {
    return null
  }
}

export function generateGoogleFlightsLink(
  fromIATA: string,
  toIATA: string,
  dateFrom: string,
  dateTo: string
): string {
  return `https://www.google.com/travel/flights?q=Flights+from+${fromIATA}+to+${toIATA}+on+${dateFrom}+to+${dateTo}&curr=EUR`
}

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
      await new Promise<void>((r) => setTimeout(r, 200))
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    () => worker()
  )
  await Promise.all(workers)
  return results
}
