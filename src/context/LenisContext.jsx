import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext(null)

export function LenisProvider({ children }) {
  const lenisRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      setReady(true)
      return
    }

    const lenis = new Lenis({
      duration: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: !isMobile,
      touchMultiplier: isMobile ? 0 : 1.2,
      syncTouchLerp: isMobile ? 0 : 0.15,
      autoResize: true,
    })

    lenisRef.current = lenis
    setReady(true)

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <LenisContext.Provider value={ready ? lenisRef.current : null}>
      {children}
    </LenisContext.Provider>
  )
}

export function useLenis() {
  return useContext(LenisContext)
}
