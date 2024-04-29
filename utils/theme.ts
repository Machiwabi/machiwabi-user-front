import { extendTheme, theme as defaultTheme } from '@chakra-ui/react'

export const templateTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#FFFFFF',
        color: '#2F3747',
      },
    },
    '@media (min-height: 800px)': {
      '@media (min-width: 992px)': {
        '.footer-position': {
          position: 'absolute',
        },
      },
      '@media (max-width: 992px)': {
        '.footer-position': {
          position: 'relative',
        },
      },
    },
    '@media (max-height: 800px)': {
      '.footer-position': {
        position: 'relative',
      },
    },
  },
  textStyles: {
    logo: {
      fontSize: { base: '18px', md: '24px' },
      fontWeight: 'bold',
      lineHeight: '100%',
      letterSpacing: '',
    },
  },
  fonts: {
    heading: `'Noto Sans JP', 'system-ui'`,
    body: `'Noto Sans JP', 'system-ui'`,
  },
  sizes: {
    ...defaultTheme.sizes,
    '9xl': '105rem', // 1680px
    '10xl': '120rem', // 1920px
  },
  space: {
    ...defaultTheme.space,
  },
  breakpoints: {
    sm: '30rem', // 480px
    md: '48rem', // 768px
    lg: '62rem', // 992px
    '2lg': '75rem', // 1152px
    xl: '80rem', // 1280px
    '2xl': '93rem', // 1440px + (24 * 2)px
    '3xl': '96rem', // 1536px
    '4xl': '108rem', // 1680px + (24 * 2)px
  },
  colors: {
    ...defaultTheme.colors,
    project: {
      surface1: {
        surface: '#FFFFFF',
        object: {
          high: '#191C1B',
          mid: '#2F3747',
          low: '#3F4945',
          xlow: '#D2A13A',
          diable: '#6F7975',
        },
        accent: {
          accent1: '#007AFF',
        },
      },
      surface2: {
        surface: '#F8FBFB',
        object: {
          high: '#191C1B',
          mid: '#755B00',
          disable: 'rgba(117,91,0,0.6)',
        },
        accent: {
          accent1: '#004B3E',
          accent2: '#3BA55B',
          accent3: '#755B00',
        },
      },
      surface3: {
        surface: '#000000',
        object: {
          high: '#ffffff',
        },
      },
      accentSurface1: {
        surface: '#007AFF',
        object: {
          high: '#FFFFFF',
        },
      },
      border: {
        border1: 'rgba(0,0,0,0.1)',
      },
      skeleton1: 'rgba(238,217,137,0.08)', // 読み込んでいる時のスケルトンのカラー（主要）
      skeleton2: 'rgba(238,217,137,0.05)', // 読み込んでいる時のスケルトンのカラー（サブ）
    },
    external: {
      line: {
        default: 'rgba(6,199,85,1)',
        hover: 'rgba(6,199,85,0.2)',
      },
      twitter: {
        default: 'rgba(29,161,242,1)',
        hover: 'rgba(29,161,242,0.2)',
      },
      opensea: {
        default: 'rgba(32,129,226,1)',
        hover: 'rgba(32,129,226,0.2)',
      },
      discord: {
        default: 'rgba(114,137,218,1)',
        hover: 'rgba(114,137,218,0.2)',
      },
    },
  },
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          borderColor: 'project.surface1.accent.accent3',
          iconColor: 'project.surface1.surface',
          _checked: {
            bg: 'project.surface1.accent.accent1',
            borderColor: 'project.surface1.accent.accent1',
            iconColor: 'project.surface1.surface',
          },
          _hover: {
            bg: 'project.surface1.accent.accent1',
            borderColor: 'project.surface1.accent.accent1',
            iconColor: 'project.surface1.surface',
          },
        },
      },
    },
  },
})

export const theme = { templateTheme }
