import { Text } from '@mantine/core'
import { FC } from 'react'
import { HeadingBaseProps } from './base'
import { colorScheme } from '../../../theme/colorScheme'

const Component: FC<HeadingBaseProps> = ({ children, ...props }) => {
  return (
    <Text
      fz={14}
      lh={1.5}
      fw={400}
      c={colorScheme.scheme1.surface1.object.mid}
      {...props}
    >
      {children}
    </Text>
  )
}

export { Component as Desc2 }
