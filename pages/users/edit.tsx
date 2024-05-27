import LGuestUserLayout from '../../components/layouts/LGuestUserLayout'
import { SUserEditScreen } from '../../components/screens/SUserEditScreen'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return <SUserEditScreen />
}

Page.getLayout = LGuestUserLayout

export default Page
