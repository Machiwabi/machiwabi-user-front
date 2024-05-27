import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  RewardDocument,
  RewardEntity,
  RewardQuery,
  RewardQueryVariables,
  RewardsDocument,
  RewardsQuery,
  RewardsQueryVariables,
} from '../generated/graphql'

const findOne = async (
  variables: RewardQueryVariables
): Promise<RewardEntity> => {
  const rewardQuery = await graphqlApiClient().request<RewardQuery>(
    RewardDocument,
    variables
  )

  return rewardQuery.reward
}

const findMany = async (
  variables: RewardsQueryVariables,
  accessToken: string
): Promise<RewardsQuery> => {
  return await graphqlApiClient(accessToken).request<RewardsQuery>(
    RewardsDocument,
    variables
  )
}

export const RewardRepository = { findOne, findMany }
