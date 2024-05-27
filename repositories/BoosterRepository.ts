import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  BoosterDocument,
  BoosterEntity,
  BoosterQuery,
  BoosterQueryVariables,
  BoostersDocument,
  BoostersQuery,
  BoostersQueryVariables,
  ProvisionBoosterDocument,
  ProvisionBoosterMutation,
  ProvisionBoosterMutationVariables,
  RedirectUriEntity,
} from '../generated/graphql'

const findOne = async (
  variables: BoosterQueryVariables
): Promise<BoosterEntity> => {
  const boosterQuery = await graphqlApiClient().request<BoosterQuery>(
    BoosterDocument,
    variables
  )

  return boosterQuery.booster
}

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

export const BoosterRepository = { findOne, findMany, provision }
