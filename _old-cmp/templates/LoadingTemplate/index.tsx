import { Flex, Spinner } from '@chakra-ui/react'
import { FC } from 'react'

const Component: FC = () => {
  return (
    <>
      <Flex
        pos="absolute"
        top={0}
        left={0}
        align="center"
        justify="center"
        w="100%"
        h="100svh"
      >
        <Spinner color="project.surface2.surface" size="xl" />
      </Flex>
    </>
  )
}

export { Component as LoadingTemplate }
