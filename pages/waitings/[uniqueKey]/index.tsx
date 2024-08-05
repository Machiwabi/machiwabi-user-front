import { SWRConfig, unstable_serialize } from 'swr'
import LApplicationLayout from '../../../components/00_layouts/LApplicationLayout'
import { SWaitingTabsScreen } from '../../../components/04_screens/SWaitingTabsScreen'
import { WaitingRepository } from '../../../repositories/WaitingRepository'
import { NextPageWithLayout } from '../../_app'
import { WaitingEntity } from '../../../generated/graphql'
import { Seo } from '../../../components/99_seo/waitings/[uniqueKey]/Seo'

type SWRFallbackValue = {
  [key: string]: WaitingEntity
}

type Props = {
  uniqueKey: string
  waitingEventTitle: string
  waitingUserDisplayName: string
  fallback: SWRFallbackValue
}

const Page: NextPageWithLayout<Props> = ({
  uniqueKey,
  waitingEventTitle,
  waitingUserDisplayName,
  fallback,
}) => {
  return (
    <>
      <SWRConfig value={{ fallback }}>
        <Seo
          waitingEventTitle={waitingEventTitle}
          waitingUserDisplayName={waitingUserDisplayName}
        />
        <SWaitingTabsScreen waitingUniqueKey={uniqueKey} />
      </SWRConfig>
    </>
  )
}

Page.getLayout = LApplicationLayout

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
        waitingEventTitle: waiting.event.name,
        waitingUserDisplayName: waiting.user.displayName,
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
