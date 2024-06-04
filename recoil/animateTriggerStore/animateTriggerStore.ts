import { atom } from 'recoil'

export const animateTriggerStore = atom<boolean>({
  key: 'animateTriggerStore',
  default: true,
})
