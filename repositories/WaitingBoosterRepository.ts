import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  ExchangeBoosterDocument,
  ExchangeBoosterMutation,
  ExchangeBoosterMutationVariables,
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
}
