import { atom } from 'recoil'
import { MenuOpeningTypes } from '../../types/MenuOpeningType'

export const menuOpeningStatusStore = atom<MenuOpeningTypes>({
  key: 'menuOpeningStatusStore',
  default: null,
})
