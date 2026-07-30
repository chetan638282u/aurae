import { motion } from 'framer-motion'
import { Plus, Heart } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useRouter } from '../../context/Router'

export default function ProductCard({ product, index, onClick }) {
  const { addItem } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const { navigate } = useRouter()
  const wishlisted = isWishlisted(product.id)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="glass rounded-2xl overflow-hidden group transition-shadow duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]"
    >
      <div className="aspect-square overflow-hidden relative cursor-pointer" onClick={() => onClick(product)}>
        {product.stock > 0 && product.stock < 10 && (
          <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-wider uppercase ${
            product.stock <= 3
              ? 'bg-red-400/90 text-white'
              : 'bg-amber-400/90 text-charcoal'
          }`}>
            {product.stock <= 3 ? 'Almost Gone' : 'Low Stock'}
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleWishlist(product.id)
          }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            background: wishlisted ? '#B76E79' : 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(4px)',
          }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            className={wishlisted ? 'fill-white text-white' : 'text-charcoal/60'}
          />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation()
            addItem(product)
            if (wishlisted) toggleWishlist(product.id)
            navigate('/cart')
          }}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: '#B76E79', color: 'white' }}
        >
          <Plus size={18} />
        </motion.button>
      </div>

      <div className="p-6 cursor-pointer" onClick={() => onClick(product)}>
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              background: 'rgba(183,110,121,0.12)',
              color: '#B76E79',
            }}
          >
            {product.category}
          </span>
          <span className="font-serif text-lg font-semibold text-charcoal/80">
            ${product.price}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-charcoal/40 tracking-wide">{product.size}</span>
        </div>

        <h3 className="font-serif text-xl font-bold text-charcoal mt-3">
          {product.name}
        </h3>

        <p className="mt-2 text-sm text-charcoal/60 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center gap-1 text-xs font-medium tracking-wide text-rosegold/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>View Details</span>
          <span className="text-lg leading-none">→</span>
        </div>
      </div>
    </motion.div>
  )
}
