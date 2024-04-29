import {
  JoinEventMutation,
  JoinEventMutationVariables,
} from '../../generated/graphql'
import { JoinWaitingRepository } from '../../repositories/JoinedWaitingRepository'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'

export const useJoinWaiting = () => {
  const createJoinWaiting = async (
    variables: JoinEventMutationVariables
  ): Promise<JoinEventMutation> => {
    const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()

    return await JoinWaitingRepository.create(
      variables,
      `${secretJwt?.accessToken}`
    )
  }

  return {
    createJoinWaiting,
  }
}
