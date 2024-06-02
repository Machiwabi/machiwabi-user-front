import { Box, Flex } from '@mantine/core'
import { FC } from 'react'
import { BoosterEntity } from '../../../generated/graphql'
import { dateConverter } from '../../../utils/dateConverter'

type Props = {
  booster: BoosterEntity
}

const Component: FC<Props> = ({ booster }) => {
  return (
    <>
      <Flex align="center">
        <Box fz={10} lh={1} fw={700}>
          {dateConverter.msToMMDDSS(booster.durationSeconds * 1000)}の間
        </Box>
        <Box ml={8} ff="outfit" fw={700}>
          +{booster.multiplier - 1}pt{' '}
        </Box>
        <Box px={4} ff="outfit" fw={700}>
          /
        </Box>
        <Box ff="outfit" fw={700}>
          10sec
        </Box>{' '}
      </Flex>
    </>
  )
}

export { Component as OBoosterMultiplier }
