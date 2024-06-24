import { zodResolver } from '@hookform/resolvers/zod'
import { Box, BoxProps, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  BoosterEntity,
  ExchangeBoosterWithMissionCouponMutationVariables,
  WaitingEntity,
} from '../../../generated/graphql'
import { useBoosterUseableDuration } from '../../../hooks/resources/useBoosterUseableDuration'
import { useExchangeBooster } from '../../../hooks/resources/useExchangeBooster'
import { useLatestWaitingBooster } from '../../../hooks/resources/useLatestWaitingBooster'
import { useSiweEoaAddress } from '../../../hooks/resources/useSiweEoaAddress'
import { colorScheme } from '../../../theme/colorScheme'
import { dateConverter } from '../../../utils/dateConverter'
import { missionCouponUrlPostSchema } from '../../../validations/missionCouponUrlPostSchema'
import { EButton } from '../../01_elements/EButton'
import { EHeading } from '../../01_elements/EHeading/base'
import { ELoader } from '../../01_elements/ELoader'
import { waitingBoostersUrl } from '../../../helpers/url.helper'

type Props = BoxProps & {
  waiting: WaitingEntity
  booster: BoosterEntity
}

const schema = z.object(missionCouponUrlPostSchema)

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

  const { exchangeBoosterWithMissionCoupon } = useExchangeBooster()

  const methods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    shouldFocusError: true,
  })

  const sendOnSubmit = methods.handleSubmit(async (data) => {
    setIsSubmitting(true)

    const dto: ExchangeBoosterWithMissionCouponMutationVariables = {
      uniqueKey: booster.uniqueKey,
      couponCode: data.couponCode,
    }

    try {
      const waitingBooster = await exchangeBoosterWithMissionCoupon(dto)

      window.location.href = waitingBoostersUrl(
        waiting.uniqueKey,
        waitingBooster.uniqueKey
      )
    } catch (error) {
      console.error(error)
      showNotification({
        message: 'クーポンがすでに使われているか、正しくありません',
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

  if (
    boosterUseableDuration &&
    boosterUseableDuration.leftRecoveryDuration > 0
  ) {
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
          <EHeading.SectionJa>トレジャーコード入力フォーム</EHeading.SectionJa>
          <Box mt={16} mb={8}>
            <TextInput
              {...methods.register('couponCode')}
              my={8}
              placeholder="1A2B3"
              error={
                methods.formState.errors['couponCode']
                  ? methods.formState.errors['couponCode'].message?.toString()
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
            {isSubmitting ? (
              <>
                <ELoader
                  size="xs"
                  color={colorScheme.scheme1.surface3.object.high}
                />
              </>
            ) : (
              <>コードを報告する</>
            )}
          </EButton.Lg>
        </Box>
      </form>
    </>
  )
}

export { Component as Coupon }
