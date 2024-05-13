import { Text } from '@mantine/core'
import { FC } from 'react'
import { HeadingBaseProps } from './base'

const Component: FC<HeadingBaseProps> = ({ children, ...props }) => {
  return (
    <Text component="h3" fz={16} lh={1.5} fw={700} ff="outfit" {...props}>
      {children}
    </Text>
  )
}

export { Component as SectionHeading }
