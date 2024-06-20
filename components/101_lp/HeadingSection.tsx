import { Box, BoxProps, Container, Flex } from '@mantine/core'
import { FC } from 'react'
import { colorScheme } from '../../theme/colorScheme'
import { CtaButton } from './elements/CtaButton'
import { NormalButton } from './elements/NormalButton'
import { applicationUrls } from '../../constants/applicationUrls'

type Props = BoxProps

const Component: FC<Props> = ({ ...props }) => {
  return (
    <>
      <Container
        pos="relative"
        maw={{ base: 640, lg: 1440 }}
        px={{ base: 24, lg: 0 }}
      >
        <Box {...props}>
          <Flex direction="column" justify="center" align="center">
            <Box
              fz={{ base: 36, lg: 64 }}
              ff="RocknRoll One"
              lh={{ base: 1.45, lg: 1 }}
              ta="center"
            >
              待ち侘びることが
              <Box component="br" hiddenFrom="lg" />
              推し活になる
            </Box>
            <Box
              mt={{ base: 34, lg: 32 }}
              fz={{ base: 24, lg: 32 }}
              ff="RocknRoll One"
              lh={{ base: 1.45, lg: 1 }}
              ta="center"
            >
              イベントまでの
              <Box component="br" hiddenFrom="sm" />
              待ち侘びる時間を
              <Box component="br" hiddenFrom="lg" />
              価値にできるアプリ
            </Box>
          </Flex>
          <Flex
            mt={{ base: 48, lg: 48 }}
            direction="column"
            justify="center"
            align="center"
          >
            <CtaButton
              href={applicationUrls.campaign.icr240603}
              value={'マチワビる'}
              w={335}
              mt={{ base: 16, lg: 30 }}
            />
          </Flex>
        </Box>
      </Container>
    </>
  )
}

export { Component as HeadingSection }
