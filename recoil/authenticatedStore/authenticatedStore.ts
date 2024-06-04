import { atom } from 'recoil'

export type AuthenticationStatus =
  | 'loading'
  | 'unauthenticated'
  | 'authenticated'

export const authenticatedStore = atom<AuthenticationStatus>({
  key: 'authenticatedStore',
  default: 'unauthenticated',
})
