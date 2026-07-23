const ingredientData = {
  1: {
    keyIngredients: [
      { name: '15% L-Ascorbic Acid', benefit: 'Stimulates collagen, fades hyperpigmentation, antioxidant protection' },
      { name: 'Ferulic Acid', benefit: 'Stabilizes vitamin C, enhances antioxidant efficacy 8×' },
      { name: 'Alpha-Tocopherol', benefit: 'Vitamin E — neutralizes free radicals, supports skin barrier' },
    ],
    howToUse: 'Apply 3–4 drops to clean, dry skin every morning and evening. Follow with moisturizer and SPF during the day. Avoid combining with direct retinols in the same routine — alternate nights if using both.',
    fullFormula: 'Water, L-Ascorbic Acid (15%), Propanediol, Ferulic Acid, Alpha-Tocopherol, Sodium Hyaluronate, Panthenol, Glycerin, Polysorbate 20, Phenoxyethanol, Ethylhexylglycerin.',
  },
  2: {
    keyIngredients: [
      { name: 'Pentapeptide Complex', benefit: 'Clinically proven to support collagen synthesis' },
      { name: 'Bakuchiol', benefit: 'Plant-based retinol alternative — smooths without irritation' },
      { name: 'Time-Release Hyaluronic Acid', benefit: 'Continuous hydration throughout the night' },
    ],
    howToUse: 'Apply a pearl-sized amount as the final step of your evening routine. Warm between fingertips and press gently into face, neck, and décolletage. Use nightly.',
    fullFormula: 'Water, Squalane, Glycerin, Pentapeptide-4, Bakuchiol, Ceramide NP, Ceramide AP, Ceramide EOP, Sodium Hyaluronate, Shea Butter, Jojoba Oil, Panthenol, Niacinamide, Allantoin, Tocopherol, Phenoxyethanol.',
  },
  3: {
    keyIngredients: [
      { name: 'Amino Acid Surfactants', benefit: 'Coconut-derived — gentle, non-stripping, maintains pH balance' },
      { name: 'Bulgarian Rose Water', benefit: 'Soothes inflammation, tones, natural anti-inflammatory' },
      { name: 'Aloe Vera + Panthenol', benefit: 'Calms and moisturizes as it cleanses' },
    ],
    howToUse: 'Dispense 1–2 pumps into damp hands, lather between palms, and massage onto damp skin. Rinse thoroughly with lukewarm water. Use morning and evening.',
    fullFormula: 'Water, Cocoyl Glycine, Sodium Cocoyl Glutamate, Rosa Damascena Flower Water, Aloe Barbadensis Leaf Juice, Panthenol, Glycerin, Propanediol, Allantoin, Citric Acid, Phenoxyethanol.',
  },
  4: {
    keyIngredients: [
      { name: 'Cold-Brew Caffeine', benefit: 'Stimulates microcirculation, reduces puffiness' },
      { name: '5% Niacinamide', benefit: 'Brightens dark circles, strengthens delicate skin' },
      { name: 'Multi-Molecular Hyaluronic Acid', benefit: 'Plumps fine dehydration lines at multiple depths' },
    ],
    howToUse: 'Roll the metal ball tip gently under eyes in an outward motion — 2–3 passes per eye. Use morning and evening after cleansing. Follow with moisturizer. Store upright.',
    fullFormula: 'Water, Niacinamide, Caffeine, Sodium Hyaluronate, Horse Chestnut Extract, Glycerin, Propanediol, Panthenol, Allantoin, Phenoxyethanol, Ethylhexylglycerin.',
  },
  5: {
    keyIngredients: [
      { name: 'Squalane', benefit: 'Sugarcane-derived — intensely hydrating, non-comedogenic' },
      { name: 'Jojoba Seed Oil', benefit: 'Mimics skin\'s natural sebum, balances oil production' },
      { name: 'Wild Camellia Oil', benefit: 'Antioxidant-rich, absorbs instantly without greasiness' },
    ],
    howToUse: 'Apply to damp skin immediately after bathing to lock in moisture. Use 5–7 drops for full body. Can also be mixed into body lotion for added luminosity.',
    fullFormula: 'Squalane, Simmondsia Chinensis (Jojoba) Seed Oil, Camellia Oleifera Seed Oil, Tocopherol, Jasmine Sambac Oil, Santalum Album (Sandalwood) Oil, Limonene, Linalool.',
  },
  6: {
    keyIngredients: [
      { name: 'Non-Nano Zinc Oxide (22%)', benefit: 'Broad-spectrum SPF 50, reef-safe, no white cast' },
      { name: 'Iron Oxide Micro-Pigments', benefit: 'Universal tint that adapts to most skin tones' },
      { name: 'Ectoin + Niacinamide', benefit: 'Protects against blue light and pollution, soothes skin' },
    ],
    howToUse: 'Apply as the final step of your morning routine. Use 1/4 teaspoon for face and neck. Reapply every 2 hours when exposed to direct sun. Wears beautifully alone or under makeup.',
    fullFormula: 'Zinc Oxide (22%), Water, Caprylic/Capric Triglyceride, Niacinamide, Ectoin, Iron Oxides, Glycerin, Coco-Caprylate, Polyhydroxystearic Acid, Tocopherol, Aloe Barbadensis Leaf Juice.',
  },
  7: {
    keyIngredients: [
      { name: 'Papain Enzyme', benefit: 'Green papaya derived — gently dissolves dead skin cells' },
      { name: '5% Lactic Acid', benefit: 'Mild chemical exfoliation from fermented sugarcane' },
      { name: 'Allantoin + Cucumber', benefit: 'Soothes and calms as it resurfaces' },
    ],
    howToUse: 'Apply a thin, even layer to clean, dry skin. Leave on for 5–10 minutes. Massage gently with water to activate the milky emulsion, then rinse thoroughly. Use 2–3 times per week. Avoid if skin is broken or irritated.',
    fullFormula: 'Water, Lactic Acid (5%), Papain, Aloe Barbadensis Leaf Juice, Cucumis Sativus (Cucumber) Fruit Extract, Allantoin, Glycerin, Propanediol, Xanthan Gum, Phenoxyethanol.',
  },
  9: {
    keyIngredients: [
      { name: 'Five Essential Ceramides', benefit: 'NP, AP, EOP, NS, AS — repair and reinforce skin barrier' },
      { name: '4% Niacinamide', benefit: 'Reduces redness, evens skin tone, strengthens barrier' },
      { name: 'Centella Asiatica + Madecassoside', benefit: 'Accelerates healing, soothes inflammation' },
    ],
    howToUse: 'Apply 2–3 drops to clean, damp skin every morning and evening. Allow to absorb fully before layering moisturizer. Can be used under makeup. Ideal for compromised or reactive skin.',
    fullFormula: 'Water, Niacinamide (4%), Ceramide NP, Ceramide AP, Ceramide EOP, Ceramide NS, Ceramide AS, Centella Asiatica Extract, Madecassoside, Glycerin, Squalane, Panthenol, Allantoin, Propanediol.',
  },
  10: {
    keyIngredients: [
      { name: 'Polyglutamic Acid (PGA)', benefit: 'Holds 4× more moisture than hyaluronic acid' },
      { name: 'Tremella Fuciformis', benefit: 'Snow mushroom — deep hydration without heaviness' },
      { name: 'Niacinamide', benefit: 'Regulates sebum, minimizes pore appearance' },
    ],
    howToUse: 'After serum, apply a pea-sized amount to face and neck, smoothing upward. Use morning and evening. Wears beautifully under makeup without pilling. Ideal for oily and combination skin.',
    fullFormula: 'Water, Polyglutamic Acid, Tremella Fuciformis Extract, Niacinamide, Glycerin, Sodium Hyaluronate, Propanediol, Panthenol, Allantoin, Phenoxyethanol, Ethylhexylglycerin.',
  },
  11: {
    keyIngredients: [
      { name: 'Camellia Japonica Seed Oil', benefit: 'Rich in oleic acid — dissolves waterproof makeup effortlessly' },
      { name: 'Grapeseed Oil', benefit: 'Lightweight slip, non-comedogenic' },
      { name: 'Meadowfoam Seed Oil', benefit: 'Emollient, adds lasting comfort without residue' },
    ],
    howToUse: 'Dispense 2–3 pumps into dry hands and massage onto dry skin to dissolve makeup and sunscreen. Add a splash of water to emulsify into a milky texture. Rinse thoroughly. Follow with Gentle Foaming Cleanser.',
    fullFormula: 'Camellia Japonica Seed Oil, Vitis Vinifera (Grape) Seed Oil, Limnanthes Alba (Meadowfoam) Seed Oil, Polysorbate 80, Tocopherol, Caprylic/Capric Triglyceride.',
  },
  12: {
    keyIngredients: [
      { name: 'Shea Butter + Castor Oil', benefit: 'Deep occlusive hydration that stays on through the night' },
      { name: 'Ceramides', benefit: 'Repair delicate lip barrier during sleep' },
      { name: 'Tripeptide Complex', benefit: 'Stimulates collagen for naturally fuller-looking lips' },
    ],
    howToUse: 'Apply a generous layer to lips every evening as the final step in your ritual. Smooth over lip line for added definition. Use throughout the day on dry or chapped lips as needed.',
    fullFormula: 'Butyrospermum Parkii (Shea) Butter, Ricinus Communis (Castor) Seed Oil, Ceramide NP, Ceramide AP, Palmitoyl Tripeptide-1, Jojoba Oil, Beeswax, Tocopherol, Vanillin.',
  },
  8: {
    keyIngredients: [
      { name: 'Encapsulated Retinol (0.3%)', benefit: 'Time-release liposomal delivery — minimal irritation' },
      { name: 'Ceramides NP, AP, EOP', benefit: 'Repair and reinforce skin barrier alongside retinol' },
      { name: 'Squalane + Bisabolol', benefit: 'Calms potential reactivity from retinol' },
    ],
    howToUse: 'Start with 2 nights per week, gradually increasing to every other night. Apply 2–3 drops to clean, dry skin in the evening only. Wait 20 minutes before layering moisturizer. Always follow with SPF 50 the next morning.',
    fullFormula: 'Water, Encapsulated Retinol (0.3%), Squalane, Ceramide NP, Ceramide AP, Ceramide EOP, Bisabolol, Glycerin, Propanediol, Panthenol, Tocopherol, Phenoxyethanol.',
  },
}

export default ingredientData
