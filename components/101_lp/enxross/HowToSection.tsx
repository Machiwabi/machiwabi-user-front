import { Box, BoxProps, Center, Container, Flex } from '@mantine/core'
import Image from 'next/image'
import { FC, ReactNode } from 'react'
import { colorScheme } from '../../../theme/colorScheme'
import { CtaButton } from '../elements/CtaButton'
import { applicationUrls } from '../../../constants/applicationUrls'

type Props = BoxProps

const Component: FC<Props> = ({ ...props }) => {
  return (
    <>
      <Container
        pos="relative"
        maw={{ base: 640, lg: 1440 }}
        px={{ base: 24, lg: 0 }}
        {...props}
      >
        <Box
          w={{ lg: 1000 }}
          mx="auto"
          fz={{ base: 36, lg: 52 }}
          ff="RocknRoll One"
          mb={{ base: 28, lg: 80 }}
          lh={{ base: 1.45 }}
          ta={{ base: 'center', lg: 'left' }}
        >
          Mati-wabiの
          <Box component="br" hiddenFrom="lg" />
          使い方
        </Box>

        {/* 01 */}
        <HowToBlock
          mb={{ base: 132, lg: 180 }}
          lgImageUrl="/assets/images/lp/picture/picture_md_howto-01.png"
          lgImageWidth={373}
          lgImageHeight={766}
          baseImageUrl="/assets/images/lp/picture/picture_sm_howto-01.png"
          baseImageWidth={335}
          baseImageHeight={451}
          lgText={
            <>
              <Box
                fz={{ base: 24, lg: 24 }}
                ff="RocknRoll One"
                lh={{ base: 1.45 }}
                ta={{ base: 'left' }}
              >
                Step 1
              </Box>
              <Box
                mt={40}
                fz={{ base: 24, lg: 40 }}
                ff="RocknRoll One"
                lh={{ base: 1.45 }}
                ta={{ base: 'left' }}
              >
                待っているイベントを選択
              </Box>
            </>
          }
          baseText={
            <>
              <Box
                fz={{ base: 24, lg: 24 }}
                ff="RocknRoll One"
                lh={{ base: 1.45 }}
                ta={{ base: 'left' }}
              >
                Step 1
              </Box>
              <Box
                fz={{ base: 24, lg: 40 }}
                ff="RocknRoll One"
                lh={{ base: 1.45 }}
                ta={{ base: 'left' }}
              >
                待っているイベントを選択
              </Box>
            </>
          }
        />
        {/* 02 */}
        <HowToBlock
          mb={{ base: 132, lg: 180 }}
          lgImageUrl="/assets/images/lp/picture/picture_md_howto-02.png"
          lgImageWidth={373}
          lgImageHeight={766}
          baseImageUrl="/assets/images/lp/picture/picture_sm_howto-02.png"
          baseImageWidth={335}
          baseImageHeight={451}
          lgText={
            <>
              <Box
                fz={{ base: 24, lg: 24 }}
                ff="RocknRoll One"
                lh={{ base: 1.45 }}
                ta={{ base: 'left' }}
              >
                Step 2
              </Box>
              <Box
                mt={40}
                fz={{ base: 24, lg: 40 }}
                ff="RocknRoll One"
                lh={{ base: 1.45 }}
                ta={{ base: 'left' }}
              >
                待ち侘びる時間を自動でポイントに変換
              </Box>
            </>
          }
          baseText={
            <>
              <Box
                fz={{ base: 24, lg: 24 }}
                ff="RocknRoll One"
                lh={{ base: 1.45 }}
                ta={{ base: 'left' }}
              >
                Step 2
              </Box>
              <Box
                fz={{ base: 24, lg: 40 }}
                ff="RocknRoll One"
                lh={{ base: 1.45 }}
                ta={{ base: 'left' }}
              >
                待ち侘びる時間を自動でポイントに変換
              </Box>
            </>
          }
        />
        {/* 03 */}
        <HowToBlock
          lgImageUrl="/assets/images/lp/picture/picture_md_howto-03.png"
          lgImageWidth={443.24}
          lgImageHeight={581.34}
          baseImageUrl="/assets/images/lp/picture/picture_sm_howto-03.png"
          baseImageWidth={393.39}
          baseImageHeight={457.42}
          lgText={
            <>
              <Box
                fz={{ base: 24, lg: 24 }}
                ff="RocknRoll One"
                lh={{ base: 1.45 }}
                ta={{ base: 'left' }}
              >
                Step 3
              </Box>
              <Box
                mt={40}
                fz={{ base: 24, lg: 40 }}
                ff="RocknRoll One"
                lh={{ base: 1.45 }}
                ta={{ base: 'left' }}
              >
                貯めたポイントでリワードを
                <Box component="span" c={colorScheme.schemeLp.accent1.surface}>
                  ゲット
                </Box>
              </Box>
              <Box ml={160}>
                <Image
                  src="/assets/images/lp/picture/picture_md_howto-03-decoration.png"
                  alt="image"
                  width={254.67}
                  height={226.97}
                />
              </Box>
            </>
          }
          baseText={
            <>
              <Box
                fz={{ base: 24, lg: 24 }}
                ff="RocknRoll One"
                lh={{ base: 1.45 }}
                ta={{ base: 'left' }}
              >
                Step 3
              </Box>
              <Box
                fz={{ base: 24, lg: 40 }}
                ff="RocknRoll One"
                lh={{ base: 1.45 }}
                ta={{ base: 'left' }}
              >
                貯めたポイントでリワードを
                <Box component="span" c={colorScheme.schemeLp.accent1.surface}>
                  ゲット
                </Box>
              </Box>
            </>
          }
        />
        <Center>
          <CtaButton
            href={applicationUrls.campaign.icr240824}
            value={'マチワビる'}
            w={330}
            mt={{ base: 40, lg: 64 }}
          />
        </Center>
      </Container>
    </>
  )
}

export { Component as HowToSection }

type HowToBlockProps = BoxProps & {
  lgImageUrl: string
  lgImageWidth: number
  lgImageHeight: number
  baseImageUrl: string
  baseImageWidth: number
  baseImageHeight: number
  lgText: ReactNode
  baseText: ReactNode
}
const HowToBlock: FC<HowToBlockProps> = ({
  lgImageUrl,
  lgImageWidth = 373,
  lgImageHeight = 766,
  baseImageUrl,
  baseImageWidth = 335,
  baseImageHeight = 451,
  lgText,
  baseText,
  ...props
}) => {
  return (
    <>
      {/* 01 */}
      <Box {...props}>
        {/* 01-pc */}
        <Flex
          w={1000}
          visibleFrom="lg"
          justify="space-between"
          align="center"
          mx="auto"
        >
          <Box w={lgImageWidth}>
            <Image
              src={lgImageUrl}
              alt="image"
              width={lgImageWidth}
              height={lgImageHeight}
            />
          </Box>
          <Box w={493}>{lgText}</Box>
        </Flex>

        {/* 01-sp */}
        <Flex
          direction="column"
          hiddenFrom="lg"
          justify="center"
          align="center"
        >
          <Box w={335}>{baseText}</Box>
          <Box w={baseImageWidth} mt={40}>
            <Image
              src={baseImageUrl}
              alt="image"
              width={baseImageWidth}
              height={baseImageHeight}
            />
          </Box>
        </Flex>
      </Box>
    </>
  )
}
