import { Box, Flex, FlexProps, Text } from '@mantine/core'
import { FC } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { dateConverter } from '../../../utils/dateConverter'
import { OUserWaitingStatuses } from '../OUserWaitingStatuses'
import { OWaitingTotalCount } from '../OWaitingTotalCount'
import { WaitingService } from '../../../domains/services/waiting.service'

type Props = FlexProps & { waiting: WaitingEntity }

const Component: FC<Props> = ({ waiting, ...props }) => {
  const waitingService = new WaitingService(waiting)
  return (
    <Flex justify="space-between" {...props}>
      <Box>
        <Text lh={'100%'} fz={18} fw={900}>
          {waiting.event.name}
        </Text>
        <Text
          mt={8}
          lh={'100%'}
          fz={10}
          fw="black"
          c={colorScheme.scheme1.surface1.object.low}
        >
          {waiting.event.placeName}
        </Text>
      </Box>
      <Flex direction="column" align="end">
        <Flex align="end" mb={4}>
          <OWaitingTotalCount
            waiting={waiting}
            rollSpeed={0}
            initialRollAnimation={false}
          />
          <Text fz={10} ff="outfit" fw={900} ml={4} pb={3} lh={1}>
            pt
          </Text>
        </Flex>
        <Box mb={4}>
          <Text fz={10} ff="outfit" fw={700} lh={1}>
            {waitingService.earnableTotalPoint().toLocaleString()} pt /{' '}
            {waiting.secondsPerWaitingPoint} sec
          </Text>
        </Box>
      </Flex>
      {/* <Text
        miw="100px"
        lh={'100%'}
        fz={12}
        fw="black"
        ta="right"
        c={colorScheme.scheme1.surface1.object.low}
      >
        {dateConverter.yyyyMMddHHmmss(waiting.event.startAt)}
      </Text> */}
    </Flex>
  )
}

export { Component as OWaitingHeader }
