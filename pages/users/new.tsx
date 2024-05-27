import LGuestUserLayout from '../../componentsNew/layouts/LGuestUserLayout'
import { SUserRegistrationScreen } from '../../componentsNew/screens/SUserRegistrationScreen'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return <SUserRegistrationScreen />
}

Page.getLayout = LGuestUserLayout

export default Page
