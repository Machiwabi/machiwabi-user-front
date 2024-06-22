import { useEffect, useState } from 'react'
import useSWR from 'swr'
import {
  ConsumeWaitingRewardMutationVariables,
  ValidateConsumeableWaitingRewardQueryVariables,
  WaitingRewardEntity,
} from '../../generated/graphql'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'
import { WaitingRewardRepository } from '../../repositories/WaitingRewardRepository'

export const useConsumeReward = (
  variables: ValidateConsumeableWaitingRewardQueryVariables
) => {
  const [errorType, setErrorType] = useState<string | undefined>()

  const { data, error, isLoading } = useSWR<boolean>(
    ['ValidateConsumeableWaitingRewardDocument', variables],
    async () => {
      const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()
      return WaitingRewardRepository.isConsumeable(
        variables,
        `${secretJwt?.accessToken}`
      )
    }
  )
  const consumeReward = async (
    variables: ConsumeWaitingRewardMutationVariables
  ): Promise<WaitingRewardEntity> => {
    const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()

    return await WaitingRewardRepository.consume(
      variables,
      `${secretJwt?.accessToken}`
    )
  }

  useEffect(() => {
    if (!error) return
    if (`${error}`.includes('NotFoundError')) {
      setErrorType('NotFoundError')
    } else {
      setErrorType(`UnknownError ${error}`)
    }
  }, [error])

  return {
    isRewardConsumeable: data,
    isRewardConsumeableError: error,
    isRewardConsumeableIsLoading: isLoading,
    consumeRewardErrorType: errorType,
    consumeReward,
  }
}
