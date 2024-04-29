import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  BoostersDocument,
  BoostersQuery,
  BoostersQueryVariables,
  ProvisionBoosterDocument,
  ProvisionBoosterMutation,
  ProvisionBoosterMutationVariables,
  RedirectUriEntity,
} from '../generated/graphql'

const findMany = async (
  variables: BoostersQueryVariables,
  accessToken: string
): Promise<BoostersQuery> => {
  return await graphqlApiClient(accessToken).request<BoostersQuery>(
    BoostersDocument,
    variables
  )
}

const provision = async (
  variables: ProvisionBoosterMutationVariables,
  accessToken: string
): Promise<RedirectUriEntity> => {
  const mutation = await graphqlApiClient(
    accessToken
  ).request<ProvisionBoosterMutation>(ProvisionBoosterDocument, variables)

  return mutation.provisionBooster
}

export const BoosterRepository = { findMany, provision }
