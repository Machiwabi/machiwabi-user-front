import { Box, Container, Flex } from '@mantine/core'
import { FC } from 'react'
import { applicationProperties } from '../../../constants/applicationProperties'
import { colorScheme } from '../../../theme/colorScheme'
import { EButton } from '../../01_elements/EButton'

const Component: FC = () => {
  return (
    <>
      <Box bg={colorScheme.scheme1.surface2.surface}>
        <Container py={12} maw={applicationProperties.CONTENT_MAX_WIDTH}>
          <Flex justify="space-between" align="center">
            <Flex>
              <Flex ml={12} direction="column" justify="center">
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
