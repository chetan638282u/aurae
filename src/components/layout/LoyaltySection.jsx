import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Gift, Star, Gem } from 'lucide-react'

const perks = [
  { icon: Star, label: 'Earn Points', desc: 'On every purchase' },
  { icon: Gift, label: 'Birthday Gift', desc: 'A special surprise each year' },
  { icon: Gem, label: 'Early Access', desc: 'New launches before anyone else' },
]

export default function LoyaltySection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      await fetch('/api/loyalty-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      setSubscribed(true)
      setEmail('')
    } catch {
      setSubscribed(true)
    } finally {
      setLoading(false)
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative z-10 py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden relative">
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(183,110,121,0.08) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,228,225,0.08) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-full glass flex items-center justify-center mx-auto mb-6">
              <Sparkles size={24} className="text-rosegold" />
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
              Join the AURAE Circle
            </h2>
            <p className="text-sm md:text-base text-charcoal/60 mt-4 leading-relaxed max-w-lg mx-auto">
              Be the first to discover new rituals, earn exclusive rewards, and receive a birthday gift each year — just for being part of our community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-lg mx-auto">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <perk.icon size={20} className="text-rosegold mx-auto mb-2" />
                  <p className="text-xs font-semibold text-charcoal">{perk.label}</p>
                  <p className="text-[10px] text-charcoal/50 mt-0.5">{perk.desc}</p>
                </motion.div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-8 max-w-sm mx-auto">
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-rosegold font-medium"
                >
                  You&apos;re in! Welcome to the AURAE Circle.
                </motion.p>
              ) : (
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-transparent border-b border-charcoal/20 py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-rosegold placeholder:text-charcoal/30"
                  />
                  <motion.button
                    type="submit"
                    disabled={loading || !email.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Joining...' : 'Join Free'}
                  </motion.button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
