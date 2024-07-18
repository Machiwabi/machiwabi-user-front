import { Box, Container, Flex } from '@mantine/core'
import { FC, useEffect, useState } from 'react'
import { applicationProperties } from '../../../constants/applicationProperties'
import { colorScheme } from '../../../theme/colorScheme'
import { EButton } from '../../01_elements/EButton'
import { usePushNotificationRegistration } from '../../../hooks/usePushNotificationRegistration'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { useSiweEoaAddress } from '../../../hooks/resources/useSiweEoaAddress'

const Component: FC = () => {
  const { register, osNotificationPermissionGrantable } =
    usePushNotificationRegistration()
  const [displayable, setDisplayable] = useState(false)

  const { isAuthenticated } = useAuthenticatedStore()
  const { siweEoaAddress } = useSiweEoaAddress()

  useEffect(() => {
    if (osNotificationPermissionGrantable()) {
      setDisplayable(true)
    }
  }, [])

  if (!displayable) return <></>
  if (!isAuthenticated() || !siweEoaAddress) return <></>

  return (
    <>
      <Box bg={colorScheme.scheme1.surface2.surface}>
        <Container py={12} maw={applicationProperties.CONTENT_MAX_WIDTH}>
          <Flex justify="space-between" align="center">
            <Flex>
              <Flex direction="column" justify="center">
                <Box fz={12} lh={1}>
                  プッシュ通知をオンにして
                </Box>
                <Box mt={6} fz={12} lh={1}>
                  マチワビ情報を受け取ろう
                </Box>
              </Flex>
            </Flex>
            <Box>
              <EButton.Xs
                fillType="filled"
                h={28}
                c={colorScheme.scheme1.accent1.object.high}
                bg={colorScheme.scheme1.accent1.surface}
                fz={12}
                onClick={async () => {
                  await register()
                  setDisplayable(false)
                }}
              >
                通知を受け取る
              </EButton.Xs>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  )
}

export { Component as OPushNotificationInstallBanner }
