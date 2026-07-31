import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useState, useEffect } from 'react'
import CheckoutModal from '../checkout/CheckoutModal'
import RoutineBuilder from './RoutineBuilder'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, totalItems, totalPrice, updateQuantity, removeItem } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.location.hash = '#cart'
    } else {
      document.body.style.overflow = ''
      ScrollTrigger.refresh()
      if (window.location.hash === '#cart') {
        window.history.back()
      }
    }

    const handleHashChange = () => {
      if (window.location.hash !== '#cart' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => {
      document.body.style.overflow = ''
      ScrollTrigger.refresh()
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [isOpen, setIsOpen])

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: isMobile ? 0 : 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[70] bg-[rgba(45,42,38,0.3)]"
            />

            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 right-0 z-[80] h-full w-full max-w-md bg-blush/90 glass-strong flex flex-col shadow-[-8px_0_32px_rgba(0,0,0,0.1)]"
            >
              {isMobile && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
                  <div className="w-10 h-1 rounded-full bg-charcoal/20" />
                </div>
              )}
              <div className="flex items-center justify-between px-4 sm:px-6 py-5 border-b border-white/20 shrink-0">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={18} className="text-rosegold" />
                  <span className="font-serif text-lg font-bold text-charcoal">Your Cart</span>
                  <span className="text-xs text-charcoal/50 font-medium">({totalItems})</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag size={48} className="text-charcoal/20 mb-4" />
                    <p className="text-charcoal/50 text-sm">Your cart is empty</p>
                    <p className="text-charcoal/30 text-xs mt-1">Add some products to get started</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
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
                              
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                <RoutineBuilder />
              </div>

              {items.length > 0 && (
                <div className="shrink-0 px-4 sm:px-6 py-5 border-t border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-charcoal/60">Subtotal</span>
                    <span className="font-serif text-xl font-bold text-charcoal">
                      
                    </span>
                  </div>
                  {subtotal < 75 && (
                    <p className="text-[11px] text-charcoal/40 mb-3 text-center">
                      Add  more for free shipping
                    </p>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCheckout(true)}
                    className="btn-primary w-full"
                  >
                    Checkout
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
      />
    </>
  )
}
