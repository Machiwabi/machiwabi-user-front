import { useEffect } from 'react'
import LGuestUserLayout from '../../../componentsNew/layouts/LGuestUserLayout'
import { TLoadingTemplate } from '../../../componentsNew/templates/TLoadingTemplate'
import { useWeb3Auth } from '../../../hooks/useWeb3Auth'
import { NextPageWithLayout } from '../../_app'

const Page: NextPageWithLayout = () => {
  const { web3Auth, callbackedSignInWithEthereum } = useWeb3Auth()

  useEffect(() => {
    ;(async () => {
      await callbackedSignInWithEthereum('/v2/waitings')
    })()
  }, [web3Auth])

  return <TLoadingTemplate />
}

Page.getLayout = LGuestUserLayout

export default Page
