import LGuestUserLayout from '../../components/00_layouts/LGuestUserLayout'
import { SSignOutScreen } from '../../components/04_screens/SSignOutScreen'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return <SSignOutScreen />
}

Page.getLayout = LGuestUserLayout

export default Page
