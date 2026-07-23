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
    const lenis = new Lenis({
      duration: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.4,
      touchMultiplier: 1.8,
      syncTouch: true,
      syncTouchLerp: 0.08,
    })

    lenisRef.current = lenis
    setReady(true)

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.lagSmoothing(0)
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
