import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  RewardDocument,
  RewardEntity,
  RewardQuery,
  RewardQueryVariables,
  RewardsAllDocument,
  RewardsAllQuery,
  RewardsDocument,
  RewardsQuery,
  RewardsQueryVariables,
} from '../generated/graphql'

const findAll = async (): Promise<RewardEntity[]> => {
  const rewardsAllQuery = await graphqlApiClient().request<RewardsAllQuery>(
    RewardsAllDocument
  )
  return rewardsAllQuery.rewardsAll
}

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

export const RewardRepository = { findAll, findOne, findMany }
