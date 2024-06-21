import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  NotEnoughTotalPointError,
  NotEnoughWaitingPointError,
  NotFoundError,
  RedeemEndedError,
  RedeemNotStartedError,
  RewardOutOfStockError,
  RewardOutOfStockPerWaitingError,
} from '../exceptions/exceptions'
import {
  RedeemRewardDocument,
  RedeemRewardMutation,
  RedeemRewardMutationVariables,
  RewardRedeemableDocument,
  RewardRedeemableQuery,
  RewardRedeemableQueryVariables,
} from '../generated/graphql'

const redeem = async (
  variables: RedeemRewardMutationVariables,
  accessToken: string
): Promise<RedeemRewardMutation> => {
  try {
    return await graphqlApiClient(accessToken).request<RedeemRewardMutation>(
      RedeemRewardDocument,
      variables
    )
  } catch (e: any) {
    if (e.response.errors[0].extensions.code === 'NOT_FOUND_ERROR')
      throw new NotFoundError('リワードまたはイベントが見つかりません')
    if (e.response.errors[0].extensions.code === 'NOT_ENOUGH_TOTAL_POINT_ERROR')
      throw new NotEnoughTotalPointError('ポイントが足りません')
    if (
      e.response.errors[0].extensions.code === 'NOT_ENOUGH_WAITING_POINT_ERROR'
    )
      throw new NotEnoughWaitingPointError('ポイントが足りません')
    if (e.response.errors[0].extensions.code === 'REWARD_OUT_OF_STOCK_ERROR')
      throw new RewardOutOfStockError('リワードが在庫切れです')
    if (
      e.response.errors[0].extensions.code ===
      'REWARD_OUT_OF_STOCK_PER_WAITING_ERROR'
    )
      throw new RewardOutOfStockPerWaitingError(
        '１人あたりの引換上限に達しています'
      )

    throw e
  }
}

const isRedeemable = async (
  variables: RewardRedeemableQueryVariables,
  accessToken: string
): Promise<boolean> => {
  try {
    const rewardRedeemable = await graphqlApiClient(
      accessToken
    ).request<RewardRedeemableQuery>(RewardRedeemableDocument, variables)

    return rewardRedeemable.rewardRedeemable
  } catch (e: any) {
    if (e.response.errors[0].extensions.code === 'NOT_FOUND_ERROR')
      throw new NotFoundError('リワードまたはイベントが見つかりません')
    if (e.response.errors[0].extensions.code === 'NOT_ENOUGH_TOTAL_POINT_ERROR')
      throw new NotEnoughTotalPointError('ポイントが足りません')
    if (
      e.response.errors[0].extensions.code === 'NOT_ENOUGH_WAITING_POINT_ERROR'
    )
      throw new NotEnoughWaitingPointError('ポイントが足りません')

    if (e.response.errors[0].extensions.code === 'REWARD_OUT_OF_STOCK_ERROR')
      throw new RewardOutOfStockError('リワードが在庫切れです')
    if (
      e.response.errors[0].extensions.code ===
      'REWARD_OUT_OF_STOCK_PER_WAITING_ERROR'
    )
      throw new RewardOutOfStockPerWaitingError(
        '１人あたりの引換上限に達しています'
      )
    if (e.response.errors[0].extensions.code === 'REWARD_NOT_START_ERROR')
      throw new RedeemNotStartedError('引換が開始されていません')
    if (e.response.errors[0].extensions.code === 'REWARD_ENDED_ERROR')
      throw new RedeemEndedError('引換が終了しました')
    throw e
  }
}

export const WaitingRewardRepository = { redeem, isRedeemable }
