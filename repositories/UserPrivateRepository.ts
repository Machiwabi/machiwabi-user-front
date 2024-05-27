import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  UpsertUserDocument,
  UpsertUserMutation,
  UpsertUserMutationVariables,
} from '../generated/graphql'

const upsert = async (
  secretJwt: string,
  variables?: UpsertUserMutationVariables
): Promise<UpsertUserMutation> => {
  return await graphqlApiClient(secretJwt).request<UpsertUserMutation>(
    UpsertUserDocument,
    variables
  )
}

export const UserPrivateRepository = { upsert }
