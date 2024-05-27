import { Box, Flex } from '@mantine/core'
import { FC } from 'react'
import { EText } from '../../01_elements/EText/base'

const Component: FC = () => {
  return (
    <Flex
      pos="relative"
      direction="column"
      justify="center"
      align="center"
      w="100%"
      mt="calc(50svh - 55px)" // - words - headerHeight
    >
      <Box>
        <EText.Desc2 ta="center">
          現在マチワビているイベントが
          <br />
          ありません
        </EText.Desc2>
      </Box>
    </Flex>
  )
}

export { Component as TNoWaitingsTemplate }
