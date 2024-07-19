import { useRouter } from 'next/router'
import LGuestLayout from '../../components/00_layouts/LGuestLayout'
import { SUserRegistrationScreen } from '../../components/04_screens/SUserRegistrationScreen'
import { NextPageWithLayout } from '../_app'
import { SUserRegistrationNoEmailScreen } from '../../components/04_screens/SUserRegistrationScreen/no-email'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { notRegisterEmail } = router.query

  if (notRegisterEmail) return <SUserRegistrationNoEmailScreen />
  return <SUserRegistrationScreen />
}

Page.getLayout = LGuestLayout

export default Page
