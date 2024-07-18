import { Box, Container, Flex, Modal } from '@mantine/core'
import { FC, useEffect, useState } from 'react'
import { colorScheme } from '../../../theme/colorScheme'
import { applicationProperties } from '../../../constants/applicationProperties'
import Image from 'next/image'
import { EButton } from '../../01_elements/EButton'

import { useUserAgent } from '../../../hooks/resources/useUserAgent'
import { useDisclosure } from '@mantine/hooks'

const Component: FC = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
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
                onClick={open}
              >
                インストール
              </EButton.Xs>
            </Box>
          </Flex>
        </Container>
      </Box>
      <ModalGuide opened={opened} close={close} />
    </>
  )
}

export { Component as OPwaInstallBanner }

type ModalGuideProps = {
  opened: boolean
  close: () => void
}

const ModalGuide: FC<ModalGuideProps> = ({ opened, close }) => {
  const { isIos } = useUserAgent()

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        xOffset={16}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        radius={12}
      >
        <Box py={16} px={8}>
          {isIos() ? (
            <>
              <Flex mb={24} justify="center" fz={18} fw={600}>
                Webアプリインストール方法(iOS)
              </Flex>
              <Box>
                <Flex align="center">
                  <Image
                    src="/assets/images/icon/icon_ios_safari.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <Box ml={16} fw={500}>
                    1.SafariでMati-wabiを開きます。
                  </Box>
                </Flex>
                <Flex align="center" mt={16}>
                  <Image
                    src="/assets/images/icon/icon_ios_share.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <Box ml={16} fw={500}>
                    2.シェアボタンをタップします。
                  </Box>
                </Flex>
                <Flex align="center" mt={16}>
                  <Image
                    src="/assets/images/icon/icon_ios_add.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <Box ml={16} fw={500}>
                    3.ホーム画面に追加をタップします。
                  </Box>
                </Flex>
              </Box>
            </>
          ) : (
            <>
              <Flex mb={24} justify="center" fz={18} fw={600}>
                Webアプリインストール方法(Android)
              </Flex>
              <Box>
                <Flex align="center">
                  <Image
                    src="/assets/images/icon/icon_android_more-vert.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <Box ml={16} fw={500}>
                    1.ブラウザの「メニュー」をタップします。
                  </Box>
                </Flex>
                <Flex align="center" mt={16}>
                  <Image
                    src="/assets/images/icon/icon_android_app-promo.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <Box ml={16} fw={500}>
                    2.アプリのインストールをタップします。
                  </Box>
                </Flex>
              </Box>
            </>
          )}

          <Flex mt={16} justify="center">
            <EButton.Sm mt={16} onClick={close}>
              閉じる
            </EButton.Sm>
          </Flex>
        </Box>
      </Modal>
    </>
  )
}
