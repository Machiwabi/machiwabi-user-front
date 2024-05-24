import { Box, Flex, FlexProps, Text } from '@mantine/core'
import { FC } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'

type Props = FlexProps & { waiting: WaitingEntity }

const Component: FC<Props> = ({ waiting, ...props }) => {
  return (
    <Flex justify="space-between" {...props}>
      <Box>
        <Text lh={'100%'} fz={14} fw={900}>
          {waiting.event.name}
        </Text>
        <Text
          mt={6}
          lh={'100%'}
          fz={10}
          fw="black"
          c={colorScheme.scheme1.surface1.object.low}
        >
          {waiting.event.placeName}
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
        {waiting.event.startAt}
      </Text>
    </Flex>
  )
}

export { Component as OWaitingHeader }
