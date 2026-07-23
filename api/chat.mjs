import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const products = [
  { id: 1, name: 'Radiance Renewal Serum', category: 'Serums', price: 98, description: 'A concentrated 15% Vitamin C serum stabilized with ferulic acid and vitamin E.', fullDescription: '15% pure L-ascorbic acid with ferulic acid and alpha-tocopherol. Neutralizes free radicals, stimulates collagen, reduces hyperpigmentation. 34% improvement in skin luminosity after 8 weeks.', reviews: [{ name: 'Isabella Chen', rating: 5, quote: 'My skin has never glowed like this.' }, { name: 'Margaret Osei', rating: 5, quote: 'Only vitamin C serum that hasn\'t oxidized on me.' }] },
  { id: 2, name: 'Overnight Restorative Cream', category: 'Moisturizers', price: 145, description: 'Peptide-rich night cream that works with skin\'s natural repair cycle.', fullDescription: 'Pentapeptide complex for collagen support, bakuchiol (gentler plant retinol), ceramides, squalane, time-release hyaluronic acid.', reviews: [{ name: 'Sophia Ramirez', rating: 5, quote: 'Wake up with plump, dewy skin every morning.' }, { name: 'Amara Diallo', rating: 4, quote: 'Rich but not greasy.' }] },
  { id: 3, name: 'Gentle Foaming Cleanser', category: 'Cleansers', price: 42, description: 'Amino-acid gel cleanser with rose water and aloe.', fullDescription: 'Amino acid surfactants from coconut oil, Bulgarian rose water, aloe vera, panthenol. No synthetic perfumes.', reviews: [{ name: 'Emma Laurent', rating: 5, quote: 'Doesn\'t leave my face tight. Smells divine.' }, { name: 'Lina Kim', rating: 4, quote: 'Gentle enough for my rosacea.' }] },
  { id: 4, name: 'Brightening Eye Concentrate', category: 'Treatments', price: 78, description: 'Caffeine-infused eye treatment with hyaluronic acid and niacinamide.', fullDescription: 'Cold-brew caffeine, horse chestnut extract, 5% niacinamide, multi-molecular hyaluronic acid. Metal rollerball applicator.', reviews: [{ name: 'Aisha Patel', rating: 5, quote: 'Dark circles noticeably faded in a month.' }, { name: 'Claire Dubois', rating: 5, quote: 'Only one that actually depuffs.' }] },
  { id: 5, name: 'Luminous Body Oil', category: 'Treatments', price: 65, description: 'Dry-body oil blend of squalane, jojoba, and botanicals.', fullDescription: 'Squalane from sugarcane, jojoba seed oil, camellia oil. Natural jasmine and sandalwood scent.', reviews: [{ name: 'Nina Voss', rating: 5, quote: 'Skin has never been this soft.' }, { name: 'Tara O\'Brien', rating: 4, quote: 'No greasy residue.' }] },
  { id: 6, name: 'Mineral Tinted SPF 50', category: 'Moisturizers', price: 62, description: '100% mineral sunscreen with universal tint.', fullDescription: 'Non-nano zinc oxide (22%), iron oxide micro-pigments, ectoin, niacinamide. Reef-safe.', reviews: [{ name: 'Zoe Williams', rating: 5, quote: 'No white cast on medium skin.' }, { name: 'Priya Sharma', rating: 4, quote: 'Looks like skin, not sunscreen.' }] },
  { id: 7, name: 'Enzyme Exfoliating Mask', category: 'Cleansers', price: 55, description: 'Gentle resurfacing mask with papaya enzyme and lactic acid.', fullDescription: 'Papain enzyme, 5% lactic acid, allantoin, cucumber extract. 5-10 minutes.', reviews: [{ name: 'Rachel Torres', rating: 5, quote: 'No sting at all.' }, { name: 'Maya Johansson', rating: 5, quote: 'Texture improved after one use.' }] },
  { id: 8, name: 'Calming Barrier Serum', category: 'Serums', price: 86, description: 'Ceramide-rich serum with niacinamide and centella asiatica.', fullDescription: 'Five essential ceramides (NP, AP, EOP, NS, AS), 4% niacinamide, centella asiatica, madecassoside. No essential oils, alcohol, fragrance.', reviews: [{ name: 'Elena Vasquez', rating: 5, quote: 'Fixed my wrecked barrier in two weeks.' }, { name: 'Diana Park', rating: 5, quote: 'Calms my redness.' }] },
  { id: 9, name: 'Dewy Gel Moisturizer', category: 'Moisturizers', price: 54, description: 'Feather-light gel-cream with polyglutamic acid and tremella mushroom.', fullDescription: 'Polyglutamic acid (4x more moisture than HA), tremella fuciformis, niacinamide. For oily and combination skin.', reviews: [{ name: 'Jenna Foster', rating: 4, quote: 'Hydrating without being greasy.' }, { name: 'Leila Hassan', rating: 5, quote: 'Doesn\'t break me out.' }] },
  { id: 10, name: 'Silk Oil Cleanser', category: 'Cleansers', price: 48, description: 'Oil-based first cleanser with camellia and grapeseed oil.', fullDescription: 'Camellia japonica seed oil, grapeseed oil, meadowfoam seed oil. Emulsifies to milky rinse.', reviews: [{ name: 'Suki Tanaka', rating: 5, quote: 'Removes waterproof mascara.' }, { name: 'Camille Bernard', rating: 5, quote: 'Double cleansing transformed my skin.' }] },
  { id: 11, name: 'Midnight Lip Mask', category: 'Treatments', price: 36, description: 'Overnight lip treatment with shea butter, ceramides, and peptides.', fullDescription: 'Shea butter, castor oil, ceramides, tripeptide complex.', reviews: [{ name: 'Hannah Lee', rating: 5, quote: 'Chapped lips are gone.' }, { name: 'Rosa Martinez', rating: 4, quote: 'Baby-soft lips in the morning.' }] },
  { id: 12, name: 'Retinol Night Serum', category: 'Serums', price: 112, description: 'Encapsulated retinol serum with ceramides.', fullDescription: 'Encapsulated retinol (0.3%), time-release liposomal system, ceramides NP, AP, EOP.', reviews: [{ name: 'Grace Nakamura', rating: 5, quote: 'No irritation, just results.' }, { name: 'Olivia Hart', rating: 4, quote: 'Retinol without peeling.' }] },
]

function getSystemPrompt() {
  const productList = products.map((p) =>
    `Product: ${p.name}\nCategory: ${p.category}\nPrice: $${p.price}\nDescription: ${p.description}\nDetails: ${p.fullDescription}\nReviews:\n${p.reviews.map((r) => `  - "${r.quote}" — ${r.name} (${r.rating}/5)`).join('\n')}`
  ).join('\n---\n')

  return `You are AURAE's personal brand assistant — warm, knowledgeable, and luxurious. Your tone is friendly, elegant, and approachable.

You represent AURAE, a luxury skincare brand. Answer questions ONLY using the product and brand information provided below. If a question falls outside what you know, politely say you'd be happy to connect them with the AURAE team for more details.

Be concise but warm. Recommend products when appropriate. Use the real product names, prices, and details. Never invent information.

=== BRAND INFO ===
Name: AURAE
Tagline: Rituals of Radiance
Philosophy: Where modern science meets botanical luxury.
Categories: Serums, Moisturizers, Cleansers, Treatments
Commitments: Cruelty Free, Dermatologist Tested, Clean Formula
Shipping: Free shipping on orders over $75. 30-day satisfaction guarantee.
Location: Available globally — offices in Paris, London, and Tokyo.

=== PRODUCTS ===
${productList}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { message, history } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const messages = [
      { role: 'system', content: getSystemPrompt() },
      ...(history || []).slice(-10).map((msg) => ({
        role: msg.role === 'bot' ? 'assistant' : 'user',
        content: msg.content,
      })),
      { role: 'user', content: message },
    ]

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.7,
      max_tokens: 600,
    })

    const reply = completion.choices[0]?.message?.content || 'I apologize, but I am unable to process that request at the moment. Please try again.'

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Chat function error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}