import { Container } from '@mantine/core'
import { OFooterNav } from '../../componentsNew/organisms/OFooterNav'
import { OHeaderGuestNav } from '../../componentsNew/organisms/OHeaderGuestNav'
import { OMissionList } from '../../componentsNew/organisms/OMissionList'
import { OWaitingHeader } from '../../componentsNew/organisms/OWaitingHeader'
import { OWaitingTabs } from '../../componentsNew/organisms/OWaitingTabs'
import { boosterMock } from '../../mocks/booster.mock'

const Page = () => {
  return (
    <>
      <OHeaderGuestNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <OWaitingHeader mt={24} px={16} />
        <OWaitingTabs px={16} current="MISSIONS" />

        <OMissionList
          px={16}
          boosters={[boosterMock, boosterMock, boosterMock]}
        />
      </Container>
      <OFooterNav />
    </>
  )
}

export default Page
