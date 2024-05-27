import { FC } from 'react'
import { BoosterEntity, WaitingEntity } from '../../../generated/graphql'
import { Box, BoxProps } from '@mantine/core'
import { OMissionListItem } from '../OMissionListItem'

type Props = BoxProps & {
  waiting: WaitingEntity
  boosters: BoosterEntity[]
}

const Component: FC<Props> = ({ waiting, boosters, ...props }) => {
  return (
    <>
      <Box {...props}>
        {boosters.map((booster, index) => {
          return (
            <OMissionListItem
              waiting={waiting}
              booster={booster}
              isFirst={index === 0}
              isLast={boosters.length === index + 1}
            />
          )
        })}
      </Box>
    </>
  )
}

export { Component as OMissionList }
