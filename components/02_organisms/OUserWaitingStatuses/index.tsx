import { Box, Flex, Text } from '@mantine/core'
import { FC } from 'react'
import { colorScheme } from '../../../theme/colorScheme'
import { ELabel } from '../../01_elements/ELabel/ELabel'

type Props = {
  totalPoints: number
  secondPerTotalPoints: number
  secondsPerWaitingPoint: number
  isBoosting: boolean
}

const Component: FC<Props> = ({
  totalPoints,
  secondPerTotalPoints,
  secondsPerWaitingPoint,
  isBoosting,
}) => {
  return (
    <Flex direction="column" align="end">
      <Flex align="end" mb={4}>
        <Text fz={20} ff="outfit" fw={700} lh={1}>
          {totalPoints.toLocaleString()}
        </Text>
        <Text fz={10} ff="outfit" fw={900} ml={4} pb={3} lh={1}>
          pt
        </Text>
      </Flex>
      <Box mb={4}>
        <Text fz={10} ff="outfit" fw={700} lh={1}>
          {secondPerTotalPoints.toLocaleString()} pt /{' '}
          {secondsPerWaitingPoint.toLocaleString()} sec
        </Text>
      </Box>
      <Box>
        {isBoosting ? (
          <ELabel
            label="boosting"
            c={colorScheme.scheme1.surface1.surface}
            bg={colorScheme.scheme1.notice.alert}
          />
        ) : (
          <ELabel
            px={0}
            label="non boost"
            c={colorScheme.scheme1.surface1.object.inactive}
          />
        )}
      </Box>
    </Flex>
  )
}

export { Component as OUserWaitingStatuses }
