import { useEffect, useRef } from 'react'
import { useLenis } from '../context/LenisContext'

export default function ScrollOnLoad() {
  const lenis = useLenis()
  const restored = useRef(false)

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    const saved = sessionStorage.getItem('scrollPos')
    if (saved !== null) {
      restored.current = true
      const y = parseInt(saved, 10)
      window.scrollTo(0, y)
      setTimeout(() => window.scrollTo(0, y), 350)
      sessionStorage.removeItem('scrollPos')
    }
  }, [])

  useEffect(() => {
    let timer
    const save = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        sessionStorage.setItem('scrollPos', window.scrollY)
      }, 150)
    }
    window.addEventListener('scroll', save, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', save)
    }
  }, [])

  useEffect(() => {
    if (!lenis) return
    if (restored.current) return
    const hash = window.location.hash
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const timer = setTimeout(() => {
      lenis.scrollTo(hash, { offset: -80, duration: 1.5 })
    }, 400)
    return () => clearTimeout(timer)
  }, [lenis])

  return null
}
