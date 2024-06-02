import { useEffect } from 'react'
import LGuestUserLayout from '../../components/00_layouts/LGuestUserLayout'
import { TLoadingTemplate } from '../../components/03_templates/TLoadingTemplate'
import { useWeb3Auth } from '../../hooks/useWeb3Auth'
import { NextPageWithLayout } from '../_app'
import { waitingsUrl } from '../../helpers/url.helper'
import { Seo } from '../../components/99_seo/auth/callback/Seo'
import { GA4_CUSTOM_EVENT } from '../../constants/ga4CustomEvent'
import { ga4PushEvent } from '../../utils/ga4'

const Page: NextPageWithLayout = () => {
  const { web3Auth, callbackedSignInWithEthereum } = useWeb3Auth()

  useEffect(() => {
    ga4PushEvent(GA4_CUSTOM_EVENT.COMPLETE_CREATE_WALLET_ADDRESS)
    ;(async () => {
      await callbackedSignInWithEthereum(waitingsUrl())
    })()
  }, [web3Auth])

  return (
    <>
      <Seo />
      <TLoadingTemplate />
    </>
  )
}

Page.getLayout = LGuestUserLayout

export default Page
