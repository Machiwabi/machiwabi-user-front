import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { FC } from 'react'
import { WaitingMainScreen } from '../../../../_old-cmp/screens/WaitingMainScreen'
import { WaitingMembersScreen } from '../../../../_old-cmp/screens/WaitingMembersScreen'
import { WaitingMissionsScreen } from '../../../../_old-cmp/screens/WaitingMissionsScreen'
import { WaitingRewardScreen } from '../../../../_old-cmp/screens/WaitingRewardScreen'
import { LoadingTemplate } from '../../../../_old-cmp/templates/LoadingTemplate'
import { useWaiting } from '../../../../hooks/resources/useWaiting'
import { NewHeaderSection } from '../../../../partials/common/NewHeaderSection'
import RevisedLayout from '../../../../partials/common/RevisedLayout'
import { NextPageWithLayout } from '../../../_app'

type Props = {
  uniqueKey: string
}

const Page: NextPageWithLayout<Props> = ({ uniqueKey }) => {
  return (
    <>
      <MainBlock uniqueKey={uniqueKey} />
    </>
  )
}

Page.getLayout = RevisedLayout

export default Page

// private components -------------------------

type MainBlockProps = {
  uniqueKey: string
}

const MainBlock: FC<MainBlockProps> = ({ uniqueKey }) => {
  const { waiting, waitingError, waitingIsLoading } = useWaiting({ uniqueKey })

  if (waitingError) return <>読み込みエラー</>
  if (!waiting || !waiting.event || waitingIsLoading) return <LoadingTemplate />

  return (
    <>
      <NewHeaderSection
        waitingPoint={waiting.totalPoint}
        userDisplayName={waiting.user?.displayName}
      />
      <Tabs>
        <Box pos="relative" bg="white" zIndex={10}>
          <TabList maxW="lg" w="100%" mx="auto">
            <Tab w="33.33%" fontSize={12}>
              ホーム
            </Tab>
            <Tab w="33.33%" fontSize={12}>
              メンバー
            </Tab>
            <Tab w="33.33%" fontSize={12}>
              ミッション
            </Tab>
            <Tab w="33.33%" fontSize={12}>
              リワード
            </Tab>
          </TabList>
        </Box>
        <TabPanels minH={'600px'}>
          <TabPanel p={0}>
            <WaitingMainScreen waitingUniqueKey={waiting.uniqueKey} />
          </TabPanel>
          <TabPanel p={0}>
            <WaitingMembersScreen eventUniqueKey={waiting.event.uniqueKey} />
          </TabPanel>
          <TabPanel p={0}>
            <WaitingMissionsScreen waitingUniqueKey={waiting.uniqueKey} />
          </TabPanel>
          <TabPanel p={0}>
            <WaitingRewardScreen waitingUniqueKey={waiting.uniqueKey} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

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
