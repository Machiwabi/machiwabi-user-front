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
  ConsumeWaitingRewardDocument,
  ConsumeWaitingRewardMutation,
  ConsumeWaitingRewardMutationVariables,
  RedeemRewardDocument,
  RedeemRewardMutation,
  RedeemRewardMutationVariables,
  RewardRedeemableDocument,
  RewardRedeemableQuery,
  RewardRedeemableQueryVariables,
  ValidateConsumeableWaitingRewardDocument,
  ValidateConsumeableWaitingRewardQuery,
  ValidateConsumeableWaitingRewardQueryVariables,
  WaitingRewardEntity,
  WaitingRewardsByRewardDocument,
  WaitingRewardsByRewardQuery,
  WaitingRewardsByRewardQueryVariables,
} from '../generated/graphql'

const findManyBy = async (
  variables: WaitingRewardsByRewardQueryVariables,
  accessToken: string
): Promise<WaitingRewardEntity[]> => {
  const waitingRewards = await graphqlApiClient(
    accessToken
  ).request<WaitingRewardsByRewardQuery>(
    WaitingRewardsByRewardDocument,
    variables
  )

  return waitingRewards.waitingRewardsByReward
}

const redeem = async (
  variables: RedeemRewardMutationVariables,
  accessToken: string
): Promise<WaitingRewardEntity> => {
  try {
    const redeemRewardMutation = await graphqlApiClient(
      accessToken
    ).request<RedeemRewardMutation>(RedeemRewardDocument, variables)

    return redeemRewardMutation.redeemReward
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

const isConsumeable = async (
  variables: ValidateConsumeableWaitingRewardQueryVariables,
  accessToken: string
): Promise<boolean> => {
  try {
    const isConsumeable = await graphqlApiClient(
      accessToken
    ).request<ValidateConsumeableWaitingRewardQuery>(
      ValidateConsumeableWaitingRewardDocument,
      variables
    )

    return isConsumeable.validateConsumeableWaitingReward
  } catch (e: any) {
    if (e.response.errors[0].extensions.code === 'NOT_FOUND_ERROR')
      throw new NotFoundError('リワードが見つかりません')
    // TODO Error handling

    throw e
  }
}

const consume = async (
  variables: ConsumeWaitingRewardMutationVariables,
  accessToken: string
): Promise<WaitingRewardEntity> => {
  try {
    const consumeRewardMutation = await graphqlApiClient(
      accessToken
    ).request<ConsumeWaitingRewardMutation>(
      ConsumeWaitingRewardDocument,
      variables
    )

    return consumeRewardMutation.consumeWaitingReward
  } catch (e: any) {
    if (e.response.errors[0].extensions.code === 'NOT_FOUND_ERROR')
      throw new NotFoundError('リワードが見つかりません')
    // TODO Error handling

    throw e
  }
}

export const WaitingRewardRepository = {
  redeem,
  isRedeemable,
  consume,
  isConsumeable,
  findManyBy,
}
