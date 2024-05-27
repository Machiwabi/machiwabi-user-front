import LGuestUserLayout from '../../komponents/layouts/LGuestUserLayout'
import { SUserRegistrationScreen } from '../../komponents/screens/SUserRegistrationScreen'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return <SUserRegistrationScreen />
}

Page.getLayout = LGuestUserLayout

export default Page
