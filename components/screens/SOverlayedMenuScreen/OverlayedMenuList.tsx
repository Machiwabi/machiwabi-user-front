import { BoxProps, Flex } from '@mantine/core'
import { FC } from 'react'
import { OverlayedMenuListItem } from './OverlayedMenuListItem'
import { web3AuthSignOutUrl } from '../../../helpers/url.helper'

type Props = BoxProps

const Component: FC<Props> = ({ ...props }) => {
  return (
    <>
      <Flex justify="center" direction="column" w="100%" {...props}>
        <OverlayedMenuListItem href="/" title="使い方" />
        <OverlayedMenuListItem href="/" title="お問い合せ" />
        <OverlayedMenuListItem href="/posts" title="特定商取引法に基づく表記" />
        <OverlayedMenuListItem href="/posts" title="利用規約" />
        <OverlayedMenuListItem href="/" title="プライバシーポリシー" />
        <OverlayedMenuListItem href={web3AuthSignOutUrl()} title="ログアウト" />
      </Flex>
    </>
  )
}

export { Component as OverlayedMenuList }
