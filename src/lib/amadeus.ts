/**
 * Flight search client.
 * Dev: calls localhost:3001 via Vite proxy.
 * Prod: calls VITE_API_URL prefix.
 * Uses claude CLI + Kiwi MCP — no Anthropic API key needed.
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

export interface BatchRoute {
  flyFrom: string
  flyTo: string
  dateFrom: string
  dateTo: string
}

export function isAmadeusConfigured(): boolean {
  return true
}

// Single-route search (legacy / used by fallback callers)
export async function searchRoute(
  fromIATA: string,
  toIATA: string,
  dateFrom: string,
  dateTo: string,
  currency = 'EUR'
): Promise<AmadeusRouteResult | null> {
  if (fromIATA === toIATA) {
    return {
      price: 0, bookingLink: '', departureDate: dateFrom, returnDate: dateTo,
      durationMinutes: 0, carrier: 'Local', stops: 0, transportType: 'flight',
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

// Batch search — one HTTP call for multiple routes to the same destination city
export async function searchRouteBatch(
  routes: BatchRoute[],
  currency = 'EUR'
): Promise<(AmadeusRouteResult | null)[]> {
  if (routes.length === 0) return []
  try {
    const apiBase = import.meta.env.VITE_API_URL ?? ''
    const res = await fetch(`${apiBase}/api/search-flights-batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destinations: routes, currency }),
    })
    if (!res.ok) return routes.map(() => null)
    const data = await res.json()
    return Array.isArray(data) ? data : routes.map(() => null)
  } catch {
    return routes.map(() => null)
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
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker())
  )
  return results
}
