import { SimpleGrid, SimpleGridProps } from '@mantine/core'
import { FC } from 'react'
import { WaitingBoosterEntity } from '../../../generated/graphql'
import { OBoosterCellItem } from '../OBoosterCellItem'

type Props = SimpleGridProps & {
  waitingBoosters: WaitingBoosterEntity[]
  grantedWaitingBoosterUniqueKey?: string
}

const Component: FC<Props> = ({
  waitingBoosters,
  grantedWaitingBoosterUniqueKey,
  ...props
}) => {
  return (
    <>
      <SimpleGrid spacing={4} verticalSpacing={16} cols={6} {...props}>
        {waitingBoosters.map((waitingBooster) => {
          const isNowGranted =
            waitingBooster.uniqueKey === grantedWaitingBoosterUniqueKey
          return (
            <>
              <OBoosterCellItem
                waitingBooster={waitingBooster}
                isNowGranted={isNowGranted}
              />
            </>
          )
        })}
      </SimpleGrid>
    </>
  )
}

export { Component as OBoosters }
