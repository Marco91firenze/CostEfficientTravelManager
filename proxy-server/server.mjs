/**
 * Local proxy server — calls the `claude` CLI (uses your claude.ai subscription)
 * with the Kiwi.com MCP connector allowed, so real Kiwi flight data flows through.
 * Also handles Stripe Checkout + webhook for the paywall.
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

// ── Stripe client ────────────────────────────────────────────────────────────
let stripe = null
if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
  try {
    const { default: Stripe } = await import('stripe')
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    console.log('Stripe client initialised')
  } catch {
    console.warn('stripe package not installed — payment endpoints disabled. Run: npm install stripe')
  }
}

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

const app = express()
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    FRONTEND_URL,
  ],
}))

// Raw body needed for Stripe webhook signature verification
app.use('/api/stripe-webhook', express.raw({ type: 'application/json' }))
app.use(express.json())

const KIWI_TOOL = 'mcp__2854519a-df1e-46f5-954e-28d76adeecbf__search-flight'

async function searchFlight(flyFrom, flyTo, dateFrom, dateTo, currency) {
  const toKiwiDate = (iso) => {
    const [y, m, d] = iso.split('-')
    return `${d}/${m}/${y}`
  }

  const depKiwi = toKiwiDate(dateFrom)
  const retRange = dateTo && dateTo !== dateFrom ? toKiwiDate(dateTo) : null

  const prompt = `Search for the cheapest round-trip flight for 1 adult from ${flyFrom} to ${flyTo}.
Departure date: ${depKiwi}${retRange ? `, latest departure: ${retRange}` : ''}.
Use the search-flight tool with sort="price" and one_for_city=false.
After getting results, respond with ONLY a raw JSON object (no markdown fences, no explanation), matching exactly:
{"price":<cheapest one-way price as number>,"carrier":"<airline names>","stops":<integer>,"durationMinutes":<integer>,"bookingLink":"<bookingUrl from results>","departureDate":"<YYYY-MM-DD>","returnDate":"<YYYY-MM-DD 2-3 nights later>","transportType":"flight"}`

  const { stdout } = await execFileAsync('claude', [
    '--print', prompt,
    '--allowedTools', KIWI_TOOL,
    '--output-format', 'json',
    '--max-turns', '8',
  ], {
    timeout: 90_000,
    env: process.env,
  })

  let text = ''
  try {
    const envelope = JSON.parse(stdout.trim())
    text = envelope.result ?? envelope.text ?? stdout
  } catch {
    text = stdout
  }

  const match = text.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)?\}/)
  if (!match) {
    console.error('No JSON found in Claude output:', text.slice(0, 300))
    return null
  }

  const result = JSON.parse(match[0])
  if (result.price > 1000) result.price = Math.round(result.price / 2)
  return result
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

// ── Flight search ────────────────────────────────────────────────────────────
app.post('/api/search-flight', async (req, res) => {
  const { flyFrom, flyTo, dateFrom, dateTo, currency = 'EUR' } = req.body

  if (!flyFrom || !flyTo || !dateFrom) {
    return res.status(400).json({ error: 'Missing required fields: flyFrom, flyTo, dateFrom' })
  }

  if (flyFrom === flyTo) {
    return res.json({
      price: 0,
      bookingLink: '',
      departureDate: dateFrom,
      returnDate: dateTo || dateFrom,
      durationMinutes: 0,
      carrier: 'Local',
      stops: 0,
      transportType: 'flight',
    })
  }

  try {
    console.log(`Searching: ${flyFrom} → ${flyTo} | ${dateFrom}–${dateTo}`)
    const result = await searchFlight(flyFrom, flyTo, dateFrom, dateTo, currency)
    if (!result) return res.json(null)
    console.log(`Result: €${result.price} via ${result.carrier}`)
    return res.json(result)
  } catch (err) {
    console.error('Flight search error:', err.message)
    return res.status(502).json({ error: err.message })
  }
})

// ── Stripe: create checkout session ─────────────────────────────────────────
app.post('/api/create-checkout', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Stripe not configured on this server' })
  }
  const { projectId, savingsAmount, userEmail } = req.body
  if (!projectId || !savingsAmount) {
    return res.status(400).json({ error: 'Missing projectId or savingsAmount' })
  }
  const fee = Math.max(1, Math.round(savingsAmount * 0.33))
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: userEmail,
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Unlock your cheapest event city (save ~€${Math.round(savingsAmount)})`,
          },
          unit_amount: fee * 100,
        },
        quantity: 1,
      }],
      success_url: `${FRONTEND_URL}/app/projects/${projectId}?paid=true`,
      cancel_url: `${FRONTEND_URL}/app/projects/${projectId}`,
      metadata: { projectId },
    })
    res.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ── Stripe: webhook ──────────────────────────────────────────────────────────
app.post('/api/stripe-webhook', async (req, res) => {
  if (!stripe) return res.status(503).json({ error: 'Stripe not configured' })
  if (!supabase) return res.status(503).json({ error: 'Supabase not configured' })

  let event
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return res.status(400).json({ error: err.message })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const { projectId } = session.metadata
    await supabase.from('results').update({
      is_paid: true,
      stripe_session_id: session.id,
      fee_charged: session.amount_total / 100,
      paid_at: new Date().toISOString(),
    }).eq('id', projectId)
    await supabase.from('projects').update({ status: 'paid' }).eq('id', projectId)
    console.log(`Payment confirmed for project ${projectId}`)
  }

  res.json({ received: true })
})

// ── Health ───────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({
  status: 'ok',
  mode: 'claude-cli + kiwi-mcp',
  stripe: !!stripe,
  supabase: !!supabase,
}))

const PORT = process.env.PROXY_PORT || 3001
app.listen(PORT, () => {
  console.log(`Flight proxy on http://localhost:${PORT}`)
  console.log(`Mode: claude CLI → Kiwi MCP (${KIWI_TOOL})`)
  console.log('No API key needed — uses your claude.ai subscription')
})
