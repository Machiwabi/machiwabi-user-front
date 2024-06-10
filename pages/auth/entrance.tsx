import { Box, Flex } from '@mantine/core'
import LGuestUserLayout from '../../components/00_layouts/LGuestUserLayout'
import { EButton } from '../../components/01_elements/EButton'
import { EText } from '../../components/01_elements/EText/base'
import { Seo } from '../../components/99_seo/auth/entrance/Seo'
import { waitingsUrl } from '../../helpers/url.helper'
import { useWeb3Auth } from '../../hooks/useWeb3Auth'
import { NextPageWithLayout } from '../_app'
import { useAuthenticatedStore } from '../../recoil/authenticatedStore/useAuthenticatedStore'

const Page: NextPageWithLayout = () => {
  const {
    isWeb3AuthConnected,
    connectWeb3AuthAndSignInWithEthereum,
    web3AuthLogout,
  } = useWeb3Auth()
  const { isAuthenticated } = useAuthenticatedStore()

  return (
    <>
      <Seo />
      <Flex
        direction="column"
        w={320}
        mt={58}
        mx="auto"
        align="center"
        justify="center"
      >
        <Box fz={20} mb={16} fw={900}>
          待ち侘びることが推し活になる！
        </Box>
        <EText.Desc3 ta="center">
          イベントまでの待ち侘びる時間を
          <br />
          価値にできるアプリ
          <br />
          「Mati-wabi」にようこそ！
        </EText.Desc3>

        {isAuthenticated() && isWeb3AuthConnected ? (
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
