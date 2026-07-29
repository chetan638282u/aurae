import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Star, Minus, Plus, ShoppingBag, Bell, ShieldCheck } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useIsMobile } from '../../hooks/useIsMobile'
import ingredientData from '../../data/ingredients'
import IngredientAccordion from './IngredientAccordion'

const avatarGradients = [
  'linear-gradient(135deg, #B76E79, #D4A0A7)',
  'linear-gradient(135deg, #C9A96E, #DEC28C)',
  'linear-gradient(135deg, #8B9DAF, #B0C4D8)',
  'linear-gradient(135deg, #A8B5A2, #C5D4C0)',
  'linear-gradient(135deg, #C49A8C, #D9BDB2)',
  'linear-gradient(135deg, #9B8EB5, #BEB2D4)',
]

export default function ProductModal({ product, onClose }) {
  const [qty, setQty] = useState(1)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifySent, setNotifySent] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const { addItem } = useCart()
  const isMobile = useIsMobile()

  useEffect(() => {
    setQty(1)
    setRotateX(0)
    setRotateY(0)
  }, [product])

  const handleTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    setRotateX(-y * 10)
    setRotateY(x * 10)
  }

  const resetTilt = () => {
    setRotateX(0)
    setRotateY(0)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && product) onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose, product])

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [product])

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: product ? 1 : 0,
        pointerEvents: product ? 'auto' : 'none',
      }}
      transition={{ duration: isMobile ? 0 : 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-[rgba(45,42,38,0.3)]"
    >
      <motion.div
        initial={false}
        animate={{ opacity: product ? 1 : 0, y: product ? 0 : 20 }}
        transition={{ duration: isMobile ? 0 : 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
         className="bg-blush/90 glass-strong rounded-3xl w-full max-w-5xl max-h-[85vh] md:max-h-[calc(100vh-8rem)] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-charcoal/60 hover:text-charcoal transition-colors z-20"
        >
          <X size={18} />
        </button>

        <div data-lenis-prevent className="overflow-y-auto h-full p-4 sm:p-6 md:p-8 pt-16 md:pt-8 pb-20 md:pb-8" onWheel={(e) => e.stopPropagation()} style={{ WebkitOverflowScrolling: 'touch' }}>
          {product && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2 flex flex-col gap-4 rounded-2xl overflow-hidden shrink-0 md:sticky md:top-0">
                <div
                  className="w-full h-72 md:h-96 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center bg-white/5 cursor-pointer relative"
                  style={{ perspective: '600px' }}
                  onMouseMove={handleTilt}
                  onMouseLeave={resetTilt}
                >
                  <motion.img
                    key={galleryIndex}
                    src={product.gallery?.[galleryIndex] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-2xl"
                    style={{
                      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${1.02 + Math.abs(rotateY) * 0.005}, ${1.02 + Math.abs(rotateX) * 0.005}, 1.02)`,
                      transition: 'transform 0.06s ease-out',
                      boxShadow: `${rotateY * 0.4}px ${-rotateX * 0.4}px 24px rgba(0,0,0,0.18)`,
                    }}
                  />
                  {(product.gallery?.length || 0) > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                      {product.gallery.slice(0, 3).map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); setGalleryIndex(i) }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i === galleryIndex
                              ? 'bg-white w-4'
                              : 'bg-white/40 hover:bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-charcoal/50">
                    Customer Reviews
                  </h4>
                  {product.reviews?.map((review, i) => (
                    <div key={i} className="glass rounded-xl p-4">
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            size={12}
                            className={j < review.rating ? 'text-rosegold' : 'text-charcoal/20'}
                            fill={j < review.rating ? '#B76E79' : 'none'}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-charcoal/70 italic leading-relaxed">
                        &ldquo;{review.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-2.5 mt-3">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-semibold uppercase text-white shrink-0"
                          style={{ background: avatarGradients[i % avatarGradients.length] }}
                        >
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-charcoal">{review.name}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <ShieldCheck size={9} className="text-green-500" />
                            <p className="text-[9px] text-green-600/70 tracking-wider uppercase font-medium">Verified</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <span
                  className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(183,110,121,0.12)',
                    color: '#B76E79',
                  }}
                >
                  {product.category}
                </span>

                <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal mt-3">
                  {product.name}
                </h2>

                <p className="font-serif text-xl font-semibold mt-2" style={{ color: '#E07A8F' }}>
                  ${product.price}
                </p>
                <p className="text-xs text-charcoal/40 mt-0.5">{product.size}</p>

                <p className={`text-xs font-medium mt-1 ${product.stock === 0 ? 'text-red-400' : product.stock < 10 ? 'text-red-400' : 'text-charcoal/50'}`}>
                  {product.stock === 0 ? 'Out of Stock' : product.stock < 10 ? `Only ${product.stock} left` : `${product.stock} in stock`}
                </p>

                <p className="mt-4 text-sm text-charcoal/70 leading-relaxed">
                  {product.fullDescription}
                </p>

                <div className="mt-6 hidden md:flex items-center gap-4">
                  {product.stock === 0 ? (
                    <div className="w-full flex items-center gap-3">
                      <input
                        type="email"
                        value={notifyEmail}
                        onChange={(e) => setNotifyEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 bg-transparent border-b border-charcoal/20 py-2.5 text-sm text-charcoal outline-none transition-colors duration-300 focus:border-rosegold placeholder:text-charcoal/30"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { if (notifyEmail.trim()) setNotifySent(true) }}
                        disabled={notifySent || !notifyEmail.trim()}
                        className="btn-primary shrink-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Bell size={14} />
                        {notifySent ? 'Notified âœ“' : 'Notify Me'}
                      </motion.button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 glass rounded-full px-4 py-2">
                        <button
                          onClick={() => setQty(Math.max(1, qty - 1))}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-charcoal/60 hover:text-rosegold transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium text-charcoal w-6 text-center">{qty}</span>
                        <button
                          onClick={() => setQty(qty + 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-charcoal/60 hover:text-rosegold transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => addItem(product, qty)}
                        className="btn-primary flex-1 flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={16} />
                        Add to Cart â€” ${(product.price * qty).toFixed(0)}
                      </motion.button>
                    </>
                  )}
                </div>

                <div className="mt-8">
                  <IngredientAccordion data={ingredientData[product.id]} />
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {product && product.stock > 0 && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: product ? 0 : 80 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[65] glass border-t border-white/20 px-4 py-3 md:hidden flex items-center gap-3"
        >
          <div className="flex items-center gap-3 glass rounded-full px-3 py-1.5">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-7 h-7 rounded-full flex items-center justify-center text-charcoal/60"
            >
              <Minus size={12} />
            </button>
            <span className="text-sm font-medium text-charcoal w-5 text-center">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-charcoal/60"
            >
              <Plus size={12} />
            </button>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => addItem(product, qty)}
            className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-2.5"
          >
            <ShoppingBag size={15} />
            Add to Cart â€” ${(product.price * qty).toFixed(0)}
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}

