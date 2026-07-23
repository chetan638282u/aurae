import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'

export default function Toast({ message, type = 'success', visible, onClose }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed top-24 right-6 z-[70] max-w-sm"
        >
          <div className="glass-strong rounded-xl px-5 py-4 flex items-start gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            {type === 'success' && (
              <CheckCircle size={20} className="text-rosegold shrink-0 mt-0.5" />
            )}
            <p className="text-sm text-charcoal/80 leading-relaxed flex-1">{message}</p>
            <button onClick={onClose} className="text-charcoal/40 hover:text-charcoal transition-colors shrink-0">
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
