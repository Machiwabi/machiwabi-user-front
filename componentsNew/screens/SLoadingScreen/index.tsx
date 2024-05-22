import { Flex } from '@mantine/core'
import { FC } from 'react'
import { ELoader } from '../../elements/ELoader'
import { EText } from '../../elements/EText/base'

const Component: FC = () => {
  return (
    <Flex
      pos="relative"
      direction="column"
      justify="center"
      align="center"
      w="100%"
      mt="calc(50svh - (36px - 6px - 12px) / 2 - 55px)" // - (loader + mt + words) - headerHeight
    >
      <ELoader />
      <EText.Desc1 mt={6}>Loading...</EText.Desc1>
    </Flex>
  )
}

export { Component as SLoadingScreen }
