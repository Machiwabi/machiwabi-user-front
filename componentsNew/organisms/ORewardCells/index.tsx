import { FC } from 'react'
import { RewardEntity } from '../../../generated/graphql'
import { ORewardCellItem } from '../ORewardCellItem'
import { SimpleGrid, SimpleGridProps } from '@mantine/core'

type Props = SimpleGridProps & {
  rewards: RewardEntity[]
}

const Component: FC<Props> = ({ rewards, ...props }) => {
  return (
    <>
      <SimpleGrid verticalSpacing="xl" cols={2} {...props}>
        {rewards.map((reward) => {
          return (
            <>
              <ORewardCellItem reward={reward} />
            </>
          )
        })}
      </SimpleGrid>
    </>
  )
}

export { Component as ORewardCells }
