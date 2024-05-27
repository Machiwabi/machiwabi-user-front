import LGuestUserLayout from '../../../../../komponents/layouts/LGuestUserLayout'
import { SAquiredRewardScreen } from '../../../../../komponents/screens/SAquiredRewardScreen'
import { RewardRepository } from '../../../../../repositories/RewardRepository'
import { WaitingRepository } from '../../../../../repositories/WaitingRepository'
import { NextPageWithLayout } from '../../../../_app'

type Props = {
  uniqueKey: string
  rewardUniqueKey: string
}

const Page: NextPageWithLayout<Props> = ({ uniqueKey, rewardUniqueKey }) => {
  return (
    <SAquiredRewardScreen
      waitingUniqueKey={uniqueKey}
      rewardUniqueKey={rewardUniqueKey}
    />
  )
}

Page.getLayout = LGuestUserLayout

export default Page

type Params = {
  params: {
    uniqueKey: string
    rewardUniqueKey: string
  }
}

export const getServerSideProps = async ({ params }: Params) => {
  const waiting = await WaitingRepository.findOne({
    uniqueKey: params.uniqueKey,
  })

  const reward = await RewardRepository.findOne({
    uniqueKey: params.rewardUniqueKey,
  })

  if (!waiting || !reward) {
    return {
      notFound: true,
    }
  }

  try {
    return {
      props: {
        uniqueKey: params.uniqueKey,
        rewardUniqueKey: params.rewardUniqueKey,
      } as Props,
    }
  } catch (e) {
    throw e
  }
}
