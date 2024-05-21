import LGuestUserLayout from '../../../componentsNew/layouts/LGuestUserLayout'
import { useWaitings } from '../../../hooks/resources/useWaitings'
import { NextPageWithLayout } from '../../_app'

const Page: NextPageWithLayout = () => {
  const { waitings, waitingsError, waitingsIsLoading } = useWaitings()
  console.log(waitings, waitingsError, waitingsIsLoading)
  return <></>
}

Page.getLayout = LGuestUserLayout

export default Page
