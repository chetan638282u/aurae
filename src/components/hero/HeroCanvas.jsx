import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import ProductModel from './ProductModel'
import StudioLighting from './StudioLighting'
import { useDeviceTier } from '../../hooks/useDeviceTier'

export default function HeroCanvas({ scrollProgress, containerRef }) {
  const tier = useDeviceTier()
  const canvasRef = useRef(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    if (!containerRef?.current) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [containerRef])

  if (tier === 'low') {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-64 h-64 rounded-full glass-strong flex items-center justify-center">
          <span className="font-serif text-5xl" style={{ color: '#B76E79' }}>A</span>
        </div>
      </div>
    )
  }

  return (
    <Canvas
      ref={canvasRef}
      camera={{ position: [0, 0.5, 4.5], fov: 40 }}
      dpr={[1, 1.5]}
      frameloop={inView ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <StudioLighting />
      <ProductModel scrollProgress={scrollProgress} tier={tier} />
      <Environment preset="studio" />
    </Canvas>
  )
}
