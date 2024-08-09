import useSWR from 'swr'
import { CastEntity, CastQueryVariables } from '../../generated/graphql'
import { CastRepository } from '../../repositories/CastRepository'

export const useCast = (variables: CastQueryVariables) => {
  const { data, error, isLoading } = useSWR<CastEntity>(
    ['CastDocument', variables],
    async () => {
      return CastRepository.findOne(variables)
    }
  )

  return {
    cast: data,
    castError: error,
    castIsLoading: isLoading,
  }
}
