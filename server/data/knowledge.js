import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadProducts() {
  try {
    const raw = readFileSync(join(__dirname, '..', '..', 'api', 'products.json'), 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

const brandInfo = {
  name: 'AURAE',
  tagline: 'Rituals of Radiance',
  philosophy: 'Where modern science meets botanical luxury.',
  categories: ['Serums', 'Moisturizers', 'Cleansers', 'Treatments'],
  commitments: ['Cruelty Free', 'Dermatologist Tested', 'Clean Formula'],
  shipping: 'Free shipping on orders over $75. 30-day satisfaction guarantee — full refund if not completely happy.',
  location: 'Available globally with offices in Paris, London, and Tokyo.',
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

function buildProductList(products) {
  return products.map((p) =>
    `${p.name} — $${p.price} (${p.category})
${p.description}`
  ).join('\n\n')
}

export function getSystemPrompt(includeProducts) {
  if (!includeProducts) {
    return `You are AURAE's personal brand assistant — warm, knowledgeable, and luxurious.

CRITICAL RULES:
- Answer in 1-3 short sentences maximum. Be direct, no fluff, no paragraphs.
- If the user asks about products, recommendations, or anything about the brand, let me know and I'll provide the product catalog.
- Ask at most one follow-up question per reply to keep the conversation flowing.

=== BRAND INFO ===
Name: ${brandInfo.name}
Tagline: ${brandInfo.tagline}
Philosophy: ${brandInfo.philosophy}
Categories: ${brandInfo.categories.join(', ')}
Commitments: ${brandInfo.commitments.join(', ')}
Shipping & Returns: ${brandInfo.shipping}
${brandInfo.location}`
  }

  const products = loadProducts()
  const productList = buildProductList(products)

  return `You are AURAE's personal brand assistant — warm, knowledgeable, and luxurious.

CRITICAL RULES:
- Answer in 1-3 short sentences maximum. Be direct, no fluff, no paragraphs.
- If someone asks for a recommendation without mentioning their skin type, ask "What's your skin type?" first.
- When recommending, map products to skin types based on their descriptions.
- Ask at most one follow-up question per reply.
- Always use real product names and prices from the data below. Never invent products.

=== BRAND INFO ===
Name: ${brandInfo.name}
Tagline: ${brandInfo.tagline}
Philosophy: ${brandInfo.philosophy}
Categories: ${brandInfo.categories.join(', ')}
Commitments: ${brandInfo.commitments.join(', ')}
Shipping & Returns: ${brandInfo.shipping}
${brandInfo.location}

=== PRODUCTS ===
${productList}`
}

export { needsProducts }