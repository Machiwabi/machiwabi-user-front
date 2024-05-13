import { Text } from '@mantine/core'
import { FC } from 'react'
import { HeadingBaseProps } from './base'

const Component: FC<HeadingBaseProps> = ({ children, ...props }) => {
  return (
    <Text fz={16} lh={1.5} fw={900} {...props}>
      {children}
    </Text>
  )
}

export { Component as PageHeading }
