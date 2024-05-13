import { Box, Flex, Text } from '@mantine/core'
import { FC } from 'react'
import { colorScheme } from '../../../theme/colorScheme'

type Props = {
  displayName: string
  waitingDuration: number
}

const Component: FC<Props> = ({ displayName, waitingDuration }) => {
  return (
    <Flex align="center">
      <Box
        w={56}
        h={56}
        style={{ borderRadius: 56 / 2 }}
        bg={colorScheme.scheme1.surface3.surface}
      />
      <Box ml={16}>
        <Text fz={16} ff="outfit" fw={700}>
          {displayName}
        </Text>
        <Text fz={10} ff="outfit" fw={700}>
          {waitingDuration}
        </Text>
      </Box>
    </Flex>
  )
}

export { Component as OUserIconWithStatuses }
