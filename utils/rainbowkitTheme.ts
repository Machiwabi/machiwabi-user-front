import { Theme, lightTheme } from '@rainbow-me/rainbowkit'
import { merge } from 'lodash'

export const rainbowkitCustomTheme: Theme = merge(lightTheme(), {
  colors: {
    accentColor: '#000000',
    connectButtonBackground: '...',
  },
  radii: {
    connectButton: '20px',
  },
  shadows: {
    connectButton: '',
  },
} as Theme)
