import { Box, Container } from '@mantine/core'
import { useRouter } from 'next/router'
import { ERollTabs } from '../../componentsNew/elements/ERollTabs/ERollTabs'
import { OFooterNav } from '../../componentsNew/organisms/OFooterNav'
import { OHeaderNav } from '../../componentsNew/organisms/OHeaderNav'
import { OMissionList } from '../../componentsNew/organisms/OMissionList'
import { OWaitingHeader } from '../../componentsNew/organisms/OWaitingHeader'
import { boosterMock } from '../../mocks/booster.mock'

const Page = () => {
  const router = useRouter()

  return (
    <>
      <OHeaderNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <OWaitingHeader mt={24} px={16} />

        <Box px={16}>
          <ERollTabs
            tabs={[
              {
                name: 'HOME',
                isCurrent: false,
                action: () => {
                  router.push('/v2/')
                },
              },
              {
                name: 'MEMBERS',
                isCurrent: false,
                action: () => {},
              },
              {
                name: 'MISSONS',
                isCurrent: true,
                action: () => {},
              },
              {
                name: 'REWARDS',
                isCurrent: false,
                action: () => {},
              },
              {
                name: 'BOOSTERS',
                isCurrent: false,
                action: () => {},
              },
              {
                name: 'AQUIRES',
                isCurrent: false,
                action: () => {},
              },
              {
                name: 'INFORMATION',
                isCurrent: false,
                action: () => {},
              },
            ]}
          />
        </Box>

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
