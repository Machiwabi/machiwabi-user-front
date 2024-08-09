import { SWRConfig, unstable_serialize } from 'swr'
import LApplicationLayout from '../../../components/00_layouts/LApplicationLayout'
import { SCastScreen } from '../../../components/04_screens/SCastScreen'
import { CastEntity } from '../../../generated/graphql'
import { CastRepository } from '../../../repositories/CastRepository'
import { NextPageWithLayout } from '../../_app'

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
      <SWRConfig value={{ fallback }}>
        <SCastScreen uniqueKey={uniqueKey} />
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
  const cast = await CastRepository.findOne({
    uniqueKey: params.uniqueKey,
  })

  const serialized = unstable_serialize([
    'CastDocument',
    { uniqueKey: params.uniqueKey },
  ])

  if (!cast) {
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
