import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

function buildSystemPrompt(products) {
  if (!products || products.length === 0) {
    return 'You are AURAE\'s brand assistant. Answer skincare questions politely.'
  }

  const productList = products.map((p) =>
    `Product: ${p.name}
Category: ${p.category}
Price: $${p.price}
Description: ${p.description}
Details: ${p.fullDescription}
Reviews:
${(p.reviews || []).map((r) => `  - "${r.quote}" — ${r.name} (${r.rating}/5)`).join('\n')}`
  ).join('\n---\n')

  return `You are AURAE's personal brand assistant — warm, knowledgeable, and luxurious.

CRITICAL RULES:
- Answer in 1-3 short sentences maximum. Be direct, no fluff, no paragraphs.
- If someone asks for a product recommendation without mentioning their skin type, ask "What's your skin type?" before suggesting.
- When recommending, map products to skin types based on their descriptions. Example: products described as "perfect for oily and combination skin" → recommend for oily/combination skin.
- Ask at most one follow-up question per reply to keep the conversation flowing.
- Always use real product names, prices, and details from the data below. Never invent products.

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

  try {
    const { message, history, products } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const messages = [
      { role: 'system', content: buildSystemPrompt(products) },
      ...(history || []).slice(-10).map((msg) => ({
        role: msg.role === 'bot' ? 'assistant' : 'user',
        content: msg.content,
      })),
      { role: 'user', content: message },
    ]

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.5,
      max_tokens: 250,
    })

    const reply = completion.choices[0]?.message?.content || 'Sorry, I couldn\'t process that. Please try again.'

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Chat function error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}