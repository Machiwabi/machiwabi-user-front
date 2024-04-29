import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  ExchangeRewardDocument,
  ExchangeRewardMutation,
  ExchangeRewardMutationVariables,
} from '../generated/graphql'

const exchange = async (
  variables: ExchangeRewardMutationVariables,
  accessToken: string
): Promise<ExchangeRewardMutation> => {
  return await graphqlApiClient(accessToken).request<ExchangeRewardMutation>(
    ExchangeRewardDocument,
    variables
  )
}

export const WaitingRewardRepository = {
  exchange,
}
