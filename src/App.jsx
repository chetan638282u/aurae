import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { NavigationProvider } from './context/NavigationContext'
import { RouterProvider } from './context/Router'
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
import CheckoutPage from './components/checkout/CheckoutPage'
import PurchaseNotification from './components/reviews/PurchaseNotification'
import ScrollOnLoad from './components/ScrollOnLoad'

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <WishlistProvider>
      <NavigationProvider>
      <LenisProvider>
        <div className="relative min-h-[100vh]">
          <MeshBackground />
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
          <CheckoutPage />
          <PurchaseNotification />
        </div>
      </LenisProvider>
      </NavigationProvider>
        </WishlistProvider>
      </CartProvider>
    </RouterProvider>
  )
}
