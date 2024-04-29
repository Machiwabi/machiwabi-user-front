import { graphqlApiClient } from '../apis/GraphqlApiClient'
import {
  JoinEventDocument,
  JoinEventMutation,
  JoinEventMutationVariables,
} from '../generated/graphql'

const create = async (
  variables: JoinEventMutationVariables,
  accessToken: string
): Promise<JoinEventMutation> => {
  return await graphqlApiClient(accessToken).request<JoinEventMutation>(
    JoinEventDocument,
    variables
  )
}

export const JoinWaitingRepository = {
  create,
}
