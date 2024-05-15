import { ButtonProps } from '@mantine/core'
import { Sm } from './Sm'

export type EButtonProps = ButtonProps & {
  href?: string
  hrefOutbound?: boolean
  onClick?: () => void
}

export const EButton = { Sm }
