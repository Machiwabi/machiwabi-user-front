import { Box, BoxProps, Flex } from '@mantine/core'
import { FC } from 'react'
import { OverlayedMenuListItem } from './OverlayedMenuListItem'
import {
  userEditUrl,
  waitingsUrl,
  web3AuthSignOutUrl,
} from '../../../helpers/url.helper'
import { applicationUrls } from '../../../constants/applicationUrls'

type Props = BoxProps

const Component: FC<Props> = ({ ...props }) => {
  return (
    <>
      <Flex justify="center" direction="column" w="100%" {...props}>
        <OverlayedMenuListItem href={waitingsUrl()} title="ホーム画面" />
        <OverlayedMenuListItem
          href={userEditUrl()}
          title="アカウント情報の編集"
        />

        <OverlayedMenuListItem href={applicationUrls.howTo} title="使い方" />
        <OverlayedMenuListItem href={applicationUrls.form} title="お問い合せ" />
        <OverlayedMenuListItem
          href={applicationUrls.tokusho}
          title="特定商取引法に基づく表記"
        />
        <OverlayedMenuListItem href={applicationUrls.terms} title="利用規約" />
        <OverlayedMenuListItem
          href={applicationUrls.privacy}
          title="プライバシーポリシー"
        />
        <OverlayedMenuListItem href={web3AuthSignOutUrl()} title="ログアウト" />
      </Flex>
    </>
  )
}

export { Component as OverlayedMenuList }
