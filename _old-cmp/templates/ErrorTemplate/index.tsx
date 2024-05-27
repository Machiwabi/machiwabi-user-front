import { Box, Flex } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  message: string
}

const Component: FC<Props> = ({ message }) => {
  return (
    <>
      <Flex
        pos="absolute"
        top={0}
        left={0}
        align="center"
        justify="center"
        w="100%"
        h="100vh"
      >
        <Box>{message}</Box>
      </Flex>
    </>
  )
}

export { Component as ErrorTemplate }
