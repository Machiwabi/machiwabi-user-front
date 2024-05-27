import { Box, BoxProps, Flex } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

type Props = BoxProps & {
  value: ReactNode
}

const Component: FC<Props> = ({ value }) => {
  return (
    <>
      <Flex
        align="center"
        justify="center"
        direction="column"
        w="100%"
        py={4}
        color="project.accentSurface1.object.high"
        bg="project.accentSurface1.surface"
        borderRadius={12}
        _hover={{ opacity: 0.6 }}
        cursor="pointer"
        transitionDuration="0.2s"
      >
        <Box fontSize={16} fontWeight="medium">
          {value}
        </Box>
      </Flex>
    </>
  )
}

export { Component as ProjectColoredButton }
