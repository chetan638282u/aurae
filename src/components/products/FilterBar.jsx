import { motion } from 'framer-motion'

export default function FilterBar({ categories, active, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          onClick={() => onSelect(cat)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
            active === cat
              ? 'glass-strong text-charcoal border-[rgba(183,110,121,0.5)]'
              : 'glass text-charcoal/60 hover:text-charcoal/90 hover:border-white/50'
          }`}
          style={active === cat ? { borderColor: 'rgba(183,110,121,0.5)' } : {}}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  )
}
