import LGuestUserLayout from '../../components/00_layouts/LGuestUserLayout'
import { SRecommendSignInScreen } from '../../components/04_screens/SRecommendSignInScreen'
import { SWaitingsScreen } from '../../components/04_screens/SWaitingsScreen'
import { Seo } from '../../components/99_seo/waitings/Seo'
import { applicationProperties } from '../../constants/applicationProperties'
import { waitingsUrl } from '../../helpers/url.helper'
import { useAuthenticatedStore } from '../../recoil/authenticatedStore/useAuthenticatedStore'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  const { authenticated } = useAuthenticatedStore()

  if (authenticated !== 'authenticated') {
    return (
      <>
        <Seo />
        <SRecommendSignInScreen
          redirectUrl={`${applicationProperties.HOSTING_URL}${waitingsUrl()}`}
        />
      </>
    )
  }
  return (
    <>
      <SWaitingsScreen />
    </>
  )
}

Page.getLayout = LGuestUserLayout

export default Page
