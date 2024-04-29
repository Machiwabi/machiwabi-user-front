import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  RewardsDocument,
  RewardsQuery,
  RewardsQueryVariables,
} from '../generated/graphql'

const findMany = async (
  variables: RewardsQueryVariables,
  accessToken: string
): Promise<RewardsQuery> => {
  return await graphqlApiClient(accessToken).request<RewardsQuery>(
    RewardsDocument,
    variables
  )
}

export const RewardRepository = { findMany }
