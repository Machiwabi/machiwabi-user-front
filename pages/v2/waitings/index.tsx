import LGuestUserLayout from '../../../componentsNew/layouts/LGuestUserLayout'
import { SRecommendSignInScreen } from '../../../componentsNew/screens/SRecommendSignInScreen'
import { SWaitingsScreen } from '../../../componentsNew/screens/SWaitingsScreen'
import { applicationProperties } from '../../../constants/applicationProperties'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { NextPageWithLayout } from '../../_app'

const Page: NextPageWithLayout = () => {
  const { authenticated } = useAuthenticatedStore()

  if (authenticated !== 'authenticated') {
    return (
      <SRecommendSignInScreen
        redirectUrl={`${applicationProperties.HOSTING_URL}/v2/waitings`}
      />
    )
  }
  return <SWaitingsScreen />
}

Page.getLayout = LGuestUserLayout

export default Page
