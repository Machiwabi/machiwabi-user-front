import { Box, Flex } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { BoosterEntity } from '../../../generated/graphql'

type Props = {
  secondPerTotalPoints: number
  secondsPerWaitingPoint: number
  boosters: BoosterEntity[]
}

const Component: FC<Props> = ({
  secondPerTotalPoints,
  secondsPerWaitingPoint,
  boosters,
}) => {
  return (
    <Flex justify="space-between" align="center">
      <Box fz={10} ff="outfit" fw="bold">
        boosters
      </Box>
      <Flex align="center">
        <Box mr={8} fz={10} ff="outfit" fw="bold">
          +{secondPerTotalPoints}/{secondsPerWaitingPoint}sec
        </Box>
        <Flex>
          {boosters.map((booster) => (
            <Box key={booster.uniqueKey}>
              <Image
                src={
                  booster.iconUrl ||
                  '/assets/images/_sample/picture_ranking_01.png'
                }
                width={18}
                height={18}
                alt={'aaa'}
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export { Component as OBoostersStatuses }
