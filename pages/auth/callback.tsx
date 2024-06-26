import { GetServerSideProps } from 'next'
import { useEffect } from 'react'
import LGuestUserLayout from '../../components/00_layouts/LGuestUserLayout'
import { TLoadingTemplate } from '../../components/03_templates/TLoadingTemplate'
import { Seo } from '../../components/99_seo/auth/callback/Seo'
import { GA4_CUSTOM_EVENT } from '../../constants/ga4CustomEvent'
import { waitingsUrl } from '../../helpers/url.helper'
import { useWeb3Auth } from '../../hooks/useWeb3Auth'
import { ga4PushEvent } from '../../utils/ga4'
import { NextPageWithLayout } from '../_app'

type PageProps = {
  notRegisterEmail: string | null
}

const Page: NextPageWithLayout<PageProps> = ({ notRegisterEmail }) => {
  const authCallbackParams = notRegisterEmail
    ? [{ key: 'notRegisterEmail', value: 'true' }]
    : undefined
  const { web3Auth, callbackedSignInWithEthereum } = useWeb3Auth({
    authCallbackParams,
  })

  useEffect(() => {
    ga4PushEvent(GA4_CUSTOM_EVENT.COMPLETE_CREATE_WALLET_ADDRESS)
    ;(async () => {
      const url = notRegisterEmail
        ? waitingsUrl([{ key: 'notRegisterEmail', value: 'true' }])
        : waitingsUrl()
      await callbackedSignInWithEthereum(url)
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

// サーバーサイドでのprops取得関数
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const { notRegisterEmail } = query

  return {
    props: {
      notRegisterEmail: notRegisterEmail || null,
    },
  }
}
