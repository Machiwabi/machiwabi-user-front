import { FC } from 'react'
import { RewardEntity, WaitingEntity } from '../../../generated/graphql'
import { ORewardCellItem } from '../ORewardCellItem'
import { SimpleGrid, SimpleGridProps } from '@mantine/core'

type Props = SimpleGridProps & {
  waiting: WaitingEntity
  rewards: RewardEntity[]
  grantedRewardUniqueKey?: string
}

const Component: FC<Props> = ({
  waiting,
  rewards,
  grantedRewardUniqueKey,
  ...props
}) => {
  return (
    <>
      <SimpleGrid verticalSpacing="xl" cols={2} {...props}>
        {rewards.map((reward) => {
          const isNowGranted = reward.uniqueKey === grantedRewardUniqueKey
          return (
            <>
              <ORewardCellItem
                waiting={waiting}
                reward={reward}
                isNowGranted={isNowGranted}
              />
            </>
          )
        })}
      </SimpleGrid>
    </>
  )
}

export { Component as ORewardCells }
