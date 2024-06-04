import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  BoosterDocument,
  BoosterEntity,
  BoosterQuery,
  BoosterQueryVariables,
  BoostersAllDocument,
  BoostersAllQuery,
  BoostersDocument,
  BoostersQuery,
  BoostersQueryVariables,
  ProvisionBoosterDocument,
  ProvisionBoosterMutation,
  ProvisionBoosterMutationVariables,
  RedirectUriEntity,
} from '../generated/graphql'

const findAll = async (): Promise<BoosterEntity[]> => {
  const boostersAllQuery = await graphqlApiClient().request<BoostersAllQuery>(
    BoostersAllDocument
  )
  return boostersAllQuery.boostersAll
}

const findOne = async (
  variables: BoosterQueryVariables
): Promise<BoosterEntity> => {
  const boosterQuery = await graphqlApiClient().request<BoosterQuery>(
    BoosterDocument,
    variables
  )

  console.log('boosterQuery----------', boosterQuery)

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

export const BoosterRepository = { findAll, findOne, findMany, provision }
