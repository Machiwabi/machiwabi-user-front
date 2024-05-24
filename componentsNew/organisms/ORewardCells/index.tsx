import { FC } from 'react'
import { RewardEntity, WaitingEntity } from '../../../generated/graphql'
import { ORewardCellItem } from '../ORewardCellItem'
import { SimpleGrid, SimpleGridProps } from '@mantine/core'

type Props = SimpleGridProps & {
  waiting: WaitingEntity
  rewards: RewardEntity[]
}

const Component: FC<Props> = ({ waiting, rewards, ...props }) => {
  return (
    <>
      <SimpleGrid verticalSpacing="xl" cols={2} {...props}>
        {rewards.map((reward) => {
          return (
            <>
              <ORewardCellItem waiting={waiting} reward={reward} />
            </>
          )
        })}
      </SimpleGrid>
    </>
  )
}

export { Component as ORewardCells }
