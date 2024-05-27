import { Box, Flex } from '@mantine/core'
import Image from 'next/image'
import { EButton } from '../../komponents/elements/EButton'
import { EText } from '../../komponents/elements/EText/base'
import LGuestUserLayout from '../../komponents/layouts/LGuestUserLayout'
import { waitingsUrl } from '../../helpers/url.helper'
import { useWeb3Auth } from '../../hooks/useWeb3Auth'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  const {
    isWeb3AuthConnected,
    connectWeb3AuthAndSignInWithEthereum,
    web3AuthLogout,
  } = useWeb3Auth()

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
              connectWeb3AuthAndSignInWithEthereum(waitingsUrl())
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
