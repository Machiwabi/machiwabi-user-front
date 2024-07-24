import { Flex } from '@mantine/core'
import { FC } from 'react'
import { EButton } from '../../01_elements/EButton'
import { EHeading } from '../../01_elements/EHeading/base'
import { EText } from '../../01_elements/EText/base'

type Props = {
  heading?: string
  description?: string
  displayReloadButton?: boolean
  href?: string
  hrefButtonText?: string
}

const Component: FC<Props> = ({
  heading = '接続が切れました',
  description = '再読み込みをしてください',
  displayReloadButton = true,
  href,
  hrefButtonText,
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
        <>
          <EButton.Sm mt={12} onClick={handleReload}>
            再読み込み
          </EButton.Sm>
          <EButton.Sm mt={16} href="/signout">
            ログアウトして接続し直す
          </EButton.Sm>
        </>
      )}
      {href && (
        <EButton.Sm mt={12} href={href}>
          {hrefButtonText || '戻る'}
        </EButton.Sm>
      )}
    </Flex>
  )
}

export { Component as TErrorTemplate }
