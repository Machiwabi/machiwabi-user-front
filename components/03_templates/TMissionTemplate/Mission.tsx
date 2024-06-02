import { zodResolver } from '@hookform/resolvers/zod'
import { Box, BoxProps, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  BoosterEntity,
  ExchangeBoosterMutationVariables,
  WaitingEntity,
} from '../../../generated/graphql'
import { waitingBoostersUrl } from '../../../helpers/url.helper'
import { useBoosterUseableDuration } from '../../../hooks/resources/useBoosterUseableDuration'
import { useExchangeBooster } from '../../../hooks/resources/useExchangeBooster'
import { useLatestWaitingBooster } from '../../../hooks/resources/useLatestWaitingBooster'
import { useSiweEoaAddress } from '../../../hooks/resources/useSiweEoaAddress'
import { colorScheme } from '../../../theme/colorScheme'
import { dateConverter } from '../../../utils/dateConverter'
import { missionUrlPostSchema } from '../../../validations/missionUrlPostSchema'
import { EButton } from '../../01_elements/EButton'
import { EHeading } from '../../01_elements/EHeading/base'
import { ELoader } from '../../01_elements/ELoader'

type Props = BoxProps & {
  waiting: WaitingEntity
  booster: BoosterEntity
}

const schema = z.object(missionUrlPostSchema)

const Component: FC<Props> = ({ waiting, booster, ...props }) => {
  const router = useRouter()
  const { isSiweWallet } = useSiweEoaAddress(waiting.user.eoaAddress)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    latestWaitingBooster,
    latestWaitingBoosterError,
    latestWaitingBoosterIsLoading,
  } = useLatestWaitingBooster({
    boosterUniqueKey: booster.uniqueKey,
    waitingUniqueKey: waiting.uniqueKey,
  })

  const {
    boosterUseableDuration,
    boosterUseableDurationError,
    boosterUseableDurationIsLoading,
  } = useBoosterUseableDuration({
    uniqueKey: booster.uniqueKey,
    waitingUniqueKey: waiting.uniqueKey,
  })

  const { exchangeBooster } = useExchangeBooster()

  const methods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    shouldFocusError: true,
  })

  const sendOnSubmit = methods.handleSubmit(async (data) => {
    setIsSubmitting(true)

    const dto: ExchangeBoosterMutationVariables = {
      uniqueKey: booster.uniqueKey,
      content: data.content,
    }

    try {
      await exchangeBooster(dto)
      showNotification({
        message:
          'ミッション報告が完了しました、チェックの後ブースターが有効化されます',
        color: colorScheme.scheme1.accent1.surface,
      })

      router.push(waitingBoostersUrl(waiting.uniqueKey))
    } catch (error) {
      console.error(error)
      showNotification({
        message: 'ミッション報告に失敗しました',
        color: colorScheme.scheme1.notice.alert,
      })
    } finally {
      setIsSubmitting(false)
    }
  })

  // 自分のではない
  if (!isSiweWallet) {
    return (
      <>
        <Box {...props}>
          <EButton.Lg fillType="disabled" w="100%" disabled={true}>
            他の人のマチワビのため報告できません
          </EButton.Lg>
        </Box>
      </>
    )
  }

  // ブースター購入可能かをチェック
  if (!boosterUseableDuration || boosterUseableDurationIsLoading) {
    return (
      <>
        <Box {...props}>
          <>
            <EButton.Lg
              fillType="filled"
              surface="accent1"
              w="100%"
              disabled={true}
            >
              <>
                <ELoader
                  size="xs"
                  color={colorScheme.scheme1.accent1.object.high}
                />
              </>
            </EButton.Lg>
          </>
        </Box>
      </>
    )
  }

  console.log('-----------', latestWaitingBoosterError)

  if (boosterUseableDurationError || latestWaitingBoosterError) {
    return (
      <>
        <Box {...props}>
          <EButton.Lg fillType="disabled" w="100%" disabled={true}>
            エラーのため報告できません
          </EButton.Lg>
        </Box>
      </>
    )
  }

  if (latestWaitingBoosterIsLoading) {
    return (
      <>
        <Box {...props}>
          <EButton.Lg fillType="disabled" w="100%" disabled={true}>
            <ELoader size="xs" />
          </EButton.Lg>
        </Box>
      </>
    )
  }

  if (boosterUseableDuration.leftRecoveryDuration > 0) {
    // 審査中の場合
    if (latestWaitingBooster && !latestWaitingBooster.enabled) {
      return (
        <>
          <Box {...props}>
            <EHeading.SectionJa>ミッション報告フォーム</EHeading.SectionJa>
            <Box mt={16} mb={8}>
              <TextInput
                disabled={true}
                my={8}
                value={latestWaitingBooster.content || ''}
                error={
                  methods.formState.errors['content']
                    ? methods.formState.errors['content'].message?.toString()
                    : ''
                }
              />
            </Box>
            <EButton.Lg
              type="submit"
              w="100%"
              mt={8}
              fillType="disabled"
              surface="surface1"
            >
              現在確認中
            </EButton.Lg>
          </Box>
        </>
      )
    }
    return (
      <>
        <Box {...props}>
          <EButton.Lg fillType="disabled" w="100%" disabled={true}>
            {`${dateConverter.msToMMDDSS(
              boosterUseableDuration.leftRecoveryDuration
            )}後に再チャレンジ可能`}
          </EButton.Lg>
        </Box>
      </>
    )
  }

  return (
    <>
      <form onSubmit={sendOnSubmit}>
        <Box {...props}>
          <EHeading.SectionJa>ミッション報告フォーム</EHeading.SectionJa>
          <Box mt={16} mb={8}>
            <TextInput
              {...methods.register('content')}
              my={8}
              placeholder="https://XでポストしたURL"
              error={
                methods.formState.errors['content']
                  ? methods.formState.errors['content'].message?.toString()
                  : ''
              }
            />
          </Box>
          <EButton.Lg
            type="submit"
            w="100%"
            mt={8}
            fillType="filled"
            surface="surface3"
          >
            ミッションを報告する
          </EButton.Lg>
        </Box>
      </form>
    </>
  )
}

export { Component as Mission }
