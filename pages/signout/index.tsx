import LGuestUserLayout from '../../komponents/layouts/LGuestUserLayout'
import { SSignOutScreen } from '../../komponents/screens/SSignOutScreen'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return <SSignOutScreen />
}

Page.getLayout = LGuestUserLayout

export default Page
