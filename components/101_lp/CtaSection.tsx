import { Box, BoxProps, Center, Container, Flex } from '@mantine/core'
import { FC } from 'react'
import { colorScheme } from '../../theme/colorScheme'
import { CtaButton } from './elements/CtaButton'
import { applicationUrls } from '../../constants/applicationUrls'

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
        <Flex direction="column" align="center">
          <Box
            fz={{ base: 36, lg: 64 }}
            ff="RocknRoll One"
            lh={{ base: 1.45 }}
            ta={{ base: 'center', lg: 'left' }}
          >
            もし、イベントまでの
            <Box component="br" />
            “待ち侘びる時間”が
            <Box component="br" />
            推しの応援になったら？
          </Box>
          <Box
            w={{ base: 330, lg: 'auto' }}
            mt={{ base: 44, lg: 24 }}
            fz={{ base: 22, lg: 32 }}
            ff="RocknRoll One"
            lh={{ base: 1.45 }}
            ta={{ base: 'center', lg: 'left' }}
          >
            Mati-wabiは有限なあなたの推し活時間をもっと価値のあるものにします。
            <Box component="br" />
            <Box mt={'1.5rem'} hiddenFrom="lg" />
            もし、費やした時間を推しに還元できる仕組みがあったら？
            <Box component="br" />
            <Box mt={'1.5rem'} hiddenFrom="lg" />
            もし、費やした時間が自分に報酬として返ってきたら？
            <Box component="br" />
            <Box mt={'1.5rem'} hiddenFrom="lg" />
            Mati-wabiは、待ち侘びる期間に行う推し活をもっと楽しく、
            <Box component="br" />
            <Box mt={'1.5rem'} hiddenFrom="lg" />
            費やした時間を少しも無駄にしない、そんな「待ち活」専用アプリです！
          </Box>
          <Center>
            <CtaButton
              href={applicationUrls.campaign.icr240603}
              value={'マチワビる'}
              w={330}
              mt={{ base: 40, lg: 64 }}
            />
          </Center>
        </Flex>
      </Container>
    </>
  )
}

export { Component as CtaSection }
