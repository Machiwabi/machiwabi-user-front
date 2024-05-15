import { Box, Flex, Text } from '@mantine/core'
import { FC, ReactNode } from 'react'
import { colorScheme } from '../../../theme/colorScheme'

type Props = { children?: ReactNode }

const Component: FC<Props> = ({ children }) => {
  return (
    <>
      <Flex justify="space-between">
        <Box>
          <Text lh={'100%'} fz={14} fw={900}>
            各個人のマチワビルームです。
          </Text>
          <Text
            mt={6}
            lh={'100%'}
            fz={10}
            fw="black"
            c={colorScheme.scheme1.surface1.object.low}
          >
            WaitWaitWaitWaitWait
          </Text>
        </Box>
        <Text
          miw="100px"
          lh={'100%'}
          fz={12}
          fw="black"
          ta="right"
          c={colorScheme.scheme1.surface1.object.low}
        >
          2024-06-23 12:30
        </Text>
      </Flex>
    </>
  )
}

export { Component as OWaitingHeader }
