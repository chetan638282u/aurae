import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import products from '../../data/products'
import { useCart } from '../../context/CartContext'

const routineFlow = ['Cleansers', 'Serums', 'Moisturizers', 'Treatments']

export default function RoutineBuilder() {
  const { items, addItem } = useCart()

  const suggestions = useMemo(() => {
    const ownedCategories = new Set(items.map((i) => i.product.category))
    const nextCategory = routineFlow.find((cat) => !ownedCategories.has(cat))
    if (!nextCategory) return []

    return products
      .filter((p) => p.category === nextCategory)
      .slice(0, 2)
  }, [items])

  if (suggestions.length === 0 || items.length === 0) return null

  return (
    <div className="mt-6 pt-6 border-t border-white/20">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={14} className="text-rosegold" />
        <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/50">Complete Your Routine</p>
      </div>
      <p className="text-xs text-charcoal/50 mb-4">
        Add {suggestions.map((s) => s.name).join(' or ')} to finish your ritual
      </p>
      <div className="flex flex-col gap-2">
        {suggestions.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-3 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-charcoal truncate">{product.name}</p>
              <p className="text-xs text-charcoal/50">${product.price}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addItem(product)}
              className="text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(183,110,121,0.12)', color: '#B76E79' }}
            >
              + Add
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
