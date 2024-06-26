import { Box, BoxProps, Container, Flex } from '@mantine/core'
import { FC } from 'react'
import { colorScheme } from '../../../theme/colorScheme'
import { CtaButton } from '../elements/CtaButton'
import { NormalButton } from '../elements/NormalButton'
import { applicationUrls } from '../../../constants/applicationUrls'

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
              lh={{ base: 1.45, lg: 1.45 }}
              ta="center"
            >
              イベントまでの
              <Box component="br" />
              待ち侘びる時間を
              <Box component="br" />
              価値にできるアプリ
            </Box>
          </Flex>
          <Flex
            mt={{ base: 48, lg: 48 }}
            direction="column"
            justify="center"
            align="center"
          >
            <Flex mb={{ base: 16, md: 16 }}>
              <Flex direction="column" mr={{ base: 8, md: 16 }} align="center">
                <Box
                  fz={24}
                  ff="RocknRoll One"
                  lh={1}
                  c={colorScheme.schemeLp.accent1.surface}
                >
                  ダウンロード
                </Box>
                <Box
                  w={132}
                  py={8}
                  mt={16}
                  fz={28}
                  ff="RocknRoll One"
                  c={colorScheme.schemeLp.surface1.surface}
                  bg={colorScheme.schemeLp.accent1.surface}
                  style={{ borderRadius: 24 }}
                  ta="center"
                >
                  不要！
                </Box>
              </Flex>
              <Flex direction="column" ml={{ base: 8, md: 8 }} align="center">
                <Box
                  fz={24}
                  ff="RocknRoll One"
                  lh={1}
                  c={colorScheme.schemeLp.accent1.surface}
                >
                  所要時間
                </Box>
                <Box
                  w={132}
                  px={16}
                  py={8}
                  mt={16}
                  fz={28}
                  ff="RocknRoll One"
                  c={colorScheme.schemeLp.surface1.surface}
                  bg={colorScheme.schemeLp.accent1.surface}
                  style={{ borderRadius: 24 }}
                  ta="center"
                >
                  <Box component="span">1</Box>
                  <Box component="span" fz={16}>
                    分
                  </Box>
                </Box>
              </Flex>
            </Flex>
            <CtaButton
              href={applicationUrls.campaign.enxross0704}
              value={'マチワビる'}
              w={335}
              mt={{ base: 16, lg: 30 }}
            />

            <NormalButton
              href={applicationUrls.campaign.enxross0704Ticket}
              value={
                <>
                  <span>enXross 2ndのチケットはこちら</span>
                  <Box
                    pt={3}
                    ml={12}
                    className="material-icons-outlined"
                    component="i"
                  >
                    open_in_new
                  </Box>
                </>
              }
              w={{ base: '100%', sm: 600 }}
              mt={{ base: 24, lg: 30 }}
            />
          </Flex>
        </Box>
      </Container>
    </>
  )
}

export { Component as HeadingSection }
