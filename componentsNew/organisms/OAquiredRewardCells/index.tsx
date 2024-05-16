import { SimpleGrid, SimpleGridProps } from '@mantine/core'
import { FC } from 'react'
import { RewardEntity, WaitingRewardEntity } from '../../../generated/graphql'
import { OAquiredRewardCellItem } from '../OAquiredRewardCellItem'

type Props = SimpleGridProps & {
  cellingRewards: RewardEntity[]
  aquiredWaitingRewards: WaitingRewardEntity[]
}

const Component: FC<Props> = ({
  cellingRewards,
  aquiredWaitingRewards,
  ...props
}) => {
  return (
    <>
      <SimpleGrid spacing={2} cols={6} {...props}>
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
