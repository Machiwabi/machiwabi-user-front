import { UpsertUserMutationVariables } from '../../generated/graphql'
import { UserPrivateRepository } from '../../repositories/UserPrivateRepository'

export const useUserPrivate = () => {
  const upsertUser = async (
    secretJwt: string,
    variables?: UpsertUserMutationVariables
  ) => {
    console.log(secretJwt, variables)
    return await UserPrivateRepository.upsert(secretJwt, variables)
  }

  return { upsertUser }
}
