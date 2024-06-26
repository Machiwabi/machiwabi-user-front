import { Box, Flex } from '@mantine/core'
import { FC } from 'react'
import { EText } from '../../01_elements/EText/base'
import { EButton } from '../../01_elements/EButton'
import { applicationUrls } from '../../../constants/applicationUrls'

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
        <Box mt={16}>
          {/* <EButton.Sm href={applicationUrls.campaign.icr240824}>
            enXross 2nd を待ち侘びる
            「不思議の国のアイス2024」(08月24日大会)をマチワビる
          </EButton.Sm> */}
          <EButton.Sm href={applicationUrls.campaign.enxross0704}>
            enXross 2nd をマチワビる
          </EButton.Sm>
        </Box>
      </Box>
    </Flex>
  )
}

export { Component as TNoWaitingsTemplate }
