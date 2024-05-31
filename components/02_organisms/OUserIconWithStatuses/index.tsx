import { Box, Flex, Text } from '@mantine/core'
import { FC } from 'react'
import { colorScheme } from '../../../theme/colorScheme'
import Image from 'next/image'
import { dateConverter } from '../../../utils/dateConverter'

type Props = {
  displayName: string
  waitingDuration: number
  iconImageUrl: string
}

const Component: FC<Props> = ({
  displayName,
  waitingDuration,
  iconImageUrl,
}) => {
  return (
    <Flex align="center">
      <Box
        w={56}
        h={56}
        style={{ borderRadius: 56 / 2, overflow: 'hidden' }}
        bg={colorScheme.scheme1.surface2.surface}
      >
        <Image src={iconImageUrl} alt="icon" width={56} height={56} />
      </Box>
      <Box ml={16}>
        <Text fz={16} ff="outfit" fw={700}>
          {displayName}
        </Text>
        <Text fz={10} ff="outfit" fw={700}>
          待ち時間：{dateConverter.msToMMDDSS(waitingDuration)}
        </Text>
      </Box>
    </Flex>
  )
}

export { Component as OUserIconWithStatuses }
