import { Box, BoxProps, Flex } from '@mantine/core'
import { FC } from 'react'
import { RewardEntity } from '../../../generated/graphql'
import { useRedeemReward } from '../../../hooks/resources/useRedeemReward'
import { EButton } from '../../01_elements/EButton'
import { dateConverter } from '../../../utils/dateConverter'
import { colorScheme } from '../../../theme/colorScheme'
import { RedeemNotStartedError } from '../../../exceptions/exceptions'

type Props = BoxProps & {
  reward: RewardEntity
}

const Component: FC<Props> = ({ reward }) => {
  // if (isUserJoiableError) {
  //   // 参加済みの場合
  //   if (isUserJoinableErrorType === 'AlreadyWaitingError') {
  //     return (
  //       <>
  //         <Box w="100%" maw={410} px={16}>
  //           <EButton.Lg href={waitingsUrl()} w="100%">
  //             イベント参加済｜一覧ページへ
  //           </EButton.Lg>
  //         </Box>
  //       </>
  //     )
  //   }

  //   // それ以外のエラー
  //   const errorMessage = isUserJoinableErrorType
  //     ? {
  //         NotFoundError: 'イベントが見つかりません',
  //         NotSuitableEventError: 'イベントが見つかりません',
  //         NotSuitableUserError: 'ログアウトし、もう一度お試しください',
  //       }[isUserJoinableErrorType]
  //     : 'エラーのため参加できません'
  //   return (
  //     <>
  //       <Box w="100%" maw={410} px={16}>
  //         <EButton.Lg w="100%" fillType="disabled" disabled>
  //           {errorMessage}
  //         </EButton.Lg>
  //       </Box>
  //     </>
  //   )
  // }

  return (
    <Flex direction="column" my={0} px={16} justify="center" align="center">
      <Button reward={reward} />
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
  reward: RewardEntity
}

const Button: FC<ButtonProps> = ({ reward }) => {
  const {
    isRewardRedeemable,
    isRewardRedeemableError,
    isRewardRedeemableIsLoading,
    redeemRewardErrorType,
    redeemReward,
  } = useRedeemReward({ uniqueKey: reward.uniqueKey })

  console.log('isRewardRedeemable', isRewardRedeemableError)

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
    <EButton.Sm fillType="filled" surface="surface3" w="100%">
      {reward.requiredTotalPoint}ptで交換(利用)する
    </EButton.Sm>
  )
}
