import { Box, Flex } from '@mantine/core'
import { FC } from 'react'
import { EButton } from '../../elements/EButton'
import { EText } from '../../elements/EText/base'
import { useWeb3Auth } from '../../../hooks/useWeb3Auth'

type Props = {
  redirectUrl: string
}

const Component: FC<Props> = ({ redirectUrl }) => {
  const { connectWeb3AuthAndSignInWithEthereum } = useWeb3Auth()
  return (
    <Flex
      pos="relative"
      direction="column"
      justify="center"
      align="center"
      w="100%"
    >
      <Box mt={24}>
        <EText.Desc2 ta="center">
          Machiwabiのご利用には
          <br />
          ログインが必要です
        </EText.Desc2>
      </Box>

      <EButton.Sm
        mt={24}
        onClick={() => {
          connectWeb3AuthAndSignInWithEthereum(redirectUrl)
        }}
      >
        ログイ参加する
      </EButton.Sm>
    </Flex>
  )
}

export { Component as SRecommendSignInScreen }
