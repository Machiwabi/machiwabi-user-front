import { Box, BoxProps, Container, Flex } from '@mantine/core'
import { FC } from 'react'
import { colorScheme } from '../../theme/colorScheme'
import { CtaButton } from './elements/CtaButton'
import { NormalButton } from './elements/NormalButton'

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
            <Box
              fz={24}
              ff="RocknRoll One"
              lh={1}
              c={colorScheme.schemeLp.accent1.surface}
            >
              チケットをお持ちの方
            </Box>

            <CtaButton
              href={''}
              value={'マチワビる'}
              w={335}
              mt={{ base: 16, lg: 30 }}
            />
            <NormalButton
              href={''}
              value={
                <>
                  <span>チケットをまだ購入されていない方</span>
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
