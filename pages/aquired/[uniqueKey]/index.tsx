import { useRouter } from 'next/router'
import { SWRConfig, unstable_serialize } from 'swr'
import LGuestUserLayout from '../../../components/00_layouts/LGuestUserLayout'
import { SAquiredRewardScreen } from '../../../components/04_screens/SAquiredRewardScreen'
import { RewardEntity } from '../../../generated/graphql'
import { RewardRepository } from '../../../repositories/RewardRepository'
import { NextPageWithLayout } from '../../_app'

type SWRFallbackValue = {
  [key: string]: RewardEntity
}

type Props = {
  uniqueKey: string
  fallback: SWRFallbackValue
}

const Page: NextPageWithLayout<Props> = ({ uniqueKey, fallback }) => {
  const router = useRouter()
  const { waitingUniqueKey } = router.query

  if (waitingUniqueKey === undefined) {
    return (
      <>
        <SWRConfig value={{ fallback }} />
      </>
    )
  } else if (Array.isArray(waitingUniqueKey)) {
    return (
      <>
        <SWRConfig value={{ fallback }} />
      </>
    )
  }

  return (
    <SAquiredRewardScreen
      waitingUniqueKey={waitingUniqueKey || ''}
      rewardUniqueKey={uniqueKey}
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

export const getStaticProps = async ({ params }: Params) => {
  const reward = await RewardRepository.findOne({
    uniqueKey: params.uniqueKey,
  })

  const serialized = unstable_serialize([
    'RewardDocument',
    { uniqueKey: params.uniqueKey },
  ])

  if (!reward) {
    return {
      notFound: true,
    }
  }

  try {
    return {
      props: {
        fallback: {
          [serialized]: reward,
        },
        uniqueKey: params.uniqueKey,
      } as Props,
    }
  } catch (e) {
    throw e
  }
}

export const getStaticPaths = async () => {
  const rewards = await RewardRepository.findAll()

  return {
    paths: rewards.map((reward) => ({
      params: { uniqueKey: reward.uniqueKey },
    })),
    fallback: 'blocking',
  }
}
