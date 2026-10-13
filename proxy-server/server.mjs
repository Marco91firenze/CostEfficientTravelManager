/**
 * Local proxy server — calls the `claude` CLI (uses your claude.ai subscription)
 * with the Kiwi.com MCP connector allowed, so real Kiwi flight data flows through.
 *
 * V3 optimizations:
 *  - Batch endpoint: one subprocess per destination city, searches all offices in one call
 *  - In-memory route cache (1-hour TTL): skips Kiwi on repeat queries
 *  - Concurrency raised to 12 on the frontend side
 *  - Stripe endpoints removed (unlock is now client-side only)
 *
 * Run with: node proxy-server/server.mjs
 */

import express from 'express'
import cors from 'cors'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const execFileAsync = promisify(execFile)

// Load .env from project root
const envPath = join(__dirname, '..', '.env')
try {
  const envContent = readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=')
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim()
        const val = trimmed.slice(idx + 1).trim()
        if (!process.env[key]) process.env[key] = val
      }
    }
  }
} catch {}

// ── Supabase admin client ────────────────────────────────────────────────────
let supabase = null
if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY &&
    !process.env.SUPABASE_URL.includes('placeholder')) {
  const { createClient } = await import('@supabase/supabase-js')
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  console.log('Supabase admin client initialised')
}

// ── In-memory route cache ────────────────────────────────────────────────────
const routeCache = new Map() // key: `${from}:${to}:${dateFrom}:${dateTo}`
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

const app = express()
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:4173',
    FRONTEND_URL,
  ],
}))
app.use(express.json())

const KIWI_TOOL = 'mcp__2854519a-df1e-46f5-954e-28d76adeecbf__search-flight'

const toKiwiDate = (iso) => {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

// Extract the first well-formed JSON object from arbitrary text
function extractFirstJson(text) {
  const start = text.indexOf('{')
  if (start === -1) return null
  let depth = 0
  for (let i = start; i < text.length; i++) {
    if (text[i] === '{') depth++
    else if (text[i] === '}') {
      depth--
      if (depth === 0) {
        try { return JSON.parse(text.slice(start, i + 1)) } catch {}
        // keep scanning if parse failed (e.g. truncated object earlier in text)
      }
    }
  }
  return null
}

// ── Single-route search (legacy / fallback) ──────────────────────────────────
async function searchFlight(flyFrom, flyTo, dateFrom, dateTo) {
  const depKiwi = toKiwiDate(dateFrom)
  const retRange = dateTo && dateTo !== dateFrom ? toKiwiDate(dateTo) : null

  const prompt = `Search for the cheapest round-trip flight for 1 adult from ${flyFrom} to ${flyTo}.
Departure date: ${depKiwi}${retRange ? `, latest departure: ${retRange}` : ''}.
Use the search-flight tool with sort="price" and one_for_city=false.
After getting results, respond with ONLY a raw JSON object (no markdown fences, no explanation), matching exactly:
{"price":<cheapest round-trip total price in EUR as integer>,"carrier":"<airline names>","stops":<integer>,"durationMinutes":<integer>,"bookingLink":"<bookingUrl from results>","departureDate":"<YYYY-MM-DD>","returnDate":"<YYYY-MM-DD 2-3 nights later>","transportType":"flight"}`

  let rawStdout = ''
  try {
    const out = await execFileAsync('claude', [
      '--print', prompt,
      '--allowedTools', KIWI_TOOL,
      '--output-format', 'json',
      '--max-turns', '8',
    ], {
      timeout: 90_000,
      env: process.env,
      shell: true,
    })
    rawStdout = out.stdout
  } catch (err) {
    // Claude CLI may exit non-zero (e.g. hook failure) but stdout still contains the result
    rawStdout = err.stdout || ''
    if (!rawStdout) {
      console.error(`Claude CLI failed with no stdout (${flyFrom}→${flyTo}):`, err.message?.slice(0, 200))
      return null
    }
    console.warn(`Claude CLI non-zero exit for ${flyFrom}→${flyTo}, using stdout anyway`)
  }

  let text = ''
  try {
    const envelope = JSON.parse(rawStdout.trim())
    text = envelope.result ?? envelope.text ?? rawStdout
  } catch {
    text = rawStdout
  }

  const result = extractFirstJson(text)
  if (!result) {
    console.error(`No JSON found for ${flyFrom}→${flyTo}:`, text.slice(0, 400))
    return null
  }
  if (typeof result.price !== 'number') {
    console.error(`JSON missing price field for ${flyFrom}→${flyTo}:`, result)
    return null
  }
  console.log(`  ${flyFrom}→${flyTo}: €${result.price} via ${result.carrier}`)
  return result
}

// ── Batch-route search (V3 — one subprocess per destination city) ────────────
async function searchFlightsBatch(routes) {
  const results = new Array(routes.length).fill(null)
  const needsSearch = []

  // Pre-fill same-city (price=0) and cache hits
  for (let i = 0; i < routes.length; i++) {
    const r = routes[i]
    if (r.flyFrom === r.flyTo) {
      results[i] = {
        price: 0, bookingLink: '', departureDate: r.dateFrom, returnDate: r.dateTo,
        durationMinutes: 0, carrier: 'Local', stops: 0, transportType: 'flight',
      }
      continue
    }
    const cacheKey = `${r.flyFrom}:${r.flyTo}:${r.dateFrom}:${r.dateTo}`
    const cached = routeCache.get(cacheKey)
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      results[i] = cached.result
      console.log(`  Cache hit: ${r.flyFrom}→${r.flyTo}`)
    } else {
      needsSearch.push({ ...r, originalIndex: i })
    }
  }

  if (needsSearch.length === 0) return results

  // Build multi-route prompt
  const routeLines = needsSearch.map((r, idx) => {
    const dep = toKiwiDate(r.dateFrom)
    const ret = r.dateTo && r.dateTo !== r.dateFrom ? `, latest ${toKiwiDate(r.dateTo)}` : ''
    return `${idx + 1}. ${r.flyFrom} → ${r.flyTo}: depart ${dep}${ret}`
  }).join('\n')

  const prompt = `Search for the cheapest round-trip flight for 1 adult on each route. Call the search-flight tool once per route (sort="price", one_for_city=false).

Routes:
${routeLines}

After searching ALL routes, respond with ONLY a JSON array (no markdown fences, no explanation), one object per route in the same order:
[{"price":<number>,"carrier":"<string>","stops":<integer>,"durationMinutes":<integer>,"bookingLink":"<string>","departureDate":"YYYY-MM-DD","returnDate":"YYYY-MM-DD","transportType":"flight"},...]
Use null for any route with no available flights.`

  console.log(`Batch search: ${needsSearch.map(r => `${r.flyFrom}→${r.flyTo}`).join(', ')}`)

  try {
    let rawStdout = ''
    try {
      const out = await execFileAsync('claude', [
        '--print', prompt,
        '--allowedTools', KIWI_TOOL,
        '--output-format', 'json',
        '--max-turns', '12',
      ], {
        timeout: 120_000,
        env: process.env,
        shell: true,
      })
      rawStdout = out.stdout
    } catch (err) {
      rawStdout = err.stdout || ''
      if (!rawStdout) throw err
      console.warn('Batch: Claude CLI non-zero exit, using stdout anyway')
    }

    let text = ''
    try {
      const envelope = JSON.parse(rawStdout.trim())
      text = envelope.result ?? envelope.text ?? rawStdout
    } catch {
      text = rawStdout
    }

    const arrStart = text.indexOf('[')
    const arrEnd = text.lastIndexOf(']')
    if (arrStart === -1 || arrEnd === -1) {
      console.error('No JSON array in batch response:', text.slice(0, 400))
      return results
    }

    const batchResults = JSON.parse(text.slice(arrStart, arrEnd + 1))
    for (let i = 0; i < needsSearch.length; i++) {
      const r = needsSearch[i]
      const res = Array.isArray(batchResults) ? batchResults[i] : null
      if (res && typeof res.price === 'number') {
        if (res.price > 1000) res.price = Math.round(res.price / 2)
        results[r.originalIndex] = res
        const cacheKey = `${r.flyFrom}:${r.flyTo}:${r.dateFrom}:${r.dateTo}`
        routeCache.set(cacheKey, { result: res, ts: Date.now() })
        console.log(`  ${r.flyFrom}→${r.flyTo}: €${res.price} via ${res.carrier}`)
      }
    }
  } catch (err) {
    console.error('Batch search error:', err.message)
  }

  return results
}

// ── Admin: create user (no email confirmation, no rate limit) ────────────────
app.post('/api/admin/create-user', async (req, res) => {
  if (!supabase) return res.status(503).json({ error: 'Supabase not configured on this server' })
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' })
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })
  if (error) return res.status(400).json({ error: error.message })
  res.json({ id: data.user.id, email: data.user.email })
})

// ── Batch flight search (V3 main path) ───────────────────────────────────────
app.post('/api/search-flights-batch', async (req, res) => {
  const { destinations, currency = 'EUR' } = req.body
  if (!Array.isArray(destinations) || destinations.length === 0) {
    return res.status(400).json({ error: 'destinations must be a non-empty array' })
  }
  try {
    const results = await searchFlightsBatch(destinations, currency)
    res.json(results)
  } catch (err) {
    console.error('Batch endpoint error:', err.message)
    res.status(502).json({ error: err.message })
  }
})

// ── Single flight search (legacy / fallback) ─────────────────────────────────
app.post('/api/search-flight', async (req, res) => {
  const { flyFrom, flyTo, dateFrom, dateTo, currency = 'EUR' } = req.body

  if (!flyFrom || !flyTo || !dateFrom) {
    return res.status(400).json({ error: 'Missing required fields: flyFrom, flyTo, dateFrom' })
  }

  if (flyFrom === flyTo) {
    return res.json({
      price: 0, bookingLink: '', departureDate: dateFrom, returnDate: dateTo || dateFrom,
      durationMinutes: 0, carrier: 'Local', stops: 0, transportType: 'flight',
    })
  }

  // Check cache
  const cacheKey = `${flyFrom}:${flyTo}:${dateFrom}:${dateTo}`
  const cached = routeCache.get(cacheKey)
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    console.log(`Cache hit: ${flyFrom}→${flyTo}`)
    return res.json(cached.result)
  }

  try {
    console.log(`Single search: ${flyFrom} → ${flyTo} | ${dateFrom}–${dateTo}`)
    const result = await searchFlight(flyFrom, flyTo, dateFrom, dateTo, currency)
    if (!result) return res.json(null)
    routeCache.set(cacheKey, { result, ts: Date.now() })
    console.log(`Result: €${result.price} via ${result.carrier}`)
    return res.json(result)
  } catch (err) {
    console.error('Flight search error:', err.message)
    return res.status(502).json({ error: err.message })
  }
})

// ── Health ───────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({
  status: 'ok',
  mode: 'claude-cli + kiwi-mcp (v3-batch)',
  supabase: !!supabase,
  cacheSize: routeCache.size,
}))

const PORT = process.env.PROXY_PORT || 3001
app.listen(PORT, () => {
  console.log(`Flight proxy v3 on http://localhost:${PORT}`)
  console.log(`Mode: claude CLI batch → Kiwi MCP (${KIWI_TOOL})`)
  console.log('No API key — uses claude.ai subscription')
})
