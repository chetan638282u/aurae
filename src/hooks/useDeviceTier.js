import { useState, useEffect } from 'react'

export function useDeviceTier() {
  const [tier, setTier] = useState('high')

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
      const hasMemory = navigator.deviceMemory && navigator.deviceMemory <= 4
      const isLowPerformance = isMobile || isLowPower || hasMemory

      setTier(isLowPerformance ? 'low' : 'high')
    }

    checkDevice()
  }, [])

  return tier
}
