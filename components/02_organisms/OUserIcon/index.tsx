import { Box, BoxProps } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { colorScheme } from '../../../theme/colorScheme'

type Props = BoxProps & {
  iconImageUrl: string
  w?: number
  h?: number
  displayName?: string
  isBoosting?: boolean
}

const Component: FC<Props> = ({
  iconImageUrl,
  w = 24,
  h = 24,
  displayName,
  isBoosting,
  ...props
}) => {
  return (
    <Box
      pos="relative"
      w={w}
      h={h}
      style={
        isBoosting
          ? {
              borderRadius: w,
              overflow: 'hidden',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: colorScheme.scheme1.accent2.surface,
            }
          : { borderRadius: w, overflow: 'hidden' }
      }
      bg={colorScheme.scheme1.surface2.surface}
      {...props}
    >
      <Image
        src={iconImageUrl}
        alt={displayName || 'icon'}
        layout="fill"
        objectFit="cover"
      />
    </Box>
  )
}

export { Component as OUserIcon }
