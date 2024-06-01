import { Box, Flex } from '@mantine/core'
import Image from 'next/image'
import { EButton } from '../../components/01_elements/EButton'
import { EText } from '../../components/01_elements/EText/base'
import LGuestUserLayout from '../../components/00_layouts/LGuestUserLayout'
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
        <Box>
          <EText.Desc3 ta="center">
            <Box fz={20} mb={16} fw={900}>
              待ち侘びることが推し活になる！
            </Box>
            <Box>
              イベントまでの待ち侘びる時間を
              <br />
              価値にできるアプリ
              <br />
              「Mati-wabi」にようこそ！
            </Box>
          </EText.Desc3>
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
