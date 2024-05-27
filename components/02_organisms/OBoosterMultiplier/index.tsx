import { FC } from 'react'
import { BoosterEntity } from '../../../generated/graphql'
import { Box, Flex } from '@mantine/core'
import { msToMMDDSS } from '../../../utils/msToMMDDSS'

type Props = {
  booster: BoosterEntity
}

const Component: FC<Props> = ({ booster }) => {
  return (
    <>
      <Flex align="center">
        <Box fz={10} lh={1} fw={700}>
          {msToMMDDSS(booster.durationSeconds)}
        </Box>
        <Box ml={8} ff="outfit" fw={700}>
          +{booster.multiplier}pt{' '}
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
