import LGuestUserLayout from '../../../../../components/00_layouts/LGuestUserLayout'
import { TErrorTemplate } from '../../../../../components/03_templates/TErrorTemplate'
import { waitingMissionsUrl } from '../../../../../helpers/url.helper'
import { NextPageWithLayout } from '../../../../_app'

type Props = {
  uniqueKey: string
  boosterUniqueKey: string
}

const Page: NextPageWithLayout<Props> = ({ uniqueKey }) => {
  return (
    <TErrorTemplate
      heading="決済は完了していません"
      description="中断または決済エラーにより決済は行われませんでした"
      href={waitingMissionsUrl(uniqueKey)}
      displayReloadButton={false}
    />
  )
}

Page.getLayout = LGuestUserLayout

export default Page

type Params = {
  params: {
    uniqueKey: string
    boosterUniqueKey: string
  }
}

export const getServerSideProps = async ({ params }: Params) => {
  try {
    return {
      props: {
        uniqueKey: params.uniqueKey,
        boosterUniqueKey: params.boosterUniqueKey,
      } as Props,
    }
  } catch (e) {
    throw e
  }
}
