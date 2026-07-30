import { motion } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useRouter } from '../../context/Router'
import RoutineBuilder from './RoutineBuilder'

export default function CartPage() {
  const { items, totalItems, updateQuantity, removeItem, subtotal } = useCart()
  const { navigate } = useRouter()

  return (
    <div className="min-h-screen pt-3 md:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto bg-blush/90 md:bg-transparent">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-charcoal/50 hover:text-rosegold transition-colors duration-300 mb-6"
      >
        <ArrowLeft size={16} />
        Back to Shopping
      </button>

      <div className="flex items-center gap-3 mb-8">
        <ShoppingBag size={22} className="text-rosegold" />
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-charcoal">Your Cart</h1>
        <span className="text-xs text-charcoal/50 font-medium">({totalItems})</span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingBag size={48} className="text-charcoal/20 mb-4" />
          <p className="text-charcoal/50 text-sm">Your cart is empty</p>
          <p className="text-charcoal/30 text-xs mt-1">Add some products to get started</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 btn-primary"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-4 flex gap-4"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-charcoal/50 mt-0.5">
                        {item.product.category}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-charcoal/30 hover:text-rosegold transition-colors shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full glass flex items-center justify-center text-charcoal/60 hover:text-rosegold transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium text-charcoal w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full glass flex items-center justify-center text-charcoal/60 hover:text-rosegold transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-serif text-sm font-semibold text-charcoal">
                      ${(item.product.price * item.quantity).toFixed(0)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <RoutineBuilder />

          <div className="mt-8 glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-charcoal/60">Subtotal</span>
              <span className="font-serif text-xl font-bold text-charcoal">
                ${subtotal.toFixed(0)}
              </span>
            </div>
            {subtotal < 75 && (
              <p className="text-xs text-charcoal/40 mb-3 text-center">
                Add ${(75 - subtotal).toFixed(0)} more for free shipping
              </p>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full"
            >
              Checkout
            </motion.button>
          </div>
        </>
      )}
    </div>
  )
}
