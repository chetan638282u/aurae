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
- ALWAYS respond in the EXACT same language and script as the user's message. If the user writes in Hinglish (Hindi in English letters), respond in Hinglish. If they write in English, respond in English. Never switch languages.
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
    `${p.name} (ID: ${p.id}) — $${p.price} (${p.category})
${p.description}`
  ).join('\n\n')

  return `You are AURAE's personal brand assistant — warm, knowledgeable, and luxurious.

CRITICAL RULES:
- ALWAYS respond in the EXACT same language and script as the user's message. If the user writes in Hinglish (Hindi in English letters), respond in Hinglish. If they write in English, respond in English. Never switch languages.
- Answer in 1-3 short sentences maximum. Be direct, no fluff, no paragraphs.
- If someone asks for a recommendation without mentioning their skin type, ask "What's your skin type?" first.
- When recommending, map products to skin types based on their descriptions.
- Ask at most one follow-up question per reply.
- Always use real product names and prices from the data below. Never invent products.
- If you recommend a specific product to the user, you MUST append its ID at the very end of your entire message in this exact format: [PRODUCT_ID:X] (for example, [PRODUCT_ID:1]). Only include ONE product ID per message.

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

    let targetModel = 'llama-3.3-70b-versatile';
    let completion;

    try {
      completion = await groq.chat.completions.create({
        model: targetModel,
        messages,
        temperature: 0.5,
        max_tokens: 150,
      });
    } catch (err) {
      const errText = err.message || '';
      const isModelError = errText.includes('model_not_found') || errText.includes('model_decommissioned') || errText.includes('does not exist') || errText.includes('decommissioned') || errText.includes('rate_limit_exceeded') || err.status === 429;
      
      if (isModelError) {
        console.log(`Model ${targetModel} failed. Fetching available models for fallback loop...`);
        const modelsPage = await groq.models.list();
        const availableModels = modelsPage.data?.map(m => m.id) || [];
        
        let validModels = availableModels.filter(m => m !== targetModel && !m.includes('whisper') && !m.includes('vision') && !m.includes('guard') && !m.includes('orpheus') && !m.includes('embed') && !m.includes('deepseek') && !m.includes('qwq'));
        
        // Sort to prioritize 8b, 3b, 1b, instant models first
        validModels.sort((a, b) => {
          const aSmall = a.includes('8b') || a.includes('3b') || a.includes('1b') || a.includes('instant');
          const bSmall = b.includes('8b') || b.includes('3b') || b.includes('1b') || b.includes('instant');
          if (aSmall && !bSmall) return -1;
          if (!aSmall && bSmall) return 1;
          return 0;
        });
        
        let success = false;
        let lastErr = err;
        
        // Try up to 4 models sequentially
        for (const fallbackModel of validModels.slice(0, 4)) {
          try {
            console.log(`Retrying with fallback model: ${fallbackModel}`);
            completion = await groq.chat.completions.create({
              model: fallbackModel,
              messages,
              temperature: 0.5,
              max_tokens: 150,
            });
            success = true;
            break; // Success!
          } catch (fallbackErr) {
            lastErr = fallbackErr;
            const fallbackErrText = fallbackErr.message || '';
            const isRetryable = fallbackErrText.includes('rate_limit_exceeded') || fallbackErr.status === 429 || fallbackErrText.includes('decommissioned') || fallbackErrText.includes('model_not_found') || fallbackErrText.includes('does not exist');
            if (!isRetryable) break; // Break on hard errors (like bad prompt)
          }
        }
        
        if (!success) {
          throw lastErr;
        }
      } else {
        throw err;
      }
    }

    let reply = completion.choices[0]?.message?.content || 'Sorry, I couldn\'t process that. Please try again.'
    
    // Strip out <think>...</think> blocks from deep reasoning models
    reply = reply.replace(/<think>[\s\S]*?<\/think>\n*/g, '').trim();

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Chat function error:', error)
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}