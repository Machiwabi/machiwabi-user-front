import { Box, BoxProps, Container } from '@mantine/core'
import { FC } from 'react'
import Image from 'next/image'

type Props = BoxProps

const Component: FC<Props> = ({ ...props }) => {
  return (
    <>
      {/* lg */}
      <Box
        pos="fixed"
        top={0}
        left={0}
        w="100%"
        h="100vh"
        px={{ base: 24, lg: 0 }}
        visibleFrom="lg"
        style={{ zIndex: -1 }}
      >
        <Container
          pos="relative"
          w="100%"
          maw={{ base: 640, lg: 1600 }}
          h="100%"
          px={{ base: 24, lg: 0 }}
          style={{ zIndex: -1 }}
        >
          <Box pos="absolute" w="435.58px" h="100%" left={0} top={0}>
            <Image
              src="/assets/images/lp/bg/bg_md_milky-way-left.svg"
              layout={`fill`}
              objectFit={`cover`}
              alt="bg ergosphere"
            />
          </Box>
          <Box pos="absolute" w="435.58px" h="100%" right={0} top={0}>
            <Image
              src="/assets/images/lp/bg/bg_md_milky-way-right.svg"
              layout={`fill`}
              objectFit={`cover`}
              alt="bg ergosphere"
            />
          </Box>
        </Container>
      </Box>

      {/* base */}
      <Box
        pos="absolute"
        top={0}
        left={0}
        w="100%"
        h="100vh"
        px={{ base: 0, lg: 0 }}
        hiddenFrom="lg"
        style={{ zIndex: -1 }}
      >
        <Box pos="relative" w="100%" h="100%" style={{ zIndex: -1 }}>
          <Box pos="absolute" w="142px" h="5859px" left={0} top={0}>
            <Image
              src="/assets/images/lp/bg/bg_sm_milky-way-left.svg"
              layout="fill"
              objectFit="cover"
              alt="bg ergosphere"
            />
          </Box>
          <Box pos="absolute" w="142px" h="5859px" right={0} top={0}>
            <Image
              src="/assets/images/lp/bg/bg_sm_milky-way-right.svg"
              layout="fill"
              objectFit="cover"
              alt="bg ergosphere"
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export { Component as BgSection }
