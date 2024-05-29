import { Box, Button, Flex, BoxProps } from '@mantine/core'
import { FC } from 'react'
import { colorScheme } from '../../theme/colorScheme'

type Props = BoxProps

const Component: FC<Props> = ({ ...props }) => {
  return (
    <>
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

          <Button
            component="a"
            href={''}
            target="_blank"
            rel="noopener noreferrer"
            w={{ base: '100%', lg: 330 }}
            h={68}
            mt={{ base: 16, lg: 30 }}
            fz={24}
            fw={400}
            c={colorScheme.schemeLp.accent1.surface}
            bg={'none'}
            style={{
              borderWidth: 1,
              borderColor: colorScheme.schemeLp.accent1.surface,
              borderRadius: 28,
            }}
          >
            マチワビる
          </Button>
          <Button
            component="a"
            href={''}
            target="_blank"
            rel="noopener noreferrer"
            w={{ base: '100%', lg: 600 }}
            h={68}
            mt={{ base: 16, lg: 30 }}
            fz={{ base: 16, lg: 24 }}
            fw={400}
            c={colorScheme.schemeLp.surface1.object.high}
            bg={'none'}
            style={{
              borderWidth: 1,
              borderColor: colorScheme.schemeLp.surface1.object.high,
              borderRadius: 28,
            }}
          >
            <span>チケットをまだ購入されていない方</span>
            <Box
              pt={3}
              ml={12}
              className="material-icons-outlined"
              component="i"
            >
              open_in_new
            </Box>
          </Button>
        </Flex>
      </Box>
    </>
  )
}

export { Component as HeadingSection }
