import { is } from '@react-three/fiber/dist/declarations/src/core/utils'
import { graphqlApiClient } from '../apis/GraphqlApiClient'
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
  return await graphqlApiClient(accessToken).request<RedeemRewardMutation>(
    RedeemRewardDocument,
    variables
  )
}

const isRedeemable = async (
  variables: RewardRedeemableQueryVariables,
  accessToken: string
): Promise<boolean> => {
  const rewardRedeemable = await graphqlApiClient(
    accessToken
  ).request<RewardRedeemableQuery>(RewardRedeemableDocument, variables)

  return rewardRedeemable.rewardRedeemable
}

export const WaitingRewardRepository = { redeem, isRedeemable }
