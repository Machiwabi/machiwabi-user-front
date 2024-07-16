import { Button } from '@mantine/core'
import LGuestUserLayout from '../../components/00_layouts/LGuestUserLayout'
import { SRecommendSignInScreen } from '../../components/04_screens/SRecommendSignInScreen'
import { SWaitingsScreen } from '../../components/04_screens/SWaitingsScreen'
import { Seo } from '../../components/99_seo/waitings/Seo'
import { applicationProperties } from '../../constants/applicationProperties'
import { waitingsUrl } from '../../helpers/url.helper'
import { usePushNotificationRegistration } from '../../hooks/usePushNotificationRegistration'
import { useAuthenticatedStore } from '../../recoil/authenticatedStore/useAuthenticatedStore'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  const { authenticated } = useAuthenticatedStore()

  const { register } = usePushNotificationRegistration()

  if (authenticated !== 'authenticated') {
    return (
      <>
        <Seo />
        <SRecommendSignInScreen
          redirectUrl={`${applicationProperties.HOSTING_URL}${waitingsUrl()}`}
        />
        <Button
          onClick={() => {
            register()
          }}
        >
          Push登録
        </Button>
      </>
    )
  }
  return (
    <>
      <SWaitingsScreen />
      <Button
        onClick={() => {
          register()
        }}
      >
        Push登録
      </Button>
    </>
  )
}

Page.getLayout = LGuestUserLayout

export default Page
