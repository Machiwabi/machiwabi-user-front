import { Box, Button, Container } from '@mantine/core'
import { useState } from 'react'
import { EBreadcrumb } from '../../../componentsNew/elements/EBreadcrumb'
import { EHeading } from '../../../componentsNew/elements/EHeading/base'
import { EModal } from '../../../componentsNew/elements/EModal'
import { EText } from '../../../componentsNew/elements/EText/base'
import { OFooterNav } from '../../../componentsNew/organisms/OFooterNav'
import { OHeaderNav } from '../../../componentsNew/organisms/OHeaderNav'
import { waitingMissionsUrl, waitingUrl } from '../../../helpers/url.helper'
import { boosterMock } from '../../../mocks/booster.mock'
import { waitingMock } from '../../../mocks/waiting.mock'
import { truncator } from '../../../utils/truncator'
import { EButton } from '../../../componentsNew/elements/EButton'

const Page = () => {
  const [isOpen, setIsOpen] = useState(false)
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

        <Box mt={24} px={16}>
          <EButton.Lg
            w="100%"
            onClick={() => {
              setIsOpen(true)
            }}
          >
            WaitingHomeScreen_初回
          </EButton.Lg>

          <EModal
            isOpen={isOpen}
            closedCallback={() => setIsOpen(false)}
            showCloseButton={true}
          >
            <EHeading.Page ta="center">
              aiueoの
              <br />
              待ち侘びルームに参加しました！
            </EHeading.Page>
            <EText.Desc2 mt={8} ta="center">
              イベント開催までにポイントが貯まっていきます。定期的にチェックしましょう！
            </EText.Desc2>
          </EModal>
        </Box>
      </Container>
      <OFooterNav />
    </>
  )
}

export default Page
