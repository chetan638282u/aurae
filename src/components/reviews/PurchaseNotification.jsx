import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import products from '../../data/products'

const names = [
  'Sophia', 'Emma', 'Aisha', 'Isabella', 'Grace',
  'Olivia', 'Maya', 'Priya', 'Zoe', 'Elena',
  'Claire', 'Nina', 'Hannah', 'Leila', 'Amara',
]

const cities = [
  'New York', 'London', 'Paris', 'Tokyo', 'Sydney',
  'Toronto', 'Mumbai', 'Berlin', 'Seoul', 'Milan',
]

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function PurchaseNotification() {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState({ name: '', city: '', product: '' })

  const show = useCallback(() => {
    const product = randomItem(products)
    setCurrent({
      name: randomItem(names),
      city: randomItem(cities),
      product: product.name,
      image: product.image,
    })
    setVisible(true)
    setTimeout(() => setVisible(false), 4000)
  }, [])

  useEffect(() => {
    const first = setTimeout(show, 3000)
    const interval = setInterval(() => {
      if (Math.random() > 0.5) show()
    }, 8000)

    return () => {
      clearTimeout(first)
      clearInterval(interval)
    }
  }, [show])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, x: -10, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-24 left-6 z-[55] max-w-xs md:bottom-24"
          style={{ bottom: 'clamp(1.5rem, 6vw, 6rem)', left: 'clamp(0.75rem, 3vw, 1.5rem)' }}
        >
          <div className="glass-strong rounded-xl px-4 py-3 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
              <img src={current.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-charcoal/80 leading-relaxed">
                <span className="font-semibold">{current.name}</span> in{' '}
                <span className="font-semibold">{current.city}</span> purchased
              </p>
              <p className="text-[11px] text-charcoal/50 truncate">{current.product}</p>
            </div>
            <ShoppingBag size={14} className="text-rosegold shrink-0" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
