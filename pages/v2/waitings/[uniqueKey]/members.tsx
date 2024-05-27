import LGuestUserLayout from '../../../../componentsNew/layouts/LGuestUserLayout'
import { SWaitingTabsScreen } from '../../../../componentsNew/screens/SWaitingTabsScreen'
import { WaitingRepository } from '../../../../repositories/WaitingRepository'
import { NextPageWithLayout } from '../../../_app'

type Props = {
  uniqueKey: string
}

const Page: NextPageWithLayout<Props> = ({ uniqueKey }) => {
  return (
    <SWaitingTabsScreen
      waitingUniqueKey={uniqueKey}
      currentTabValue="MEMBERS"
    />
  )
}

Page.getLayout = LGuestUserLayout

export default Page

type Params = {
  params: {
    uniqueKey: string
  }
}

export const getServerSideProps = async ({ params }: Params) => {
  const waiting = await WaitingRepository.findOne({
    uniqueKey: params.uniqueKey,
  })

  if (!waiting) {
    return {
      notFound: true,
    }
  }

  try {
    return {
      props: {
        uniqueKey: params.uniqueKey,
      } as Props,
    }
  } catch (e) {
    throw e
  }
}