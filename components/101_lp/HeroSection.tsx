import { Carousel } from '@mantine/carousel'
import { Box, BoxProps, Center, Container, Flex } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { CtaButton } from './elements/CtaButton'
import { colorScheme } from '../../theme/colorScheme'
import { applicationUrls } from '../../constants/applicationUrls'

type Props = BoxProps

const Component: FC<Props> = ({ ...props }) => {
  return (
    <>
      <Container maw={{ base: 640, lg: 1440 }} px={{ base: 24, lg: 0 }}>
        <Box
          fz={{ base: 36, lg: 64 }}
          ff="RocknRoll One"
          lh={{ base: 1.45, lg: 1 }}
          ta="center"
        >
          早速参加して
          <Box component="br" hiddenFrom="lg" />
          リワードをゲットしよう
        </Box>
      </Container>
      <Box
        mt={{ base: 52, lg: 0 }}
        bg={{ lg: colorScheme.schemeLp.surface2.surface }}
      >
        {/* lg */}
        <Container
          visibleFrom="lg"
          w="100%"
          maw={1440}
          px={{ base: 24, lg: 0 }}
        >
          <Flex
            pos="relative"
            direction="column"
            justify="center"
            align="center"
            h={1255}
            {...props}
          >
            {/* 背景 */}
            <Image
              src="/assets/images/lp/bg/bg_md_ergosphere.png"
              layout={`fill`}
              objectFit={`cover`}
              alt="bg ergosphere"
            />

            {/* smartPhone */}
            <Flex
              pos="absolute"
              direction="column"
              justify="center"
              align="center"
              top={-60}
              left={0}
              w="100%"
              h="100%"
            >
              <Image
                src="/assets/images/lp/picture/picture_md_hero_app-ui.png"
                alt="logo"
                width={373}
                height={766}
              />
            </Flex>

            {/* cta */}
            <Box pos="absolute" bottom={160}>
              <CtaButton
                href={applicationUrls.campaign.icr240824}
                value={'マチワビる'}
              />
            </Box>

            <Flex
              justify="center"
              align="center"
              w="100%"
              style={{ overflow: 'hidden' }}
            >
              <Flex>
                <Carousel
                  w="100%"
                  mb={120}
                  withIndicators={false}
                  slideSize="20%"
                  slideGap={10}
                  align="start"
                  slidesToScroll={5}
                  withControls={false}
                  draggable={false}
                  loop
                >
                  <Carousel.Slide>
                    <Image
                      src="/assets/images/lp/picture/picture_member-01.png"
                      alt="logo"
                      width={280}
                      height={280}
                    />
                  </Carousel.Slide>
                  <Carousel.Slide>
                    <Image
                      src="/assets/images/lp/picture/picture_member-02.png"
                      alt="logo"
                      width={280}
                      height={280}
                    />
                  </Carousel.Slide>
                  <Carousel.Slide>
                    <Image
                      src="/assets/images/lp/picture/picture_member-03.png"
                      alt="logo"
                      width={280}
                      height={280}
                    />
                  </Carousel.Slide>
                  <Carousel.Slide>
                    <Image
                      src="/assets/images/lp/picture/picture_member-04.png"
                      alt="logo"
                      width={280}
                      height={280}
                    />
                  </Carousel.Slide>
                  <Carousel.Slide>
                    <Image
                      src="/assets/images/lp/picture/picture_member-05.png"
                      alt="logo"
                      width={280}
                      height={280}
                    />
                  </Carousel.Slide>
                </Carousel>
              </Flex>
            </Flex>
          </Flex>
        </Container>

        {/* sm */}
        <Box hiddenFrom="lg" px={{ base: 0, lg: 0 }}>
          <Flex
            w="100%"
            pos="relative"
            justify="center"
            align="center"
            style={{ overflow: 'hidden' }}
          >
            <Flex>
              <Box mx={16}>
                <Image
                  src="/assets/images/lp/picture/pictute_sm_hero-02.png"
                  alt="logo"
                  width={293}
                  height={406}
                />
              </Box>
              <Box mx={16}>
                <Image
                  src="/assets/images/lp/picture/pictute_sm_hero-02.png"
                  alt="logo"
                  width={293}
                  height={406}
                />
              </Box>
              <Box mx={16}>
                <Image
                  src="/assets/images/lp/picture/pictute_sm_hero-03.png"
                  alt="logo"
                  width={293}
                  height={406}
                />
              </Box>
              <Box mx={16}>
                <Image
                  src="/assets/images/lp/picture/pictute_sm_hero-01.png"
                  alt="logo"
                  width={293}
                  height={406}
                />
              </Box>
              <Box mx={16}>
                <Image
                  src="/assets/images/lp/picture/pictute_sm_hero-02.png"
                  alt="logo"
                  width={293}
                  height={406}
                />
              </Box>
            </Flex>
          </Flex>
          {/* cta */}
          <Container
            maw={{ base: 640, lg: 1440 }}
            mt={{ base: 42, lg: 0 }}
            px={{ base: 24, lg: 0 }}
          >
            <Center>
              <CtaButton
                href={applicationUrls.campaign.icr240824}
                value={'マチワビる'}
                w={330}
              />
            </Center>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export { Component as HeroSection }
