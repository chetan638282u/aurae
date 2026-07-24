import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Groq from 'groq-sdk'
import { getSystemPrompt, needsProducts } from './data/knowledge.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })
const app = express()
const port = 3001

const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5175'

app.use(cors({ origin: allowedOrigin }))
app.use(express.json())
app.use(helmet())

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many requests. Please slow down.' },
})

const checkoutLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: 'Too many checkout attempts. Please try again later.' },
})

app.use(express.static(path.join(__dirname, '..', 'dist')))

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const INQUIRIES_FILE = path.join(__dirname, 'inquiries.json')
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || ''

function saveInquiry(data) {
  const inquiries = fs.existsSync(INQUIRIES_FILE)
    ? JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8'))
    : []
  inquiries.push({ timestamp: new Date().toISOString(), ...data })
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2))
}

const LOG_FILE = path.join(__dirname, 'server.log')

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`
  fs.appendFileSync(LOG_FILE, line)
}

async function sendToGoogleSheets(data) {
  if (!GOOGLE_SCRIPT_URL) {
    log('GOOGLE_SCRIPT_URL not set — skipping sheets')
    return false
  }
  try {
    log(`Sending to Google Sheets: ${JSON.stringify(data)}`)
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const text = await res.text()
    log(`Google Sheets response (${res.status}): ${text.substring(0, 200)}`)
    return res.ok
  } catch (err) {
    log(`Google Sheets error: ${err.message}`)
    return false
  }
}

app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { message, history } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const lastUserMsg = [...(history || [])].reverse().find((m) => m.role === 'user')
    const includeProducts = needsProducts(message) || needsProducts(lastUserMsg?.content)

    const messages = [
      { role: 'system', content: getSystemPrompt(includeProducts) },
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

    const reply = completion.choices[0]?.message?.content || 'I apologize, but I am unable to process that request at the moment. Please try again.'

    res.json({ reply })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/api/inquiry', async (req, res) => {
  try {
    const { name, email, phone, product, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }

    const data = { name: name.trim(), email: email.trim(), phone: phone || '', product: product || '', message: message.trim() }

    saveInquiry(data)

    const googleOk = await sendToGoogleSheets(data)
    if (googleOk) {
      console.log('Inquiry also saved to Google Sheets')
    }

    res.json({ success: true })
  } catch (error) {
    console.error('Inquiry error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

const ORDERS_FILE = path.join(__dirname, 'orders.json')

function saveOrder(data) {
  const orders = fs.existsSync(ORDERS_FILE)
    ? JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'))
    : []
  orders.push({ timestamp: new Date().toISOString(), ...data })
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2))
}

const LOYALTY_FILE = path.join(__dirname, 'loyalty.json')

function saveLoyaltySignup(data) {
  const signups = fs.existsSync(LOYALTY_FILE)
    ? JSON.parse(fs.readFileSync(LOYALTY_FILE, 'utf-8'))
    : []
  signups.push({ timestamp: new Date().toISOString(), ...data })
  fs.writeFileSync(LOYALTY_FILE, JSON.stringify(signups, null, 2))
}

app.post('/api/loyalty-signup', (req, res) => {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ error: 'Email is required' })
    saveLoyaltySignup({ email })
    log(`Loyalty signup: ${email}`)
    res.json({ success: true })
  } catch (error) {
    console.error('Loyalty error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/api/checkout', checkoutLimiter, (req, res) => {
  try {
    const { shipping, items } = req.body

    if (!shipping?.name || !shipping?.email || !items?.length) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    let products
    try {
      products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api', 'products.json'), 'utf-8'))
    } catch {
      return res.status(500).json({ error: 'Could not load product catalog' })
    }

    let subtotal = 0
    for (const item of items) {
      const product = products.find((p) => p.id === item.product?.id)
      if (!product) {
        return res.status(400).json({ error: `Invalid product: ${item.product?.name}` })
      }
      if (item.product.price !== product.price) {
        return res.status(400).json({ error: `Price mismatch for ${product.name}` })
      }
      subtotal += product.price * item.quantity
    }

    saveOrder({ shipping, items, subtotal })
    log(`Order placed by ${shipping.name} (${shipping.email}) — $${subtotal}`)

    res.json({ success: true })
  } catch (error) {
    console.error('Checkout error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`AURAE server running at http://localhost:${port}`)
})
