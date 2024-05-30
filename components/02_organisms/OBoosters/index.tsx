import { SimpleGrid, SimpleGridProps } from '@mantine/core'
import { FC } from 'react'
import { BoosterEntity, WaitingBoosterEntity } from '../../../generated/graphql'
import { OBoosterCellItem } from '../OBoosterCellItem'

type Props = SimpleGridProps & {
  waitingBoosters: WaitingBoosterEntity[]
}

const Component: FC<Props> = ({ waitingBoosters, ...props }) => {
  return (
    <>
      <SimpleGrid spacing={4} verticalSpacing={16} cols={6} {...props}>
        {waitingBoosters.map((waitingBooster) => {
          return (
            <>
              <OBoosterCellItem waitingBooster={waitingBooster} />
            </>
          )
        })}
      </SimpleGrid>
    </>
  )
}

export { Component as OBoosters }
