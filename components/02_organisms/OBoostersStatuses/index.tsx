import { Box, Flex } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { WaitingBoosterEntity } from '../../../generated/graphql'

type Props = {
  secondPerTotalPoints: number
  secondsPerWaitingPoint: number
  waitingBoosters: WaitingBoosterEntity[]
}

const Component: FC<Props> = ({
  secondPerTotalPoints,
  secondsPerWaitingPoint,
  waitingBoosters,
}) => {
  return (
    <Flex justify="space-between" align="center">
      <Box fz={14} ff="outfit" fw="bold">
        BOOSTERS
      </Box>
      <Flex align="center">
        <Box mr={8} fz={14} ff="outfit" fw="bold">
          +{secondPerTotalPoints}/{secondsPerWaitingPoint}sec
        </Box>
        <Flex>
          {waitingBoosters.map((wb) => (
            <Box key={wb.booster.uniqueKey}>
              <Image
                src={
                  wb.booster.iconUrl ||
                  '/assets/images/picture/picture_fallback.png'
                }
                width={18}
                height={18}
                alt={'addable booster icon'}
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export { Component as OBoostersStatuses }
