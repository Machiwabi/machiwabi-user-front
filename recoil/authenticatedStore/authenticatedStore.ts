import { AuthenticationStatus } from '@rainbow-me/rainbowkit'
import { atom } from 'recoil'

export const authenticatedStore = atom<AuthenticationStatus>({
  key: 'authenticatedStore',
  default: 'unauthenticated',
})
