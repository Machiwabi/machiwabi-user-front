import { ComponentProps } from 'react'

export type AssetsIconProps = ComponentProps<'div'> & {
  fillColor: string
  width?: string | number
  height?: string | number
}
