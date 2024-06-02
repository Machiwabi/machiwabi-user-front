import { Box } from '@mantine/core'
import { FC } from 'react'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { ESectionHeading } from '../../01_elements/ESectionHeading'
import { EText } from '../../01_elements/EText/base'
import { OTutorialGuide } from '../../02_organisms/OTutorialGuide'
import { OWaitingCounterWithUser } from '../../02_organisms/OWaitingCounterWithUser'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { WaitingMembersSubComponent } from './WaitingMembersSubComponent'
import { WaitingFirstScreen } from './WaitingFirstScreen'
import { useSiweEoaAddress } from '../../../hooks/resources/useSiweEoaAddress'

type Props = {
  waitingUniqueKey: string
}

const Component: FC<Props> = ({ waitingUniqueKey }) => {
  const { waiting, waitingError, waitingIsLoading } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })

  if (waitingError) return <TErrorTemplate />
  if (waitingIsLoading || !waiting) return <TLoadingTemplate />

  return (
    <>
      <OTutorialGuide
        mt={-8}
        mb={32}
        px={16}
        alertTitle={<>💁 ガイド｜ようこそ！Mati-wabiへ！</>}
        tutorialKey="waiting-screen-guide"
      >
        イベント当日までの残り時間と自分の獲得したポイントを確認しましょう！
        <br />
        デフォルトは10秒で1ポイント増えますが、MISSIONSを達成すると、ポイント増加速度が増加します！ポイントがたまれば、限定REWARDSと交換可能！
      </OTutorialGuide>
      <OWaitingCounterWithUser waiting={waiting} px={16} />

      <WaitingMembersSubComponent
        eventUniqueKey={waiting.event.uniqueKey}
        waitingUniqueKey={waiting.uniqueKey}
        my={40}
        px={16}
      />

      <Box component="section" my={40} px={16}>
        <ESectionHeading
          heading="MESSAGE"
          tooltip={
            <>{waiting.user.displayName}さんがイベントにかける思いです</>
          }
        />
        <Box mt={8}>
          <EText.Desc1>
            （準備中：推しに対する応援メッセージを追加できる機能を予定しています）
          </EText.Desc1>
        </Box>
      </Box>
      <WaitingFirstScreen waiting={waiting} />
    </>
  )
}

export { Component as SWaitingScreen }
