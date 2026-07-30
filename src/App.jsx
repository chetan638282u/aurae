import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { RouterProvider, useRouter } from './context/Router'
import { NavigationProvider } from './context/NavigationContext'
import { LenisProvider } from './context/LenisContext'
import MeshBackground from './components/MeshBackground'
import { useIsMobile } from './hooks/useIsMobile'
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
import PurchaseNotification from './components/reviews/PurchaseNotification'
import ScrollOnLoad from './components/ScrollOnLoad'
import CartPage from './components/cart/CartPage'
import WishlistPage from './components/wishlist/WishlistPage'
import CheckoutPage from './components/checkout/CheckoutPage'

function HomePage() {
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
      <PurchaseNotification />
    </>
  )
}

function PageRouter() {
  const { path } = useRouter()
  const isMobile = useIsMobile()
  const showMesh = !isMobile || path === '/'

  return (
    <>
      {showMesh && <MeshBackground />}
      {path === '/cart' ? <CartPage /> :
       path === '/wishlist' ? <WishlistPage /> :
       path === '/checkout' ? <CheckoutPage /> :
       <HomePage />}
    </>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <WishlistProvider>
        <NavigationProvider>
        <LenisProvider>
          <div className="relative">
            <PageRouter />
          </div>
        </LenisProvider>
        </NavigationProvider>
        </WishlistProvider>
      </CartProvider>
    </RouterProvider>
  )
}
