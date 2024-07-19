import LApplicationLayout from '../../components/00_layouts/LApplicationLayout'
import { SUserEditScreen } from '../../components/04_screens/SUserEditScreen'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return <SUserEditScreen />
}

Page.getLayout = LApplicationLayout

export default Page
