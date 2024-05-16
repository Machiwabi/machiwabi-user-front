import ApplicationLayout from '../../../partials/common/ApplicationLayout'
import { NextPageWithLayout } from '../../_app'

type Props = {
  uniqueKey: string
}

const Page: NextPageWithLayout<Props> = ({ uniqueKey }) => {
  return <></>
}

Page.getLayout = ApplicationLayout

export default Page
