import { useEffect } from 'react'
import LGuestUserLayout from '../../components/layouts/LGuestUserLayout'
import { TLoadingTemplate } from '../../components/templates/TLoadingTemplate'
import { useWeb3Auth } from '../../hooks/useWeb3Auth'
import { NextPageWithLayout } from '../_app'
import { waitingsUrl } from '../../helpers/url.helper'

const Page: NextPageWithLayout = () => {
  const { web3Auth, callbackedSignInWithEthereum } = useWeb3Auth()

  useEffect(() => {
    ;(async () => {
      await callbackedSignInWithEthereum(waitingsUrl())
    })()
  }, [web3Auth])

  return <TLoadingTemplate />
}

Page.getLayout = LGuestUserLayout

export default Page
