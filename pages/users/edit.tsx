import LGuestUserLayout from '../../components/00_layouts/LGuestUserLayout'
import { SUserEditScreen } from '../../components/04_screens/SUserEditScreen'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return <SUserEditScreen />
}

Page.getLayout = LGuestUserLayout

export default Page
