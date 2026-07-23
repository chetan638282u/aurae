import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, FlaskConical, Award, Users } from 'lucide-react'

const trustItems = [
  { icon: Shield, label: 'Cruelty Free', sub: 'Never tested on animals' },
  { icon: Award, label: 'Dermatologist Tested', sub: 'Clinically approved' },
  { icon: FlaskConical, label: 'Clean Formula', sub: 'No parabens, sulfates, or synthetics' },
]

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref} className="font-serif text-4xl md:text-5xl font-bold text-charcoal">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function SocialProofStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative z-10 py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <Users size={20} className="text-rosegold" />
                <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/50">Community</p>
              </div>
              <AnimatedCounter target={10000} suffix="+" />
              <p className="text-sm text-charcoal/60 mt-2">
                satisfied customers trust AURAE for their daily ritual
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {trustItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <item.icon size={22} className="text-rosegold mx-auto mb-2" />
                  <p className="text-xs font-semibold text-charcoal">{item.label}</p>
                  <p className="text-[10px] text-charcoal/50 mt-0.5">{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
