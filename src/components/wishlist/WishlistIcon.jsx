import { Heart } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'
import { useRouter } from '../../context/Router'

export default function WishlistIcon() {
  const { wishlistCount } = useWishlist()
  const { navigate } = useRouter()

  return (
    <button
      onClick={() => navigate('/wishlist')}
      className="relative p-2 text-charcoal/70 hover:text-rosegold transition-colors duration-300"
      aria-label="Open wishlist"
    >
      <Heart size={20} className={wishlistCount > 0 ? 'fill-rosegold text-rosegold' : ''} />
      {wishlistCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-semibold flex items-center justify-center"
          style={{ background: '#B76E79', color: 'white' }}
        >
          {wishlistCount > 9 ? '9+' : wishlistCount}
        </span>
      )}
    </button>
  )
}
