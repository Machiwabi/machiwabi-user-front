import { SimpleGrid, SimpleGridProps } from '@mantine/core'
import { FC } from 'react'
import {
  RewardEntity,
  WaitingEntity,
  WaitingRewardEntity,
} from '../../../generated/graphql'
import { OAquiredRewardCellItem } from '../OAquiredRewardCellItem'

type Props = SimpleGridProps & {
  waiting: WaitingEntity
  cellingRewards: RewardEntity[]
  aquiredWaitingRewards: WaitingRewardEntity[]
}

const Component: FC<Props> = ({
  waiting,
  cellingRewards,
  aquiredWaitingRewards,
  ...props
}) => {
  return (
    <>
      <SimpleGrid spacing={2} cols={3} {...props}>
        {cellingRewards.map((cellingReward) => {
          const matchedAquiredWaitingRewards = aquiredWaitingRewards.filter(
            (aquiredWaitingReward) => {
              return (
                aquiredWaitingReward.reward.uniqueKey ===
                cellingReward.uniqueKey
              )
            }
          )

          return (
            <>
              <OAquiredRewardCellItem
                waiting={waiting}
                reward={cellingReward}
                isAquired={matchedAquiredWaitingRewards.length > 0}
                count={matchedAquiredWaitingRewards.length}
              />
            </>
          )
        })}
      </SimpleGrid>
    </>
  )
}

export { Component as OAquiredRewardCells }
