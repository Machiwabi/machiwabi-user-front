import { Flex } from '@mantine/core'
import { FC } from 'react'
import { nftWalletUrl } from '../../../helpers/url.helper'
import { useSiweEoaAddress } from '../../../hooks/resources/useSiweEoaAddress'
import { EButton } from '../../01_elements/EButton'

const Component: FC = () => {
  const { siweEoaAddress } = useSiweEoaAddress()

  if (!siweEoaAddress) return <></>

  return (
    <Flex direction="column" my={0} px={16} justify="center" align="center">
      <EButton.Sm href={nftWalletUrl(siweEoaAddress)}>
        NFTウォレット(外部サイト)で見る
      </EButton.Sm>
    </Flex>
  )
}

export { Component as ORewardNftWalletUrlButton }
