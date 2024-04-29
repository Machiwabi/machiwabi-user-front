import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import useSWR from 'swr'
import { authenticatedStore } from './authenticatedStore'
import { useUserPrivate } from '../../hooks/resources/useUserPrivate'

const fetcher = () => {
  const jwtData = localStorage.getItem('machiwabi.siweJwt')
  if (jwtData) {
    const jwtObject = JSON.parse(jwtData)

    if (jwtObject.expiresAt <= Date.now()) {
      localStorage.removeItem('machiwabi.siweJwt')
      return false
    }

    return jwtObject.accessToken ? true : false
  }
  return false
}

export const useAuthenticatedStore = () => {
  const [authenticated, setAuthenticated] = useRecoilState(authenticatedStore)
  const [secretJwt, setSecretJwt] = useState<string>('')
  const { upsertUser } = useUserPrivate()

  const { data } = useSWR('authKey', fetcher, {
    refreshInterval: 5000, // 5 seconds
  })

  useEffect(() => {
    setAuthenticated(data ? 'authenticated' : 'unauthenticated')
  }, [data, setAuthenticated])

  useEffect(() => {
    const handleStorageChange = (e: any) => {
      if (e.currentTarget.localStorage['machiwabi.siweJwt']) {
        const jwtObject = JSON.parse(
          e.currentTarget.localStorage['machiwabi.siweJwt']
        )
        setSecretJwt(jwtObject.accessToken)
        setAuthenticated('authenticated')
        upsertUser(jwtObject.accessToken)
      } else {
        setAuthenticated('unauthenticated')
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [setAuthenticated])

  const markAsLoading = () => {
    setAuthenticated('loading')
  }

  return { secretJwt, authenticated, markAsLoading }
}
