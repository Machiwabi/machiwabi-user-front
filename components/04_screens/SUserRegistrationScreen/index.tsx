import { zodResolver } from '@hookform/resolvers/zod'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { UpsertUserMutationVariables } from '../../../generated/graphql'
import { waitingsUrl } from '../../../helpers/url.helper'
import { useUserPrivate } from '../../../hooks/resources/useUserPrivate'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { RedirectUrlRepository } from '../../../repositories/RedirectUrlRepository'
import { colorScheme } from '../../../theme/colorScheme'
import { registerUserSchema } from '../../../validations/registerUserSchema'
import { EHeading } from '../../01_elements/EHeading/base'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { TUserRegisterFormTemplate } from '../../03_templates/TUserRegisterFormTemplate'
import { Seo } from '../../99_seo/users/Seo'

const schema = z.object(registerUserSchema)

const Component: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { userPrivate, userPrivateIsLoading, userPrivateError, upsertUser } =
    useUserPrivate()
  const { secretJwt } = useAuthenticatedStore()

  const router = useRouter()

  const methods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    shouldFocusError: true,
  })

  const sendOnSubmit = methods.handleSubmit(async (data) => {
    setIsSubmitting(true)
    const dto: UpsertUserMutationVariables = {
      displayName: data.displayName,
      iconImageUrl: data.iconImageUrl,
      email: data.email,
    }

    try {
      await upsertUser(dto)
      showNotification({
        message: 'プロフィールを登録しました',
        color: colorScheme.scheme1.accent1.surface,
      })

      setTimeout(async () => {
        const redirectUrl = await RedirectUrlRepository.get()
        await RedirectUrlRepository.remove()

        router.push(redirectUrl || waitingsUrl())
      }, 1000)
    } catch (error) {
      console.error(error)
      showNotification({
        message: 'プロフィールの登録に失敗しました',
        color: colorScheme.scheme1.notice.alert,
      })
    } finally {
      setIsSubmitting(false)
    }
  })

  useEffect(() => {
    if (userPrivate) router.push(waitingsUrl())
  }, [userPrivate])

  if (userPrivateIsLoading) return <TLoadingTemplate />
  if (userPrivateError) return <TErrorTemplate />

  return (
    <>
      <Seo />
      <EHeading.Page mt={24} px={16}>
        新規ユーザー登録
      </EHeading.Page>
      <TUserRegisterFormTemplate
        isSubmitting={isSubmitting}
        secretJwt={secretJwt}
        methods={methods}
        onSubmit={sendOnSubmit}
      />
    </>
  )
}

export { Component as SUserRegistrationScreen }
