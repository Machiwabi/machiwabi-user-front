import { Flex } from '@mantine/core'
import { FC } from 'react'
import { EText } from '../../elements/EText/base'
import { useWeb3Auth } from '../../../hooks/useWeb3Auth'
import { applicationProperties } from '../../../constants/applicationProperties'
import { EButton } from '../../elements/EButton'

const Component: FC = () => {
  const {
    isWeb3AuthConnected,
    connectWeb3AuthAndSignInWithEthereum,
    web3AuthLogout,
  } = useWeb3Auth({
    redirectUrl: `${applicationProperties.HOSTING_URL}/v2/waitings`,
  })

  return (
    <>
      <Flex
        pos="relative"
        direction="column"
        justify="center"
        align="center"
        mt={32}
      >
        {isWeb3AuthConnected ? (
          <>
            <EText.Desc1>ボタンを押下してログアウトします</EText.Desc1>

            <EButton.Sm
              mt={24}
              onClick={() => {
                web3AuthLogout(
                  `${applicationProperties.HOSTING_URL}/v2/auth/entrance`
                )
              }}
            >
              ログアウト
            </EButton.Sm>
          </>
        ) : (
          <>
            <EButton.Sm
              mt={24}
              onClick={() => {
                connectWeb3AuthAndSignInWithEthereum('/v2/waitings')
              }}
            >
              ログインする
            </EButton.Sm>
          </>
        )}
      </Flex>
    </>
  )
}

export { Component as SSignOutScreen }
