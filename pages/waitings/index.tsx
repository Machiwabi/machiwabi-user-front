import LGuestUserLayout from '../../components/layouts/LGuestUserLayout'
import { SRecommendSignInScreen } from '../../components/screens/SRecommendSignInScreen'
import { SWaitingsScreen } from '../../components/screens/SWaitingsScreen'
import { applicationProperties } from '../../constants/applicationProperties'
import { waitingsUrl } from '../../helpers/url.helper'
import { useAuthenticatedStore } from '../../recoil/authenticatedStore/useAuthenticatedStore'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  const { authenticated } = useAuthenticatedStore()

  if (authenticated !== 'authenticated') {
    return (
      <SRecommendSignInScreen
        redirectUrl={`${applicationProperties.HOSTING_URL}${waitingsUrl()}`}
      />
    )
  }
  return <SWaitingsScreen />
}

Page.getLayout = LGuestUserLayout

export default Page
