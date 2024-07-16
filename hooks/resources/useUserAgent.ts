import { UAParser } from 'ua-parser-js'
import { useMemo, useCallback } from 'react'

export const useUserAgent = () => {
  const ua = useMemo(() => new UAParser().getDevice(), [])

  const isMobile = useCallback(() => {
    return ua.type === 'mobile'
  }, [ua])

  const isPwa = useCallback(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(display-mode: standalone)').matches
  }, [])

  return { isMobile, isPwa }
}
