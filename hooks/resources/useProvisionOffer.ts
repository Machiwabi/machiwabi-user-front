import { ProvisionBoosterMutationVariables } from '../../generated/graphql'
import { BoosterRepository } from '../../repositories/BoosterRepository'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'

export const useProvisionBooster = () => {
  const provisionBooster = async (
    variables: ProvisionBoosterMutationVariables
  ) => {
    const secretJwt = await SiweJwtRepository.getSiweJwtFromBrowser()
    return await BoosterRepository.provision(
      variables,
      `${secretJwt?.accessToken}`
    )
  }

  return {
    provisionBooster,
  }
}
