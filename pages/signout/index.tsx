import LApplicationLayout from '../../components/00_layouts/LApplicationLayout'
import { SSignOutScreen } from '../../components/04_screens/SSignOutScreen'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return <SSignOutScreen />
}

Page.getLayout = LApplicationLayout

export default Page
