import LGuestUserLayout from '../../../components/00_layouts/LGuestUserLayout'
import { SWaitingTabsScreen } from '../../../components/04_screens/SWaitingTabsScreen'
import { WaitingRepository } from '../../../repositories/WaitingRepository'
import { NextPageWithLayout } from '../../_app'

type Props = {
  uniqueKey: string
}

const Page: NextPageWithLayout<Props> = ({ uniqueKey }) => {
  return (
    <SWaitingTabsScreen waitingUniqueKey={uniqueKey} currentTabValue="HOME" />
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

// Next.jsのISRレンダー用のパスを提供
export const getStaticPaths = async () => {
  const waitings = await WaitingRepository.findAll()

  if (waitings != null) {
    return {
      paths: waitings.map((waiting) => {
        if (waiting != null) {
          return { params: { uniqueKey: waiting.uniqueKey } }
        }
      }),
      // generateしていない場合、404を出すのではなく
      // 再生成するように変更
      fallback: 'blocking',
    }
  }
}
