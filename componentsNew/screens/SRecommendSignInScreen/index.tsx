import { Box, Flex } from '@mantine/core'
import { FC } from 'react'
import { applicationProperties } from '../../../constants/applicationProperties'
import { useWeb3Auth } from '../../../hooks/useWeb3Auth'
import { EButton } from '../../elements/EButton'
import { EText } from '../../elements/EText/base'

type Props = {
  redirectUrl?: string
}

const Component: FC<Props> = ({}) => {
  const { connectWeb3AuthAndSignInWithEthereum } = useWeb3Auth({
    redirectUrl: `${applicationProperties.HOSTING_URL}/v2/waitings`,
  })

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
        mt={16}
        onClick={() => {
          connectWeb3AuthAndSignInWithEthereum()
        }}
      >
        ログイン／会員登録
      </EButton.Sm>
    </Flex>
  )
}

export { Component as SRecommendSignInScreen }
