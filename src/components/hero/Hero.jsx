import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SkinQuiz from '../quiz/SkinQuiz'
import { useLenis } from '../../context/LenisContext'
import { useIsMobile } from '../../hooks/useIsMobile'

gsap.registerPlugin(ScrollTrigger)

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
}

export default function Hero() {
  const sectionRef = useRef(null)
  const orbsRef = useRef([])
  const [showQuiz, setShowQuiz] = useState(false)
  const lenis = useLenis()
  const isMobile = useIsMobile()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const triggers = []

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=50%',
      scrub: 0.5,
    })
    triggers.push(trigger)

    orbsRef.current.forEach((orb, i) => {
      if (!orb) return
      const t = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const speed = 0.1 + i * 0.03
          orb.style.transform = `translateY(${self.progress * 200 * speed}px)`
        },
      })
      triggers.push(t)
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ minHeight: '110vh' }}
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full px-6 py-12" style={{ paddingTop: '80px' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero-product.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="flex-1 w-full max-w-7xl mx-auto flex items-center justify-center relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 45%, rgba(183,110,121,0.08) 0%, transparent 60%)',
            }}
          />

          {[
            { i: 0, w: 500, h: 500, c: 'rgba(183,110,121,0.07)', t: '-10%', l: '-5%', anim: 'animate-float', delay: 0.2 },
            { i: 1, w: 600, h: 600, c: 'rgba(255,228,225,0.08)', t: '-15%', r: '-8%', anim: 'animate-float-slow', delay: 0.4 },
            { i: 2, w: 400, h: 400, c: 'rgba(230,224,240,0.08)', b: '-5%', l: '10%', anim: 'animate-float-reverse', delay: 0.6 },
            { i: 3, w: 450, h: 450, c: 'rgba(183,110,121,0.05)', b: '-8%', r: '5%', anim: 'animate-float', delay: 0.5 },
            { i: 4, w: 350, h: 350, c: 'rgba(245,230,211,0.1)', t: '20%', r: '25%', anim: 'animate-float-slow', delay: 0.7 },
          ].map((orb) => (
            <motion.div
              key={orb.i}
              ref={(el) => { orbsRef.current[orb.i] = el }}
              initial={isMobile ? false : { opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: isMobile ? 0 : 1.5, delay: isMobile ? 0 : orb.delay, ease: [0.25, 0.1, 0.25, 1] }}
              className={`absolute rounded-full pointer-events-none ${orb.anim}`}
              style={{
                width: orb.w,
                height: orb.h,
                background: `radial-gradient(circle, ${orb.c} 0%, transparent 70%)`,
                top: orb.t,
                bottom: orb.b,
                left: orb.l,
                right: orb.r,
              }}
            />
          ))}

          <div className="hidden lg:flex flex-col gap-6 z-20 shrink-0 self-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="glass rounded-2xl p-5 w-[260px]">
                <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/40 mb-3">The Product</p>
                <h3 className="font-serif text-xl font-bold text-charcoal">Radiance Renewal</h3>
                <p className="text-sm text-charcoal/60 mt-2 leading-relaxed">Concentrated brightening serum with 15% Vitamin C</p>
                <div className="mt-3 pt-3 border-t border-white/20">
                  <span className="text-xs font-medium text-rosegold">Serum · $49</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="glass rounded-2xl p-5 w-[260px]">
                <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/40 mb-3">Key Ingredients</p>
                <div className="flex flex-col gap-2">
                  {['Vitamin C', 'Ferulic Acid', 'Vitamin E'].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full" style={{ background: '#B76E79' }} />
                      <span className="text-sm text-charcoal/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={isMobile ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: isMobile ? 0 : 1.2, delay: isMobile ? 0 : 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-3xl aspect-square flex items-center justify-center relative z-10 shrink-0"
          >
            <img
              src="/images/hero-jar.png"
              alt="AURAE Radiance Renewal Cream"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <div className="hidden lg:flex flex-col gap-6 z-20 shrink-0 self-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="glass rounded-2xl p-5 w-[260px]">
                <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/40 mb-3">Clinical Results</p>
                <p className="font-serif text-3xl font-bold" style={{ color: '#B76E79' }}>34%</p>
                <p className="text-sm text-charcoal/60 leading-relaxed mt-2">improvement in skin luminosity after 8 weeks</p>
                <div className="mt-3 pt-3 border-t border-white/20">
                  <span className="text-xs text-charcoal/40">Clinical trial, n=42</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="glass rounded-2xl p-5 w-[260px]">
                <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/40 mb-3">Our Promise</p>
                <div className="flex flex-col gap-2">
                  {['Cruelty Free', 'Dermatologist Tested', 'Clean Formula'].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full" style={{ background: '#B76E79' }} />
                      <span className="text-sm text-charcoal/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute w-3 h-3 pointer-events-none hidden lg:block"
              style={{
                color: '#B76E79',
                fontSize: `${10 + i * 2}px`,
                top: `${15 + i * 12}%`,
                left: i % 2 === 0 ? '22%' : '75%',
                opacity: 0.2 + i * 0.04,
                animation: `float ${7 + i}s ease-in-out infinite`,
                animationDelay: `${i * 1.2}s`,
              }}
            >
              ✦
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0 : 1, delay: isMobile ? 0 : 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center shrink-0 mt-4"
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-charcoal">
            AURAE
          </h1>
          <p className="mt-1 text-sm md:text-base font-light text-charcoal/70 tracking-wide">
            Rituals of Radiance
          </p>
          <div className="flex flex-row items-center justify-center gap-3 mt-5">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { if (lenis) lenis.scrollTo('#products', { offset: -80, duration: 1.2 }) }}
              className="btn-primary w-48 text-center whitespace-nowrap"
            >
              Explore Products
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowQuiz(true)}
              className="w-48 text-center text-xs font-medium tracking-wider uppercase px-6 py-3 rounded-full glass text-charcoal/60 hover:text-rosegold hover:border-rosegold/40 transition-all duration-300"
            >
              Find My Ritual
            </motion.button>
          </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:hidden mt-6 w-full">
          <div className="glass rounded-2xl p-4">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-charcoal/40 mb-2">The Product</p>
            <h3 className="font-serif text-base font-bold text-charcoal">Radiance Renewal</h3>
            <p className="text-xs text-charcoal/60 mt-1 leading-relaxed">Concentrated brightening serum with 15% Vitamin C</p>
            <div className="mt-2 pt-2 border-t border-white/20">
              <span className="text-[11px] font-medium text-rosegold">Serum · $49</span>
            </div>
          </div>
          <div className="glass rounded-2xl p-4">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-charcoal/40 mb-2">Key Ingredients</p>
            <div className="flex flex-col gap-1.5">
              {['Vitamin C', 'Ferulic Acid', 'Vitamin E'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#B76E79' }} />
                  <span className="text-xs text-charcoal/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl p-4">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-charcoal/40 mb-2">Clinical Results</p>
            <p className="font-serif text-2xl font-bold" style={{ color: '#B76E79' }}>34%</p>
            <p className="text-xs text-charcoal/60 leading-relaxed mt-1">improvement in skin luminosity after 8 weeks</p>
            <div className="mt-2 pt-2 border-t border-white/20">
              <span className="text-[10px] text-charcoal/40">Clinical trial, n=42</span>
            </div>
          </div>
          <div className="glass rounded-2xl p-4">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-charcoal/40 mb-2">Our Promise</p>
            <div className="flex flex-col gap-1.5">
              {['Cruelty Free', 'Dermatologist Tested', 'Clean Formula'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#B76E79' }} />
                  <span className="text-xs text-charcoal/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <SkinQuiz isOpen={showQuiz} onClose={() => setShowQuiz(false)} />

    </section>
  )
}
