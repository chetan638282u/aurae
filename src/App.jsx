import { CartProvider, useCart } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { NavigationProvider } from './context/NavigationContext'
import { LenisProvider } from './context/LenisContext'
import MeshBackground from './components/MeshBackground'
import SectionDivider from './components/SectionDivider'
import Navbar from './components/layout/Navbar'
import Hero from './components/hero/Hero'
import BrandStory from './components/layout/BrandStory'
import ProductGrid from './components/products/ProductGrid'
import SocialProofStrip from './components/reviews/SocialProofStrip'
import ReviewsSection from './components/reviews/ReviewsSection'
import InquiryForm from './components/contact/InquiryForm'
import LoyaltySection from './components/layout/LoyaltySection'
import Footer from './components/layout/Footer'
import ChatWidget from './components/chat/ChatWidget'
import CartDrawer from './components/cart/CartDrawer'
import WishlistDrawer from './components/wishlist/WishlistDrawer'
import PurchaseNotification from './components/reviews/PurchaseNotification'
import ScrollOnLoad from './components/ScrollOnLoad'
import CheckoutPage from './components/checkout/CheckoutPage'

function HomePage() {
  const { checkoutOpen } = useCart()
  return (
    <>
      <div className="relative z-10">
        <Navbar />
        <ScrollOnLoad />
        <Hero />
        <BrandStory />
        <SectionDivider />
        <ProductGrid />
        <SectionDivider />
        <SocialProofStrip />
        <SectionDivider />
        <ReviewsSection />
        <SectionDivider />
        <InquiryForm />
        <SectionDivider />
        <LoyaltySection />
        <Footer />
        <ChatWidget />
      </div>
      <CartDrawer />
      <WishlistDrawer />
      <PurchaseNotification />
      <div className={`fixed inset-0 ${checkoutOpen ? 'z-50' : '-z-10'}`}>
        <CheckoutPage />
      </div>
    </>
  )
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
      <NavigationProvider>
      <LenisProvider>
        <div className="relative">
          <MeshBackground />
          <HomePage />
        </div>
      </LenisProvider>
      </NavigationProvider>
      </WishlistProvider>
    </CartProvider>
  )
}
