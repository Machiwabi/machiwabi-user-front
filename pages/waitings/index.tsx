import LGuestUserLayout from '../../components/00_layouts/LGuestUserLayout'
import { SRecommendSignInScreen } from '../../components/04_screens/SRecommendSignInScreen'
import { SWaitingsScreen } from '../../components/04_screens/SWaitingsScreen'
import { applicationProperties } from '../../constants/applicationProperties'
import { waitingsUrl } from '../../helpers/url.helper'
import { useSiweEoaAddress } from '../../hooks/resources/useSiweEoaAddress'
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
