export const questions = [
  {
    id: 'skinType',
    question: 'What best describes your skin type?',
    options: [
      { value: 'dry', label: 'Dry', description: 'Tight, flaky, or rough patches' },
      { value: 'oily', label: 'Oily', description: 'Shiny, enlarged pores, prone to breakouts' },
      { value: 'combination', label: 'Combination', description: 'Oily T-zone, normal to dry cheeks' },
      { value: 'normal', label: 'Normal', description: 'Balanced, minimal concerns' },
      { value: 'sensitive', label: 'Sensitive', description: 'Easily irritated, red, or reactive' },
    ],
  },
  {
    id: 'concern',
    question: 'What is your primary skin concern?',
    options: [
      { value: 'aging', label: 'Fine Lines & Aging', description: 'Loss of firmness, wrinkles' },
      { value: 'hyperpigmentation', label: 'Dark Spots', description: 'Hyperpigmentation, uneven tone' },
      { value: 'acne', label: 'Breakouts', description: 'Acne, clogged pores, congestion' },
      { value: 'dryness', label: 'Dryness & Dehydration', description: 'Tightness, dullness, flaking' },
      { value: 'redness', label: 'Redness & Sensitivity', description: 'Irritation, rosacea, compromised barrier' },
      { value: 'dullness', label: 'Dullness', description: 'Lack of radiance, uneven texture' },
    ],
  },
  {
    id: 'texture',
    question: 'What texture do you prefer?',
    options: [
      { value: 'lightweight', label: 'Lightweight Gel', description: 'Feather-light, absorbs instantly' },
      { value: 'rich', label: 'Rich Cream', description: 'Deeply nourishing, velvety' },
      { value: 'oil', label: 'Oil-Based', description: 'Nourishing, luxurious feel' },
      { value: 'watery', label: 'Watery Serum', description: 'Quick-absorbing, layerable' },
    ],
  },
  {
    id: 'goal',
    question: 'What is your main skincare goal?',
    options: [
      { value: 'glow', label: 'Glow & Brightening', description: 'Radiant, luminous complexion' },
      { value: 'antiaging', label: 'Anti-Aging', description: 'Reduce fine lines, firm skin' },
      { value: 'hydration', label: 'Deep Hydration', description: 'Plump, dewy, well-moisturized' },
      { value: 'barrier', label: 'Barrier Repair', description: 'Strengthen, soothe, protect' },
      { value: 'tone', label: 'Even Tone', description: 'Reduce discoloration, balance' },
    ],
  },
  {
    id: 'sensitivities',
    question: 'Do you have any sensitivities?',
    options: [
      { value: 'none', label: 'None', description: 'My skin tolerates most ingredients' },
      { value: 'fragrance', label: 'Fragrance', description: 'Avoid synthetic or natural fragrances' },
      { value: 'retinol', label: 'Retinol', description: 'Reactive to retinoids or vitamin A' },
      { value: 'acids', label: 'AHAs/BHAs', description: 'Sensitive to exfoliating acids' },
    ],
  },
]

const quizEngine = {
  Serums: {
    skinType: ['dry', 'normal', 'combination'],
    concern: ['hyperpigmentation', 'dullness', 'aging'],
    goal: ['glow', 'antiaging', 'tone'],
    sensitivities: ['none', 'fragrance'],
  },
  Moisturizers: {
    skinType: ['dry', 'sensitive', 'normal', 'combination'],
    concern: ['dryness', 'aging', 'redness'],
    goal: ['hydration', 'barrier', 'antiaging'],
  },
  Cleansers: {
    skinType: ['oily', 'combination', 'sensitive', 'dry', 'normal'],
    concern: ['acne', 'dryness', 'redness'],
    goal: ['barrier', 'tone'],
  },
  Treatments: {
    skinType: ['dry', 'normal', 'combination'],
    concern: ['aging', 'dryness', 'hyperpigmentation', 'dullness'],
    goal: ['antiaging', 'glow', 'hydration'],
    sensitivities: ['none'],
  },
}

function scoreCategory(category, answers) {
  const rules = quizEngine[category]
  if (!rules) return 0
  let score = 0
  for (const [key, values] of Object.entries(rules)) {
    const answer = answers[key]
    if (answer && values.includes(answer)) score += 1
  }
  return score
}

export function getRecommendations(answers, products) {
  const scored = Object.keys(quizEngine).map((category) => ({
    category,
    score: scoreCategory(category, answers),
  }))

  scored.sort((a, b) => b.score - a.score)
  const topCategory = scored[0]?.category

  return (products || []).filter((p) => p.category === topCategory).slice(0, 3)
}
