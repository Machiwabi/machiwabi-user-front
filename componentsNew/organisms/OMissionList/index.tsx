import { FC } from 'react'
import { BoosterEntity } from '../../../generated/graphql'
import { Box, BoxProps } from '@mantine/core'
import { OMissionListItem } from '../OMissionListItem'

type Props = BoxProps & {
  boosters: BoosterEntity[]
}

const Component: FC<Props> = ({ boosters, ...props }) => {
  return (
    <>
      <Box {...props}>
        {boosters.map((booster, index) => {
          return (
            <OMissionListItem
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
