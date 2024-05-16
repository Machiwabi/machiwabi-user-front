import { Box, Container } from '@mantine/core'
import { useRouter } from 'next/router'
import { ERollTabs } from '../../componentsNew/elements/ERollTabs/ERollTabs'
import { OFooterNav } from '../../componentsNew/organisms/OFooterNav'
import { OHeaderNav } from '../../componentsNew/organisms/OHeaderNav'
import { OMissionList } from '../../componentsNew/organisms/OMissionList'
import { OWaitingHeader } from '../../componentsNew/organisms/OWaitingHeader'
import { OWaitingTabs } from '../../componentsNew/organisms/OWaitingTabs'
import { boosterMock } from '../../mocks/booster.mock'

const Page = () => {
  const router = useRouter()

  return (
    <>
      <OHeaderNav />
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
