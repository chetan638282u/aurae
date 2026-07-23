import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function createJarTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  const baseGrad = ctx.createLinearGradient(0, 0, 1024, 0)
  baseGrad.addColorStop(0, '#F5EDE3')
  baseGrad.addColorStop(0.25, '#F1E7DA')
  baseGrad.addColorStop(0.5, '#EEE2D2')
  baseGrad.addColorStop(0.75, '#F1E7DA')
  baseGrad.addColorStop(1, '#F5EDE3')
  ctx.fillStyle = baseGrad
  ctx.fillRect(0, 0, 1024, 1024)

  for (let i = 0; i < 36; i++) {
    const x = (i / 36) * 1024
    ctx.fillStyle = 'rgba(183, 110, 121, 0.018)'
    ctx.fillRect(x, 0, 1.5, 1024)
  }

  ctx.fillStyle = 'rgba(183, 110, 121, 0.08)'
  ctx.fillRect(120, 55, 784, 1.5)
  ctx.fillRect(120, 965, 784, 1.5)

  ctx.fillStyle = 'rgba(183, 110, 121, 0.04)'
  ctx.fillRect(200, 80, 624, 1)
  ctx.fillRect(200, 940, 624, 1)

  ctx.fillStyle = '#B76E79'
  ctx.font = 'bold 16px "Playfair Display", Georgia, serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('AURAE', 512, 105)

  ctx.fillStyle = 'rgba(183, 110, 121, 0.25)'
  ctx.fillRect(430, 122, 164, 0.5)

  const stickerCX = 512
  const stickerCY = 290
  const stickerRX = 155
  const stickerRY = 120

  ctx.save()
  ctx.shadowColor = 'rgba(0, 0, 0, 0.06)'
  ctx.shadowBlur = 10
  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 3
  ctx.beginPath()
  ctx.ellipse(stickerCX, stickerCY, stickerRX, stickerRY, 0, 0, Math.PI * 2)
  ctx.fillStyle = '#FFFBF7'
  ctx.fill()
  ctx.restore()

  ctx.beginPath()
  ctx.ellipse(stickerCX, stickerCY, stickerRX, stickerRY, 0, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(183, 110, 121, 0.3)'
  ctx.lineWidth = 1.5
  ctx.stroke()

  ctx.beginPath()
  ctx.ellipse(stickerCX, stickerCY, stickerRX - 10, stickerRY - 10, 0, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(183, 110, 121, 0.08)'
  ctx.lineWidth = 0.5
  ctx.stroke()

  ctx.fillStyle = '#2D2A26'
  ctx.font = '600 22px "Playfair Display", Georgia, serif'
  ctx.fillText('Radiance', 512, 262)

  ctx.fillStyle = '#2D2A26'
  ctx.font = '600 22px "Playfair Display", Georgia, serif'
  ctx.fillText('Renewal Cream', 512, 292)

  ctx.fillStyle = 'rgba(45, 42, 38, 0.4)'
  ctx.font = '11px Inter, sans-serif'
  ctx.fillText('15% Vitamin C + Ferulic Acid', 512, 328)

  ctx.fillStyle = 'rgba(45, 42, 38, 0.2)'
  ctx.font = '10px Inter, sans-serif'
  ctx.fillText('50 ml · 1.7 fl oz', 512, 780)

  ctx.save()
  ctx.translate(512, 840)
  ctx.scale(0.7, 1)
  ctx.beginPath()
  ctx.arc(0, 0, 30, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(183, 110, 121, 0.08)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(183, 110, 121, 0.15)'
  ctx.lineWidth = 0.8
  ctx.stroke()
  ctx.fillStyle = 'rgba(183, 110, 121, 0.35)'
  ctx.font = '12px Inter, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('✦', 0, 1)
  ctx.restore()

  ctx.fillStyle = 'rgba(45, 42, 38, 0.04)'
  ctx.font = '8px Inter, sans-serif'
  ctx.fillText('AURAE COSMETICS · PARIS · LONDON · TOKYO', 512, 910)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function createCreamTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#F4C2C2'
  ctx.fillRect(0, 0, 256, 256)

  for (let i = 0; i < 35; i++) {
    const x = Math.random() * 256
    const y = Math.random() * 256
    const r = 6 + Math.random() * 22
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, `rgba(232, 155, 155, ${0.15 + Math.random() * 0.3})`)
    g.addColorStop(1, 'rgba(232, 155, 155, 0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  for (let i = 0; i < 18; i++) {
    const x = Math.random() * 256
    const y = Math.random() * 256
    const r = 4 + Math.random() * 14
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, `rgba(255, 230, 235, ${0.15 + Math.random() * 0.25})`)
    g.addColorStop(1, 'rgba(255, 230, 235, 0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 2)
  return texture
}

const jarBodyGeo = new THREE.CylinderGeometry(1.2, 0.92, 1.2, 48)
const lidGeo = new THREE.CylinderGeometry(1.28, 1.28, 0.22, 48)
const lidTopGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.04, 20)
const creamGeo = new THREE.CylinderGeometry(1.0, 0.82, 0.85, 48)
const rimGeo = new THREE.TorusGeometry(1.08, 0.06, 16, 48)

export default function ProductModel({ scrollProgress = 0, tier = 'high' }) {
  const jarRef = useRef(null)
  const lidRef = useRef(null)
  const creamRef = useRef(null)

  const jarTexture = useMemo(() => createJarTexture(), [])
  const creamTexture = useMemo(() => createCreamTexture(), [])

  useFrame(() => {
    if (!jarRef.current || !lidRef.current) return
    const p = scrollProgress

    const stage1 = Math.min(1, p / 0.3)
    const s1 = easeInOutCubic(stage1)
    const scale = 1 + s1 * 0.18
    const tilt = -s1 * 0.35

    jarRef.current.scale.setScalar(scale)
    jarRef.current.rotation.x = tilt
    jarRef.current.rotation.y = p * Math.PI * 2

    const stage2 = Math.max(0, Math.min(1, (p - 0.3) / 0.3))
    const s2 = easeInOutCubic(stage2)

    if (tier === 'low') {
      lidRef.current.position.y = 1.32 + s2 * 0.5
      lidRef.current.rotation.x = tilt - s2 * 0.15
    } else {
      lidRef.current.position.y = 1.32 + s2 * 2.0
      lidRef.current.position.x = s2 * 0.55
      lidRef.current.position.z = s2 * 0.25
      lidRef.current.rotation.set(tilt - s2 * 0.4, s2 * 0.15, s2 * 0.45)
    }

    const stage3 = Math.max(0, Math.min(1, (p - 0.6) / 0.4))
    const s3 = easeInOutCubic(stage3)

    if (creamRef.current) {
      creamRef.current.material.opacity = s3
      creamRef.current.scale.setScalar(0.001 + s3 * 0.999)
    }
  })

  return (
    <group position={[0, 0, 0]}>
      <group ref={jarRef}>
        <mesh geometry={jarBodyGeo} position={[0, 0.6, 0]} castShadow>
          <meshPhysicalMaterial
            map={jarTexture}
            roughness={0.3}
            metalness={0.05}
            clearcoat={0.18}
            clearcoatRoughness={0.3}
            envMapIntensity={0.7}
            sheen={0.2}
            sheenColor={new THREE.Color('#FFE4E1')}
            sheenRoughness={0.35}
          />
        </mesh>

        <mesh geometry={rimGeo} position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial
            color="#E8DED0"
            roughness={0.35}
            metalness={0.0}
            envMapIntensity={0.4}
          />
        </mesh>

        <mesh ref={creamRef} geometry={creamGeo} position={[0, 0.78, 0]}>
          <meshStandardMaterial
            color="#F4C2C2"
            roughness={0.85}
            metalness={0.0}
            map={creamTexture}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>

        <group ref={lidRef}>
          <mesh geometry={lidGeo} position={[0, 0, 0]} castShadow>
            <meshPhysicalMaterial
              color="#B76E79"
              roughness={0.22}
              metalness={0.7}
              clearcoat={0.6}
              clearcoatRoughness={0.15}
              envMapIntensity={1.8}
            />
          </mesh>
          <mesh geometry={lidTopGeo} position={[0, 0.13, 0]}>
            <meshPhysicalMaterial
              color="#C27E89"
              roughness={0.15}
              metalness={0.8}
              clearcoat={0.65}
              clearcoatRoughness={0.12}
              envMapIntensity={2.0}
            />
          </mesh>
        </group>
      </group>

      <ContactShadows
        position={[0, -0.12, 0]}
        opacity={0.4}
        scale={5}
        blur={2.8}
        far={1.2}
        resolution={256}
      />
    </group>
  )
}
