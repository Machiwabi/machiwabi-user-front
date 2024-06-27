import { FC } from 'react'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TEventShowTemplate } from '../../03_templates/TEventShowTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { OTutorialGuide } from '../../02_organisms/OTutorialGuide'

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
        alertTitle={<>💁 ガイド｜イベント情報ページ</>}
        tutorialKey="waiting-information-guide"
      >
        このイベントの詳細情報や会場へのアクセス情報をご覧いただけます！
      </OTutorialGuide>

      <TEventShowTemplate px={16} event={waiting.event} />
    </>
  )
}

export { Component as SInformationScreen }
