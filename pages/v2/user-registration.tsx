import {
  AspectRatio,
  Box,
  Checkbox,
  Container,
  Flex,
  SimpleGrid,
  TextInput,
} from '@mantine/core'
import Image from 'next/image'
import { EButton } from '../../componentsNew/elements/EButton'
import { EHeading } from '../../componentsNew/elements/EHeading/base'
import { OHeaderNav } from '../../componentsNew/organisms/OHeaderNav'
import { colorScheme } from '../../theme/colorScheme'

const Page = () => {
  return (
    <>
      <OHeaderNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <EHeading.Page mt={24} px={16}>
          新規ユーザー登録
        </EHeading.Page>
        <Box my={24} px={16}>
          <EHeading.Section>アイコン</EHeading.Section>
          <Flex mt={22} align="center">
            <Box w={72} h={72}>
              <AspectRatio ratio={1} w="100%" h="100%">
                <Flex
                  pos="relative"
                  w="100%"
                  h="100%"
                  bg={colorScheme.scheme1.surface2.surface}
                  style={{ borderRadius: '50%', overflow: 'hidden' }}
                >
                  <Image
                    src={'/assets/images/_sample/picture_ranking_10.png'} // TODO fallback image
                    alt={'a'}
                    fill={true}
                  />
                </Flex>
              </AspectRatio>
            </Box>
            <Box ml={16}>
              <EButton.Sm>写真を選択</EButton.Sm>
            </Box>
          </Flex>
        </Box>
        <Box my={24} px={16}>
          <EHeading.Section>表示名</EHeading.Section>
          <TextInput mt={8} placeholder="Input placeholder" />
        </Box>
        <Box my={24} px={16}>
          <EHeading.Section>メールアドレス</EHeading.Section>
          <TextInput mt={8} placeholder="Input placeholder" />
        </Box>
        <Box my={24} px={16}>
          <EHeading.Section>推しているメンバー(複数選択可)</EHeading.Section>
          <Box mt={22}>
            <SimpleGrid cols={5}>
              <AspectRatio ratio={1} w="100%" h="100%">
                <Flex
                  pos="relative"
                  w="100%"
                  h="100%"
                  bg={colorScheme.scheme1.surface2.surface}
                  style={{ borderRadius: '50%', overflow: 'hidden' }}
                >
                  <Image
                    src={'/assets/images/_sample/picture_ranking_01.png'} // TODO fallback image
                    alt={'a'}
                    fill={true}
                  />
                </Flex>
              </AspectRatio>
              <AspectRatio ratio={1} w="100%" h="100%">
                <Flex
                  pos="relative"
                  w="100%"
                  h="100%"
                  bg={colorScheme.scheme1.surface2.surface}
                  style={{ borderRadius: '50%', overflow: 'hidden' }}
                >
                  <Image
                    src={'/assets/images/_sample/picture_ranking_02.png'} // TODO fallback image
                    alt={'a'}
                    fill={true}
                  />
                </Flex>
              </AspectRatio>
              <AspectRatio ratio={1} w="100%" h="100%">
                <Flex
                  pos="relative"
                  w="100%"
                  h="100%"
                  bg={colorScheme.scheme1.surface2.surface}
                  style={{ borderRadius: '50%', overflow: 'hidden' }}
                >
                  <Image
                    src={'/assets/images/_sample/picture_ranking_03.png'} // TODO fallback image
                    alt={'a'}
                    fill={true}
                  />
                </Flex>
              </AspectRatio>
              <AspectRatio ratio={1} w="100%" h="100%">
                <Flex
                  pos="relative"
                  w="100%"
                  h="100%"
                  bg={colorScheme.scheme1.surface2.surface}
                  style={{ borderRadius: '50%', overflow: 'hidden' }}
                >
                  <Image
                    src={'/assets/images/_sample/picture_ranking_04.png'} // TODO fallback image
                    alt={'a'}
                    fill={true}
                  />
                </Flex>
              </AspectRatio>
              <AspectRatio ratio={1} w="100%" h="100%">
                <Flex
                  pos="relative"
                  w="100%"
                  h="100%"
                  bg={colorScheme.scheme1.surface2.surface}
                  style={{ borderRadius: '50%', overflow: 'hidden' }}
                >
                  <Image
                    src={'/assets/images/_sample/picture_ranking_05.png'} // TODO fallback image
                    alt={'a'}
                    fill={true}
                  />
                </Flex>
              </AspectRatio>
              <AspectRatio ratio={1} w="100%" h="100%">
                <Flex
                  pos="relative"
                  w="100%"
                  h="100%"
                  bg={colorScheme.scheme1.surface2.surface}
                  style={{ borderRadius: '50%', overflow: 'hidden' }}
                >
                  <Image
                    src={'/assets/images/_sample/picture_ranking_06.png'} // TODO fallback image
                    alt={'a'}
                    fill={true}
                  />
                </Flex>
              </AspectRatio>
              <AspectRatio ratio={1} w="100%" h="100%">
                <Flex
                  pos="relative"
                  w="100%"
                  h="100%"
                  bg={colorScheme.scheme1.surface2.surface}
                  style={{ borderRadius: '50%', overflow: 'hidden' }}
                >
                  <Image
                    src={'/assets/images/_sample/picture_ranking_07.png'} // TODO fallback image
                    alt={'a'}
                    fill={true}
                  />
                </Flex>
              </AspectRatio>
              <AspectRatio ratio={1} w="100%" h="100%">
                <Flex
                  pos="relative"
                  w="100%"
                  h="100%"
                  bg={colorScheme.scheme1.surface2.surface}
                  style={{ borderRadius: '50%', overflow: 'hidden' }}
                >
                  <Image
                    src={'/assets/images/_sample/picture_ranking_09.png'} // TODO fallback image
                    alt={'a'}
                    fill={true}
                  />
                </Flex>
              </AspectRatio>
              <AspectRatio ratio={1} w="100%" h="100%">
                <Flex
                  pos="relative"
                  w="100%"
                  h="100%"
                  bg={colorScheme.scheme1.surface2.surface}
                  style={{ borderRadius: '50%', overflow: 'hidden' }}
                >
                  <Image
                    src={'/assets/images/_sample/picture_ranking_09.png'} // TODO fallback image
                    alt={'a'}
                    fill={true}
                  />
                </Flex>
              </AspectRatio>
            </SimpleGrid>
          </Box>
        </Box>
        <Box my={24} px={16}>
          <EHeading.Section>表示名</EHeading.Section>
          <Checkbox
            mt={8}
            checked={true}
            onChange={() => {}}
            label="利用規約に同意する"
          />
        </Box>
      </Container>
      <Flex
        pos="fixed"
        w="100%"
        bottom={0}
        mb={32}
        justify="center"
        align="center"
      >
        <Box w="100%" maw={410} px={16}>
          <EButton.Sm w="100%">登録</EButton.Sm>
        </Box>
      </Flex>
    </>
  )
}

export default Page
