import { motion } from 'framer-motion'
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { useRouter } from '../../context/Router'
import products from '../../data/products'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addItem } = useCart()
  const { navigate } = useRouter()

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id))

  const handleAddToCart = (product) => {
    addItem(product)
    removeFromWishlist(product.id)
    navigate('/cart')
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto bg-blush/90 md:bg-transparent">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-charcoal/50 hover:text-rosegold transition-colors duration-300 mb-6"
      >
        <ArrowLeft size={16} />
        Back to Shopping
      </button>

      <div className="flex items-center gap-3 mb-8">
        <Heart size={22} className="text-rosegold" />
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-charcoal">Wishlist</h1>
        <span className="text-xs text-charcoal/50 font-medium">({wishlist.length})</span>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Heart size={48} className="text-charcoal/20 mb-4" />
          <p className="text-charcoal/50 text-sm">Your wishlist is empty</p>
          <p className="text-charcoal/30 text-xs mt-1">Save your favourite products here</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 btn-primary"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {wishlistProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
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
                      {product.category} — ${product.price}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="text-charcoal/30 hover:text-rosegold transition-colors shrink-0"
                  >
                    <Heart size={14} className="fill-rosegold text-rosegold" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-serif text-sm font-semibold text-charcoal">
                    ${product.price}
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
  )
}
