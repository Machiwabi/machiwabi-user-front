import { SWRConfig, unstable_serialize } from 'swr'
import LGuestUserLayout from '../../../components/00_layouts/LGuestUserLayout'
import { SEventScreen } from '../../../components/04_screens/SEventScreen'
import { EventEntity } from '../../../generated/graphql'
import { EventRepository } from '../../../repositories/EventRepository'
import { NextPageWithLayout } from '../../_app'

type SWRFallbackValue = {
  [key: string]: EventEntity
}

type Props = {
  uniqueKey: string
  fallback: SWRFallbackValue
}

const Page: NextPageWithLayout<Props> = ({ uniqueKey, fallback }) => {
  return (
    <>
      <SWRConfig value={{ fallback }}>
        <SEventScreen uniqueKey={uniqueKey} />
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
  const event = await EventRepository.findOne({
    uniqueKey: params.uniqueKey,
  })

  const serialized = unstable_serialize([
    'EventDocument',
    { uniqueKey: params.uniqueKey },
  ])

  if (!event) {
    return {
      notFound: true,
    }
  }

  try {
    return {
      props: {
        fallback: {
          [serialized]: event,
        },
        uniqueKey: params.uniqueKey,
      } as Props,
    }
  } catch (e) {
    throw e
  }
}

export const getStaticPaths = async () => {
  const events = await EventRepository.findAll()

  return {
    paths: events.map((event) => ({
      params: { uniqueKey: event.uniqueKey },
    })),
    fallback: 'blocking',
  }
}
