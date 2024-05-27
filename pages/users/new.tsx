import LGuestUserLayout from '../../components/00_layouts/LGuestUserLayout'
import { SUserRegistrationScreen } from '../../components/04_screens/SUserRegistrationScreen'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return <SUserRegistrationScreen />
}

Page.getLayout = LGuestUserLayout

export default Page
