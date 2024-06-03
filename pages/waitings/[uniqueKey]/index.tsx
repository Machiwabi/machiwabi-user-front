import { SWRConfig, unstable_serialize } from 'swr'
import LGuestUserLayout from '../../../components/00_layouts/LGuestUserLayout'
import { SWaitingTabsScreen } from '../../../components/04_screens/SWaitingTabsScreen'
import { WaitingRepository } from '../../../repositories/WaitingRepository'
import { NextPageWithLayout } from '../../_app'
import { WaitingEntity } from '../../../generated/graphql'

type SWRFallbackValue = {
  [key: string]: WaitingEntity
}

type Props = {
  uniqueKey: string
  fallback: SWRFallbackValue
}

const Page: NextPageWithLayout<Props> = ({ uniqueKey, fallback }) => {
  return (
    <>
      <SWRConfig value={{ fallback }}>
        <SWaitingTabsScreen waitingUniqueKey={uniqueKey} />
      </SWRConfig>
    </>
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
  const waiting = await WaitingRepository.findOne({
    uniqueKey: params.uniqueKey,
  })

  const serialized = unstable_serialize([
    'WaitingDocument',
    { uniqueKey: params.uniqueKey },
  ])

  if (!waiting) {
    return {
      notFound: true,
    }
  }

  try {
    return {
      props: {
        fallback: {
          [serialized]: waiting,
        },
        uniqueKey: params.uniqueKey,
      } as Props,
    }
  } catch (e) {
    throw e
  }
}

export const getStaticPaths = async () => {
  const waitings = await WaitingRepository.all()

  return {
    paths: waitings.map((waiting) => ({
      params: { uniqueKey: waiting.uniqueKey },
    })),
    fallback: 'blocking',
  }
}
