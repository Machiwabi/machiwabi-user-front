import { Box, Center, Container, ContainerProps, Flex } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { colorScheme } from '../../theme/colorScheme'

type Props = ContainerProps

const Component: FC<Props> = ({ ...props }) => {
  return (
    <>
      <Container
        pos="relative"
        maw={{ base: 640, lg: 690 + 24 * 2 }}
        px={{ base: 24, lg: 0 }}
        pb={30}
        bg={colorScheme.schemeLp.surface1.surface}
        {...props}
      >
        <Center>
          <Box
            component="a"
            href="https://twitter.com/MeTown_jp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/images/lp/icon/icon_x.png"
              alt="image"
              width={70}
              height={70}
            />
          </Box>
        </Center>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          w={{ base: 282, lg: '100%' }}
          mx="auto"
          pt={64}
          mb={64}
          justify="center"
          gap={{ base: 32, lg: 50 }}
        >
          <Box
            component="a"
            href=""
            target="_blank"
            rel="noopener noreferrer"
            fz={14}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            使い方
          </Box>
          <Box
            component="a"
            href=""
            target="_blank"
            rel="noopener noreferrer"
            fz={14}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            プライバシーポリシー
          </Box>
          <Box
            component="a"
            href=""
            target="_blank"
            rel="noopener noreferrer"
            fz={14}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            お問い合わせ
          </Box>
          <Box
            component="a"
            href=""
            target="_blank"
            rel="noopener noreferrer"
            fz={14}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            特定商取引法に基づく表記
          </Box>
          <Box
            component="a"
            href=""
            target="_blank"
            rel="noopener noreferrer"
            fz={14}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            利用規約
          </Box>
        </Flex>
        <Center fz={14}>© 2024 MeTown Inc. All Rights Reserved.</Center>
      </Container>
    </>
  )
}

export { Component as FooterSection }
