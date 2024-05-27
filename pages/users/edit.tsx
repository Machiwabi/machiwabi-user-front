import LGuestUserLayout from '../../komponents/layouts/LGuestUserLayout'
import { SUserEditScreen } from '../../komponents/screens/SUserEditScreen'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return <SUserEditScreen />
}

Page.getLayout = LGuestUserLayout

export default Page
