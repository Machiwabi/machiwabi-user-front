import useSWR from 'swr'
import {
  UpdateWaitingMessageMutationVariables,
  WaitingEntity,
  WaitingQueryVariables,
} from '../../generated/graphql'
import { WaitingRepository } from '../../repositories/WaitingRepository'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'

export const useWaiting = (variables: WaitingQueryVariables) => {
  const { data, error, isLoading, mutate } = useSWR<WaitingEntity>(
    ['WaitingDocument', variables],
    async () => {
      return WaitingRepository.findOne(variables)
    }
  )

  const updateWaitingMessage = async (
    variables: UpdateWaitingMessageMutationVariables
  ): Promise<WaitingEntity> => {
    const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()

    const updateWaiting = await WaitingRepository.updateWaitingMessage(
      variables,
      `${secretJwt?.accessToken}`
    )

    mutate(updateWaiting)

    return updateWaiting
  }

  return {
    waiting: data,
    waitingError: error,
    waitingIsLoading: isLoading,
    updateWaitingMessage,
  }
}
