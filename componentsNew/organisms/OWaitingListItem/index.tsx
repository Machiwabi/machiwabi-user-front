import { Flex } from '@mantine/core'
import { FC } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { OUserIconWithStatuses } from '../OUserIconWithStatuses'
import { OUserWaitingStatuses } from '../OUserWaitingStatuses'

type Props = {
  waiting: WaitingEntity
}

const Component: FC<Props> = ({ waiting }) => {
  return (
    <Flex justify="space-between" align="center">
      <OUserIconWithStatuses
        displayName={waiting.user.displayName || 'guest'}
        waitingDuration={waiting.waitingDuration}
        iconImageUrl={waiting.user.iconImageUrl || ''}
      />
      <OUserWaitingStatuses
        totalPoints={waiting.totalPoint}
        secondPerTotalPoints={waiting.secondPerTotalPoint}
        secondsPerWaitingPoint={waiting.secondsPerWaitingPoint}
        isBoosting={false}
      />
    </Flex>
  )
}

export { Component as OWaitingListItem }
