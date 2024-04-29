import useSWR from 'swr'
import { BoostersQuery, BoostersQueryVariables } from '../../generated/graphql'
import { BoosterRepository } from '../../repositories/BoosterRepository'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'

export const useBoosters = (variables: BoostersQueryVariables) => {
  const { data, error, isLoading } = useSWR<BoostersQuery>(
    ['BoosterDocument', variables],
    async () => {
      const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()
      return BoosterRepository.findMany(variables, `${secretJwt?.accessToken}`)
    }
  )

  return {
    boosters: data?.boosters,
    boostersError: error,
    boostersIsLoading: isLoading,
  }
}
