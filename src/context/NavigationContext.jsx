import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

const NavigationContext = createContext()

export function NavigationProvider({ children }) {
  const [activeHash, setActiveHash] = useState(() => window.location.hash.replace('#', ''))
  const [detailProduct, setDetailProduct] = useState(null)
  const detailRef = useRef(false)

  useEffect(() => {
    const onHashChange = () => {
      setActiveHash(window.location.hash.replace('#', ''))
    }
    const onPopState = () => {
      if (detailRef.current) {
        detailRef.current = false
        setDetailProduct(null)
      }
    }
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

  const openProductDetail = useCallback((product) => {
    history.pushState({ detail: product.id }, '')
    detailRef.current = true
    setDetailProduct(product)
  }, [])

  const closeProductDetail = useCallback(() => {
    if (detailRef.current) {
      history.back()
    } else {
      setDetailProduct(null)
    }
  }, [])

  const navigateTo = useCallback((hash) => {
    if (window.location.hash !== '#' + hash) {
      window.location.hash = hash
    }
  }, [])

  const goToMain = useCallback(() => {
    if (window.location.hash) {
      history.pushState('', '', window.location.pathname)
      setActiveHash('')
    }
  }, [])

  return (
    <NavigationContext.Provider
      value={{
        activeHash,
        detailProduct,
        openProductDetail,
        closeProductDetail,
        navigateTo,
        goToMain,
        isDetailOpen: !!detailProduct,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider')
  return ctx
}
