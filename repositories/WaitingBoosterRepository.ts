import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  ExchangeBoosterDocument,
  ExchangeBoosterMutation,
  ExchangeBoosterMutationVariables,
  ExchangeBoosterWithMissionCouponMutation,
  ExchangeBoosterWithMissionCouponMutationVariables,
  LatestWaitingBoosterDocument,
  LatestWaitingBoosterQuery,
  LatestWaitingBoosterQueryVariables,
  WaitingBoosterEntity,
} from '../generated/graphql'

const exchange = async (
  variables: ExchangeBoosterMutationVariables,
  accessToken: string
): Promise<ExchangeBoosterMutation> => {
  return await graphqlApiClient(accessToken).request<ExchangeBoosterMutation>(
    ExchangeBoosterDocument,
    variables
  )
}

const exchangeWithMissionCoupon = async (
  variables: ExchangeBoosterWithMissionCouponMutationVariables,
  accessToken: string
): Promise<WaitingBoosterEntity> => {
  const waitingBooster = await graphqlApiClient(
    accessToken
  ).request<ExchangeBoosterWithMissionCouponMutation>(
    ExchangeBoosterDocument,
    variables
  )

  return waitingBooster.exchangeBoosterWithMissionCoupon
}

const latestWaitingBooster = async (
  variables: LatestWaitingBoosterQueryVariables
): Promise<WaitingBoosterEntity | null | undefined> => {
  const result = await graphqlApiClient().request<LatestWaitingBoosterQuery>(
    LatestWaitingBoosterDocument,
    variables
  )

  return result.latestWaitingBooster
}

export const WaitingBoosterRepository = {
  exchange,
  latestWaitingBooster,
  exchangeWithMissionCoupon,
}
