import { Container } from '@mantine/core'
import { OFooterNav } from '../../componentsNew/organisms/OFooterNav'
import { OHeaderGuestNav } from '../../componentsNew/organisms/OHeaderGuestNav'
import { ORewardCells } from '../../componentsNew/organisms/ORewardCells'
import { OWaitingHeader } from '../../componentsNew/organisms/OWaitingHeader'
import { OWaitingTabs } from '../../componentsNew/organisms/OWaitingTabs'
import { rewardMock } from '../../mocks/reward.mock'

const Page = () => {
  return (
    <>
      <OHeaderGuestNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <OWaitingHeader mt={24} px={16} />
        <OWaitingTabs px={16} current="REWARDS" />

        <ORewardCells
          px={16}
          rewards={[
            rewardMock,
            rewardMock,
            rewardMock,
            rewardMock,
            rewardMock,
            rewardMock,
            rewardMock,
            rewardMock,
            rewardMock,
            rewardMock,
            rewardMock,
            rewardMock,
          ]}
        />
      </Container>
      <OFooterNav />
    </>
  )
}

export default Page
