import { Box, Button, Flex } from '@mantine/core'
import LGuestUserLayout from '../../componentsNew/layouts/LGuestUserLayout'
import { NextPageWithLayout } from '../_app'
import Image from 'next/image'
import { EText } from '../../componentsNew/elements/EText/base'
import { EButton } from '../../componentsNew/elements/EButton'
import { useWeb3Auth } from '../../hooks/useWeb3Auth'

const Page: NextPageWithLayout = () => {
  const { connectWeb3Auth, isWeb3AuthConnected, eoaAddress, web3AuthLogout } =
    useWeb3Auth({
      redirectUrl: `/callback`,
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
        <EButton.Sm
          mt={24}
          onClick={() => {
            connectWeb3Auth()
          }}
        >
          ログインして参加する
        </EButton.Sm>
        <Button
          onClick={() => {
            web3AuthLogout('/auth/logout')
          }}
        >
          ログアウト
        </Button>
      </Flex>
    </>
  )
}

Page.getLayout = LGuestUserLayout

export default Page
