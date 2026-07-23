import { useState, useEffect, useCallback } from 'react'
import products, { categories } from '../../data/products'
import FilterBar from './FilterBar'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'
import { useNavigation } from '../../context/NavigationContext'

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get('category')
    return categories.includes(cat) ? cat : 'All'
  })
  const { detailProduct, openProductDetail, closeProductDetail } = useNavigation()

  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat)
    const params = new URLSearchParams(window.location.search)
    if (cat === 'All') {
      params.delete('category')
    } else {
      params.set('category', cat)
    }
    const newUrl = params.toString()
      ? window.location.pathname + '?' + params.toString()
      : window.location.pathname
    history.replaceState(null, '', newUrl)
  }, [])

  useEffect(() => {
    const onPop = () => {
      const params = new URLSearchParams(window.location.search)
      const cat = params.get('category')
      if (categories.includes(cat)) {
        setActiveCategory(cat)
      } else {
        setActiveCategory('All')
      }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory)

  return (
    <section id="products" className="relative z-10 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading">The Collection</h2>
          <p className="section-subheading mt-4">
            Twelve essential rituals. Each formula is a convergence of clinical science and botanical heritage.
          </p>
        </div>

        <FilterBar
          categories={categories}
          active={activeCategory}
          onSelect={handleCategoryChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onClick={openProductDetail}
            />
          ))}
        </div>
      </div>

      <ProductModal
        product={detailProduct}
        onClose={closeProductDetail}
      />
    </section>
  )
}
