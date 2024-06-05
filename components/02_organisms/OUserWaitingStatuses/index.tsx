import { Box, Flex, Text } from '@mantine/core'
import { FC, useEffect, useState } from 'react'
import { WaitingService } from '../../../domains/services/waiting.service'
import { WaitingEntity } from '../../../generated/graphql'
import { useAnimateTriggerStore } from '../../../recoil/animateTriggerStore/useAnimateTriggerStore'
import { colorScheme } from '../../../theme/colorScheme'
import { ELabel } from '../../01_elements/ELabel/ELabel'

type Props = {
  waiting: WaitingEntity
}

const Component: FC<Props> = ({ waiting }) => {
  const waitingService = new WaitingService(waiting)
  const { trigger } = useAnimateTriggerStore()
  const [totalPoint, setTotalPoint] = useState<number>(waiting.totalPoint)

  useEffect(() => {
    if (trigger) {
      const totalPoint = waitingService.totalPoint()
      setTotalPoint(totalPoint)
    }
  }, [trigger])

  return (
    <Flex direction="column" align="end">
      <Flex align="end" mb={4}>
        <Text fz={20} ff="outfit" fw={700} lh={1}>
          {totalPoint.toLocaleString()}
        </Text>
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
      <Box>
        {waitingService.isBoosting() ? (
          <ELabel
            label="Boosting"
            c={colorScheme.scheme1.surface1.surface}
            bg={colorScheme.scheme1.notice.alert}
          />
        ) : (
          <ELabel
            px={0}
            label="No boosts"
            c={colorScheme.scheme1.surface1.object.inactive}
          />
        )}
      </Box>
    </Flex>
  )
}

export { Component as OUserWaitingStatuses }
