import { Box, Container, Flex } from '@mantine/core'
import { FC, useEffect, useState } from 'react'
import { colorScheme } from '../../../theme/colorScheme'
import { applicationProperties } from '../../../constants/applicationProperties'
import Image from 'next/image'
import { EButton } from '../../01_elements/EButton'

import { useUserAgent } from '../../../hooks/resources/useUserAgent'

const Component: FC = () => {
  const { isMobile, isPwa } = useUserAgent()
  const [displayable, setDisplayable] = useState(false)

  useEffect(() => {
    if (isMobile() && !isPwa()) setDisplayable(true)
  }, [isMobile, isPwa])

  if (displayable) {
    // モバイル端末でPWAではない場合はバナーを表示
    return (
      <Box bg={colorScheme.scheme1.surface2.surface}>
        <Container py={12} maw={applicationProperties.CONTENT_MAX_WIDTH}>
          <Flex justify="space-between" align="center">
            <Flex>
              <Box
                w={42}
                h={42}
                pos="relative"
                style={{ borderRadius: 4, overflow: 'hidden' }}
              >
                <Image
                  src={'/assets/favicon/favicon_192x192.png'}
                  layout="fill"
                  objectFit="cover"
                  alt={''}
                />
              </Box>
              <Flex ml={12} direction="column" justify="center">
                <Box
                  fz={16}
                  c={colorScheme.scheme1.surface2.object.high}
                  fw="bold"
                  lh={1}
                >
                  Mati-wabi
                </Box>
                <Box mt={6} fz={12} lh={1}>
                  待ち時間を価値するアプリ
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
                インストール
              </EButton.Xs>
            </Box>
          </Flex>
        </Container>
      </Box>
    )
  } else {
    // モバイルではないまたはPWAの場合はバナーを表示しない
    return <div></div>
  }
}

export { Component as OPwaInstallBanner }
