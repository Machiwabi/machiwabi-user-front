import { Container } from '@mantine/core'
import { OAquiredRewardCells } from '../../../componentsNew/organisms/OAquiredRewardCells'
import { OFooterNav } from '../../../componentsNew/organisms/OFooterNav'
import { OHeaderNav } from '../../../componentsNew/organisms/OHeaderNav'
import { OWaitingHeader } from '../../../componentsNew/organisms/OWaitingHeader'
import { OWaitingTabs } from '../../../componentsNew/organisms/OWaitingTabs'
import { rewardMock, rewardMocks } from '../../../mocks/reward.mock'
import { waitingRewardMocks } from '../../../mocks/waitingReward.mock'

const Page = () => {
  return (
    <>
      <OHeaderNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <OWaitingHeader mt={24} px={16} />
        <OWaitingTabs px={16} current="AQUIRED" />

        <OAquiredRewardCells
          px={16}
          cellingRewards={rewardMocks}
          aquiredWaitingRewards={waitingRewardMocks}
        />
      </Container>
      <OFooterNav />
    </>
  )
}

export default Page
