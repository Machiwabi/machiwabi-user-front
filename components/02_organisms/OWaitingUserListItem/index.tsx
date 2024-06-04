import { Flex } from '@mantine/core'
import { FC } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { OUserIconWithStatuses } from '../OUserIconWithStatuses'
import { OUserWaitingStatuses } from '../OUserWaitingStatuses'

type Props = {
  waiting: WaitingEntity
  rank?: number
}

const Component: FC<Props> = ({ waiting, rank }) => {
  return (
    <Flex align="center">
      {rank && (
        <Flex
          w={24}
          h={24}
          mr={24}
          fz={14}
          fw={900}
          ff="outfit"
          bg={
            rank < 4
              ? colorScheme.scheme1.surface3.surface
              : colorScheme.scheme1.surface1.surface
          }
          c={
            rank < 4
              ? colorScheme.scheme1.surface3.object.high
              : colorScheme.scheme1.surface1.object.high
          }
          justify="center"
          align="center"
          style={{ borderRadius: 12 }}
        >
          {rank}
        </Flex>
      )}
      <Flex flex={1} justify="space-between" align="center">
        <OUserIconWithStatuses waiting={waiting} />
        <OUserWaitingStatuses waiting={waiting} />
      </Flex>
    </Flex>
  )
}

export { Component as OWaitingUserListItem }
