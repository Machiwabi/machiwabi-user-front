import { Flex, FlexProps } from '@chakra-ui/react'
import { FC } from 'react'

type Props = FlexProps

const Component: FC<Props> = ({ children }) => {
  return (
    <>
      <Flex direction="column" maxW="sm" mx="auto">
        {children}
      </Flex>
    </>
  )
}

export { Component as W2sm }
