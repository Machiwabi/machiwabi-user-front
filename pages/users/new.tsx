import { useRouter } from 'next/router'
import LApplicationLayout from '../../components/00_layouts/LApplicationLayout'
import { SUserRegistrationScreen } from '../../components/04_screens/SUserRegistrationScreen'
import { NextPageWithLayout } from '../_app'
import { SUserRegistrationNoEmailScreen } from '../../components/04_screens/SUserRegistrationScreen/no-email'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { notRegisterEmail } = router.query

  if (notRegisterEmail) return <SUserRegistrationNoEmailScreen />
  return <SUserRegistrationScreen />
}

Page.getLayout = LApplicationLayout

export default Page
