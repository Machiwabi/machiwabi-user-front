import { SWRConfig, unstable_serialize } from 'swr'
import LApplicationLayout from '../../../components/00_layouts/LApplicationLayout'
import { SMissionScreen } from '../../../components/04_screens/SMissionScreen'
import { BoosterEntity } from '../../../generated/graphql'
import { BoosterRepository } from '../../../repositories/BoosterRepository'
import { NextPageWithLayout } from '../../_app'
import { useRouter } from 'next/router'
import { useWaitingFromBooster } from '../../../hooks/resources/useWaitingFromBooster'
import { useEffect } from 'react'

type SWRFallbackValue = {
  [key: string]: BoosterEntity
}

type Props = {
  uniqueKey: string
  fallback: SWRFallbackValue
}

// このページはwaitingUniqueKeyの存在が必須であるが、
// 一方でバンドル時間の節約のためにSSGをしている。背景は読み込み速度の向上。
// SSGされるのは空のページであり、queryにあるwaitingUniqueKeyを取得してから
// clientサイドでデータを取得することで体験として成り立たせている
const Page: NextPageWithLayout<Props> = ({ uniqueKey, fallback }) => {
  const router = useRouter()
  const { waitingUniqueKey } = router.query
  const { waiting } = useWaitingFromBooster({ boosterUniqueKey: uniqueKey })

  useEffect(() => {
    // getParamaterのwaitingUniqueKeyがない　かつ　waitingが存在する場合
    // waitingUniqueKeyを設定してリダイレクトする
    if (waitingUniqueKey === undefined && waiting) {
      router.push(
        `/missions/${uniqueKey}?waitingUniqueKey=${waiting?.uniqueKey}`
      )
    }
  }, [waiting])

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
    <SWRConfig value={{ fallback }}>
      <SMissionScreen
        waitingUniqueKey={waitingUniqueKey || ''}
        boosterUniqueKey={uniqueKey}
      />
    </SWRConfig>
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
  const booster = await BoosterRepository.findOne({
    uniqueKey: params.uniqueKey,
  })

  const serialized = unstable_serialize([
    'BoosterDocument',
    { uniqueKey: params.uniqueKey },
  ])

  if (!booster) {
    return {
      notFound: true,
    }
  }

  try {
    return {
      props: {
        fallback: {
          [serialized]: booster,
        },
        uniqueKey: params.uniqueKey,
      } as Props,
    }
  } catch (e) {
    throw e
  }
}

export const getStaticPaths = async () => {
  const boosters = await BoosterRepository.findAll()

  return {
    paths: boosters.map((booster) => ({
      params: { uniqueKey: booster.uniqueKey },
    })),
    fallback: 'blocking',
  }
}
