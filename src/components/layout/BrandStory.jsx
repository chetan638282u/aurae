import { motion } from 'framer-motion'
import { Leaf, Sparkles, Shield } from 'lucide-react'

const values = [
  { icon: Sparkles, label: 'Clinical-Grade', desc: 'Formulated with precision-backed active ingredients at optimal concentrations' },
  { icon: Leaf, label: 'Botanical Heritage', desc: 'Plant-derived actives sourced from sustainable, ethical partnerships' },
  { icon: Shield, label: 'Conscious Luxury', desc: 'Cruelty-free, dermatologist-tested, and formulated without compromise' },
]

export default function BrandStory() {
  return (
    <section id="about" className="relative z-10 py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-rosegold"
          >
            Since 2024
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="section-heading mt-3"
          >
            Where Science Meets Ritual
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="section-subheading mt-4 max-w-2xl mx-auto"
          >
            Every AURAE product is born from a singular belief — that the most effective skincare is also the most beautiful.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden glass shadow-lg">
                  <img
                    src="/images/products/radiance-renewal-serum.jpg"
                    alt="AURAE Radiance Renewal Serum"
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden glass shadow-lg">
                  <img
                    src="/images/products/gentle-foaming-cleanser.jpg"
                    alt="AURAE Gentle Foaming Cleanser"
                    className="w-full aspect-square object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden glass shadow-lg">
                  <img
                    src="/images/products/overnight-restorative-cream.jpg"
                    alt="AURAE Overnight Restorative Cream"
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden glass shadow-lg">
                  <img
                    src="/images/products/brightening-eye-concentrate.jpg"
                    alt="AURAE Brightening Eye Concentrate"
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>
              </div>
            </div>

            <div
              className="absolute -inset-4 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(183,110,121,0.06) 0%, transparent 60%)',
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-8"
          >
            <div className="space-y-5">
              <p className="text-sm md:text-base text-charcoal/70 leading-relaxed">
                We spent two years in development — not chasing trends, but perfecting formulations. 
                Each product in our collection is built around a single principle:{' '}
                <span className="font-semibold text-charcoal">efficacy without excess</span>.
              </p>
              <p className="text-sm md:text-base text-charcoal/70 leading-relaxed">
                Our clinical team identified the most potent, well-researched active ingredients — 
                from stabilized L-ascorbic acid to time-release retinol — and paired them with 
                calming botanicals, ceramides, and humectants. The result is skincare that works 
                in harmony with your skin, not against it.
              </p>
              <p className="text-sm md:text-base text-charcoal/70 leading-relaxed">
                Every texture, every fragrance note, every vessel is designed to elevate your 
                daily routine into a ritual of self-care. Because when your skincare feels 
                luxurious, you&apos;ll never skip it.
              </p>
            </div>

            <div
              className="w-full h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(183,110,121,0.2), transparent)',
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {values.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="glass rounded-xl p-4 text-center sm:text-left"
                >
                  <item.icon size={18} className="text-rosegold mb-2 mx-auto sm:mx-0" />
                  <p className="text-xs font-semibold text-charcoal">{item.label}</p>
                  <p className="text-[10px] text-charcoal/50 mt-0.5 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
