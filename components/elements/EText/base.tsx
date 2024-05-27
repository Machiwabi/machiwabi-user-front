import { TextProps } from '@mantine/core'
import { ReactNode } from 'react'
import { Desc1 } from './Desc1'
import { Desc2 } from './Desc2'

export type HeadingBaseProps = TextProps & {
  children?: ReactNode
}

export const EText = { Desc1, Desc2 }
