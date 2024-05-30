import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  BoosterUseableDurationDocument,
  BoosterUseableDurationQuery,
  BoosterUseableDurationQueryVariables,
} from '../generated/graphql'

const find = async (variables: BoosterUseableDurationQueryVariables) => {
  const boosterUseableDuration =
    await graphqlApiClient().request<BoosterUseableDurationQuery>(
      BoosterUseableDurationDocument,
      variables
    )

  return boosterUseableDuration.boosterUseableDuration
}

export const BoosterUseableDurationRepository = {
  find,
}
