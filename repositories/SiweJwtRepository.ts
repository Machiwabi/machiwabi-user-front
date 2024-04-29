import { SiweMessage } from 'siwe'
import { RestApiClient } from '../apis/RestApiClient'
import { SiweJwt } from '../entities/SiweJwt'

const login = async (message: SiweMessage, signature: string) => {
  const client = new RestApiClient()

  try {
    const result = await client.authentication.login({
      headers: { 'Content-Type': 'application/json' },
      data: { message, signature },
      withCredentials: true,
    })

    const siweJwt: SiweJwt = new SiweJwt(result.data)

    return siweJwt
  } catch (e) {
    throw e
  }
}

const getSiweJwtFromBrowser = async (): Promise<SiweJwt | null> => {
  const atSiweJwt: string | null = await localStorage.getItem(
    'machiwabi.siweJwt'
  )
  if (atSiweJwt) {
    const siweJwt = new SiweJwt(JSON.parse(atSiweJwt))
    return siweJwt
  } else {
    return null
  }
}

const saveSiweJwtToBrowser = async (siweJwt: SiweJwt) => {
  try {
    localStorage.setItem('machiwabi.siweJwt', JSON.stringify(siweJwt))
    window.dispatchEvent(new Event('storage'))
  } catch (e) {
    throw e
  }
}

const removeSiweJwtFromBrowser = async () => {
  try {
    await localStorage.removeItem('machiwabi.siweJwt')
    window.dispatchEvent(new Event('storage'))
  } catch (e) {
    throw e
  }
}

export const SiweJwtRepository = {
  login,
  getSiweJwtFromBrowser,
  saveSiweJwtToBrowser,
  removeSiweJwtFromBrowser,
}
