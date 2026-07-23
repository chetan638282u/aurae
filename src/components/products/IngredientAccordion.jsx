import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, FlaskConical, BookOpen, Beaker } from 'lucide-react'

const sections = [
  { key: 'keyIngredients', label: 'Key Ingredients', icon: FlaskConical },
  { key: 'howToUse', label: 'How to Use', icon: BookOpen },
  { key: 'fullFormula', label: 'Full Formula', icon: Beaker },
]

export default function IngredientAccordion({ data }) {
  const [openSection, setOpenSection] = useState('keyIngredients')

  if (!data) return null

  return (
    <div className="space-y-2">
      {sections.map(({ key, label, icon: Icon }) => {
        const isOpen = openSection === key
        return (
          <div key={key} className="glass rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenSection(isOpen ? null : key)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
            >
              <div className="flex items-center gap-2.5">
                <Icon size={15} className="text-rosegold/70" />
                <span className="text-xs font-semibold tracking-widest uppercase text-charcoal/60">
                  {label}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={14} className="text-charcoal/40" />
              </motion.div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-0 border-t border-white/10">
                    {key === 'keyIngredients' && (
                      <div className="space-y-3 mt-3">
                        {data.keyIngredients?.map((ing, i) => (
                          <div key={i}>
                            <p className="text-sm font-medium text-charcoal">{ing.name}</p>
                            <p className="text-xs text-charcoal/60 mt-0.5 leading-relaxed">{ing.benefit}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {key === 'howToUse' && (
                      <p className="text-sm text-charcoal/70 leading-relaxed mt-3">{data.howToUse}</p>
                    )}
                    {key === 'fullFormula' && (
                      <p className="text-xs text-charcoal/50 leading-relaxed mt-3">{data.fullFormula}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
