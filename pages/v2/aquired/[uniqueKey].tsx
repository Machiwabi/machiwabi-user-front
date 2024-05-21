import { Container } from '@mantine/core'
import { EBreadcrumb } from '../../../componentsNew/elements/EBreadcrumb'
import { OFooterNav } from '../../../componentsNew/organisms/OFooterNav'
import { OHeaderGuestNav } from '../../../componentsNew/organisms/OHeaderGuestNav'
import { TRewardShowTemplate } from '../../../componentsNew/templates/TRewardShowTemplate'
import { waitingMissionsUrl, waitingUrl } from '../../../helpers/url.helper'
import { boosterMock } from '../../../mocks/booster.mock'
import { rewardMock } from '../../../mocks/reward.mock'
import { waitingMock } from '../../../mocks/waiting.mock'
import { truncator } from '../../../utils/truncator'
import { TAquiredRewardShowTemplate } from '../../../componentsNew/templates/TAquiredRewardShowTemplate'

const Page = () => {
  return (
    <>
      <OHeaderGuestNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <EBreadcrumb
          mt={24}
          px={16}
          breadcrumbs={[
            {
              title: waitingMock.event.name || '',
              href: waitingUrl(waitingMock.uniqueKey),
            },
            {
              title: 'MISSIONS',
              href: waitingMissionsUrl(waitingMock.uniqueKey),
            },
            {
              title: truncator.truncateString(
                boosterMock.missionName || '',
                10
              ),
            },
          ]}
        />
        <TAquiredRewardShowTemplate mt={24} reward={rewardMock} />
      </Container>
      <OFooterNav />
    </>
  )
}

export default Page
