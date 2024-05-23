import { FC } from 'react'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { TErrorTemplate } from '../../templates/TErrorTemplate'
import { TEventShowTemplate } from '../../templates/TEventShowTemplate'
import { TLoadingTemplate } from '../../templates/TLoadingTemplate'

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
      <TEventShowTemplate event={waiting.event} />
    </>
  )
}

export { Component as SInformationScreen }
