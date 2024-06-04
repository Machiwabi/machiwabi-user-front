import { FC } from 'react'
import { useWaitingSiblings } from '../../../hooks/resources/useWaitingSiblings'
import { OTutorialGuide } from '../../02_organisms/OTutorialGuide'
import { OWaitingUserList } from '../../02_organisms/OWaitingUserList'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'

type Props = {
  eventUniqueKey: string
}

const Component: FC<Props> = ({ eventUniqueKey }) => {
  const { waitingSiblings, waitingSiblingError, waitingSiblingsIsLoading } =
    useWaitingSiblings({
      eventUniqueKey,
    })

  if (waitingSiblingError) return <TErrorTemplate />
  if (waitingSiblingsIsLoading || !waitingSiblings) return <TLoadingTemplate />

  const waitings = waitingSiblings.sort((a, b) => {
    if (a.totalPoint < b.totalPoint) return 1
    if (a.totalPoint > b.totalPoint) return -1
    return 0
  })

  return (
    <>
      <OTutorialGuide
        mt={-8}
        mb={32}
        px={16}
        alertTitle={<>💁 ガイド｜MEMBERSページ</>}
        tutorialKey="waiting-members-guide"
      >
        イベントを一緒に待ち侘びているメンバーたちのランキングです！みんなで盛り上がってアイスリボンイベント当日を楽しみに待ち侘びましょう！上位のMEMBERSには嬉しい特典があります！
      </OTutorialGuide>
      <OWaitingUserList waitings={waitings} />
    </>
  )
}

export { Component as SMembersScreen }
