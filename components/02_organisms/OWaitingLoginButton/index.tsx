import { Box } from '@mantine/core'
import { FC } from 'react'
import { useWeb3Auth } from '../../../hooks/useWeb3Auth'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { colorScheme } from '../../../theme/colorScheme'
import { EButton } from '../../01_elements/EButton'

type Props = {
  redirectUrl: string
}

const Component: FC<Props> = ({ redirectUrl }) => {
  const { isAuthenticated } = useAuthenticatedStore()
  const { connectWeb3AuthAndSignInWithEthereum } = useWeb3Auth()

  return (
    <>
      {isAuthenticated() ? (
        <></>
      ) : (
        <>
          <>
            <Box w="100%" maw={410} px={16}>
              <EButton.Lg
                w="100%"
                fillType="filled"
                surface="surface3"
                onClick={() => {
                  connectWeb3AuthAndSignInWithEthereum(redirectUrl)
                }}
              >
                新規作成／ログインして参加する
              </EButton.Lg>
              <Box
                mt={8}
                p={8}
                bg={colorScheme.scheme1.surface1.surface}
                c={colorScheme.scheme1.surface1.object.high}
                style={{
                  borderRadius: 8,
                  border: `1px solid ${colorScheme.scheme1.surface1.object.high}`,
                }}
              >
                <Box fz={10}>
                  ・ safariやchromeなどのブラウザでご利用ください。
                </Box>
                <Box mt={2} fz={10}>
                  ・
                  ウォレットご利用の方：「接続」と「署名」の２回操作があります。
                </Box>
              </Box>
            </Box>
          </>
        </>
      )}
    </>
  )
}

export { Component as OWaitingLoginButton }
