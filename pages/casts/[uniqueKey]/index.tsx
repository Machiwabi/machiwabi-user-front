import { SWRConfig, unstable_serialize } from 'swr'
import LApplicationLayout from '../../../components/00_layouts/LApplicationLayout'
import { SEventScreen } from '../../../components/04_screens/SEventScreen'
import { CastEntity, EventEntity } from '../../../generated/graphql'
import { EventRepository } from '../../../repositories/EventRepository'
import { NextPageWithLayout } from '../../_app'
import { CastRepository } from '../../../repositories/CastRepository'

type SWRFallbackValue = {
  [key: string]: CastEntity
}

type Props = {
  uniqueKey: string
  fallback: SWRFallbackValue
}

const Page: NextPageWithLayout<Props> = ({ uniqueKey, fallback }) => {
  return (
    <>
      {/* <SWRConfig value={{ fallback }}> */}
      {/* <SEventScreen uniqueKey={uniqueKey} /> */}
      {uniqueKey}
      {/* </SWRConfig> */}
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
  const cast = await CastRepository.findOne({
    uniqueKey: params.uniqueKey,
  })

  const serialized = unstable_serialize([
    'CastDocument',
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
          [serialized]: cast,
        },
        uniqueKey: params.uniqueKey,
      } as Props,
    }
  } catch (e) {
    throw e
  }
}

export const getStaticPaths = async () => {
  const casts = await CastRepository.findAll()

  return {
    paths: casts.map((cast) => ({
      params: { uniqueKey: cast.uniqueKey },
    })),
    fallback: 'blocking',
  }
}
