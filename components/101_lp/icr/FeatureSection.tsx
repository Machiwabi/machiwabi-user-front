import { Box, BoxProps, Container, Flex } from '@mantine/core'
import { FC } from 'react'
import { colorScheme } from '../../../theme/colorScheme'

type Props = BoxProps

const Component: FC<Props> = ({ ...props }) => {
  return (
    <>
      <Container
        pos="relative"
        maw={{ base: 640, lg: 1440 }}
        px={{ base: 24, lg: 0 }}
      >
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'center', lg: 'start' }}
          w={{ lg: 930 }}
          mx="auto"
          justify="center"
          {...props}
        >
          <Flex
            pos="relative"
            mr={{ lg: 270 }}
            direction="column"
            justify="center"
            align={{ base: 'center', lg: 'start' }}
            w={{ base: 332, lg: 'auto' }}
            h={{ base: 332, lg: 'auto' }}
          >
            <Box
              pos="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              hiddenFrom="lg"
              style={{
                borderRadius: '50%',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: colorScheme.schemeLp.surface1.object.high,
              }}
            />
            <Box>
              <Box
                ml={{ lg: 12 }}
                fz={{ base: 24, lg: 24 }}
                ff="RocknRoll One"
                lh={{ base: 1.45, lg: 1 }}
                ta="left"
              >
                Point 1
              </Box>
              <Box
                mt={16}
                fz={{ base: 32, lg: 64 }}
                ff="RocknRoll One"
                lh={{ base: 1.45 }}
                ta="left"
              >
                待ち侘びる
                <Box component="br" visibleFrom="lg" />
                時間が
                <Box component="br" />
                価値に
              </Box>
            </Box>
          </Flex>

          <Flex
            pos="relative"
            direction="column"
            justify="center"
            align={{ base: 'center', lg: 'start' }}
            w={{ base: 332, lg: 'auto' }}
            h={{ base: 332, lg: 'auto' }}
            mt={{ base: 16, lg: 0 }}
          >
            <Box
              pos="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              hiddenFrom="lg"
              style={{
                borderRadius: '50%',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: colorScheme.schemeLp.surface1.object.high,
              }}
            />
            <Box>
              <Box
                ml={{ lg: 12 }}
                fz={{ base: 24, lg: 24 }}
                ff="RocknRoll One"
                lh={{ base: 1.45, lg: 1 }}
                ta="left"
              >
                Point 2
              </Box>
              <Box
                mt={16}
                fz={{ base: 32, lg: 64 }}
                ff="RocknRoll One"
                lh={{ base: 1.45 }}
                ta="left"
              >
                世界初の
                <Box component="br" />
                待ち活専用
                <Box component="br" visibleFrom="lg" />
                アプリ
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </>
  )
}

export { Component as FeatureSection }
