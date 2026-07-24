import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User } from 'lucide-react'
import CartIcon from '../cart/CartIcon'
import WishlistIcon from '../wishlist/WishlistIcon'
import SignInModal from './SignInModal'
import { useLenis } from '../../context/LenisContext'
import { useNavigation } from '../../context/NavigationContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Collection', href: '#products' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Reviews', href: '#reviews' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const lenis = useLenis()
  const { navigateTo, goToMain } = useNavigation()
  const { isOpen: cartOpen } = useCart()
  const { isOpen: wishlistOpen } = useWishlist()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setPastHero(window.scrollY > window.innerHeight * 0.92)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isCompact = pastHero && !hovered && !mobileOpen && !cartOpen && !wishlistOpen

  const scrollTo = (href) => {
    setMobileOpen(false)
    setHovered(false)
    const hash = href.replace('#', '')
    if (hash === 'hero') {
      goToMain()
    } else if (hash === 'products') {
      navigateTo('products')
    }
    if (lenis) {
      lenis.scrollTo(href, { offset: -80, duration: 1.2 })
    }
  }

  return (
    <>
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        height: isCompact ? '48px' : '80px',
      }}
      transition={{ duration: isCompact ? 0.4 : 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(255,255,255,0.18)] backdrop-blur-[24px] border-b border-[rgba(255,255,255,0.4)] shadow-[0_8px_32px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
      style={{
        filter: isCompact ? 'brightness(0.75)' : 'brightness(1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <button onClick={() => scrollTo('#hero')} className="text-left shrink-0">
            <span className={`font-serif font-bold tracking-wide block transition-all duration-300 ${
              isCompact ? 'text-xl' : 'text-3xl'
            }`} style={{ color: '#B76E79' }}>
              AURAE
            </span>
            <span className={`block text-[11px] tracking-widest uppercase text-rosegold/70 font-light transition-all duration-300 ${
              isCompact ? 'opacity-0 h-0' : 'opacity-100 h-auto'
            }`}>
              Luxury Skincare
            </span>
          </button>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium tracking-wide text-charcoal/80 hover:text-rosegold transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSignIn(true)}
              className="flex p-1 items-center justify-center text-charcoal/50 hover:text-rosegold transition-colors"
              aria-label="Sign in"
            >
              <User size={18} />
            </button>
            <WishlistIcon />
            <CartIcon />
            <div className="md:hidden relative">
              <button
                onClick={() => { setMobileOpen(!mobileOpen); setHovered(false) }}
                className="flex p-1 items-center justify-center text-charcoal/50 hover:text-rosegold transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
              <AnimatePresence>
                {mobileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute top-full right-0 mt-2 min-w-[200px] bg-blush/90 backdrop-blur-[24px] border border-white/40 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden"
                  >
                    <div className="p-4 flex flex-col gap-2">
                      {navLinks.map((link) => (
                        <button
                          key={link.href}
                          onClick={() => scrollTo(link.href)}
                          className="text-sm font-medium text-left text-charcoal/80 hover:text-rosegold transition-colors duration-300 px-3 py-2 rounded-xl hover:bg-white/10"
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
    <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
    </>
  )
}
