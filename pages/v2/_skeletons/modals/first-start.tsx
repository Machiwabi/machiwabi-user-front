import { Box, Container } from '@mantine/core'
import { useState } from 'react'
import { EBreadcrumb } from '../../../componentsNew/elements/EBreadcrumb'
import { EButton } from '../../../componentsNew/elements/EButton'
import { OFooterNav } from '../../../componentsNew/organisms/OFooterNav'
import { OHeaderNav } from '../../../componentsNew/organisms/OHeaderNav'
import { TModalDailyMissionTemplate } from '../../../componentsNew/templates/TModalDailyMissionTemplate'
import { TModalGuidePwaTemplate } from '../../../componentsNew/templates/TModalGuidePwaTemplate'
import { TModalRewardConfirmConsumptionTemplate } from '../../../componentsNew/templates/TModalRewardConfirmConsumptionTemplate'
import { TModalWaitingFirstTemplate } from '../../../componentsNew/templates/TModalWaitingFirstTemplate'
import { waitingMissionsUrl, waitingUrl } from '../../../helpers/url.helper'
import { boosterMock } from '../../../mocks/booster.mock'
import { waitingMock } from '../../../mocks/waiting.mock'
import { truncator } from '../../../utils/truncator'
import { rewardMock } from '../../../mocks/reward.mock'
import { TModalRewardConsumedTemplate } from '../../../componentsNew/templates/TModalRewardConsumedTemplate'

const Page = () => {
  return (
    <>
      <OHeaderNav />
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
        <WaitingFirstScreen />
        <DailyMissionScreen />
        <GuidePwaScreen />
        <ModalRewardConsumptionScreen />
        <ModalRewardConfirmConsumptionScreen />
      </Container>
      <OFooterNav />
    </>
  )
}

export default Page

const WaitingFirstScreen = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Box mt={24} px={16}>
        <EButton.Lg
          w="100%"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          WaitingHomeScreen_初回
        </EButton.Lg>

        <TModalWaitingFirstTemplate isOpen={isOpen} setIsOpen={setIsOpen} />
      </Box>
    </>
  )
}

const DailyMissionScreen = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Box mt={24} px={16}>
        <EButton.Lg
          w="100%"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          WaitingHomeScreen_DailyMission
        </EButton.Lg>

        <TModalDailyMissionTemplate isOpen={isOpen} setIsOpen={setIsOpen} />
      </Box>
    </>
  )
}

const GuidePwaScreen = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Box mt={24} px={16}>
        <EButton.Lg
          w="100%"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          GuidePwaScreen
        </EButton.Lg>

        <TModalGuidePwaTemplate isOpen={isOpen} setIsOpen={setIsOpen} />
      </Box>
    </>
  )
}

const ModalRewardConsumptionScreen = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Box mt={24} px={16}>
        <EButton.Lg
          w="100%"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          RewardConsumptionScreen
        </EButton.Lg>

        <TModalRewardConfirmConsumptionTemplate
          reward={rewardMock}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </Box>
    </>
  )
}

const ModalRewardConfirmConsumptionScreen = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Box mt={24} px={16}>
        <EButton.Lg
          w="100%"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          RewardConfirmConsumptionScreen
        </EButton.Lg>

        <TModalRewardConsumedTemplate isOpen={isOpen} setIsOpen={setIsOpen} />
      </Box>
    </>
  )
}
