import LGuestUserLayout from '../../../componentsNew/layouts/LGuestUserLayout'
import { SRecommendSignInScreen } from '../../../componentsNew/screens/SRecommendSignInScreen'
import { SWaitingsScreen } from '../../../componentsNew/screens/SWaitingsScreen'
import { useWeb3Auth } from '../../../hooks/useWeb3Auth'
import { NextPageWithLayout } from '../../_app'

const Page: NextPageWithLayout = () => {
  const { isWeb3AuthConnected } = useWeb3Auth()

  if (!isWeb3AuthConnected) return <SRecommendSignInScreen />

  return <SWaitingsScreen />
}

Page.getLayout = LGuestUserLayout

export default Page
