import { Box, Flex, Text } from '@mantine/core'
import { FC, ReactNode } from 'react'
import { colorScheme } from '../../../theme/colorScheme'

export type ERollTabProps = {
  name?: ReactNode
  isCurrent?: boolean
  action: () => void
}

const Component: FC<ERollTabProps> = ({ isCurrent = false, action, name }) => {
  const color = isCurrent
    ? colorScheme.scheme1.surface1.object.high
    : colorScheme.scheme1.surface1.object.inactive
  return (
    <>
      <Flex
        direction="column"
        justify="space-between"
        align="center"
        h={24}
        onClick={action}
        style={{ cursor: 'pointer' }}
      >
        <Text c={color} fz={12} fw={500} lh={1}>
          {name}
        </Text>
        {isCurrent && (
          <Box w={4} h={4} bg={color} style={{ borderRadius: 8 }} />
        )}
      </Flex>
    </>
  )
}

export { Component as ERollTab }
