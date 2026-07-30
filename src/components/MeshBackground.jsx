import { useEffect, useRef } from 'react'

const COLORS = ['#FFE4E1', '#F5E6D3', '#E6E0F0']

export default function MeshBackground({ active = true }) {
  const canvasRef = useRef(null)
  const activeRef = useRef(active)
  const pausedRef = useRef(false)
  const rafRef = useRef(0)
  const drawRef = useRef(null)

  useEffect(() => {
    activeRef.current = active
    if (active) {
      pausedRef.current = false
      if (drawRef.current && !rafRef.current) {
        drawRef.current()
      }
    } else {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      const canvas = canvasRef.current
      if (canvas) {
        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [active])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let isVisible = true
    let pauseTimer

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onScroll = () => {
      if (pausedRef.current && activeRef.current) {
        pausedRef.current = false
        if (!rafRef.current) draw()
      }
      clearTimeout(pauseTimer)
      pauseTimer = setTimeout(() => {
        pausedRef.current = true
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }, 2000)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    pauseTimer = setTimeout(() => { pausedRef.current = true }, 2000)

    const onVisibility = () => {
      isVisible = !document.hidden
      if (isVisible && !rafRef.current && activeRef.current) draw()
      else if (!isVisible && rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const depths = [0.03, 0.06, 0.02, 0.08, 0.04]

    const blobs = [
      { x: 0.2, y: 0.15, rx: 280, ry: 240, color: COLORS[0], vx: 0.0006, vy: 0.0004 },
      { x: 0.7, y: 0.5, rx: 240, ry: 280, color: COLORS[1], vx: -0.0004, vy: 0.0005 },
      { x: 0.4, y: 0.8, rx: 260, ry: 220, color: COLORS[2], vx: 0.0005, vy: -0.0006 },
      { x: 0.8, y: 0.2, rx: 200, ry: 200, color: COLORS[0], vx: -0.0003, vy: -0.0004 },
      { x: 0.1, y: 0.6, rx: 220, ry: 260, color: COLORS[2], vx: 0.0004, vy: -0.0003 },
    ]

    const draw = () => {
      if (!activeRef.current || pausedRef.current || !isVisible) {
        rafRef.current = 0
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const scroll = window.scrollY

      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i]
        b.x += b.vx
        b.y += b.vy

        if (b.x < -0.1 || b.x > 1.1) b.vx *= -1
        if (b.y < -0.1 || b.y > 1.1) b.vy *= -1

        const cx = canvas.width * b.x
        const cy = canvas.height * b.y + scroll * depths[i]

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(b.rx, b.ry) * 0.85)
        gradient.addColorStop(0, b.color)
        gradient.addColorStop(0.5, b.color + '99')
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.ellipse(cx, cy, b.rx, b.ry, 0, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    drawRef.current = draw

    if (activeRef.current) draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(pauseTimer)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
