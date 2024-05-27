import { Flex } from '@mantine/core'
import { FC } from 'react'
import { EText } from '../../elements/EText/base'
import { useWeb3Auth } from '../../../hooks/useWeb3Auth'
import { applicationProperties } from '../../../constants/applicationProperties'
import { EButton } from '../../elements/EButton'

const Component: FC = () => {
  const { web3AuthLogout } = useWeb3Auth()

  return (
    <>
      <Flex
        pos="relative"
        direction="column"
        justify="center"
        align="center"
        mt={32}
      >
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
      </Flex>
    </>
  )
}

export { Component as SSignOutScreen }
