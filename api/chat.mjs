import Groq from 'groq-sdk'
import { readFileSync } from 'fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const products = require('./products.json')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const rateLimitMap = new Map()
const WINDOW_MS = 60000
const MAX_REQUESTS = 20

function rateLimitCheck(ip) {
  const now = Date.now()
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [])
  }
  const timestamps = rateLimitMap.get(ip).filter((t) => now - t < WINDOW_MS)
  if (timestamps.length >= MAX_REQUESTS) {
    return true
  }
  timestamps.push(now)
  rateLimitMap.set(ip, timestamps)
  return false
}

const productKeywords = [
  'product', 'cream', 'serum', 'cleanser', 'moisturizer', 'treatment',
  'price', 'cost', 'recommend', 'suggestion', 'buy', 'purchase',
  'ingredient', 'routine', 'skin type', 'oily', 'dry', 'sensitive',
  'combination', 'glowing', 'brightening', 'spf', 'sunscreen',
  'lip', 'eye', 'retinol', 'vitamin c', 'niacinamide', 'ceramide',
  'barrier', 'exfoliate', 'peptide', 'bakuchiol', 'tinted',
  'mask', 'oil cleanser', 'body oil', 'night cream', 'gel',
  'catalog', 'collection', 'offer', 'deal', 'discount',
  'shipping', 'return', 'guarantee', 'review', 'rating',
  'auræ', 'aurae',
]

function needsProducts(text) {
  if (!text) return false
  const lower = text.toLowerCase()
  return productKeywords.some((kw) => lower.includes(kw))
}

function buildSystemPrompt(includeProducts) {
  if (!includeProducts) {
    return `You are AURAE's personal brand assistant — warm, knowledgeable, and luxurious.

CRITICAL RULES:
- Answer in 1-3 short sentences maximum. Be direct, no fluff, no paragraphs.
- If the user asks about products, recommendations, or anything about the brand, let me know and I'll provide the product catalog.
- Ask at most one follow-up question per reply to keep the conversation flowing.

=== BRAND INFO ===
Name: AURAE
Tagline: Rituals of Radiance
Philosophy: Where modern science meets botanical luxury.
Categories: Serums, Moisturizers, Cleansers, Treatments
Commitments: Cruelty Free, Dermatologist Tested, Clean Formula
Shipping: Free shipping on orders over $75. 30-day satisfaction guarantee.`
  }

  const productList = products.map((p) =>
    `${p.name} — $${p.price} (${p.category})
${p.description}`
  ).join('\n\n')

  return `You are AURAE's personal brand assistant — warm, knowledgeable, and luxurious.

CRITICAL RULES:
- Answer in 1-3 short sentences maximum. Be direct, no fluff, no paragraphs.
- If someone asks for a recommendation without mentioning their skin type, ask "What's your skin type?" first.
- When recommending, map products to skin types based on their descriptions.
- Ask at most one follow-up question per reply.
- Always use real product names and prices from the data below. Never invent products.

=== BRAND INFO ===
Name: AURAE
Tagline: Rituals of Radiance
Philosophy: Where modern science meets botanical luxury.
Categories: Serums, Moisturizers, Cleansers, Treatments
Commitments: Cruelty Free, Dermatologist Tested, Clean Formula
Shipping: Free shipping on orders over $75. 30-day satisfaction guarantee.

=== PRODUCTS ===
${productList}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown'
  if (rateLimitCheck(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please slow down.' })
  }

  try {
    const { message, history } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const lastUserMsg = [...(history || [])].reverse().find((m) => m.role === 'user')
    const includeProducts = needsProducts(message) || needsProducts(lastUserMsg?.content)

    const messages = [
      { role: 'system', content: buildSystemPrompt(includeProducts) },
      ...(history || []).slice(-6).map((msg) => ({
        role: msg.role === 'bot' ? 'assistant' : 'user',
        content: msg.content,
      })),
      { role: 'user', content: message },
    ]

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.5,
      max_tokens: 150,
    })

    const reply = completion.choices[0]?.message?.content || 'Sorry, I couldn\'t process that. Please try again.'

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Chat function error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}