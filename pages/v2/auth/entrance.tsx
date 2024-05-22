import { Box, Flex } from '@mantine/core'
import Image from 'next/image'
import { EButton } from '../../../componentsNew/elements/EButton'
import { EText } from '../../../componentsNew/elements/EText/base'
import LGuestUserLayout from '../../../componentsNew/layouts/LGuestUserLayout'
import { applicationProperties } from '../../../constants/applicationProperties'
import { useWeb3Auth } from '../../../hooks/useWeb3Auth'
import { NextPageWithLayout } from '../../_app'

const Page: NextPageWithLayout = () => {
  const {
    isWeb3AuthConnected,
    connectWeb3AuthAndSignInWithEthereum,
    web3AuthLogout,
  } = useWeb3Auth({
    redirectUrl: `${applicationProperties.HOSTING_URL}/v2/auth/callback`,
  })

  return (
    <>
      <Flex
        direction="column"
        w={320}
        mt={58}
        mx="auto"
        align="center"
        justify="center"
      >
        <Image
          src="/assets/images/logo/logo_machiwabi.svg"
          alt="logo"
          width={173}
          height={24}
        />
        <Box mt={24}>
          <EText.Desc1>
            イーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイー
          </EText.Desc1>
        </Box>

        {isWeb3AuthConnected ? (
          <EButton.Sm
            mt={24}
            onClick={() => {
              web3AuthLogout('/auth/signout-completed')
            }}
          >
            ログアウト
          </EButton.Sm>
        ) : (
          <EButton.Sm
            mt={24}
            onClick={() => {
              connectWeb3AuthAndSignInWithEthereum('/v2/waitings')
            }}
          >
            ログインして参加する
          </EButton.Sm>
        )}
      </Flex>
    </>
  )
}

Page.getLayout = LGuestUserLayout

export default Page
