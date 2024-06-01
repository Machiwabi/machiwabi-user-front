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
        イベント当日までの残り時間と自分の獲得したポイントを確認しましょう！貯まったポイントは待ち侘びた時間の証です！
        <br />
        ポイントがたまれば、限定REWARDと交換可能です！
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
    </>
  )
}

export { Component as SWaitingScreen }
