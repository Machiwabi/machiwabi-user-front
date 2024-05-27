import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Checkbox, Flex, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { UpsertUserMutationVariables } from '../../../generated/graphql'
import { useUserPrivate } from '../../../hooks/resources/useUserPrivate'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { colorScheme } from '../../../theme/colorScheme'
import { registerUserSchema } from '../../../validations/registerUserSchema'
import { EButton } from '../../elements/EButton'
import { EHeading } from '../../elements/EHeading/base'
import { OUserIconUploader } from '../../organisms/OUserIconUploader'

const schema = z.object(registerUserSchema)

const Component: FC = () => {
  const { upsertUser } = useUserPrivate()
  const { secretJwt } = useAuthenticatedStore()
  const router = useRouter()

  const methods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    shouldFocusError: true,
  })

  const sendOnSubmit = methods.handleSubmit(async (data) => {
    console.log(data)
    const dto: UpsertUserMutationVariables = {
      displayName: data.displayName,
      iconImageUrl: data.iconImageUrl,
    }

    try {
      await upsertUser(secretJwt, dto)
      showNotification({
        message: 'プロフィールを登録しました',
        color: colorScheme.scheme1.accent1.surface,
      })

      // setTimeout(() => {
      //   router.push(waitingsUrl())
      // }, 1000)
    } catch (error) {
      console.error(error)
      showNotification({
        message: 'プロフィールの登録に失敗しました',
        color: colorScheme.scheme1.notice.alert,
      })
    }
  })

  return (
    <>
      <EHeading.Page mt={24} px={16}>
        新規ユーザー登録
      </EHeading.Page>
      <form onSubmit={sendOnSubmit}>
        <Box my={24} px={16}>
          <EHeading.Section>アイコン</EHeading.Section>
          <OUserIconUploader
            mt={22}
            methods={methods}
            label="wa"
            schemaName="iconImageUrl"
            // initialImages={[]}
            secretJwt={secretJwt}
          />
        </Box>
        <Box my={24} px={16}>
          <EHeading.Section>表示名</EHeading.Section>
          <TextInput
            {...methods.register('displayName')}
            mt={8}
            placeholder="まちわびちゃん"
          />
        </Box>
        <Box my={24} px={16}>
          <EHeading.Section>メールアドレス</EHeading.Section>
          <TextInput
            {...methods.register('email')}
            mt={8}
            placeholder="mati-wabi.chan@mati-wabi.com"
          />
        </Box>
        {/* <Box my={24} px={16}>
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
        </Box> */}
        <Box my={24} px={16}>
          <EHeading.Section>表示名</EHeading.Section>
          <Checkbox
            {...methods.register('termsAgreement')}
            mt={8}
            onChange={() => {}}
            label="利用規約に同意する"
          />
        </Box>

        <Flex
          pos="fixed"
          w="100%"
          left={0}
          bottom={0}
          mb={32}
          justify="center"
          align="center"
        >
          <Box w="100%" maw={410} px={16}>
            <EButton.Sm type="submit" w="100%">
              登録
            </EButton.Sm>
          </Box>
        </Flex>
      </form>
    </>
  )
}

export { Component as SUserRegistrationScreen }
