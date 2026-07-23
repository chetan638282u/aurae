const products = [
  {
    id: 1,
    name: 'Radiance Renewal Serum',
    category: 'Serums',
    price: 98,
    description: 'A concentrated 15% Vitamin C serum stabilized with ferulic acid and vitamin E. Delivers a luminous, even-toned complexion while defending against environmental aggressors. Lightweight, fast-absorbing, and suitable for all skin types.',
    fullDescription: 'Formulated with 15% pure L-ascorbic acid, this potent serum works synergistically with ferulic acid and alpha-tocopherol to neutralize free radicals, stimulate collagen production, and visibly reduce hyperpigmentation. The anhydrous formula ensures peak stability without water activation. Use morning and evening after cleansing for a progressively brighter, firmer, and more uniform skin texture. Clinical trials show a 34% improvement in skin luminosity after 8 weeks of consistent use.',
    reviews: [
      { name: 'Isabella Chen', rating: 5, quote: 'My skin has never glowed like this. The texture improved within two weeks.' },
      { name: 'Margaret Osei', rating: 5, quote: 'This is the only vitamin C serum that hasn\'t oxidized on me.' },
    ],
  },
  {
    id: 2,
    name: 'Overnight Restorative Cream',
    category: 'Moisturizers',
    price: 145,
    description: 'A peptide-rich night cream that works in sync with your skin\'s natural repair cycle. Ultra-rich yet never heavy. Wake to visibly smoother, firmer skin.',
    fullDescription: 'At the heart of this indulgent night cream lies a pentapeptide complex clinically proven to support collagen synthesis, combined with bakuchiol — a gentler plant-based alternative to retinol. Ceramides and squalane reinforce the skin barrier while time-release hyaluronic acid delivers continuous hydration through the night. The velvety balm texture melts on contact, absorbing completely without residue. Suitable for normal to dry skin types.',
    reviews: [
      { name: 'Sophia Ramirez', rating: 5, quote: 'I wake up with plump, dewy skin every single morning. Holy grail.' },
      { name: 'Amara Diallo', rating: 4, quote: 'Rich but not greasy. My dry skin drinks this up.' },
    ],
  },
  {
    id: 3,
    name: 'Gentle Foaming Cleanser',
    category: 'Cleansers',
    price: 42,
    description: 'An amino-acid-based gel cleanser infused with rose water and aloe. Removes impurities and light makeup without stripping the skin barrier.',
    fullDescription: 'Amino acid surfactants derived from coconut oil create a luxurious, cream-to-foam lather that lifts away dirt, excess oil, and light makeup without disrupting the skin\'s natural pH. Bulgarian rose water soothes inflammation while aloe vera and panthenol provide lasting comfort. The subtle natural fragrance comes from rose damascena distillate — no synthetic perfumes. Perfect for morning and evening use, even for sensitive or reactive skin types.',
    reviews: [
      { name: 'Emma Laurent', rating: 5, quote: 'Finally a cleanser that doesn\'t leave my face tight. Smells divine.' },
      { name: 'Lina Kim', rating: 4, quote: 'Gentle enough for my rosacea.' },
    ],
  },
  {
    id: 4,
    name: 'Brightening Eye Concentrate',
    category: 'Treatments',
    price: 78,
    description: 'A cooling, caffeine-infused eye treatment with hyaluronic acid and niacinamide. Depuffs, brightens, and smooths the delicate eye area.',
    fullDescription: 'This lightweight gel concentrate targets puffiness, dark circles, and fine lines. Cold-brew caffeine and horse chestnut extract stimulate microcirculation to reduce under-eye bags. 5% niacinamide brightens dark circles while multi-molecular hyaluronic acid plumps fine dehydration lines. The metal rollerball applicator delivers an instant cooling effect and gentle micro-massage with each use.',
    reviews: [
      { name: 'Aisha Patel', rating: 5, quote: 'The rollerball feels incredible. My dark circles have noticeably faded in a month.' },
      { name: 'Claire Dubois', rating: 5, quote: 'This is the only one that actually depuffs.' },
    ],
  },
  {
    id: 5,
    name: 'Luminous Body Oil',
    category: 'Treatments',
    price: 65,
    description: 'A dry-body oil blend of squalane, jojoba, and wild-harvested botanicals. Absorbs instantly leaving a subtle, natural radiance.',
    fullDescription: 'A sensorial blend of fast-absorbing plant oils — squalane from sugarcane, jojoba seed oil, and wild-harvested camellia oil — that hydrate and illuminate without any greasy after-feel. A whisper of natural jasmine and sandalwood creates a subtle, warm scent. Use after bathing on damp skin, or mix into body lotion for added luminosity.',
    reviews: [
      { name: 'Nina Voss', rating: 5, quote: 'My skin has never been this soft. The scent is intoxicating but subtle.' },
      { name: 'Tara O\'Brien', rating: 4, quote: 'Actually absorbs — no greasy residue on my clothes.' },
    ],
  },
  {
    id: 6,
    name: 'Mineral Tinted SPF 50',
    category: 'Moisturizers',
    price: 62,
    description: 'A 100% mineral sunscreen with a universal tint that adapts to most skin tones. Zinc-oxide protection meets a natural, dewy finish.',
    fullDescription: 'Non-nano zinc oxide (22%) provides broad-spectrum SPF 50 protection while iron oxide micro-pigments offer a sheer, adaptable tint that works across a wide range of skin tones. The lightweight emulsion contains ectoin and niacinamide to soothe and protect against blue light and pollution. Reef-safe and packaged in a recyclable airless pump.',
    reviews: [
      { name: 'Zoe Williams', rating: 5, quote: 'The tint actually works on my medium skin tone. No white cast.' },
      { name: 'Priya Sharma', rating: 4, quote: 'Best mineral tint I\'ve tried. Looks like skin, not sunscreen.' },
    ],
  },
  {
    id: 7,
    name: 'Enzyme Exfoliating Mask',
    category: 'Cleansers',
    price: 55,
    description: 'A gentle resurfacing mask with papaya enzyme and lactic acid. Dissolves dead skin cells without physical scrubbing. Reveals a smoother, more radiant complexion.',
    fullDescription: 'Papain enzyme derived from green papaya gently dissolves keratin proteins that bind dead skin cells, while 5% lactic acid from fermented sugarcane provides mild chemical exfoliation. The creamy gel formula transforms into a silky emulsion when massaged with water. In just 5–10 minutes, it resurfaces without irritation. Infused with allantoin and cucumber extract to soothe as it exfoliates.',
    reviews: [
      { name: 'Rachel Torres', rating: 5, quote: 'My skin is so smooth after. No sting at all.' },
      { name: 'Maya Johansson', rating: 5, quote: 'The papaya smell is incredible. My texture improved after one use.' },
    ],
  },
  {
    id: 8,
    name: 'Calming Barrier Serum',
    category: 'Serums',
    price: 86,
    description: 'A ceramide-rich serum with niacinamide and centella asiatica. Strengthens the skin barrier while calming redness and irritation. Ideal for sensitive or compromised skin.',
    fullDescription: 'Five essential ceramides (NP, AP, EOP, NS, AS) in a biomimetic ratio work to repair and reinforce the skin barrier, while 4% niacinamide reduces redness and evens tone. Centella asiatica extract and madecassoside accelerate healing and soothe inflammation. Dermatologist-tested on reactive skin types. Free from essential oils, alcohol, and fragrance.',
    reviews: [
      { name: 'Elena Vasquez', rating: 5, quote: 'My skin barrier was completely wrecked. This fixed it in two weeks.' },
      { name: 'Diana Park', rating: 5, quote: 'Finally a serum that calms my redness instead of making it worse.' },
    ],
  },
  {
    id: 9,
    name: 'Dewy Gel Moisturizer',
    category: 'Moisturizers',
    price: 54,
    description: 'A feather-light gel-cream with polyglutamic acid and tremella mushroom. Delivers 24-hour hydration with a glass-skin finish. Perfect for oily and combination skin.',
    fullDescription: 'Polyglutamic acid (PGA) holds 4x more moisture than hyaluronic acid, while tremella fuciformis provides deep, lasting hydration without heaviness. Niacinamide regulates sebum production and minimizes pore appearance. Suitable for oily, combination, and acne-prone skin types.',
    reviews: [
      { name: 'Jenna Foster', rating: 4, quote: 'My oily skin loves this. Hydrating without being greasy.' },
      { name: 'Leila Hassan', rating: 5, quote: 'Finally a moisturizer that doesn\'t break me out.' },
    ],
  },
  {
    id: 10,
    name: 'Silk Oil Cleanser',
    category: 'Cleansers',
    price: 48,
    description: 'A luxurious oil-based first cleanser with camellia and grapeseed oil. Dissolves makeup, sunscreen, and sebum without stripping. Emulsifies to a milky rinse.',
    fullDescription: 'Camellia japonica seed oil dissolves even waterproof makeup and silicone-based sunscreens with ease. Grapeseed oil provides lightweight slip while meadowfoam seed oil adds emollient properties. The oil transforms into a silky milk upon contact with water. No mineral oil, no synthetic emulsifiers.',
    reviews: [
      { name: 'Suki Tanaka', rating: 5, quote: 'Removes everything including waterproof mascara effortlessly.' },
      { name: 'Camille Bernard', rating: 5, quote: 'Double cleansing with this has transformed my skin.' },
    ],
  },
  {
    id: 11,
    name: 'Midnight Lip Mask',
    category: 'Treatments',
    price: 36,
    description: 'An overnight lip treatment with shea butter, ceramides, and peptides. Smooths, plumps, and repairs dry lips while you sleep.',
    fullDescription: 'Rich shea butter and castor oil provide deep occlusive hydration, while ceramides repair the delicate lip barrier. A tripeptide complex stimulates collagen for naturally fuller-looking lips. Wake to lips that are impossibly soft, smooth, and nourished.',
    reviews: [
      { name: 'Hannah Lee', rating: 5, quote: 'My chronically chapped lips are GONE. This is magic in a pot.' },
      { name: 'Rosa Martinez', rating: 4, quote: 'Stays on all night and I wake up with baby-soft lips.' },
    ],
  },
  {
    id: 12,
    name: 'Retinol Night Serum',
    category: 'Serums',
    price: 112,
    description: 'An encapsulated retinol serum with ceramides. Delivers clinical-grade results with minimal irritation. Visible reduction in fine lines and improved skin texture.',
    fullDescription: 'Encapsulated retinol (0.3%) is delivered via a time-release liposomal system that reduces irritation while maximizing efficacy. Ceramides NP, AP, and EOP repair and reinforce the skin barrier. Visible results in fine lines, pore appearance, and skin texture within 4–6 weeks.',
    reviews: [
      { name: 'Grace Nakamura', rating: 5, quote: 'No irritation, just results. My fine lines are genuinely softer after 6 weeks.' },
      { name: 'Olivia Hart', rating: 4, quote: 'I can use retinol without peeling.' },
    ],
  },
]

const brandInfo = {
  name: 'AURAE',
  tagline: 'Rituals of Radiance',
  philosophy: 'Where modern science meets botanical luxury.',
  categories: ['Serums', 'Moisturizers', 'Cleansers', 'Treatments'],
  commitments: ['Cruelty Free', 'Dermatologist Tested', 'Clean Formula'],
  shipping: 'Free shipping on orders over $75. 30-day satisfaction guarantee — full refund if not completely happy.',
  location: 'Available globally with offices in Paris, London, and Tokyo.',
}

const websiteLayout = {
  sections: [
    {
      name: 'Navbar',
      id: '#hero',
      description: 'Fixed top navigation bar with glassmorphism effect. Contains the AURAE logo (links to hero), four navigation links (Home, Products, Reviews, Contact), and a hamburger menu on mobile. Background becomes translucent with blur on scroll.',
    },
    {
      name: 'Hero',
      id: '#hero',
      description: 'Full-screen hero section (110vh) with the AURAE brand name, tagline "Rituals of Radiance", and an "Explore Products" button. Features floating animated gradient orbs, a product image of the Radiance Renewal Cream jar, and glass cards showing product info (Radiance Renewal, $98), key ingredients (Vitamin C, Ferulic Acid, Vitamin E), clinical results (34% improvement in luminosity), and brand promises (Cruelty Free, Dermatologist Tested, Clean Formula). Also has glowing decorative elements and a scroll-down indicator at the bottom.',
    },
    {
      name: 'Products — The Collection',
      id: '#products',
      description: 'Product grid section displaying all 12 products with a category filter bar (All, Serums, Moisturizers, Cleansers, Treatments). Each product card shows an image, category badge, price, name, and description. Hover reveals "View Details" link. Clicking a card opens a modal with full product details including description, price, and customer reviews.',
    },
    {
      name: 'Reviews — Kind Words',
      id: '#reviews',
      description: 'Customer reviews section showing 6 testimonials in a grid. Each card displays star ratings, the review quote in italics, the reviewer\'s name with initials avatar, and "Verified Client" badge.',
    },
    {
      name: 'Contact — Begin Your Ritual',
      id: '#contact',
      description: 'Contact/inquiry form with fields for Name, Email, Phone (optional), Product Interested In (dropdown of all 12 products), and Message. Includes form validation and a success toast notification. Submit sends an inquiry to the AURAE team.',
    },
    {
      name: 'Footer',
      description: 'Glassmorphism footer with the AURAE logo, brand description, Quick Links (Products, Reviews, Contact), and social media icons (Instagram, Facebook, Twitter, YouTube). Copyright line at the bottom.',
    },
    {
      name: 'Chatbot',
      description: 'Floating chat widget (bottom-right) accessible from any page section. Opens a chat panel to ask questions about products, ingredients, recommendations, and the brand.',
    },
  ],
  design: {
    colors: ['blush (#FFE4E1)', 'champagne (#F5E6D3)', 'lavender (#E6E0F0)', 'rosegold (#B76E79)', 'charcoal (#2D2A26)'],
    fonts: ['Playfair Display (serif, for headings)', 'Inter (sans-serif, for body)'],
    style: 'Glassmorphism — translucent blurred backgrounds with soft borders and shadows. Smooth scroll via Lenis. Scroll animations via GSAP.',
    background: 'Animated canvas mesh background with floating color blobs.',
  },
}

function formatProducts() {
  return products.map((p) => `
Product: ${p.name}
Category: ${p.category}
Price: $${p.price}
Description: ${p.description}
Details: ${p.fullDescription}
Customer Reviews:
${p.reviews.map((r) => `  - "${r.quote}" — ${r.name} (${r.rating}/5)`).join('\n')}
`).join('\n---\n')
}

export function getSystemPrompt() {
  return `You are AURAE's personal brand assistant — warm, knowledgeable, and luxurious. Your tone is friendly, elegant, and approachable.

You represent AURAE, a luxury skincare brand. Answer questions ONLY using the product and brand information provided below. If a question falls outside what you know, politely say you'd be happy to connect them with the AURAE team for more details.

Be concise but warm. Recommend products when appropriate. Use the real product names, prices, and details. Never invent information.

=== BRAND INFO ===
Name: ${brandInfo.name}
Tagline: ${brandInfo.tagline}
Philosophy: ${brandInfo.philosophy}
Categories: ${brandInfo.categories.join(', ')}
Commitments: ${brandInfo.commitments.join(', ')}
Shipping & Returns: ${brandInfo.shipping}
${brandInfo.location}

=== WEBSITE LAYOUT ===
The AURAE website is a single-page luxury brand site. Sections:
${websiteLayout.sections.map((s) => `
- ${s.name}${s.id ? ` (${s.id})` : ''}: ${s.description}`).join('')}

Design System:
- Colors: ${websiteLayout.design.colors.join(', ')}
- Fonts: ${websiteLayout.design.fonts.join(', ')}
- Style: ${websiteLayout.design.style}
- Background: ${websiteLayout.design.background}

=== PRODUCTS ===
${formatProducts()}`
}
