import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ShoppingBag } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useEffect } from 'react'
import products from '../../data/products'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function WishlistDrawer() {
  const { wishlist, isOpen, setIsOpen, removeFromWishlist } = useWishlist()
  const { addItem } = useCart()
  const isMobile = useIsMobile()

  // 1. Handle Initial Mount Hash
  useEffect(() => {
    if (window.location.hash === '#wishlist') {
      setIsOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 2. Handle State <-> DOM Sync
  useEffect(() => {
    if (isOpen) {
      if (!isMobile) document.body.style.overflow = 'hidden'
      if (window.location.hash !== '#wishlist') {
        window.location.hash = '#wishlist'
      }
    } else {
      document.body.style.overflow = ''
      ScrollTrigger.refresh()
      if (window.location.hash === '#wishlist') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    }

    return () => {
      if (isOpen) {
        document.body.style.overflow = ''
        ScrollTrigger.refresh()
      }
    }
  }, [isOpen])

  // 3. Handle External Hash Changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#wishlist') {
        if (!isOpen) setIsOpen(true)
      } else if (isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [isOpen, setIsOpen])

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id))

  const handleAddToCart = (product) => {
    addItem(product)
    removeFromWishlist(product.id)
  }

  const content = isOpen && (
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
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/20 shrink-0">
              <div className="flex items-center gap-3">
                <Heart size={18} className="text-rosegold" />
                <span className="font-serif text-lg font-bold text-charcoal">Wishlist</span>
                <span className="text-xs text-charcoal/50 font-medium">({wishlist.length})</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full glass flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {wishlistProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Heart size={48} className="text-charcoal/20 mb-4" />
                  <p className="text-charcoal/50 text-sm">Your wishlist is empty</p>
                  <p className="text-charcoal/30 text-xs mt-1">Save your favourite products here</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {wishlistProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="glass rounded-xl p-4 flex gap-4"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-charcoal truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-charcoal/50 mt-0.5">
                              {product.category}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="text-charcoal/30 hover:text-rosegold transition-colors shrink-0"
                          >
                            <X size={14} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <span className="font-serif text-sm font-semibold text-charcoal">
                            
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleAddToCart(product)}
                            className="flex items-center gap-1.5 text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full"
                            style={{ background: '#B76E79', color: 'white' }}
                          >
                            <ShoppingBag size={12} />
                            Add to Cart
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
    </>
  )

  return isMobile ? content : <AnimatePresence>{content}</AnimatePresence>
}
