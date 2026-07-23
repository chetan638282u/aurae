import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function CartIcon() {
  const { totalItems, setIsOpen } = useCart()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsOpen(true)}
      className="relative p-1 flex items-center justify-center text-charcoal/70 hover:text-rosegold transition-colors duration-300"
      aria-label="Open cart"
    >
      <ShoppingBag size={18} />
      {totalItems > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          style={{ background: '#B76E79' }}
        >
          {totalItems > 9 ? '9+' : totalItems}
        </motion.span>
      )}
    </motion.button>
  )
}
