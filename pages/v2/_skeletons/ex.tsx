import { Container, Tabs } from '@mantine/core'
import { OFooterNav } from '../../../componentsNew/organisms/OFooterNav'
import { OHeaderNav } from '../../../componentsNew/organisms/OHeaderNav'
import { OWaitingHeader } from '../../../componentsNew/organisms/OWaitingHeader'
import { OWaitingTabs } from '../../../componentsNew/organisms/OWaitingTabs'
import { SWaitingScreen } from '../../../componentsNew/screens/SWaitingScreen'

const Page = () => {
  return (
    <>
      <OHeaderNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <Tabs variant="pills" defaultValue={'HOME'}>
          <OWaitingHeader mt={24} px={16} />
          <OWaitingTabs current="HOME" />

          <Tabs.Panel value="HOME">
            <SWaitingScreen />
          </Tabs.Panel>
        </Tabs>
      </Container>
      <OFooterNav />
    </>
  )
}

export default Page
