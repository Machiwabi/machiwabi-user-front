import { ButtonProps } from '@mantine/core'
import { Sm } from './Sm'
import { colorScheme } from '../../../theme/colorScheme'
import { Lg } from './Lg'
import { Xs } from './Xs'

type surface = 'surface1' | 'surface2' | 'surface3' | 'accent1' | 'accent2'

export type EButtonProps = ButtonProps & {
  href?: string
  hrefOutbound?: boolean
  onClick?: () => void
  fillType?: 'filled' | 'outline' | 'disabled'
  surface?: surface
  type?: 'button' | 'submit' | 'reset'
}

export const EButton = { Xs, Sm, Lg }

export const generateButtonStyles = (
  fillType: 'filled' | 'outline' | 'disabled',
  surface: surface = 'surface1'
) => {
  let bg = ''
  let c = ''
  let borderColor = ''

  if (fillType === 'filled') {
    bg = colorScheme.scheme1[surface].surface
    c = colorScheme.scheme1[surface].object.high
    borderColor = colorScheme.scheme1[surface].surface
  } else if (fillType === 'disabled') {
    bg = colorScheme.scheme1[surface].surface
    c = colorScheme.scheme1[surface].object.inactive
    borderColor = colorScheme.scheme1[surface].object.inactive
  } else {
    bg = colorScheme.scheme1[surface].surface
    c = colorScheme.scheme1[surface].object.high
    borderColor = colorScheme.scheme1[surface].object.high
  }

  return {
    bg,
    c,
    borderColor,
  }
}
