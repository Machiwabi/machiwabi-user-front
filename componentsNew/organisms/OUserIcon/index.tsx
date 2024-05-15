import { Box, BoxProps } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { colorScheme } from '../../../theme/colorScheme'

type Props = BoxProps & {
  iconImageUrl: string
  w?: number
  h?: number
  displayName?: string
}

const Component: FC<Props> = ({
  iconImageUrl,
  w = 24,
  h = 24,
  displayName,
  ...props
}) => {
  return (
    <Box
      w={w}
      h={h}
      style={{ borderRadius: w, overflow: 'hidden' }}
      bg={colorScheme.scheme1.surface2.surface}
      {...props}
    >
      <Image
        src={iconImageUrl}
        alt={displayName || 'icon'}
        width={w}
        height={h}
      />
    </Box>
  )
}

export { Component as OUserIcon }
