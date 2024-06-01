import { Box, Flex, FlexProps } from '@mantine/core'
import { FC, ReactNode } from 'react'
import { colorScheme } from '../../../theme/colorScheme'

type Props = FlexProps & {
  title?: ReactNode
  description?: ReactNode
  additionalContent?: ReactNode
}

const Component: FC<Props> = ({
  title,
  description,
  additionalContent,
  ...props
}) => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      w="100%"
      py={48}
      px={16}
      style={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colorScheme.scheme1.surface1.object.low,
        borderRadius: 4,
      }}
      {...props}
    >
      {title && (
        <Box c={colorScheme.scheme1.surface1.object.high} fz={14}>
          {title}
        </Box>
      )}
      {description && (
        <Box
          c={colorScheme.scheme1.surface1.object.high}
          fz={12}
          mt={4}
          ta="center"
        >
          {description}
        </Box>
      )}
      {additionalContent}
    </Flex>
  )
}

export { Component as EBlankNotice }
