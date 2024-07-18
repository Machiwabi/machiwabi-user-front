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

  const isIos = useCallback(() => {
    return ua.model === 'iPhone' || ua.model === 'iPad'
  }, [])

  const isAndroid = useCallback(() => {
    return ua.model === 'Android'
  }, [])

  const isPwaInstallable = () => {
    return isMobile() && !isPwa()
  }

  return { isMobile, isPwa, isIos, isAndroid, isPwaInstallable }
}
