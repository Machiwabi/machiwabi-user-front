import { Box, BoxProps, Flex } from '@mantine/core'
import { FC } from 'react'
import { OverlayedMenuListItem } from './OverlayedMenuListItem'
import {
  nftWalletUrl,
  userEditUrl,
  waitingsUrl,
  web3AuthSignOutUrl,
} from '../../../helpers/url.helper'
import { applicationUrls } from '../../../constants/applicationUrls'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'

type Props = BoxProps & {
  siweEoaAddress?: string | null
}

const Component: FC<Props> = ({ siweEoaAddress, ...props }) => {
  const { isAuthenticated } = useAuthenticatedStore()

  return (
    <>
      <Flex justify="center" direction="column" w="100%" {...props}>
        <OverlayedMenuListItem href={waitingsUrl()} title="ホーム画面" />
        {isAuthenticated() && (
          <OverlayedMenuListItem
            href={userEditUrl()}
            title="アカウント情報の編集"
          />
        )}

        <OverlayedMenuListItem
          href={applicationUrls.howTo}
          title="使い方"
          hrefOutbound
        />
        <OverlayedMenuListItem
          href={applicationUrls.form}
          title="お問い合せ"
          hrefOutbound
        />
        <OverlayedMenuListItem
          href={applicationUrls.tokusho}
          title="特定商取引法に基づく表記"
          hrefOutbound
        />
        <OverlayedMenuListItem
          href={applicationUrls.terms}
          title="利用規約"
          hrefOutbound
        />
        <OverlayedMenuListItem
          href={applicationUrls.privacy}
          title="プライバシーポリシー"
          hrefOutbound
        />
        {siweEoaAddress && (
          <OverlayedMenuListItem
            href={nftWalletUrl(siweEoaAddress)}
            title="NFTウォレット(外部サイト)"
            hrefOutbound
          />
        )}
        <OverlayedMenuListItem href={web3AuthSignOutUrl()} title="ログアウト" />
      </Flex>
    </>
  )
}

export { Component as OverlayedMenuList }
