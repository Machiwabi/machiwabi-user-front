import LGuestUserLayout from '../../../../../../componentsNew/layouts/LGuestUserLayout'
import { SMissionScreen } from '../../../../../../componentsNew/screens/SMissionScreen'
import { SMissionsScreen } from '../../../../../../componentsNew/screens/SMissionsScreen'
import { SWaitingTabsScreen } from '../../../../../../componentsNew/screens/SWaitingTabsScreen'
import { BoosterRepository } from '../../../../../../repositories/BoosterRepository'
import { WaitingRepository } from '../../../../../../repositories/WaitingRepository'
import { NextPageWithLayout } from '../../../../../_app'

type Props = {
  uniqueKey: string
  boosterUniqueKey: string
}

const Page: NextPageWithLayout<Props> = ({ uniqueKey, boosterUniqueKey }) => {
  return (
    <SMissionScreen
      waitingUniqueKey={uniqueKey}
      boosterUniqueKey={boosterUniqueKey}
    />
  )
}

Page.getLayout = LGuestUserLayout

export default Page

type Params = {
  params: {
    uniqueKey: string
    boosterUniqueKey: string
  }
}

export const getServerSideProps = async ({ params }: Params) => {
  const waiting = await WaitingRepository.findOne({
    uniqueKey: params.uniqueKey,
  })

  const booster = await BoosterRepository.findOne({
    uniqueKey: params.boosterUniqueKey,
  })

  if (!waiting || !booster) {
    return {
      notFound: true,
    }
  }

  try {
    return {
      props: {
        uniqueKey: params.uniqueKey,
        boosterUniqueKey: params.boosterUniqueKey,
      } as Props,
    }
  } catch (e) {
    throw e
  }
}