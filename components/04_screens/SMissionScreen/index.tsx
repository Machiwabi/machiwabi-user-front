import { FC } from 'react'
import { waitingMissionsUrl, waitingUrl } from '../../../helpers/url.helper'
import { useBooster } from '../../../hooks/resources/useBooster'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { truncator } from '../../../utils/truncator'
import { EBreadcrumb } from '../../01_elements/EBreadcrumb'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { TMissionTemplate } from '../../03_templates/TMissionTemplate'

type Props = {
  waitingUniqueKey: string
  boosterUniqueKey: string
}

const Component: FC<Props> = ({ waitingUniqueKey, boosterUniqueKey }) => {
  const { booster, boosterIsLoading, boosterError } = useBooster({
    uniqueKey: boosterUniqueKey,
  })
  const { waiting, waitingIsLoading, waitingError } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })

  if (waitingError || boosterError) return <TErrorTemplate />
  if (waitingIsLoading || boosterIsLoading || !booster || !waiting)
    return <TLoadingTemplate />

  return (
    <>
      <EBreadcrumb
        mt={24}
        px={16}
        breadcrumbs={[
          {
            title: waiting.event.name || '',
            href: waitingUrl(waiting.uniqueKey),
          },
          {
            title: 'MISSIONS',
            href: waitingMissionsUrl(waiting.uniqueKey),
          },
          {
            title: truncator.truncateString(booster.missionName || '', 10),
          },
        ]}
      />

      <TMissionTemplate waiting={waiting} booster={booster} mt={24} px={16} />
    </>
  )
}

export { Component as SMissionScreen }
