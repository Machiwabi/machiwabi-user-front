import LGuestUserLayout from '../../../components/00_layouts/LGuestUserLayout'
import { SEventScreen } from '../../../components/04_screens/SEventScreen'
import { EventRepository } from '../../../repositories/EventRepository'
import { NextPageWithLayout } from '../../_app'

type Props = {
  uniqueKey: string
}

const Page: NextPageWithLayout<Props> = ({ uniqueKey }) => {
  return (
    <>
      <SEventScreen uniqueKey={uniqueKey} />
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

export const getServerSideProps = async ({ params }: Params) => {
  const waiting = await EventRepository.findOne({
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
