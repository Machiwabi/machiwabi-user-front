import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  ExchangeBoosterDocument,
  ExchangeBoosterMutation,
  ExchangeBoosterMutationVariables,
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

export const WaitingBoosterRepository = {
  exchange,
}
