import LGuestUserLayout from '../../../componentsNew/layouts/LGuestUserLayout'
import { SUserEditScreen } from '../../../componentsNew/screens/SUserEditScreen'
import { NextPageWithLayout } from '../../_app'

const Page: NextPageWithLayout = () => {
  return <SUserEditScreen />
}

Page.getLayout = LGuestUserLayout

export default Page
