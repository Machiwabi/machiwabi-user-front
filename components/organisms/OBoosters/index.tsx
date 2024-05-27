import { SimpleGrid, SimpleGridProps } from '@mantine/core'
import { FC } from 'react'
import { BoosterEntity } from '../../../generated/graphql'
import { OBoosterCellItem } from '../OBoosterCellItem'

type Props = SimpleGridProps & {
  boosters: BoosterEntity[]
}

const Component: FC<Props> = ({ boosters, ...props }) => {
  return (
    <>
      <SimpleGrid spacing={4} verticalSpacing={16} cols={6} {...props}>
        {boosters.map((booster) => {
          return (
            <>
              <OBoosterCellItem booster={booster} />
            </>
          )
        })}
      </SimpleGrid>
    </>
  )
}

export { Component as OBoosters }
