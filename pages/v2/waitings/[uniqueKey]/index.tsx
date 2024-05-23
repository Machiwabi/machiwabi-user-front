import { Tabs } from '@mantine/core'
import LGuestUserLayout from '../../../../componentsNew/layouts/LGuestUserLayout'
import { OWaitingHeader } from '../../../../componentsNew/organisms/OWaitingHeader'
import { OWaitingTabs } from '../../../../componentsNew/organisms/OWaitingTabs'
import { SMembersScreen } from '../../../../componentsNew/screens/SMembersScreen'
import { SMissionsScreen } from '../../../../componentsNew/screens/SMissionsScreen'
import { SRewardsScreen } from '../../../../componentsNew/screens/SRewardsScreen'
import { SWaitingScreen } from '../../../../componentsNew/screens/SWaitingScreen'
import { TErrorTemplate } from '../../../../componentsNew/templates/TErrorTemplate'
import { TLoadingTemplate } from '../../../../componentsNew/templates/TLoadingTemplate'
import { useWaiting } from '../../../../hooks/resources/useWaiting'
import { WaitingRepository } from '../../../../repositories/WaitingRepository'
import { NextPageWithLayout } from '../../../_app'

type Props = {
  uniqueKey: string
}

const Page: NextPageWithLayout<Props> = ({ uniqueKey }) => {
  // const { authenticated } = useAuthenticatedStore()

  // if (authenticated !== 'authenticated') {
  //   return <>TODO WaitingsGuestScreen</>
  // }

  const { waiting, waitingError, waitingIsLoading } = useWaiting({ uniqueKey })

  if (waitingError) return <TErrorTemplate />
  if (waitingIsLoading || !waiting) return <TLoadingTemplate />

  return (
    <>
      <Tabs variant="pills" defaultValue={'HOME'}>
        <OWaitingHeader mt={24} px={16} />
        <OWaitingTabs current="HOME" />

        <Tabs.Panel value="HOME">
          <SWaitingScreen waitingUniqueKey={uniqueKey} />
        </Tabs.Panel>

        <Tabs.Panel value="MEMBERS">
          <SMembersScreen eventUniqueKey={waiting.event.uniqueKey} />
        </Tabs.Panel>

        <Tabs.Panel value="MISSIONS">
          <SMissionsScreen eventUniqueKey={waiting.event.uniqueKey} />
        </Tabs.Panel>

        <Tabs.Panel value="REWARDS">
          <SRewardsScreen eventUniqueKey={waiting.event.uniqueKey} />
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