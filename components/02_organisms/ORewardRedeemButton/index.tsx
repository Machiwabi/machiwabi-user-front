import { Box, BoxProps, Flex } from '@mantine/core'
import { FC, useState } from 'react'
import { RewardEntity, WaitingEntity } from '../../../generated/graphql'
import { useRedeemReward } from '../../../hooks/resources/useRedeemReward'
import { EButton } from '../../01_elements/EButton'
import { dateConverter } from '../../../utils/dateConverter'
import { colorScheme } from '../../../theme/colorScheme'
import { useSiweEoaAddress } from '../../../hooks/resources/useSiweEoaAddress'
import { notifications, showNotification } from '@mantine/notifications'
import { ELoader } from '../../01_elements/ELoader'
import { waitingAquiredUrl } from '../../../helpers/url.helper'
import { useRouter } from 'next/router'

type Props = BoxProps & {
  waiting: WaitingEntity
  reward: RewardEntity
}

const Component: FC<Props> = ({ waiting, reward }) => {
  return (
    <Flex direction="column" my={0} px={16} justify="center" align="center">
      <Button waiting={waiting} reward={reward} />
      <Box mt={8} fz={10} c={colorScheme.scheme1.surface1.object.mid}>
        {reward.stockPerWaiting && reward.stockPerWaiting > 0 && (
          <>アカウントあたり{reward.stockPerWaiting}つまで引換可</>
        )}
        {reward.stockPerWaiting && reward.stock && <> ／ </>}
        {reward.stock && <>残り{reward.stock}個</>}
      </Box>
      <Flex mb={8} direction="column" align="center">
        <Box component="span" fz={10}>
          交換期間: {dateConverter.yyyyMMddHHmmss(reward.startAt)}〜
          {dateConverter.yyyyMMddHHmmss(reward.endAt)}
        </Box>
      </Flex>
    </Flex>
  )
}

export { Component as ORewardRedeemButton }

type ButtonProps = {
  waiting: WaitingEntity
  reward: RewardEntity
}

const Button: FC<ButtonProps> = ({ waiting, reward }) => {
  const router = useRouter()

  const {
    isRewardRedeemable,
    isRewardRedeemableError,
    isRewardRedeemableIsLoading,
    redeemRewardErrorType,
    redeemReward,
  } = useRedeemReward({ uniqueKey: reward.uniqueKey })

  const { isSiweWallet } = useSiweEoaAddress(waiting.user.eoaAddress)
  const [processing, setProcessing] = useState(false)

  const onSubmit = async () => {
    if (!isSiweWallet) {
      notifications.show({
        message: '他の人のリワードページのため交換できません',
        color: colorScheme.scheme1.notice.alert,
      })
    }

    try {
      setProcessing(true)
      const redeemedReward = await redeemReward({ uniqueKey: reward.uniqueKey })

      showNotification({
        message: 'リワードを獲得しました。',
        color: colorScheme.scheme1.accent1.surface,
      })

      window.location.href = waitingAquiredUrl(
        waiting.uniqueKey,
        redeemedReward.reward.uniqueKey
      )
      // router.push(
      //   waitingAquiredUrl(waiting.uniqueKey, redeemedReward.reward.uniqueKey)
      // )
    } catch (e: any) {
      console.error(e)
      notifications.show({
        title: 'エラー',
        message: e.message,
        color: colorScheme.scheme1.notice.alert,
      })
    }
  }

  if (isRewardRedeemableError) {
    const errorMessage = redeemRewardErrorType
      ? {
          NotFoundError: 'リワードまたはイベントが見つかりません',
          NotEnoughTotalPointError: 'ポイントが足りません',
          NotEnoughWaitingPointError: 'ポイントが足りません',
          RewardOutOfStockError: 'リワードが在庫切れです',
          RewardOutOfStockPerWaitingError: '１人あたりの引換上限に達しています',
          RedeemNotStartedError: '引換が開始されていません',
          RedeemEndedError: '引換が終了しました',
        }[redeemRewardErrorType]
      : 'エラーのため引換できません'

    if (redeemRewardErrorType === 'RedeemNotStartedError') {
      return (
        <EButton.Sm fillType="disabled">
          {' '}
          {dateConverter.yyyyMMddHHmmss(reward.startAt)}から交換可能
        </EButton.Sm>
      )
    }
    if (redeemRewardErrorType === 'RedeemEndedError') {
      return (
        <EButton.Sm fillType="disabled">
          {' '}
          {dateConverter.yyyyMMddHHmmss(reward.endAt)}で交換終了しました
        </EButton.Sm>
      )
    }

    return (
      <Flex direction="column" my={0} px={16} justify="center" align="center">
        <EButton.Sm fillType="disabled">{errorMessage}</EButton.Sm>
      </Flex>
    )
  }

  if (isRewardRedeemableIsLoading || !isRewardRedeemable)
    return (
      <Flex direction="column" my={0} px={16} justify="center" align="center">
        <EButton.Sm fillType="disabled">Loading...</EButton.Sm>
      </Flex>
    )

  return (
    <EButton.Sm
      fillType="filled"
      surface="surface3"
      w="100%"
      onClick={onSubmit}
    >
      {processing ? (
        <>
          <ELoader size="xs" color={colorScheme.scheme1.accent1.object.high} />
        </>
      ) : (
        <> {reward.requiredTotalPoint}ptで交換する</>
      )}
    </EButton.Sm>
  )
}
