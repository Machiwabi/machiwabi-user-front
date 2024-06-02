import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import useSWR from 'swr'
import { SiweJwt } from '../../entities/SiweJwt'
import { SiweJwtRepository } from '../../repositories/SiweJwtRepository'
import { authenticatedStore } from './authenticatedStore'

const isAvailableJwt = (jwt: SiweJwt) => {
  return jwt.expiresAt > Date.now() && (jwt.accessToken ? true : false)
}

export const useAuthenticatedStore = () => {
  const [authenticated, setAuthenticated] = useRecoilState(authenticatedStore)
  const [secretJwt, setSecretJwt] = useState<string>('')

  const { data } = useSWR(
    'authKey',
    async () => {
      return await SiweJwtRepository.getSiweJwtFromBrowser()
    },
    {
      refreshInterval: 5000,
    }
  )

  useEffect(() => {
    const jwtAvailable = data ? isAvailableJwt(data) : false
    setAuthenticated(jwtAvailable ? 'authenticated' : 'unauthenticated')
    setSecretJwt(data?.accessToken || '')
  }, [data, setAuthenticated])

  const markAsLoading = () => {
    setAuthenticated('loading')
  }

  const isAuthenticated = () => {
    return authenticated === 'authenticated'
  }

  return { secretJwt, authenticated, isAuthenticated, markAsLoading }
}
