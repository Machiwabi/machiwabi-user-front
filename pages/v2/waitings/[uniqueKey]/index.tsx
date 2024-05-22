import { Container, Tabs } from '@mantine/core'
import LGuestUserLayout from '../../../../componentsNew/layouts/LGuestUserLayout'
import { OHeaderNav } from '../../../../componentsNew/organisms/OHeaderNav'
import { SWaitingScreen } from '../../../../componentsNew/screens/SWaitingScreen'
import { useAuthenticatedStore } from '../../../../recoil/authenticatedStore/useAuthenticatedStore'
import { NextPageWithLayout } from '../../../_app'
import { OWaitingHeader } from '../../../../componentsNew/organisms/OWaitingHeader'
import { OWaitingTabs } from '../../../../componentsNew/organisms/OWaitingTabs'
import { OFooterNav } from '../../../../componentsNew/organisms/OFooterNav'
import { SMembersScreen } from '../../../../componentsNew/screens/SMembersScreen'

type Props = {
  uniqueKey: string
}

const Page: NextPageWithLayout = () => {
  const { authenticated } = useAuthenticatedStore()

  if (authenticated !== 'authenticated') {
    return <>TODO WaitingsGuestScreen</>
  }
  return (
    <>
      <Tabs variant="pills" defaultValue={'HOME'}>
        <OWaitingHeader mt={24} px={16} />
        <OWaitingTabs current="HOME" />

        <Tabs.Panel value="HOME">
          <SWaitingScreen />
        </Tabs.Panel>

        <Tabs.Panel value="MEMBERS">
          <SMembersScreen />
        </Tabs.Panel>
      </Tabs>
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
