import LGuestUserLayout from '../../componentsNew/layouts/LGuestUserLayout'
import { SSignOutScreen } from '../../componentsNew/screens/SSignOutScreen'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return <SSignOutScreen />
}

Page.getLayout = LGuestUserLayout

export default Page
