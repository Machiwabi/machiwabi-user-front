import { useRecoilState } from 'recoil'
import { menuOpeningStatusStore } from './menuOpeningStatusStore'

export const useMenuOpeningStatus = () => {
  const [isMenuOpening, setIsMenuOpening] = useRecoilState(
    menuOpeningStatusStore
  )

  const menuOpenGlobalMenuStart = () => {
    setIsMenuOpening('globalMenu')
  }

  const menuOpenGlobalMenuEnd = () => {
    setIsMenuOpening(null)
  }

  const menuOpenHomeStart = () => {
    setIsMenuOpening('home')
  }

  const menuOpenHomeEnd = () => {
    setIsMenuOpening(null)
  }

  return {
    isMenuOpening,
    menuOpenGlobalMenuStart,
    menuOpenGlobalMenuEnd,
    menuOpenHomeStart,
    menuOpenHomeEnd,
  }
}
