import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  UpsertUserDocument,
  UpsertUserMutation,
  UpsertUserMutationVariables,
  UserPrivateDocument,
  UserPrivateEntity,
  UserPrivateQuery,
} from '../generated/graphql'

const findOneByJwt = async (
  secretJwt: string
): Promise<UserPrivateEntity | null> => {
  const userPrivateQuery = await graphqlApiClient(
    secretJwt
  ).request<UserPrivateQuery>(UserPrivateDocument)

  return userPrivateQuery.userPrivate || null
}

const upsert = async (
  secretJwt: string,
  variables?: UpsertUserMutationVariables
): Promise<UpsertUserMutation> => {
  return await graphqlApiClient(secretJwt).request<UpsertUserMutation>(
    UpsertUserDocument,
    variables
  )
}

export const UserPrivateRepository = { findOneByJwt, upsert }
