import { zodResolver } from '@hookform/resolvers/zod'
import { showNotification } from '@mantine/notifications'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  UpsertUserMutation,
  UpsertUserMutationVariables,
  UserPrivateEntity,
} from '../../../generated/graphql'
import { useUserPrivate } from '../../../hooks/resources/useUserPrivate'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { colorScheme } from '../../../theme/colorScheme'
import { editUserSchema } from '../../../validations/editUserSchema'
import { EHeading } from '../../01_elements/EHeading/base'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { TUserEditFormTemplate } from '../../03_templates/TUserEditFormTemplate'
import { Seo } from '../../99_seo/users/Seo'

const schema = z.object(editUserSchema)

const Component: FC = () => {
  const { userPrivate, userPrivateIsLoading, userPrivateError, upsertUser } =
    useUserPrivate()
  const { secretJwt } = useAuthenticatedStore()

  if (userPrivateIsLoading || !userPrivate) return <TLoadingTemplate />
  if (userPrivateError) return <TErrorTemplate />

  return (
    <>
      <Seo />
      <MainBlock
        secretJwt={secretJwt}
        userPrivate={userPrivate}
        upsertUser={upsertUser}
      />
    </>
  )
}

export { Component as SUserEditScreen }

type MainBlockProps = {
  secretJwt: string
  userPrivate: UserPrivateEntity
  upsertUser: (
    variables?: UpsertUserMutationVariables
  ) => Promise<UpsertUserMutation>
}

const MainBlock: FC<MainBlockProps> = ({
  secretJwt,
  userPrivate,
  upsertUser,
}) => {
  const defaultValues = {
    displayName: userPrivate.displayName,
    iconImageUrl: userPrivate.iconImageUrl,
    email: userPrivate.email,
  }

  const methods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    shouldFocusError: true,
    defaultValues,
  })

  const sendOnSubmit = methods.handleSubmit(async (data) => {
    const dto: UpsertUserMutationVariables = {
      displayName: data.displayName,
      iconImageUrl: data.iconImageUrl,
      email: data.email,
    }

    try {
      await upsertUser(dto)
      showNotification({
        message: 'プロフィールを更新しました',
        color: colorScheme.scheme1.accent1.surface,
      })
    } catch (error) {
      console.error(error)
      showNotification({
        message: 'プロフィールの更新に失敗しました',
        color: colorScheme.scheme1.notice.alert,
      })
    }
  })

  return (
    <>
      <EHeading.Page mt={24} px={16}>
        ユーザー情報更新
      </EHeading.Page>
      <TUserEditFormTemplate
        secretJwt={secretJwt}
        methods={methods}
        onSubmit={sendOnSubmit}
        userPrivate={userPrivate}
      />
    </>
  )
}
