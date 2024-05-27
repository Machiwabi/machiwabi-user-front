import LGuestUserLayout from '../../components/layouts/LGuestUserLayout'
import { SUserRegistrationScreen } from '../../components/screens/SUserRegistrationScreen'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return <SUserRegistrationScreen />
}

Page.getLayout = LGuestUserLayout

export default Page
