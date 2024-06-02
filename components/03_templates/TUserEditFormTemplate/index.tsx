import { Box, Flex, TextInput } from '@mantine/core'
import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { EButton } from '../../01_elements/EButton'
import { EHeading } from '../../01_elements/EHeading/base'
import { OUserIconUploader } from '../../02_organisms/OUserIconUploader'
import { UserPrivateEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { ELoader } from '../../01_elements/ELoader'

type Props = {
  secretJwt: string
  methods: UseFormReturn<any>
  onSubmit: (data: any) => void
  userPrivate?: UserPrivateEntity
  isSubmitting: boolean
}

const Component: FC<Props> = ({
  secretJwt,
  methods,
  onSubmit,
  userPrivate,
  isSubmitting,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <Box my={24} px={16}>
          <EHeading.Section>アイコン</EHeading.Section>
          <OUserIconUploader
            mt={22}
            methods={methods}
            label="wa"
            schemaName="iconImageUrl"
            initialImage={userPrivate?.iconImageUrl}
            secretJwt={secretJwt}
          />
        </Box>
        <Box my={24} px={16}>
          <Flex justify="space-between" align="center">
            <EHeading.Section>表示名</EHeading.Section>
            <EHeading.Section fz={12} c={colorScheme.scheme1.notice.alert}>
              必須
            </EHeading.Section>
          </Flex>
          <TextInput
            {...methods.register('displayName')}
            mt={8}
            placeholder="まちわびちゃん"
            error={
              methods.formState.errors['displayName']
                ? methods.formState.errors['displayName'].message?.toString()
                : ''
            }
          />
        </Box>
        <Box my={24} px={16}>
          <Flex justify="space-between" align="center">
            <EHeading.Section>メールアドレス</EHeading.Section>
            <EHeading.Section fz={12} c={colorScheme.scheme1.notice.alert}>
              必須
            </EHeading.Section>
          </Flex>
          <TextInput
            {...methods.register('email')}
            mt={8}
            placeholder="mati-wabi.chan@mati-wabi.xyz"
            error={
              methods.formState.errors['email']
                ? methods.formState.errors['email'].message?.toString()
                : ''
            }
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
            <EButton.Sm type="submit" w="100%" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <ELoader size="xs" />
                </>
              ) : (
                <>登録</>
              )}
            </EButton.Sm>
          </Box>
        </Flex>
      </form>
    </>
  )
}

export { Component as TUserEditFormTemplate }
