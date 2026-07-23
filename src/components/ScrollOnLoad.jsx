import { useEffect } from 'react'
import { useLenis } from '../context/LenisContext'

export default function ScrollOnLoad() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    const hash = window.location.hash
    if (!hash) return
    const timer = setTimeout(() => {
      lenis.scrollTo(hash, { offset: -80, duration: 1.5 })
    }, 400)
    return () => clearTimeout(timer)
  }, [lenis])

  return null
}
