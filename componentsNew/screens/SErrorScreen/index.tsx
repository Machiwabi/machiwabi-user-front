import { Flex } from '@mantine/core'
import { FC } from 'react'
import { EButton } from '../../elements/EButton'
import { EHeading } from '../../elements/EHeading/base'
import { EText } from '../../elements/EText/base'

type Props = {
  heading?: string
  description?: string
  displayReloadButton?: boolean
}

const Component: FC<Props> = ({
  heading = 'エラー',
  description = '再読み込みをしてください',
  displayReloadButton = true,
}) => {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <Flex
      pos="relative"
      direction="column"
      justify="center"
      align="center"
      w="100%"
      mt="calc(50svh - (12px) / 2 - 55px)" // - (loader + mt + words) - headerHeight
    >
      <EHeading.Section>{heading}</EHeading.Section>
      <EText.Desc1 mt={6}>{description}</EText.Desc1>
      {displayReloadButton && (
        <EButton.Sm mt={12} onClick={handleReload}>
          再読み込み
        </EButton.Sm>
      )}
    </Flex>
  )
}

export { Component as SErrorScreen }
