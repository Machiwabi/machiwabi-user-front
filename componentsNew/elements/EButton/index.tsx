import { ButtonProps } from '@mantine/core'
import { Sm } from './Sm'
import { colorScheme } from '../../../theme/colorScheme'
import { Lg } from './Lg'

export type EButtonProps = ButtonProps & {
  href?: string
  hrefOutbound?: boolean
  onClick?: () => void
  type?: 'filled' | 'outline' | 'disabled'
}

export const EButton = { Sm, Lg }

export const generateButtonStyles = (
  type: 'filled' | 'outline' | 'disabled'
) => {
  let bg = ''
  let c = ''
  let borderColor = ''

  if (type === 'filled') {
    bg = colorScheme.scheme1.surface3.surface
    c = colorScheme.scheme1.surface3.object.high
    borderColor = colorScheme.scheme1.surface3.object.high
  } else if (type === 'disabled') {
    bg = colorScheme.scheme1.surface1.surface
    c = colorScheme.scheme1.surface1.object.inactive
    borderColor = colorScheme.scheme1.surface1.object.inactive
  } else {
    bg = colorScheme.scheme1.surface1.surface
    c = colorScheme.scheme1.surface1.object.high
    borderColor = colorScheme.scheme1.surface1.object.high
  }

  return {
    bg,
    c,
    borderColor,
  }
}
